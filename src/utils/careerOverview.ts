import type { CareerProfile } from '@/types/career'
import type { ProfileData } from '@/types/profile'
import { experienceLevelLabels } from '@/utils/profile'

/**
 * Turns the saved profile into the Dashboard's overview. A profile counts as
 * complete once it names a target role, has skills, and shows experience or projects.
 */
export function deriveCareerOverview(data: ProfileData | null): CareerProfile {
  const hasRole = !!data && data.targetRoles.length > 0
  const hasSkills = !!data && data.skills.length > 0
  const hasWork = !!data && (data.experience.length > 0 || data.projects.length > 0)

  if (!data || !hasRole || !hasSkills || !hasWork) {
    const missingItems: string[] = []
    if (!hasRole) missingItems.push('Target role and career direction')
    if (!hasSkills) missingItems.push('Key skills')
    if (!hasWork) missingItems.push('Projects or work experience')
    if (!data || data.education.length === 0) missingItems.push('Education')
    return { status: 'incomplete', missingItems }
  }

  const [firstSkill, secondSkill] = data.skills
  const evidence = data.projects.length > 0 ? 'shows up clearly in your projects' : 'is backed by real experience'
  const strengths = secondSkill ? `${firstSkill} and ${secondSkill}` : firstSkill

  let growthOpportunity = 'Quantified achievements'
  if (data.certifications.length === 0) growthOpportunity = 'Certifications that validate your skills'
  else if (data.links.length === 0) growthOpportunity = 'Links that showcase your work'

  return {
    status: 'complete',
    direction: data.targetRoles.slice(0, 2).join(' · '),
    experienceLevel: data.experienceLevel ? experienceLevelLabels[data.experienceLevel] : 'Not specified',
    topSkills: data.skills.slice(0, 4),
    growthOpportunity,
    insight: `Your ${strengths} ${evidence}. Roles like ${data.targetRoles[0]} are where your profile is strongest.`,
  }
}
