import { Loader2 } from 'lucide-react'
import type { ComponentPropsWithRef, ReactNode } from 'react'
import { buttonStyles } from '@/components/ui/buttonStyles'
import type { ButtonStyleOptions } from '@/components/ui/buttonStyles'
import { cn } from '@/utils/cn'

interface ButtonProps extends ComponentPropsWithRef<'button'>, ButtonStyleOptions {
  loading?: boolean
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
}

export function Button({
  variant,
  size,
  fullWidth,
  loading = false,
  leadingIcon,
  trailingIcon,
  disabled,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(buttonStyles({ variant, size, fullWidth }), className)}
      {...props}
    >
      {loading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : leadingIcon}
      {children}
      {!loading && trailingIcon}
    </button>
  )
}
