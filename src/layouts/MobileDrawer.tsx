import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { IconButton } from '@/components/ui/IconButton'
import { SidebarContent } from '@/layouts/SidebarContent'
import { cn } from '@/utils/cn'

interface MobileDrawerProps {
  open: boolean
  onClose: () => void
}

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  return (
    <div className="md:hidden">
      <div
        aria-hidden
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-40 bg-dark/50 transition-opacity duration-200',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />
      <aside
        id="mobile-navigation"
        aria-label="Navigation"
        inert={!open}
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] transition-transform duration-200',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <SidebarContent onNavigate={onClose} />
        <IconButton
          ref={closeRef}
          label="Close navigation"
          size="sm"
          onClick={onClose}
          className="surface-dark absolute top-5 right-4 text-muted hover:bg-white/10 hover:text-white"
        >
          <X className="size-5" aria-hidden />
        </IconButton>
      </aside>
    </div>
  )
}
