import { LayoutTemplate, PenLine, Sparkles, Target } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { paths } from '@/routes/navigation'

export interface CreatePath {
  id: string
  title: string
  description: string
  /** What happens before the editor opens. */
  flow: string
  to: string
  icon: LucideIcon
  /** The AI path gets a distinctive treatment. */
  featured?: boolean
}

export const createPaths: CreatePath[] = [
  { id: 'ai', title: 'Create with AI', description: 'Build from your Career Profile', flow: 'Career Profile → AI draft → Review', to: paths.createWithAi, icon: Sparkles, featured: true },
  { id: 'tailor', title: 'Tailor Existing Resume', description: 'Optimize an existing resume for a specific job', flow: 'Pick resume → Add job → Review changes', to: paths.tailorResume, icon: Target },
  { id: 'manual', title: 'Start from Scratch', description: 'Build your resume yourself', flow: 'Choose a structure → Write', to: paths.createManual, icon: PenLine },
  { id: 'template', title: 'Choose a Template', description: 'Start with a professionally structured template', flow: 'Browse templates → Pick one', to: paths.createFromTemplate, icon: LayoutTemplate },
]
