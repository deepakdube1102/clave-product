export type ExperienceLevel = 'student' | 'fresher' | 'early' | 'experienced'
export type WorkMode = 'remote' | 'hybrid' | 'onsite'
export type ProfileSource = 'resume' | 'linkedin' | 'manual'

export interface ExperienceEntry {
  id: string
  role: string
  company: string
  location: string
  period: string
  summary: string
}

export interface EducationEntry {
  id: string
  institution: string
  degree: string
  period: string
  details: string
}

export interface ProjectEntry {
  id: string
  name: string
  description: string
  technologies: string[]
  link: string
}

export interface CertificationEntry {
  id: string
  name: string
  issuer: string
  year: string
}

export interface LinkEntry {
  id: string
  label: string
  url: string
}

export interface ProfileData {
  name: string
  email: string
  phone: string
  location: string
  summary: string
  targetRoles: string[]
  experienceLevel: ExperienceLevel | null
  experience: ExperienceEntry[]
  education: EducationEntry[]
  projects: ProjectEntry[]
  skills: string[]
  certifications: CertificationEntry[]
  achievements: string[]
  links: LinkEntry[]
  workModes: WorkMode[]
  preferredLocations: string
  industries: string[]
}

export type SectionKey =
  | 'overview'
  | 'experience'
  | 'education'
  | 'projects'
  | 'skills'
  | 'certifications'
  | 'links'
  | 'preferences'
