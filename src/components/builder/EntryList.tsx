import { ArrowDown, ArrowUp, ChevronRight, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { cn } from '@/utils/cn'
import { newId } from '@/utils/profile'

interface EntryListProps<T extends { id: string }> {
  items: T[]
  onChange: (items: T[]) => void
  createItem: (id: string) => T
  addLabel: string
  itemLabel: string
  getTitle: (item: T) => string
  getSubtitle?: (item: T) => string
  renderFields: (item: T, update: (patch: Partial<T>) => void) => ReactNode
}

/** Compact, reorderable list of entries. Each collapses to a one-line summary. */
export function EntryList<T extends { id: string }>({
  items,
  onChange,
  createItem,
  addLabel,
  itemLabel,
  getTitle,
  getSubtitle,
  renderFields,
}: EntryListProps<T>) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set())

  const toggle = (id: string) =>
    setOpenIds((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const move = (index: number, delta: -1 | 1) => {
    const next = [...items]
    ;[next[index], next[index + delta]] = [next[index + delta], next[index]]
    onChange(next)
  }

  const add = () => {
    const item = createItem(newId())
    onChange([...items, item])
    setOpenIds((current) => new Set(current).add(item.id))
  }

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, index) => {
        const open = openIds.has(item.id)
        const title = getTitle(item).trim() || `New ${itemLabel.toLowerCase()}`
        const subtitle = getSubtitle?.(item).trim()

        return (
          <div key={item.id} className="rounded-default border border-border bg-background/50">
            <div className="flex items-center gap-1 py-1.5 pr-2 pl-3">
              <button
                type="button"
                aria-expanded={open}
                aria-label={`${open ? 'Collapse' : 'Edit'} ${title}`}
                onClick={() => toggle(item.id)}
                className="flex min-h-8 min-w-0 flex-1 items-center gap-2 rounded-control text-left"
              >
                <ChevronRight className={cn('size-3.5 shrink-0 text-muted transition-transform', open && 'rotate-90')} aria-hidden />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-text">{title}</span>
                  {subtitle && <span className="block truncate text-xs text-secondary">{subtitle}</span>}
                </span>
              </button>
              <span className="hidden lg:block">
                <Button variant="ghost" size="sm" onClick={() => toggle(item.id)}>
                  {open ? 'Done' : 'Edit'}
                </Button>
              </span>
              <IconButton label={`Move ${title} up`} size="sm" disabled={index === 0} onClick={() => move(index, -1)}>
                <ArrowUp className="size-4" aria-hidden />
              </IconButton>
              <IconButton label={`Move ${title} down`} size="sm" disabled={index === items.length - 1} onClick={() => move(index, 1)}>
                <ArrowDown className="size-4" aria-hidden />
              </IconButton>
              <IconButton label={`Delete ${title}`} size="sm" onClick={() => onChange(items.filter((other) => other.id !== item.id))}>
                <Trash2 className="size-4" aria-hidden />
              </IconButton>
            </div>
            {open && (
              <div className="grid gap-4 border-t border-border p-3 sm:grid-cols-2">
                {renderFields(item, (patch) => onChange(items.map((other) => (other.id === item.id ? { ...other, ...patch } : other))))}
              </div>
            )}
          </div>
        )
      })}
      <div>
        <Button variant="secondary" size="sm" leadingIcon={<Plus className="size-4" />} onClick={add}>
          {addLabel}
        </Button>
      </div>
    </div>
  )
}
