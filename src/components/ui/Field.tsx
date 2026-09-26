import { useId } from 'react'
import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

export interface FieldControlProps {
  id: string
  'aria-describedby': string | undefined
  'aria-invalid': true | undefined
}

interface FieldProps {
  id?: string
  label?: string
  /** Hide the label visually but keep it for assistive tech. */
  hideLabel?: boolean
  hint?: string
  error?: string
  className?: string
  children: (control: FieldControlProps) => ReactNode
}

export function Field({ id, label, hideLabel, hint, error, className, children }: FieldProps) {
  const generatedId = useId()
  const controlId = id ?? generatedId
  const hintId = `${controlId}-hint`
  const errorId = `${controlId}-error`
  const describedBy = error ? errorId : hint ? hintId : undefined

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={controlId} className={cn('text-sm font-medium text-text', hideLabel && 'sr-only')}>
          {label}
        </label>
      )}
      {children({
        id: controlId,
        'aria-describedby': describedBy,
        'aria-invalid': error ? true : undefined,
      })}
      {error ? (
        <p id={errorId} className="text-sm text-error">
          {error}
        </p>
      ) : (
        hint && (
          <p id={hintId} className="text-sm text-secondary">
            {hint}
          </p>
        )
      )}
    </div>
  )
}
