import { ShieldCheck } from 'lucide-react'
import { cn } from '@/utils/cn'

const tone = (score: number) => (score >= 80 ? 'text-primary-deep' : score >= 65 ? 'text-warning' : 'text-error')

export function ATSBadge({ score, className }: { score: number; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full bg-surface px-2 py-0.5 text-[11px] font-semibold text-text shadow-xs ring-1 ring-border', className)}>
      <ShieldCheck className={cn('size-3', tone(score))} aria-hidden />
      <span className={tone(score)}>{score}</span> ATS
    </span>
  )
}
