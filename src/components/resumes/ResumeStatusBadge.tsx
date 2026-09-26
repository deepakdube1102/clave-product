import type { Resume } from '@/types/resume'
import { cn } from '@/utils/cn'
import { resumeStatus } from '@/utils/resumeStatus'

const styles = {
  base: 'bg-surface text-secondary ring-border',
  tailored: 'bg-primary/10 text-primary-deep ring-primary/25',
  draft: 'bg-warning/10 text-warning ring-warning/25',
}
const labels = { base: 'Base', tailored: 'Tailored', draft: 'Draft' }

export function ResumeStatusBadge({ resume, className }: { resume: Resume; className?: string }) {
  const status = resumeStatus(resume)
  return <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset', styles[status], className)}>{labels[status]}</span>
}
