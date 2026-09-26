import type { NavigateFunction } from 'react-router-dom'

/**
 * Checks if the user prefers reduced motion.
 */
export function isReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Navigates to a target route using the native View Transitions API where supported,
 * falling back smoothly to standard navigation.
 * Prevents full page transitions when clicking the current page URL.
 */
export function navigateWithTransition(navigate: NavigateFunction, to: string) {
  if (typeof window !== 'undefined' && window.location.pathname === to) {
    window.scrollTo({ top: 0, behavior: isReducedMotion() ? 'auto' : 'smooth' })
    return
  }

  // Use native View Transitions API if supported and user doesn't prefer reduced motion
  if (typeof document !== 'undefined' && 'startViewTransition' in document && !isReducedMotion()) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(document as any).startViewTransition(() => {
      navigate(to)
    })
  } else {
    navigate(to)
  }
}
