import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface SettingsRowProps {
  icon: LucideIcon
  title: string
  description: string
  /** Status or value shown before the action. */
  status?: ReactNode
  action: ReactNode
}

/** One horizontal settings row; stacks on narrow screens. */
export function SettingsRow({ icon: Icon, title, description, status, action }: SettingsRowProps) {
  return (
    <div className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:gap-4">
      <div className="flex min-w-0 flex-1 items-center gap-3.5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-control icon-tile">
          <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-text">{title}</p>
          <p className="mt-0.5 text-[13px] text-secondary">{description}</p>
        </div>
      </div>
      {status && <div className="text-sm text-secondary sm:text-right">{status}</div>}
      <div className="shrink-0">{action}</div>
    </div>
  )
}
