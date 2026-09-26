import { useId } from 'react'
import type { ReactNode } from 'react'

interface DashboardSectionProps {
  title: string
  action?: ReactNode
  /** Keeps the heading for screen readers only (the content already labels itself). */
  hideTitle?: boolean
  children: ReactNode
}

export function DashboardSection({ title, action, hideTitle, children }: DashboardSectionProps) {
  const headingId = useId()

  return (
    <section aria-labelledby={headingId}>
      <div className={hideTitle ? undefined : 'mb-2.5 flex items-center justify-between gap-4'}>
        <h2 id={headingId} className={hideTitle ? 'sr-only' : 'section-title text-sm font-semibold text-text'}>
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  )
}
