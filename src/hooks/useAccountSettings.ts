import { useCallback, useState } from 'react'
import { useAuthStore } from '@/store/authStore'

export interface Session {
  id: string
  device: string
  place: string
  lastActive: string
  current: boolean
}

interface AccountSettings {
  emailVerified: boolean
  passwordChangedAt: string
  googleConnected: boolean
  sessions: Session[]
}

/** Mock security state, kept per user in localStorage. The real API would own all of this. */
const key = (userId: string) => `clave.mock.accountSettings.${userId}`
const daysAgo = (days: number) => new Date(Date.now() - days * 86_400_000).toISOString()

const seed = (): AccountSettings => ({
  emailVerified: true,
  passwordChangedAt: daysAgo(62),
  googleConnected: true,
  sessions: [
    { id: 'current', device: 'This browser', place: 'Mumbai, India', lastActive: 'Active now', current: true },
    { id: 'phone', device: 'Safari on iPhone', place: 'Mumbai, India', lastActive: '2 days ago', current: false },
    { id: 'laptop', device: 'Edge on Windows', place: 'Pune, India', lastActive: '1 week ago', current: false },
  ],
})

function read(userId: string): AccountSettings {
  try {
    const stored = localStorage.getItem(key(userId))
    if (stored) return JSON.parse(stored) as AccountSettings
  } catch {
    /* fall through to the seed */
  }
  return seed()
}

export function useAccountSettings() {
  const userId = useAuthStore((state) => state.user?.id ?? '')
  const [settings, setSettings] = useState(() => read(userId))

  const update = useCallback(
    (patch: Partial<AccountSettings>) => {
      setSettings((current) => {
        const next = { ...current, ...patch }
        try {
          localStorage.setItem(key(userId), JSON.stringify(next))
        } catch {
          /* storage unavailable: the change lasts for this visit */
        }
        return next
      })
    },
    [userId],
  )

  return { settings, update }
}
