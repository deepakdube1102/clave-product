import { useCallback, useState } from 'react'
import { readSettings, writeSettings } from '@/services/settings.service'
import type { UserSettings } from '@/types/settings'

export function useSettings() {
  const [settings, setSettings] = useState<UserSettings>(() => readSettings())

  const update = useCallback((patch: Partial<UserSettings> | ((current: UserSettings) => UserSettings)) => {
    setSettings((current) => {
      const next = typeof patch === 'function' ? patch(current) : { ...current, ...patch }
      writeSettings(next)
      return next
    })
  }, [])

  return { settings, update }
}
