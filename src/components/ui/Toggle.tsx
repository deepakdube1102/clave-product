import { useId } from 'react'
import { cn } from '@/utils/cn'

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  /** Hide the visible label; it stays as the accessible name. */
  hideLabel?: boolean
  disabled?: boolean
  className?: string
}

export function Toggle({ checked, onChange, label, hideLabel, disabled, className }: ToggleProps) {
  const labelId = useId()

  return (
    <div className={cn('inline-flex items-center gap-3', className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={labelId}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative h-6 w-10 shrink-0 rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50',
          checked ? 'bg-primary' : 'bg-border',
        )}
      >
        <span
          aria-hidden
          className={cn(
            'absolute top-0.5 left-0.5 size-5 rounded-full bg-surface shadow-sm transition-transform',
            checked && 'translate-x-4',
          )}
        />
      </button>
      <span id={labelId} className={cn('text-sm font-medium text-text', hideLabel && 'sr-only')}>
        {label}
      </span>
    </div>
  )
}
