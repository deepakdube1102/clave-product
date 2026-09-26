import type { ReactNode } from 'react'

interface Props {
  id: string
  title: string
  description: string
  children: ReactNode
}

export function SettingsSection({ id, title, description, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-[calc(var(--navbar-height)+1rem)] rounded-large border border-border bg-surface p-5 shadow-xs sm:p-6">
      <h2 id={`${id}-title`} className="font-editorial text-2xl font-medium tracking-tight text-text">
        {title}
      </h2>
      <p className="mt-0.5 text-sm text-secondary">{description}</p>
      <div className="mt-4 divide-y divide-border rounded-default border border-border">{children}</div>
    </section>
  )
}
