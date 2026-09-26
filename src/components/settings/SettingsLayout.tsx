import type { ReactNode } from 'react'
import { SettingsNav } from '@/components/settings/SettingsNav'

/** Shared by Settings and Account. The tabs live in the navbar on wider screens, so phones get them here. */
export function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <SettingsNav className="md:hidden" />
      {children}
    </div>
  )
}
