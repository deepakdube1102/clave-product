import { cn } from '@/utils/cn'

/** Decorative only. Restrained emerald line work; nothing here carries information. */

export function ProfileCover({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('relative h-16 overflow-hidden rounded-default bg-linear-to-r from-tint via-primary/[0.08] to-teal/[0.12]', className)}>
      <svg className="absolute -top-10 -right-6 h-40 w-72 text-primary/25" viewBox="0 0 288 160" fill="none">
        <circle cx="200" cy="80" r="30" stroke="currentColor" strokeWidth="1" />
        <circle cx="200" cy="80" r="52" stroke="currentColor" strokeWidth="1" />
        <circle cx="200" cy="80" r="76" stroke="currentColor" strokeWidth="1" strokeDasharray="2 6" />
        <circle cx="200" cy="80" r="100" stroke="currentColor" strokeWidth="1" />
        <circle cx="252" cy="44" r="3.5" fill="currentColor" />
        <circle cx="150" cy="118" r="2.5" fill="currentColor" />
      </svg>
      <svg className="absolute bottom-2 left-1/3 hidden size-4 text-primary/40 sm:block" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" />
      </svg>
    </div>
  )
}

export function SecurityIllustration({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 160 110" fill="none" className={cn('h-[88px] w-32', className)}>
      <ellipse cx="80" cy="98" rx="52" ry="6" fill="currentColor" opacity="0.08" className="text-primary" />
      <circle cx="80" cy="52" r="46" stroke="currentColor" strokeWidth="1" strokeDasharray="2 5" className="text-primary/30" />
      <path d="M80 16 L110 27 V52 C110 70 97 82 80 90 C63 82 50 70 50 52 V27 L80 16Z" className="fill-tint stroke-primary/50" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M80 24 L103 32.5 V52 C103 65 93.500 74.500 80 81 C66.500 74.500 57 65 57 52 V32.500 L80 24Z" className="fill-surface stroke-primary/20" strokeWidth="1" />
      <path d="M68 52 L77 61 L93 43" className="stroke-primary" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="124" cy="24" r="3" className="fill-teal/60" />
      <circle cx="30" cy="70" r="2.500" className="fill-primary/40" />
      <path d="M136 62l1.600 5.400L143 69l-5.400 1.600L136 76l-1.600-5.400L129 69l5.400-1.600L136 62Z" className="fill-primary/40" />
    </svg>
  )
}

export function PlanDecoration({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 240 120" fill="none" className={cn('pointer-events-none absolute inset-y-0 right-0 hidden h-full w-auto text-primary/20 md:block', className)}>
      <circle cx="200" cy="60" r="34" stroke="currentColor" />
      <circle cx="200" cy="60" r="58" stroke="currentColor" strokeDasharray="2 6" />
      <circle cx="200" cy="60" r="86" stroke="currentColor" />
      <path d="M170 92c14-8 22-24 38-30s26-4 36-14" stroke="currentColor" strokeWidth="1.500" strokeLinecap="round" />
      <path d="M196 30l3 9 9 3-9 3-3 9-3-9-9-3 9-3 3-9Z" fill="currentColor" />
    </svg>
  )
}
