import { Loader2 } from 'lucide-react'
import { cn } from '@/utils/cn'

interface LoadingStateProps {
  label?: string
  className?: string
}

export function LoadingState({ label = 'Loading…', className }: LoadingStateProps) {
  return (
    <div role="status" className={cn('flex flex-col items-center justify-center gap-3 px-6 py-12', className)}>
      <Loader2 className="size-6 animate-spin text-primary" aria-hidden />
      <p className="text-sm text-secondary">{label}</p>
    </div>
  )
}
