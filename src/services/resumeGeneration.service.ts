import { improveText } from '@/services/ai.service'
import { docCorpus, extractKeywords } from '@/services/tailor.service'
import { useAuthStore } from '@/store/authStore'
import type { ProfileData } from '@/types/profile'
import type { ResumeDocument } from '@/types/resumeDocument'
import { buildContentFromProfile, defaultSectionOrder } from '@/utils/resumeFromProfile'

export interface GenerationInput {
  role: string
  industry: string
  jobDescription: string
  /** Bumped by Regenerate so the wording differs from the last attempt. */
  attempt: number
}

export interface GeneratedResume {
  doc: ResumeDocument
  /** ATS-focused keywords the resume covers. */
  keywords: string[]
  usedJobDescription: boolean
}

/**
 * Request shape for POST /api/resumes/generate.
 *
 * HOW TO MIGRATE TO THE REAL BACKEND
 * ────────────────────────────────────────────────────────────────────────────
 * Replace `generateResumeFromProfile` with:
 *
 *   const res = await fetch('/api/resumes/generate', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(request),
 *   })
 *   if (!res.ok) throw new Error(`Generation failed: ${res.statusText}`)
 *   return res.json() as Promise<GeneratedResume>
 *
 * The backend selects the AI provider and holds all API keys.
 * The frontend is completely provider-agnostic.
 * ────────────────────────────────────────────────────────────────────────────
 */
export interface GenerateResumeRequest {
  targetRole: string
  jobDescription: string
  careerProfile: ProfileData
  /**
   * Output of the analyze-job step. When provided, the backend uses the
   * pre-computed analysis to avoid a redundant AI call.
   */
  jobAnalysis?: import('@/services/jobAnalysis.service').JobAnalysisResponse
}

export const generationStages = [
  'Understanding your profile',
  'Selecting relevant experience',
  'Writing your summary',
  'Optimizing for ATS',
  'Structuring your resume',
]

const ROLE_SKILLS: Record<string, string[]> = {
  design: ['figma', 'user research', 'wireframing', 'prototyping', 'design system', 'usability', 'accessibility', 'information architecture'],
  frontend: ['react', 'typescript', 'javascript', 'html', 'css', 'accessibility', 'tailwind'],
  product: ['analytics', 'roadmap', 'stakeholder', 'sql', 'user research', 'metrics'],
}

const relevantTo = (role: string): string[] => {
  const r = role.toLowerCase()
  if (/design|ux|ui/.test(r)) return ROLE_SKILLS.design
  if (/front|web|developer|engineer/.test(r)) return ROLE_SKILLS.frontend
  if (/product|analyst/.test(r)) return ROLE_SKILLS.product
  return []
}

const levelPhrase = { student: 'academic and project', fresher: 'hands-on', early: '1–3 years of', experienced: 'extensive' } as const
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const titleCase = (text: string) => text.replace(/\b\w/g, (c) => c.toUpperCase())
const list = (items: string[]) => (items.length > 1 ? `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}` : (items[0] ?? ''))
const lowerFirst = (text: string) => `${text.charAt(0).toLowerCase()}${text.slice(1)}`

/**
 * Missing details worth flagging before generating. None of them block generation.
 */
export function missingProfileInfo(profile: ProfileData): string[] {
  const missing: string[] = []
  if (profile.targetRoles.length === 0) missing.push('a target role')
  if (profile.skills.length === 0) missing.push('skills')
  if (profile.experience.length + profile.projects.length === 0) missing.push('experience or projects')
  if (profile.education.length === 0) missing.push('education')
  if (!profile.summary.trim()) missing.push('a professional summary')
  if (!profile.phone.trim() && !profile.location.trim()) missing.push('a phone number or location')
  return missing
}

/** Mock AI generation from the Career Profile. The real version calls the AI backend. */
export async function generateResumeFromProfile(
  profile: ProfileData,
  input: GenerationInput,
  onStage: (stageIndex: number) => void,
): Promise<GeneratedResume> {
  const user = useAuthStore.getState().user
  for (let i = 0; i < generationStages.length; i++) {
    onStage(i)
    await wait(850)
  }

  const { role, industry, jobDescription, attempt } = input
  const jdKeywords = extractKeywords(jobDescription)
  const relevant = [...jdKeywords, ...relevantTo(role)]
  const content = buildContentFromProfile(profile, user?.name, user?.email)

  const rank = (text: string) => (relevant.some((keyword) => text.toLowerCase().includes(keyword)) ? 0 : 1)
  const sortSkills = (skills: string[]) => [...skills].sort((a, b) => rank(a) - rank(b))
  content.skills = { technical: sortSkills(content.skills.technical), tools: sortSkills(content.skills.tools), other: content.skills.other }

  const projectScore = (p: (typeof content.projects)[number]) => relevant.filter((k) => [p.name, p.description, ...p.tech, ...p.bullets].join(' ').toLowerCase().includes(k)).length
  content.projects = [...content.projects].sort((a, b) => projectScore(b) - projectScore(a))
  content.experience = content.experience.map((e) => ({ ...e, bullets: e.bullets.slice(0, 4).map(improveText) }))

  const matchedJd = jdKeywords.filter((k) => docCorpus({ content } as ResumeDocument).includes(k)).map(titleCase)
  const focus = (matchedJd.length ? matchedJd : content.skills.technical).slice(0, 3)
  const phrase = profile.experienceLevel ? levelPhrase[profile.experienceLevel] : 'hands-on'
  const achievement = content.experience[0]?.bullets[0] ?? content.projects[0]?.description ?? ''
  const recent = achievement ? `Recently, ${lowerFirst(achievement).replace(/\.$/, '')}.` : ''
  const domain = industry.trim() ? ` in ${industry.trim()}` : ''
  const withFocus = focus.length ? ` in ${list(focus)}` : ''

  const variants = [
    `${role} with ${phrase} experience${withFocus}. ${recent} Looking to bring clear, user-centred work to a ${role} role${domain}.`,
    `${role} focused on ${focus.length ? list(focus) : 'thoughtful, dependable work'}${domain ? `, with a keen interest in ${industry.trim()}` : ''}. ${recent} Comfortable working across research, execution and handoff.`,
    `Detail-oriented ${role.toLowerCase()} bringing ${phrase} experience${withFocus}. ${recent} Eager to contribute to a ${role} team${domain}.`,
  ]
  content.summary = variants[attempt % variants.length].replace(/\s+/g, ' ').trim()

  const doc: ResumeDocument = {
    id: `draft_${crypto.randomUUID()}`,
    name: `${role} Resume`,
    targetRole: role,
    template: 'classic',
    sectionOrder: defaultSectionOrder(profile),
    content,
    updatedAt: new Date().toISOString(),
  }

  const corpus = docCorpus(doc)
  const covered = [...new Set([...jdKeywords, ...relevantTo(role)])].filter((k) => corpus.includes(k))
  // Drop terms already contained in a longer one, e.g. "usability" next to "usability testing".
  const keywords = covered.filter((k) => !covered.some((other) => other !== k && other.includes(k))).map(titleCase).slice(0, 10)
  return { doc, keywords, usedJobDescription: jdKeywords.length > 0 }
}
