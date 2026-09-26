import type { ProfileData } from '@/types/profile'

const hasNumber = (text: string) => /\d/.test(text)

/** One concise, useful nudge. Rules are placeholders for the future AI-generated insight. */
export function deriveProfileInsight(data: ProfileData): string {
  const role = data.targetRoles[0]

  if (!role) return 'Add a target role so Clave can tailor your resumes and job recommendations to where you’re headed.'

  const evidence = [...data.projects.map((p) => p.description), ...data.experience.map((e) => e.summary)].filter(Boolean)
  if (evidence.length === 0) {
    return `Add a project or some experience and Clave can start showing how you stack up for ${role} roles.`
  }
  if (!evidence.some(hasNumber)) {
    return `Your profile is a solid start for ${role} roles. Adding one or two measurable outcomes to your projects or experience could make your resume noticeably stronger.`
  }
  if (data.certifications.length === 0) {
    return `Your profile reads well for ${role} roles. A certification would help validate your strongest skills.`
  }
  return `Your profile is well-rounded for ${role} roles. Keep it current as you ship new work.`
}
