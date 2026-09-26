export type ResumeType = 'base' | 'tailored'

export interface Resume {
  id: string
  name: string
  targetRole: string
  /** 0-100. Placeholder until real ATS analysis exists. */
  atsScore: number
  updatedAt: string
  type: ResumeType
  /** Company or job a tailored resume was adapted for. */
  tailoredFor?: string
  /** Set while a resume is still being drafted. */
  status?: 'draft'
}
