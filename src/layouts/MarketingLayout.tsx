import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { LandingHeader } from '@/components/landing/LandingHeader'
import { PageTransition } from '@/components/transitions/PageTransition'

/**
 * Shared layout for all public Clave marketing pages:
 * - Home (/)
 * - How It Works (/how-it-works)
 * - About (/about)
 * - Contact (/contact)
 * - Pricing (/pricing)
 *
 * Guarantees:
 * 1. Persistent navbar: logo stays stable, pill menu doesn't unmount or jump, active state smoothly transitions.
 * 2. Permanent #030706 dark background: eliminates any possibility of a white flash or blank screen between routes.
 * 3. Smooth page transitions: subtle, calm replacement of route content.
 */
export function MarketingLayout() {
  const { pathname } = useLocation()

  // Reset scroll to top upon navigating to a new marketing route (unless anchor hash present)
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return (
    <div className="min-h-screen bg-[#030706] text-[#F5F7F6] relative flex flex-col selection:bg-[#10B981]/20 selection:text-[#10B981]">
      {/* Persistent marketing navbar */}
      <LandingHeader />

      {/* Transitioning marketing page content */}
      <main className="flex-1 flex flex-col">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
    </div>
  )
}
