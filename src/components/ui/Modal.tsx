import { X } from 'lucide-react'
import { useEffect, useId, useRef } from 'react'
import type { ReactNode } from 'react'
import { IconButton } from '@/components/ui/IconButton'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  footer?: ReactNode
  size?: 'md' | 'lg' | 'xl'
  children?: ReactNode
}

/** Built on the native <dialog>: focus trap, Escape and inert background come from the browser. */
export function Modal({ open, onClose, title, description, footer, size = 'md', children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      className={`m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] overflow-y-auto ${size === 'xl' ? 'max-w-5xl' : size === 'lg' ? 'max-w-2xl' : 'max-w-lg'} rounded-large border border-border bg-surface p-0 text-text shadow-popover backdrop:bg-dark/50`}
    >
      <div className="flex items-start justify-between gap-4 p-6 pb-0">
        <div>
          <h2 id={titleId} className="font-editorial text-2xl font-medium">
            {title}
          </h2>
          {description && (
            <p id={descriptionId} className="mt-1 text-sm text-secondary">
              {description}
            </p>
          )}
        </div>
        <IconButton label="Close dialog" size="sm" onClick={onClose} className="-mt-1 -mr-2">
          <X className="size-4.5" aria-hidden />
        </IconButton>
      </div>
      {children && <div className="p-6 text-sm">{children}</div>}
      {footer && <div className="flex justify-end gap-3 border-t border-border px-6 py-4">{footer}</div>}
    </dialog>
  )
}
