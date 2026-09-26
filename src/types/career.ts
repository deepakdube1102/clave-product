import type { LucideIcon } from 'lucide-react'

export type CareerProfile =
  | {
      status: 'incomplete'
      /** Details that would still improve resumes, recommendations and AI personalization. */
      missingItems: string[]
    }
  | {
      status: 'complete'
      direction: string
      experienceLevel: string
      topSkills: string[]
      growthOpportunity: string
      insight: string
    }

export interface NextMove {
  id: string
  title: string
  description: string
  to: string
  icon: LucideIcon
  /** Small tinted icon area: gives each card its own quiet personality. */
  tint: 'mint' | 'amber'
}
