import { Loader2 } from 'lucide-react'
import type { ComponentPropsWithRef } from 'react'
import { cn } from '@/utils/cn'

type IconButtonVariant = 'ghost' | 'secondary'
type IconButtonSize = 'sm' | 'md' | 'lg'

const variants: Record<IconButtonVariant, string> = {
  ghost: 'text-secondary hover:bg-text/5 hover:text-text',
  secondary: 'border border-border bg-surface text-secondary shadow-xs hover:bg-background hover:text-text',
}

const sizes: Record<IconButtonSize, string> = {
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-12',
}

interface IconButtonProps extends Omit<ComponentPropsWithRef<'button'>, 'aria-label'> {
  /** Required: icon-only controls need an accessible name. */
  label: string
  variant?: IconButtonVariant
  size?: IconButtonSize
  loading?: boolean
}

export function IconButton({
  label,
  variant = 'ghost',
  size = 'md',
  loading = false,
  disabled,
  className,
  children,
  type = 'button',
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-control transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {loading ? <Loader2 className="size-4.5 animate-spin" aria-hidden /> : children}
    </button>
  )
}
