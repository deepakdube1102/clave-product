import type { ComponentPropsWithRef } from 'react'
import { Field } from '@/components/ui/Field'
import { controlStyles } from '@/components/ui/controlStyles'

interface TextareaProps extends ComponentPropsWithRef<'textarea'> {
  label?: string
  hint?: string
  error?: string
}

export function Textarea({ label, hint, error, id, className, rows = 4, ...props }: TextareaProps) {
  return (
    <Field id={id} label={label} hint={hint} error={error} className={className}>
      {(control) => (
        <textarea {...control} rows={rows} className={`${controlStyles(!!error)} resize-y py-2.5`} {...props} />
      )}
    </Field>
  )
}
