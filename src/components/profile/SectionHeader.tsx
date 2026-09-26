import { Pencil, Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'

interface SectionHeaderProps {
  title: string
  onEdit?: () => void
  onAdd?: () => void
  addLabel?: string
  /** Show only a compact pencil (for the narrow right column). */
  compact?: boolean
  hasContent: boolean
}

export function SectionHeader({ title, onEdit, onAdd, addLabel, compact, hasContent }: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className={compact ? 'text-sm font-semibold text-text' : 'text-lg font-semibold text-text'}>{title}</h2>
      <div className="-mr-2 flex items-center gap-1">
        {onAdd && hasContent && (
          <Button variant="ghost" size="sm" leadingIcon={<Plus className="size-4" />} onClick={onAdd}>
            {addLabel?.split(' ')[0]}
            <span className="max-sm:sr-only">{addLabel?.slice(addLabel.indexOf(' '))}</span>
          </Button>
        )}
        {compact ? (
          <IconButton label={`Edit ${title}`} size="sm" onClick={onEdit}>
            <Pencil className="size-4" aria-hidden />
          </IconButton>
        ) : (
          onEdit && (
            <Button variant="ghost" size="sm" aria-label={`${hasContent ? 'Edit' : 'Add'} ${title}`} onClick={onEdit}>
              {hasContent ? 'Edit' : (addLabel ?? 'Add')}
            </Button>
          )
        )}
      </div>
    </div>
  )
}
