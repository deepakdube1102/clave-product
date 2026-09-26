import type { ComponentPropsWithRef, ReactNode } from 'react'
import { Field } from '@/components/ui/Field'
import { controlStyles } from '@/components/ui/controlStyles'
import { cn } from '@/utils/cn'

interface InputProps extends ComponentPropsWithRef<'input'> {
  label?: string
  hint?: string
  error?: string
  leadingIcon?: ReactNode
  /** Taller field for primary page-level inputs. */
  large?: boolean
}

export function Input({ label, hint, error, leadingIcon, large, id, className, ...props }: InputProps) {
  return (
    <Field id={id} label={label} hint={hint} error={error} className={className}>
      {(control) => (
        <div className="relative">
          {leadingIcon && (
            <span className={cn('pointer-events-none absolute inset-y-0 flex items-center text-muted', large ? 'left-4' : 'left-3')}>
              {leadingIcon}
            </span>
          )}
          <input {...control} className={cn(controlStyles(!!error), large ? 'h-12 text-base' : 'h-10', !!leadingIcon && (large ? 'pl-11' : 'pl-10'))} {...props} />
        </div>
      )}
    </Field>
  )
}
