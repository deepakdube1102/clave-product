import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface AccountSectionProps {
  title: string
  description: string
  action?: ReactNode
  tone?: 'default' | 'danger'
  /** Decorative artwork placed beside the heading on wider screens. */
  illustration?: ReactNode
  children: ReactNode
}

/** A titled surface. Rows inside are separated by hairlines rather than nested cards. */
export function AccountSection({ title, description, action, tone = 'default', illustration, children }: AccountSectionProps) {
  return (
    <section className={cn('rounded-large border bg-surface p-5 shadow-xs sm:p-6', tone === 'danger' ? 'border-error/25' : 'border-border')}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className={cn('text-lg font-semibold tracking-tight', tone === 'danger' ? 'text-error' : 'text-text')}>{title}</h2>
          <p className="mt-0.5 text-sm text-secondary">{description}</p>
        </div>
        {action && <div className="flex shrink-0 flex-wrap gap-2">{action}</div>}
        {illustration && <div className="pointer-events-none -my-2 hidden shrink-0 sm:block">{illustration}</div>}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  )
}
