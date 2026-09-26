import type { TemplateId } from '@/types/resumeDocument'

export type DateFormat = 'dmy' | 'mdy' | 'iso'
export type EmailPreference = 'important' | 'product' | 'none'

export interface UserSettings {
  dateFormat: DateFormat
  emailPreference: EmailPreference
  notifications: { jobs: boolean; resumes: boolean; applications: boolean; product: boolean }
  privacy: { personalizeAi: boolean; usageData: boolean }
  defaultTemplate: TemplateId
}
