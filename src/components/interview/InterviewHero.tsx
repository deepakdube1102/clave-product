import { ArrowRight, MessagesSquare } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ComingSoonBadge } from '@/components/assistant/ComingSoonBadge'
import { InterviewVisual } from '@/components/interview/InterviewVisual'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { paths } from '@/routes/navigation'

export function InterviewHero() {
  return (
    <section aria-labelledby="interview-title" className="relative overflow-hidden rounded-large">
      <div aria-hidden className="pointer-events-none absolute -top-32 -right-24 size-[28rem] rounded-full bg-primary/[0.07]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-32 size-[26rem] rounded-full bg-teal/[0.06]" />

      <div className="relative grid items-center gap-10 px-2 py-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-6 lg:py-6">
        <div className="flex flex-col items-start">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-semibold tracking-wide text-primary-deep uppercase shadow-xs">
            <MessagesSquare className="size-3.5 text-primary" aria-hidden />
            AI Mock Interview
          </p>
          <h1 id="interview-title" className="mt-5 font-editorial text-[clamp(2.25rem,4.8vw,3.75rem)] leading-[1.02] font-medium tracking-tight text-text">
            Practice before
            <br />
            you <span className="text-primary">walk in.</span>
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-secondary sm:text-[15px]">
            Practice realistic interviews built around the roles you’re targeting, with feedback that helps you improve before the real conversation.
          </p>
          <div className="mt-5">
            <ComingSoonBadge />
          </div>
          <div className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link to={paths.careerProfile} className={buttonStyles()}>
              Explore My Career Profile
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link to={paths.dashboard} className={buttonStyles({ variant: 'secondary' })}>
              Back to Dashboard
            </Link>
          </div>
        </div>

        <InterviewVisual />
      </div>
    </section>
  )
}
