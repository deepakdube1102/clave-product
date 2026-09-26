import type { ResumeDocument } from '@/types/resumeDocument'

export interface AtsFactor {
  id: string
  label: string
  score: number
  note: string
}

export interface AtsResult {
  total: number
  factors: AtsFactor[]
}

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)))
const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length

/** Mock estimate from simple heuristics. Not a real ATS engine. */
export function computeAts(doc: ResumeDocument): AtsResult {
  const { contact, summary, experience, education, projects, skills } = doc.content
  const skillCount = skills.technical.length + skills.tools.length + skills.other.length
  const bullets = [...experience.flatMap((e) => e.bullets), ...projects.flatMap((p) => p.bullets)].filter((b) => b.trim())

  const checks: Array<[boolean, string]> = [
    [!!contact.name.trim(), 'Add your name'],
    [!!contact.email.trim(), 'Add an email address'],
    [!!contact.phone.trim(), 'Add a phone number'],
    [!!summary.trim(), 'Add a professional summary'],
    [experience.length + projects.length > 0, 'Add experience or projects'],
    [education.length > 0, 'Add your education'],
    [skillCount > 0, 'Add your skills'],
  ]
  const missing = checks.find(([ok]) => !ok)
  const completeness = clamp((checks.filter(([ok]) => ok).length / checks.length) * 100)

  const roleWords = doc.targetRole.toLowerCase().split(/\W+/).filter((w) => w.length > 2)
  const corpus = [summary, ...bullets, ...experience.map((e) => e.description), ...projects.map((p) => p.description)].join(' ').toLowerCase()
  const matched = roleWords.filter((word) => corpus.includes(word)).length
  const keywords = clamp(40 + Math.min(skillCount, 10) * 4 + (roleWords.length ? (matched / roleWords.length) * 20 : 10))

  let formatting = 96
  if (!contact.email.trim()) formatting -= 6
  if (!contact.phone.trim()) formatting -= 6
  if (experience.some((e) => !e.start.trim())) formatting -= 4

  const longBullets = bullets.filter((b) => wordCount(b) > 28).length
  const placeholders = bullets.filter((b) => b.includes('[')).length
  const summaryWords = wordCount(summary)
  const summaryOff = summaryWords > 0 && (summaryWords < 20 || summaryWords > 90)
  const readability = clamp(92 - longBullets * 6 - placeholders * 4 - (summaryOff ? 10 : 0) - (bullets.length === 0 ? 12 : 0))

  const factors: AtsFactor[] = [
    { id: 'keywords', label: 'Keyword relevance', score: keywords, note: skillCount < 8 ? 'Add more skills that match your target role.' : 'Good coverage of role-relevant skills.' },
    { id: 'completeness', label: 'Section completeness', score: completeness, note: missing ? `${missing[1]}.` : 'All key sections are filled in.' },
    { id: 'formatting', label: 'Formatting', score: clamp(formatting), note: 'Single column with standard headings that ATS can read.' },
    {
      id: 'readability',
      label: 'Readability',
      score: readability,
      note: placeholders > 0 ? 'Replace [placeholders] with real numbers.' : longBullets > 0 ? 'Shorten bullets over ~28 words.' : summaryOff ? 'Aim for a 2–4 sentence summary.' : 'Clear, concise wording.',
    },
  ]

  return { total: clamp(keywords * 0.25 + completeness * 0.35 + formatting * 0.2 + readability * 0.2), factors }
}
