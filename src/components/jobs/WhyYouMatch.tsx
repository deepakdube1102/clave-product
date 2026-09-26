import { Check, Lightbulb, Zap } from 'lucide-react'
import type { MatchReasons } from '@/utils/jobMatchReasons'

/** Emerald "why" list plus, when there is one, an amber factual gap. */
export function WhyYouMatch({ reasons }: { reasons: MatchReasons }) {
  return (
    <section aria-label="Why this role matches you" className="rounded-default border border-primary/20 bg-tint p-4">
      <h3 className="flex items-center gap-2 text-base font-semibold text-text">
        <Lightbulb className="size-4 text-primary" aria-hidden />
        Why This Role Matches You
      </h3>
      <ul className="mt-3 flex flex-col gap-2">
        {reasons.points.map((point) => (
          <li key={point} className="flex items-start gap-2.5 text-[13px] text-text">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={2.5} aria-hidden />
            {point}
          </li>
        ))}
      </ul>
      {reasons.gap && (
        <div className="mt-4 rounded-control border border-warning/25 bg-warning/10 p-3">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-text">
            <Zap className="size-4 text-warning" aria-hidden />
            Areas to Strengthen
          </h4>
          <p className="mt-1.5 text-[13px] leading-snug text-secondary">{reasons.gap}</p>
        </div>
      )}
    </section>
  )
}
