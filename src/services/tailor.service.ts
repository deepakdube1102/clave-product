import type { ResumeDocument } from '@/types/resumeDocument'

export interface TailorChange {
  id: string
  title: string
  description: string
  apply: (doc: ResumeDocument) => ResumeDocument
}

export interface TailorAnalysis {
  jobTitle: string
  company: string
  keywords: { matched: string[]; missing: string[]; all: string[] }
  changes: TailorChange[]
}

export interface JobInput {
  title: string
  company: string
  description: string
}

export interface AnalyzeJobDescriptionRequest {
  resumeId: string
  jobTitle: string
  company: string
  jobDescription: string
}

/** Mock analysis: keyword matching against a small vocabulary. The real version calls the AI backend. */
const VOCAB = [
  'figma', 'user research', 'wireframing', 'prototyping', 'design system', 'usability testing', 'accessibility',
  'information architecture', 'a/b testing', 'stakeholder', 'analytics', 'metrics', 'agile', 'journey mapping',
  'interaction design', 'visual design', 'design thinking', 'user flows', 'react', 'typescript', 'sql', 'jira',
]

export const extractKeywords = (text: string): string[] => {
  const lower = text.toLowerCase()
  return VOCAB.filter((keyword) => lower.includes(keyword))
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const titleCase = (text: string) => text.replace(/\b\w/g, (c) => c.toUpperCase())
const list = (items: string[]) => (items.length > 1 ? `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}` : (items[0] ?? ''))

export function docCorpus(doc: ResumeDocument): string {
  const { content } = doc
  return [
    doc.targetRole,
    content.summary,
    ...content.skills.technical,
    ...content.skills.tools,
    ...content.skills.other,
    ...content.experience.flatMap((e) => [e.title, e.description, ...e.bullets]),
    ...content.projects.flatMap((p) => [p.name, p.description, ...p.tech, ...p.bullets]),
  ]
    .join(' ')
    .toLowerCase()
}

/** Percentage of the job's keywords the resume covers. */
export function jobMatch(doc: ResumeDocument, keywords: string[]): number {
  if (keywords.length === 0) return 0
  const corpus = docCorpus(doc)
  return Math.round((keywords.filter((k) => corpus.includes(k)).length / keywords.length) * 100)
}

export async function analyzeJob(doc: ResumeDocument, job: JobInput): Promise<TailorAnalysis> {
  await wait(2400)
  const jd = job.description.toLowerCase()
  const all = VOCAB.filter((keyword) => jd.includes(keyword))
  const corpus = docCorpus(doc)
  const matched = all.filter((k) => corpus.includes(k))
  const missing = all.filter((k) => !corpus.includes(k))
  const role = job.title.trim() || doc.targetRole
  const company = job.company.trim()
  const changes: TailorChange[] = []

  if (role && role !== doc.targetRole) {
    changes.push({
      id: 'role',
      title: `Target the “${role}” role`,
      description: 'Updates your target role so keyword scoring and your resume list reflect this job.',
      apply: (d) => ({ ...d, targetRole: role }),
    })
  }

  const firstSentence = doc.content.summary.split(/(?<=[.!?])\s/)[0] ?? ''
  const focus = matched.slice(0, 3).map(titleCase)
  if (focus.length > 0) {
    changes.push({
      id: 'summary',
      title: 'Rewrite your summary for this job',
      description: `Leads with ${list(focus)}, which the job asks for and you already have.`,
      apply: (d) => ({
        ...d,
        content: {
          ...d.content,
          summary: `${titleCase(role)} with hands-on experience in ${list(focus)}. ${firstSentence} Ready to contribute to ${company || 'your team'}.`.replace(/\s+/g, ' '),
        },
      }),
    })
  }

  const add = missing.slice(0, 4).map(titleCase)
  if (add.length > 0) {
    changes.push({
      id: 'keywords',
      title: `Add ${list(add)} to Skills`,
      description: 'The job mentions these and your resume does not. Keep only the ones you genuinely have.',
      apply: (d) => ({ ...d, content: { ...d.content, skills: { ...d.content.skills, other: [...d.content.skills.other, ...add] } } }),
    })
  }

  const hits = (text: string) => all.filter((k) => text.toLowerCase().includes(k)).length
  const projectScores = doc.content.projects.map((p) => hits([p.name, p.description, ...p.tech, ...p.bullets].join(' ')))
  const best = projectScores.indexOf(Math.max(...projectScores))
  if (doc.content.projects.length > 1 && best > 0) {
    changes.push({
      id: 'projects',
      title: 'Lead with your most relevant project',
      description: `Moves “${doc.content.projects[best].name}” to the top, since it matches the job most closely.`,
      apply: (d) => {
        const projects = [...d.content.projects]
        const [picked] = projects.splice(best, 1)
        return { ...d, content: { ...d.content, projects: [picked, ...projects] } }
      },
    })
  }

  const firstBullet = doc.content.experience[0]?.bullets[0]
  const emphasise = matched.find((k) => firstBullet && !firstBullet.toLowerCase().includes(k))
  if (firstBullet && emphasise) {
    changes.push({
      id: 'bullet',
      title: `Emphasise ${titleCase(emphasise)} in your top bullet`,
      description: 'Makes a skill the job cares about visible in your most recent role.',
      apply: (d) => ({
        ...d,
        content: {
          ...d.content,
          experience: d.content.experience.map((e, i) =>
            i === 0 ? { ...e, bullets: e.bullets.map((b, j) => (j === 0 ? `${b.replace(/\.$/, '')}, applying ${emphasise}` : b)) } : e,
          ),
        },
      }),
    })
  }

  return { jobTitle: role, company, keywords: { matched, missing, all }, changes }
}

export function applyChanges(doc: ResumeDocument, analysis: TailorAnalysis, selectedIds: Set<string>): ResumeDocument {
  return analysis.changes.filter((c) => selectedIds.has(c.id)).reduce((current, change) => change.apply(current), doc)
}

/**
 * Service abstraction for job description analysis.
 * Target backend endpoint: POST /api/resumes/analyze-job
 * Keeps frontend provider-agnostic without embedding AI API keys.
 */
export async function analyzeJobDescription(
  req: AnalyzeJobDescriptionRequest,
  doc?: ResumeDocument
): Promise<TailorAnalysis> {
  if (doc) {
    return analyzeJob(doc, {
      title: req.jobTitle,
      company: req.company,
      description: req.jobDescription,
    })
  }

  const fallbackDoc: ResumeDocument = {
    id: req.resumeId,
    name: 'Resume',
    targetRole: req.jobTitle || 'Product Designer',
    template: 'classic',
    sectionOrder: ['experience', 'education', 'skills', 'projects', 'certifications'],
    content: {
      contact: { name: 'Candidate', email: 'hello@example.com', phone: '', location: '', linkedin: '', github: '', portfolio: '' },
      summary: 'Experienced professional.',
      skills: { technical: ['Figma', 'User Research'], tools: ['Jira'], other: [] },
      experience: [],
      education: [],
      projects: [],
      certifications: [],
    },
    updatedAt: new Date().toISOString(),
  }

  return analyzeJob(fallbackDoc, {
    title: req.jobTitle,
    company: req.company,
    description: req.jobDescription,
  })
}
