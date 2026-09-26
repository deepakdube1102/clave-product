import type { Resume } from '@/types/resume'

export const resumeStatus = (resume: Resume): 'draft' | 'tailored' | 'base' => (resume.status === 'draft' ? 'draft' : resume.type)
