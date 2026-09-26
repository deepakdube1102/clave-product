import { cn } from '@/utils/cn'

/** Shared control chrome so Input, Select, Textarea and SearchInput look identical. */
export function controlStyles(invalid?: boolean) {
  return cn(
    'w-full rounded-control border bg-surface px-3 text-sm text-text shadow-xs transition-colors placeholder:text-muted',
    'focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-background disabled:text-muted',
    invalid
      ? 'border-error focus:border-error focus:ring-error/20'
      : 'border-border hover:border-muted focus:border-primary focus:ring-primary/20',
  )
}
