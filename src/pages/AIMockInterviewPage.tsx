import { MessageCircleReply, Target, TrendingUp } from 'lucide-react'
import { InterviewCapabilityCard } from '@/components/interview/InterviewCapabilityCard'
import { InterviewHero } from '@/components/interview/InterviewHero'

const roles = ['Product Designer', 'UX Designer', 'Frontend Developer']
const followUps = ['Tell me more about that decision.', 'What would you do differently?', 'Can you walk me through your thinking?']
const indicators: Array<[string, string]> = [
  ['Clarity', 'w-[70%]'],
  ['Structure', 'w-[82%]'],
  ['Relevance', 'w-[52%]'],
  ['Confidence', 'w-[66%]'],
]

const chip = 'rounded-full bg-chip px-2.5 py-1 text-[11px] text-secondary ring-1 ring-inset ring-border'

export function AIMockInterviewPage() {
  return (
    <div className="flex flex-col gap-10">
      <InterviewHero />

      <section aria-labelledby="practice-heading">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">What you’ll practice</p>
            <h2 id="practice-heading" className="mt-1.5 font-editorial text-3xl font-medium tracking-tight text-text">
              Built around the role you want.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-secondary md:text-right">Your Career Profile will help Clave create interviews that are relevant to your goals and experience.</p>
        </div>

        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <li>
            <InterviewCapabilityCard icon={Target} title="Role-Specific Interviews" description="Practice interviews tailored to the roles you’re targeting.">
              <p className="mb-2 text-[11px] font-medium text-secondary">Examples:</p>
              <ul className="flex flex-wrap gap-1.5">
                {roles.map((role) => (
                  <li key={role} className={chip}>
                    {role}
                  </li>
                ))}
              </ul>
            </InterviewCapabilityCard>
          </li>
          <li>
            <InterviewCapabilityCard icon={MessageCircleReply} title="Real Follow-Up Questions" description="Go beyond scripted questions with realistic follow-ups based on your answers.">
              <p className="mb-2 text-[11px] font-medium text-secondary">Examples:</p>
              <ul className="flex flex-col items-start gap-1.5">
                {followUps.map((question) => (
                  <li key={question} className={chip}>
                    “{question}”
                  </li>
                ))}
              </ul>
            </InterviewCapabilityCard>
          </li>
          <li>
            <InterviewCapabilityCard icon={TrendingUp} title="Actionable Feedback" description="Understand where your answers are strong and what you can improve.">
              <ul className="flex flex-col gap-2.5" aria-label="Feedback areas">
                {indicators.map(([label, width]) => (
                  <li key={label} className="flex items-center gap-3 text-xs text-secondary">
                    <span className="w-20 shrink-0">{label}</span>
                    <span aria-hidden className="h-1.5 flex-1 rounded-full bg-border">
                      <span className={`block h-full rounded-full bg-primary/70 ${width}`} />
                    </span>
                  </li>
                ))}
              </ul>
            </InterviewCapabilityCard>
          </li>
        </ul>
      </section>
    </div>
  )
}
