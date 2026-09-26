import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { isReducedMotion } from '@/utils/transitionNavigation'

interface PageTransitionProps {
  children: ReactNode
}

/**
 * Wraps page content with a subtle, editorial page transition on route change.
 * Incoming: opacity 0 -> 1, translateY 8px -> 0 over 400ms (cubic-bezier(0.22, 1, 0.36, 1))
 * Outgoing: handled via View Transitions API or seamless layout cross-fade.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const { pathname } = useLocation()

  return (
    <div
      key={pathname}
      className={isReducedMotion() ? 'flex-1 flex flex-col' : 'clave-page-transition flex-1 flex flex-col'}
    >
      {children}
    </div>
  )
}
