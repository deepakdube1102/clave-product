import { Plus, Trash2 } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { newId } from '@/utils/profile'

interface ListEditorProps<T extends { id: string }> {
  items: T[]
  onChange: (items: T[]) => void
  createItem: (id: string) => T
  itemLabel: string
  renderFields: (item: T, update: (patch: Partial<T>) => void) => ReactNode
}

/** Repeatable group of fields (experience, education, ...) with add and remove. */
export function ListEditor<T extends { id: string }>({
  items,
  onChange,
  createItem,
  itemLabel,
  renderFields,
}: ListEditorProps<T>) {
  const update = (id: string, patch: Partial<T>) =>
    onChange(items.map((item) => (item.id === id ? { ...item, ...patch } : item)))

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => (
        <fieldset key={item.id} className="rounded-default border border-border p-4">
          <legend className="sr-only">
            {itemLabel} {index + 1}
          </legend>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-medium tracking-wide text-muted uppercase">
              {itemLabel} {index + 1}
            </span>
            <IconButton
              label={`Remove ${itemLabel.toLowerCase()} ${index + 1}`}
              size="sm"
              onClick={() => onChange(items.filter((other) => other.id !== item.id))}
            >
              <Trash2 className="size-4" aria-hidden />
            </IconButton>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">{renderFields(item, (patch) => update(item.id, patch))}</div>
        </fieldset>
      ))}
      <div>
        <Button
          variant="secondary"
          size="sm"
          leadingIcon={<Plus className="size-4" />}
          onClick={() => onChange([...items, createItem(newId())])}
        >
          Add {itemLabel.toLowerCase()}
        </Button>
      </div>
    </div>
  )
}
