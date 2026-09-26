import { Link } from 'react-router-dom'
import { buttonStyles } from '@/components/ui/buttonStyles'
import type { ButtonSize } from '@/components/ui/buttonStyles'
import { paths } from '@/routes/navigation'
import { useAuthStore } from '@/store/authStore'
import { cn } from '@/utils/cn'

interface LandingCtasProps {
  size?: ButtonSize
  /** "dark" sits on the dark hero; "brand" sits on the emerald panel; "emeraldCard" sits on the white card. */
  tone?: 'light' | 'dark' | 'brand' | 'emeraldCard'
  className?: string
}

/** Get Started / Log in; signed-in visitors get a single shortcut into the app. */
export function LandingCtas({ size = 'lg', tone = 'light', className }: LandingCtasProps) {
  const signedIn = useAuthStore((state) => state.user !== null)

  if (tone === 'emeraldCard') {
    if (signedIn) {
      return (
        <Link
          to={paths.dashboard}
          className={cn(
            'inline-flex items-center justify-center gap-2 rounded-full bg-[#056B4D] px-6 h-12 text-base font-semibold text-white shadow-xs transition-all hover:bg-[#04523B] active:scale-[0.99] cursor-pointer btn-micro-interact',
            className
          )}
        >
          Go to Dashboard
        </Link>
      )
    }

    return (
      <div className={cn('flex flex-wrap items-center justify-center gap-3', className)}>
        <Link
          to={paths.signup}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#056B4D] px-6 h-12 text-base font-semibold text-white shadow-xs transition-all hover:bg-[#04523B] active:scale-[0.99] cursor-pointer btn-micro-interact"
        >
          Get Started
        </Link>
        <Link
          to={paths.login}
          className="inline-flex items-center justify-center rounded-full border border-[#056B4D]/25 bg-white px-6 h-12 text-base font-medium text-[#056B4D] transition-all hover:bg-[#056B4D]/5 hover:border-[#056B4D]/40 active:scale-[0.99] cursor-pointer btn-micro-interact"
        >
          Log in
        </Link>
      </div>
    )
  }

  const primary = tone === 'brand' ? 'inverse' : 'primary'
  const secondary = tone === 'light' ? 'secondary' : 'outlineDark'

  if (signedIn) {
    return (
      <Link to={paths.dashboard} className={cn(buttonStyles({ variant: primary, size }), '!rounded-full', className)}>
        Go to Dashboard
      </Link>
    )
  }

  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      <Link to={paths.signup} className={cn(buttonStyles({ variant: primary, size }), '!rounded-full')}>
        Get Started
      </Link>
      <Link to={paths.login} className={cn(buttonStyles({ variant: secondary, size }), '!rounded-full')}>
        Log in
      </Link>
    </div>
  )
}
