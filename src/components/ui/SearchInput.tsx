import { Search } from 'lucide-react'
import type { ComponentPropsWithRef } from 'react'
import { Field } from '@/components/ui/Field'
import { controlStyles } from '@/components/ui/controlStyles'

interface SearchInputProps extends Omit<ComponentPropsWithRef<'input'>, 'type'> {
  /** Accessible name; visually hidden. */
  label?: string
  /** Taller field for primary page-level search. */
  large?: boolean
}

export function SearchInput({ label = 'Search', id, className, placeholder = 'Search', large, ...props }: SearchInputProps) {
  return (
    <Field id={id} label={label} hideLabel className={className}>
      {(control) => (
        <div className="relative">
          <Search
            className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted ${large ? 'left-4 size-5' : 'left-3 size-4'}`}
            aria-hidden
          />
          <input
            {...control}
            type="search"
            placeholder={placeholder}
            className={`${controlStyles()} ${large ? 'h-12 pl-11 text-base' : 'h-10 pl-10'}`}
            {...props}
          />
        </div>
      )}
    </Field>
  )
}
