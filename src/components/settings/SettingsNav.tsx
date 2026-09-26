import { Bell, CircleHelp, Settings, ShieldCheck, SlidersHorizontal, UserRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { paths } from '@/routes/navigation'
import { cn } from '@/utils/cn'

interface Item {
  id: string
  label: string
  icon: LucideIcon
  to: string
}

/** Account has its own page; the rest are sections of /settings. */
const settingsNavItems: Item[] = [
  { id: 'account', label: 'Account', icon: UserRound, to: paths.account },
  { id: 'general', label: 'General', icon: Settings, to: `${paths.settings}#general` },
  { id: 'notifications', label: 'Notifications', icon: Bell, to: `${paths.settings}#notifications` },
  { id: 'privacy', label: 'Privacy & AI', icon: ShieldCheck, to: `${paths.settings}#privacy` },
  { id: 'preferences', label: 'Preferences', icon: SlidersHorizontal, to: `${paths.settings}#preferences` },
  { id: 'help', label: 'Help & Support', icon: CircleHelp, to: `${paths.settings}#help` },
]

/** Settings sections as tabs: shown in the navbar on wider screens and above the page on phones. */
export function SettingsNav({ className }: { className?: string }) {
  const { pathname, hash } = useLocation()
  const activeId = pathname === paths.account ? 'account' : hash.slice(1) || 'general'

  return (
    <nav aria-label="Settings" className={cn('min-w-0', className)}>
      <ul className="flex gap-0.5 overflow-x-auto rounded-default border border-border bg-surface p-0.5">
        {settingsNavItems.map(({ id, label, icon: Icon, to }) => {
          const active = id === activeId
          return (
            <li key={id} className="shrink-0">
              <Link
                to={to}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-control px-2.5 py-1 text-xs font-semibold whitespace-nowrap transition-colors',
                  active ? 'bg-primary/10 text-primary-deep ring-1 ring-primary/20 ring-inset' : 'text-secondary hover:text-text',
                )}
              >
                <Icon className={cn('size-3.5 shrink-0', active ? 'text-primary' : 'text-muted')} strokeWidth={1.75} aria-hidden />
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
