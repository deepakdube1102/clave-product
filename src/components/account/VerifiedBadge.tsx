import { BadgeCheck } from 'lucide-react'

export function VerifiedBadge({ verified }: { verified: boolean }) {
  return verified ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary-deep ring-1 ring-inset ring-primary/20">
      <BadgeCheck className="size-3.5" aria-hidden />
      Verified
    </span>
  ) : (
    <span className="inline-flex items-center rounded-full bg-warning/10 px-2.5 py-1 text-xs font-medium text-warning ring-1 ring-inset ring-warning/25">Unverified</span>
  )
}
