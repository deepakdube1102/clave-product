import type { ResumeSectionKey } from '@/types/resumeDocument'

export interface ResumeStructure {
  id: string
  label: string
  description: string
  order: ResumeSectionKey[]
}

export const resumeStructures: ResumeStructure[] = [
  { id: 'education-first', label: 'Education first', description: 'Best for students and recent graduates.', order: ['education', 'projects', 'experience', 'skills', 'certifications'] },
  { id: 'experience-first', label: 'Experience first', description: 'Best when your work history is your strongest asset.', order: ['experience', 'projects', 'education', 'skills', 'certifications'] },
  { id: 'projects-led', label: 'Projects led', description: 'Great for designers and developers with a strong portfolio.', order: ['projects', 'experience', 'skills', 'education', 'certifications'] },
]
