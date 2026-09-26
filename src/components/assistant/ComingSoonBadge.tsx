import { Clock } from 'lucide-react'

export function ComingSoonBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-deep">
      <Clock className="size-3.5" aria-hidden />
      Coming Soon
    </span>
  )
}
