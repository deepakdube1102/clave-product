import { BarChart3, Compass, FileText, Lightbulb, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/utils/cn'

interface FloatingCardProps {
  icon: LucideIcon
  label: string
  className: string
  /** Seconds. Staggers the float so the cards never move in sync. */
  delay: number
}

function FloatingCard({ icon: Icon, label, className, delay }: FloatingCardProps) {
  return (
    <div style={{ animationDelay: `${delay}s` }} className={cn('anim-float absolute flex items-center gap-2.5 rounded-default border border-border bg-surface px-2.5 py-2 shadow-card', className)}>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-control icon-tile">
        <Icon className="size-4" strokeWidth={1.75} aria-hidden />
      </span>
      <div>
        <p className="text-xs font-semibold whitespace-nowrap text-text">{label}</p>
        <span className="mt-1.5 block h-1 w-16 rounded-full bg-border" aria-hidden />
        <span className="mt-1 block h-1 w-10 rounded-full bg-border/70" aria-hidden />
      </div>
    </div>
  )
}

/** Decorative only: a central spark, a soft glow and four floating insight cards. No fake chat or replies. */
export function AssistantVisual() {
  return (
    <div aria-hidden className="relative mx-auto h-[330px] w-full max-w-[440px] sm:h-[340px]">
      <div className="anim-glow absolute top-1/2 left-1/2 size-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 size-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-primary/10 to-teal/10" />

      <svg className="absolute inset-0 size-full text-primary/30" viewBox="0 0 520 380" preserveAspectRatio="none" fill="none">
        <path className="anim-dash" d="M150 105 C 200 130, 215 150, 238 165" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 5" />
        <path className="anim-dash" d="M370 100 C 340 130, 315 150, 290 165" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 5" />
        <path className="anim-dash" d="M140 265 C 190 240, 215 220, 238 205" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 5" />
        <path className="anim-dash" d="M385 275 C 345 250, 315 225, 290 205" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 5" />
      </svg>

      <div className="anim-breathe absolute top-1/2 left-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[24px] border border-primary/15 bg-surface shadow-card">
        <span className="absolute inset-2 rounded-[22px] bg-tint" />
        <Sparkles className="relative size-8 text-primary-deep" strokeWidth={1.5} />
      </div>

      <FloatingCard icon={BarChart3} label="Better opportunities" className="top-[8%] left-[2%] -rotate-3" delay={0} />
      <FloatingCard icon={FileText} label="Stronger resumes" className="top-[10%] right-[0%] rotate-2" delay={1.5} />
      <FloatingCard icon={Compass} label="Clear guidance" className="bottom-[26%] left-[0%] -rotate-2" delay={3} />
      <FloatingCard icon={Lightbulb} label="Personalized insights" className="right-[0%] bottom-[22%] rotate-1" delay={4.5} />

      <p className="absolute right-2 bottom-0 rotate-[-4deg] font-editorial text-base leading-tight text-secondary italic">
        Same you.
        <br />
        More possibilities.
      </p>
    </div>
  )
}
