import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface Props {
  icon: LucideIcon
  title: string
  description: string
  control: ReactNode
}

/** A row inside a SettingsSection: icon, text, and the control on the right (stacks on phones). */
export function SettingRow({ icon: Icon, title, description, control }: Props) {
  return (
    <div className="flex flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:gap-4">
      <div className="flex min-w-0 flex-1 items-center gap-3.5">
        <Icon className="size-5 shrink-0 text-secondary" strokeWidth={1.5} aria-hidden />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-text">{title}</p>
          <p className="mt-0.5 text-[13px] text-secondary">{description}</p>
        </div>
      </div>
      <div className="shrink-0 sm:w-auto">{control}</div>
    </div>
  )
}
