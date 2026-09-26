import { useEffect, useRef, useState, type ReactNode } from 'react'
import { isReducedMotion } from '@/utils/transitionNavigation'
import { cn } from '@/utils/cn'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delayMs?: number
}

/**
 * Subtly animates below-the-fold cards/sections as they scroll into view:
 * opacity: 0 -> 1
 * translateY: 16px -> 0
 * duration: 550ms - 600ms (cubic-bezier(0.22, 1, 0.36, 1))
 * Respects prefers-reduced-motion immediately.
 */
export function ScrollReveal({ children, className, delayMs = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(() => isReducedMotion())

  useEffect(() => {
    if (isVisible) return

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(node)
        }
      },
      {
        threshold: 0.06,
        rootMargin: '0px 0px -30px 0px',
      }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [isVisible])

  return (
    <div
      ref={ref}
      style={delayMs && isVisible ? { transitionDelay: `${delayMs}ms` } : undefined}
      className={cn(
        'transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className
      )}
    >
      {children}
    </div>
  )
}
