import { Outlet } from 'react-router-dom'
import { ClaveLogo } from '@/components/brand/ClaveLogo'
import { Button } from '@/components/ui/Button'
import { useAuthStore } from '@/store/authStore'

export function OnboardingLayout() {
  const signOut = useAuthStore((state) => state.signOut)

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="flex h-(--navbar-height) items-center justify-between border-b border-border bg-surface px-4 sm:px-8">
        <ClaveLogo variant="compact" />
        <Button variant="ghost" size="sm" onClick={signOut}>
          Log out
        </Button>
      </header>
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-10 sm:px-6 sm:py-14">
        <Outlet />
      </main>
    </div>
  )
}
