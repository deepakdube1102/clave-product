import { Quote } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface CapabilityCardProps {
  icon: LucideIcon
  title: string
  description: string
  /** Examples of what you will be able to ask. Illustrative only. */
  prompts: string[]
}

export function CapabilityCard({ icon: Icon, title, description, prompts }: CapabilityCardProps) {
  return (
    <article className="flex h-full flex-col rounded-default border border-border bg-surface p-4 shadow-xs">
      <div className="flex items-start gap-3.5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-control icon-tile">
          <Icon className="size-5" strokeWidth={1.75} aria-hidden />
        </span>
        <div>
          <h3 className="text-sm font-semibold text-text">{title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-secondary">{description}</p>
        </div>
      </div>
      <div className="mt-3.5 flex gap-3 border-t border-border pt-3.5">
        <Quote className="mt-0.5 size-4 shrink-0 text-primary/40" aria-hidden />
        <ul className="flex flex-col gap-1.5 text-[11px] text-secondary" aria-label="Example prompts">
          {prompts.map((prompt) => (
            <li key={prompt}>“{prompt}”</li>
          ))}
        </ul>
      </div>
    </article>
  )
}
