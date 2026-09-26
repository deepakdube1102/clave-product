import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AssistantVisual } from '@/components/assistant/AssistantVisual'
import { ComingSoonBadge } from '@/components/assistant/ComingSoonBadge'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { paths } from '@/routes/navigation'

export function AssistantHero() {
  return (
    <section aria-labelledby="assistant-title" className="relative overflow-hidden rounded-large">
      <div aria-hidden className="pointer-events-none absolute -top-32 -right-24 size-[28rem] rounded-full bg-primary/[0.07]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-32 size-[26rem] rounded-full bg-teal/[0.06]" />

      <div className="relative grid items-center gap-10 px-2 py-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:py-6">
        <div className="flex flex-col items-start">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-semibold tracking-wide text-primary-deep uppercase shadow-xs">
            <Sparkles className="size-3.5 text-primary" aria-hidden />
            AI Career Assistant
          </p>
          <h1 id="assistant-title" className="mt-5 font-editorial text-[clamp(2.25rem,4.8vw,3.75rem)] leading-[1.02] font-medium tracking-tight text-text">
            Your career,
            <br />
            <span className="text-primary">with more clarity.</span>
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-secondary sm:text-[15px]">
            Clave’s AI Assistant will help you understand opportunities, improve your career materials, and make better decisions using the context in your Career Profile.
          </p>
          <div className="mt-5">
            <ComingSoonBadge />
          </div>
          <div className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link to={paths.careerProfile} className={buttonStyles({ size: 'md' })}>
              Explore My Career Profile
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link to={paths.dashboard} className={buttonStyles({ variant: 'secondary', size: 'md' })}>
              Back to Dashboard
            </Link>
          </div>
        </div>

        <AssistantVisual />
      </div>
    </section>
  )
}
