import { Code2, FileText, Mic, MessageSquare, Briefcase } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/utils/cn'

function TopicCard({ icon: Icon, title, hint, className, delay }: { icon: LucideIcon; title: string; hint: string; className: string; delay: number }) {
  return (
    <div style={{ animationDelay: `${delay}s` }} className={cn('anim-float absolute flex items-center gap-2.5 rounded-default border border-border bg-surface px-3 py-2 shadow-card', className)}>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-control icon-tile">
        <Icon className="size-4" strokeWidth={1.75} aria-hidden />
      </span>
      <div>
        <p className="text-xs font-semibold whitespace-nowrap text-text">{title}</p>
        <p className="text-[10px] whitespace-nowrap text-muted">{hint}</p>
      </div>
    </div>
  )
}

const feedback: Array<[string, string, string]> = [
  ['Communication', 'Strong', 'w-[78%]'],
  ['Clarity', 'Good', 'w-[62%]'],
  ['Confidence', 'Improving', 'w-[44%]'],
]

const bars = [0.5, 0.8, 0.4, 1, 0.6, 0.9, 0.5]

/** Decorative only. The feedback card is an illustration of the idea, not anyone's data. */
export function InterviewVisual() {
  return (
    <div aria-hidden className="relative mx-auto h-[380px] w-full max-w-[560px] sm:h-[340px]">
      <div className="anim-glow absolute top-[42%] left-[44%] size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="absolute top-[22%] left-[20%] h-[46%] w-[46%] rounded-large border border-primary/10 bg-linear-to-br from-tint to-transparent" />

      <div className="absolute top-[42%] left-[44%] flex -translate-x-1/2 -translate-y-1/2 items-center gap-2">
        <span className="flex h-10 items-center gap-[3px]">
          {bars.map((height, index) => (
            <span key={index} style={{ height: `${height * 100}%`, animationDelay: `${index * 0.15}s` }} className="anim-wave w-[3px] rounded-full bg-primary/40" />
          ))}
        </span>
        <span className="anim-breathe flex size-16 items-center justify-center rounded-full border border-primary/15 bg-tint shadow-card">
          <Mic className="size-7 text-primary-deep" strokeWidth={1.5} />
        </span>
        <span className="flex h-10 items-center gap-[3px]">
          {[...bars].reverse().map((height, index) => (
            <span key={index} style={{ height: `${height * 100}%`, animationDelay: `${index * 0.15 + 0.4}s` }} className="anim-wave w-[3px] rounded-full bg-primary/40" />
          ))}
        </span>
      </div>

      <TopicCard icon={Briefcase} title="Product Designer" hint="Role-specific questions" className="top-[2%] left-[6%] -rotate-2" delay={0} />
      <TopicCard icon={FileText} title="Follow-up Questions" hint="Deeper insights" className="top-[4%] right-[0%] rotate-2" delay={1.6} />
      <TopicCard icon={MessageSquare} title="Behavioral" hint="Situation-based" className="top-[34%] left-[0%] -rotate-1" delay={3.2} />
      <TopicCard icon={Code2} title="Technical" hint="Skills & problem solving" className="bottom-[16%] left-[8%] rotate-1" delay={4.6} />

      <div className="absolute right-[0%] bottom-[2%] w-[190px] rounded-default border border-border bg-surface p-3 shadow-card">
        <p className="text-[10px] font-semibold text-text">
          AI Feedback <span className="font-normal text-muted">(Coming Soon)</span>
        </p>
        <ul className="mt-2 flex flex-col gap-2">
          {feedback.map(([label, level, width]) => (
            <li key={label}>
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-medium text-text">{label}</span>
                <span className="text-primary">{level}</span>
              </div>
              <span className="mt-1 block h-1 rounded-full bg-border">
                <span className={cn('block h-full rounded-full bg-brand', width)} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
