export type TemplateId = 'classic' | 'modern' | 'compact' | 'minimal' | 'student' | 'designer' | 'engineer' | 'business' | 'academic' | 'executive'
export type ResumeSectionKey = 'experience' | 'education' | 'projects' | 'skills' | 'certifications'

export interface ResumeContact {
  name: string
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
  portfolio: string
}

export interface ResumeExperience {
  id: string
  title: string
  company: string
  location: string
  start: string
  end: string
  description: string
  bullets: string[]
}

export interface ResumeEducation {
  id: string
  degree: string
  institution: string
  location: string
  dates: string
  details: string
}

export interface ResumeProject {
  id: string
  name: string
  description: string
  tech: string[]
  link: string
  bullets: string[]
}

export interface ResumeSkills {
  technical: string[]
  tools: string[]
  other: string[]
}

export interface ResumeCertification {
  id: string
  name: string
  issuer: string
  date: string
  link: string
}

export interface ResumeContent {
  contact: ResumeContact
  summary: string
  experience: ResumeExperience[]
  education: ResumeEducation[]
  projects: ResumeProject[]
  skills: ResumeSkills
  certifications: ResumeCertification[]
}

export interface ResumeDocument {
  id: string
  name: string
  targetRole: string
  template: TemplateId
  /** Order of the body sections below the summary. */
  sectionOrder: ResumeSectionKey[]
  content: ResumeContent
  updatedAt: string
}
