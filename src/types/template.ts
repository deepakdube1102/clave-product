import type { ResumeContent, TemplateId } from '@/types/resumeDocument'

export type TemplateCategory = 'ATS Friendly' | 'Product & Design' | 'Engineering' | 'Business' | 'Marketing' | 'Finance' | 'Student' | 'Academic' | 'Creative'

export interface TemplateInfo {
  id: TemplateId
  name: string
  /** Shown as the small badge on the card. */
  category: TemplateCategory
  /** Every filter this template appears under. */
  categories: TemplateCategory[]
  description: string
  bestFor: string[]
  atsFriendly: boolean
  tags: string[]
  /** Role shown under the name in previews. */
  previewRole: string
  /** Sample resume the previews render. */
  preview: ResumeContent
}
