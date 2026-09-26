import { ChevronDown, TrendingUp } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import type { AtsResult } from '@/utils/ats'
import { cn } from '@/utils/cn'

const scoreColor = (score: number) =>
  score >= 80 ? { text: 'text-primary', bg: 'bg-primary', ring: 'ring-primary/20', light: 'bg-primary/8' }
  : score >= 65 ? { text: 'text-warning', bg: 'bg-warning', ring: 'ring-warning/20', light: 'bg-warning/8' }
  : { text: 'text-error', bg: 'bg-error', ring: 'ring-error/20', light: 'bg-error/8' }

export function AtsScorePopover({ result }: { result: AtsResult }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const panelId = useId()
  const colors = scoreColor(result.total)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex items-center gap-2 rounded-control border border-border px-2.5 py-1.5 text-sm transition-colors hover:bg-background',
          open ? 'bg-background' : 'bg-surface',
        )}
      >
        <TrendingUp className={cn('size-3.5 shrink-0', colors.text)} aria-hidden />
        <span className="hidden text-secondary sm:inline">ATS</span>
        <span className={cn('font-semibold tabular-nums', colors.text)}>
          {result.total}
          <span className="font-normal text-muted">/100</span>
        </span>
        <ChevronDown className={cn('size-3.5 text-muted transition-transform', open && 'rotate-180')} aria-hidden />
      </button>

      {open && (
        <div
          id={panelId}
          role="region"
          aria-label="ATS score breakdown"
          className="absolute right-0 z-30 mt-2 w-80 max-w-[calc(100vw-32px)] rounded-default border border-border bg-surface p-4 shadow-popover"
        >
          {/* Score header */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-text">ATS Score</p>
            <span className={cn('rounded-full px-3 py-1 text-sm font-bold tabular-nums', colors.light, colors.text)}>
              {result.total}/100
            </span>
          </div>

          {/* Score bar */}
          <div className="mt-3 h-1.5 rounded-full bg-border" aria-hidden>
            <div
              className={cn('h-full rounded-full transition-all duration-500', colors.bg)}
              style={{ width: `${result.total}%` }}
            />
          </div>

          {/* Factors */}
          <ul className="mt-4 flex flex-col gap-3">
            {result.factors.map((factor) => (
              <li key={factor.id}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-text">{factor.label}</span>
                  <span className="tabular-nums text-secondary">{factor.score}%</span>
                </div>
                <div className="mt-1.5 h-1 rounded-full bg-border" aria-hidden>
                  <div
                    className="h-full rounded-full bg-primary/60 transition-all duration-300"
                    style={{ width: `${factor.score}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-secondary">{factor.note}</p>
              </li>
            ))}
          </ul>

          <p className="mt-4 border-t border-border pt-3 text-xs text-muted">
            An estimate based on general best practices — not a real ATS scan.
          </p>
        </div>
      )}
    </div>
  )
}
