import { Monitor, Moon, Sun } from 'lucide-react'
import { cn } from '@/utils/cn'

const options = [
  { id: 'light', label: 'Light', icon: Sun, available: true },
  { id: 'dark', label: 'Dark', icon: Moon, available: false },
  { id: 'system', label: 'System', icon: Monitor, available: false },
]

/** Clave is light-only for now: Dark and System are shown but not selectable yet. */
export function AppearanceControl() {
  return (
    <div role="radiogroup" aria-label="Appearance" className="inline-flex overflow-hidden rounded-control border border-border">
      {options.map(({ id, label, icon: Icon, available }) => (
        <button
          key={id}
          type="button"
          role="radio"
          aria-checked={id === 'light'}
          disabled={!available}
          title={available ? undefined : 'Coming soon'}
          className={cn(
            'flex h-9 items-center gap-2 px-3.5 text-[13px] font-medium disabled:cursor-not-allowed',
            id === 'light' ? 'bg-tint text-primary-deep ring-1 ring-primary/25 ring-inset' : 'text-secondary opacity-60',
          )}
        >
          <Icon className="size-4" aria-hidden />
          {label}
        </button>
      ))}
    </div>
  )
}
