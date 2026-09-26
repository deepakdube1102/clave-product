import { ArrowDown, ArrowUp, Check, ChevronRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useId } from 'react'
import type { ReactNode } from 'react'
import { IconButton } from '@/components/ui/IconButton'
import { cn } from '@/utils/cn'

export type SectionStatus = 'empty' | 'partial' | 'complete'

interface ResumeSectionEditorProps {
  title: string
  /** Short muted summary shown while collapsed. */
  hint?: string
  /** Completion state drives the indicator icon. */
  status?: SectionStatus
  icon?: LucideIcon
  open: boolean
  onToggle: () => void
  /** Provide both to make the section reorderable. */
  reorder?: { canMoveUp: boolean; canMoveDown: boolean; onMoveUp: () => void; onMoveDown: () => void }
  children: ReactNode
}

/** Small, visually secondary completion indicator — right-aligned in the row. */
function CompletionMark({ status, open }: { status?: SectionStatus; open: boolean }) {
  if (!status || open) return null
  if (status === 'complete') {
    return (
      <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/10" aria-label="Complete">
        <Check className="size-2.5 text-primary" strokeWidth={3} aria-hidden />
      </span>
    )
  }
  if (status === 'partial') {
    return (
      <span className="flex size-4 shrink-0 items-center justify-center" aria-label="In progress">
        <span className="size-2 rounded-full bg-warning/60" />
      </span>
    )
  }
  // empty — just a very muted dot
  return (
    <span className="flex size-4 shrink-0 items-center justify-center" aria-label="Empty">
      <span className="size-1.5 rounded-full bg-border" />
    </span>
  )
}

export function ResumeSectionEditor({
  title,
  hint,
  status,
  icon: Icon,
  open,
  onToggle,
  reorder,
  children,
}: ResumeSectionEditorProps) {
  const bodyId = useId()

  return (
    <section
      className={cn(
        'border-b border-border transition-colors',
        // Active: subtle left emerald border + very light tint
        open
          ? 'border-l-2 border-l-primary bg-primary/[0.025] pl-0'
          : 'border-l-2 border-l-transparent',
      )}
    >
      <div className="flex items-center gap-1 py-1 pr-2 pl-3">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={onToggle}
          className="flex min-h-10 flex-1 items-center gap-2.5 rounded-control text-left"
        >
          {/* Icon tile */}
          {Icon && (
            <span
              className={cn(
                'flex size-6 shrink-0 items-center justify-center rounded-md transition-colors',
                open ? 'icon-tile' : 'bg-background text-muted',
              )}
            >
              <Icon className="size-3" aria-hidden />
            </span>
          )}

          {/* Title + collapsed hint */}
          <span className="flex min-w-0 flex-1 flex-col gap-0">
            <span
              className={cn(
                'text-sm leading-tight transition-colors',
                open ? 'font-semibold text-text' : 'font-medium text-secondary',
              )}
            >
              {title}
            </span>
            {!open && hint && (
              <span className="truncate text-xs text-muted">{hint}</span>
            )}
          </span>

          {/* Completion indicator (hidden when open) */}
          <CompletionMark status={status} open={open} />

          {/* Chevron */}
          <ChevronRight
            className={cn(
              'size-3.5 shrink-0 text-muted/60 transition-transform duration-150',
              open && 'rotate-90',
            )}
            aria-hidden
          />
        </button>

        {/* Reorder controls */}
        {reorder && (
          <div className="flex items-center gap-0.5">
            <IconButton
              label={`Move ${title} section up`}
              size="sm"
              disabled={!reorder.canMoveUp}
              onClick={reorder.onMoveUp}
            >
              <ArrowUp className="size-3.5" aria-hidden />
            </IconButton>
            <IconButton
              label={`Move ${title} section down`}
              size="sm"
              disabled={!reorder.canMoveDown}
              onClick={reorder.onMoveDown}
            >
              <ArrowDown className="size-3.5" aria-hidden />
            </IconButton>
          </div>
        )}
      </div>

      {open && (
        <div id={bodyId} className="px-4 pb-6 pt-2">
          {children}
        </div>
      )}
    </section>
  )
}
