import type { ExperienceLevel, ProfileData, SectionKey, WorkMode } from '@/types/profile'

export const experienceLevelLabels: Record<ExperienceLevel, string> = {
  student: 'Student',
  fresher: 'Fresher / Recent graduate',
  early: 'Early career (1–3 years)',
  experienced: 'Experienced (3+ years)',
}

export const workModeLabels: Record<WorkMode, string> = {
  remote: 'Remote',
  hybrid: 'Hybrid',
  onsite: 'On-site',
}

export const newId = () => crypto.randomUUID()

export function emptyProfile(name = '', email = ''): ProfileData {
  return {
    name,
    email,
    phone: '',
    location: '',
    summary: '',
    targetRoles: [],
    experienceLevel: null,
    experience: [],
    education: [],
    projects: [],
    skills: [],
    certifications: [],
    achievements: [],
    links: [],
    workModes: [],
    preferredLocations: '',
    industries: [],
  }
}

/** Students and freshers lead with education and projects; everyone else with experience. */
export function isEarlyStage(level: ExperienceLevel | null): boolean {
  return level === 'student' || level === 'fresher'
}

export function sectionOrder(level: ExperienceLevel | null): SectionKey[] {
  return isEarlyStage(level)
    ? ['overview', 'education', 'projects', 'skills', 'experience', 'certifications', 'links', 'preferences']
    : ['overview', 'experience', 'projects', 'education', 'skills', 'certifications', 'links', 'preferences']
}

export function isSectionEmpty(key: SectionKey, data: ProfileData): boolean {
  switch (key) {
    case 'overview':
      return !data.name && data.targetRoles.length === 0 && !data.experienceLevel
    case 'experience':
      return data.experience.length === 0
    case 'education':
      return data.education.length === 0
    case 'projects':
      return data.projects.length === 0
    case 'skills':
      return data.skills.length === 0
    case 'certifications':
      return data.certifications.length === 0 && data.achievements.length === 0
    case 'links':
      return data.links.length === 0
    case 'preferences':
      return data.workModes.length === 0 && !data.preferredLocations && data.industries.length === 0
  }
}

const hasText = (...values: string[]) => values.some((value) => value.trim() !== '')
const trimAll = <T extends object>(entry: T): T =>
  Object.fromEntries(Object.entries(entry).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v])) as T

/** Drops entries the user added but left blank, and trims text. */
export function cleanProfile(data: ProfileData): ProfileData {
  return {
    ...data,
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    location: data.location.trim(),
    summary: data.summary.trim(),
    preferredLocations: data.preferredLocations.trim(),
    experience: data.experience.map(trimAll).filter((e) => hasText(e.role, e.company, e.location, e.period, e.summary)),
    education: data.education.map(trimAll).filter((e) => hasText(e.institution, e.degree, e.period, e.details)),
    projects: data.projects.map(trimAll).filter((p) => hasText(p.name, p.description, p.link) || p.technologies.length > 0),
    certifications: data.certifications.map(trimAll).filter((c) => hasText(c.name, c.issuer, c.year)),
    links: data.links.map(trimAll).filter((l) => hasText(l.label, l.url)),
    achievements: data.achievements.map((a) => a.trim()).filter(Boolean),
  }
}
