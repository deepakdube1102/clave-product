import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface Props {
  icon: LucideIcon
  title: string
  description: string
  /** The small illustration under the description: example chips, prompts or indicators. */
  children: ReactNode
}

export function InterviewCapabilityCard({ icon: Icon, title, description, children }: Props) {
  return (
    <article className="flex h-full flex-col rounded-default border border-border bg-surface p-4 shadow-xs">
      <div className="flex items-start gap-3.5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-control icon-tile">
          <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden />
        </span>
        <div>
          <h3 className="text-sm font-semibold text-text">{title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-secondary">{description}</p>
        </div>
      </div>
      <div className="mt-3.5 border-t border-border pt-3.5">{children}</div>
    </article>
  )
}
