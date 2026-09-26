import type { LucideIcon } from 'lucide-react'
import { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from 'react'
import type { KeyboardEvent, ReactNode, RefObject } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'

export interface DropdownTriggerProps {
  ref: RefObject<HTMLButtonElement | null>
  onClick: () => void
  'aria-haspopup': 'menu'
  'aria-expanded': boolean
  'aria-controls': string | undefined
}

interface DropdownProps {
  /** Render the trigger; spread `triggerProps` onto a <button>. */
  trigger: (triggerProps: DropdownTriggerProps, open: boolean) => ReactNode
  label: string
  align?: 'start' | 'end'
  className?: string
  children: ReactNode
}

const DropdownContext = createContext<{ close: () => void }>({ close: () => {} })

const ITEM_SELECTOR = '[role="menuitem"]:not([disabled])'

export function Dropdown({ trigger, label, align = 'end', className, children }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    menuRef.current?.querySelector<HTMLElement>(ITEM_SELECTOR)?.focus()

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.stopPropagation()
      setOpen(false)
      triggerRef.current?.focus()
      return
    }
    if (event.key === 'Tab') {
      setOpen(false)
      return
    }

    const items = Array.from(menuRef.current?.querySelectorAll<HTMLElement>(ITEM_SELECTOR) ?? [])
    if (items.length === 0) return
    const current = items.indexOf(document.activeElement as HTMLElement)

    let next: number | null = null
    if (event.key === 'ArrowDown') next = (current + 1) % items.length
    if (event.key === 'ArrowUp') next = (current - 1 + items.length) % items.length
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = items.length - 1

    if (next !== null) {
      event.preventDefault()
      items[next].focus()
    }
  }

  return (
    <div ref={rootRef} className="relative" onKeyDown={open ? onKeyDown : undefined}>
      {trigger(
        {
          ref: triggerRef,
          onClick: () => setOpen((value) => !value),
          'aria-haspopup': 'menu',
          'aria-expanded': open,
          'aria-controls': open ? menuId : undefined,
        },
        open,
      )}
      {open && (
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          aria-label={label}
          className={cn(
            'absolute top-full z-30 mt-2 min-w-56 rounded-default border border-border bg-surface p-1.5 shadow-popover',
            align === 'end' ? 'right-0' : 'left-0',
            className,
          )}
        >
          <DropdownContext.Provider value={{ close }}>{children}</DropdownContext.Provider>
        </div>
      )}
    </div>
  )
}

interface DropdownItemProps {
  icon?: LucideIcon
  /** Internal route; renders a router link. */
  to?: string
  onSelect?: () => void
  destructive?: boolean
  disabled?: boolean
  /** Small trailing text, e.g. the current value. */
  hint?: string
  children: ReactNode
}

export function DropdownItem({ icon: Icon, to, onSelect, destructive, disabled, hint, children }: DropdownItemProps) {
  const { close } = useContext(DropdownContext)
  const className = cn(
    'flex w-full items-center gap-3 rounded-control px-3 py-2 text-left text-sm transition-colors focus:outline-none',
    destructive
      ? 'text-error hover:bg-error/5 focus:bg-error/5'
      : 'text-text hover:bg-background focus:bg-background',
    disabled && 'cursor-not-allowed opacity-50 hover:bg-transparent',
  )
  const content = (
    <>
      {Icon && <Icon className={cn('size-4 shrink-0', !destructive && 'text-secondary')} aria-hidden />}
      <span className="flex-1">{children}</span>
      {hint && <span className="text-xs text-muted">{hint}</span>}
    </>
  )

  if (to && !disabled) {
    return (
      <Link role="menuitem" tabIndex={-1} to={to} onClick={close} className={className}>
        {content}
      </Link>
    )
  }

  return (
    <button
      type="button"
      role="menuitem"
      tabIndex={-1}
      disabled={disabled}
      onClick={() => {
        onSelect?.()
        close()
      }}
      className={className}
    >
      {content}
    </button>
  )
}

export function DropdownLabel({ children }: { children: ReactNode }) {
  return <div className="px-3 py-2">{children}</div>
}

export function DropdownSeparator() {
  return <div role="separator" className="my-1.5 h-px bg-border" />
}
