import { ChevronDown } from 'lucide-react'
import type { ComponentPropsWithRef } from 'react'
import { Field } from '@/components/ui/Field'
import { controlStyles } from '@/components/ui/controlStyles'

interface SelectProps extends ComponentPropsWithRef<'select'> {
  label?: string
  hint?: string
  error?: string
}

/** Native <select> for reliable keyboard, mobile and screen-reader behaviour. */
export function Select({ label, hint, error, id, className, children, ...props }: SelectProps) {
  return (
    <Field id={id} label={label} hint={hint} error={error} className={className}>
      {(control) => (
        <div className="relative">
          <select {...control} className={`${controlStyles(!!error)} h-10 appearance-none pr-10`} {...props}>
            {children}
          </select>
          <ChevronDown
            className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted"
            aria-hidden
          />
        </div>
      )}
    </Field>
  )
}
