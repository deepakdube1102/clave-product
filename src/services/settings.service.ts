import { useAuthStore } from '@/store/authStore'
import type { UserSettings } from '@/types/settings'

/** Mock settings in localStorage, per user. The real API would be GET/PATCH /me/settings. */
const key = (userId: string) => `clave.mock.settings.${userId}`

export const defaultSettings: UserSettings = {
  dateFormat: 'dmy',
  emailPreference: 'important',
  notifications: { jobs: true, resumes: true, applications: true, product: true },
  privacy: { personalizeAi: true, usageData: false },
  defaultTemplate: 'classic',
}

export function readSettings(userId = useAuthStore.getState().user?.id ?? ''): UserSettings {
  try {
    const stored = localStorage.getItem(key(userId))
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<UserSettings>
      return {
        ...defaultSettings,
        ...parsed,
        notifications: { ...defaultSettings.notifications, ...parsed.notifications },
        privacy: { ...defaultSettings.privacy, ...parsed.privacy },
      }
    }
  } catch {
    /* fall back to defaults */
  }
  return defaultSettings
}

export function writeSettings(settings: UserSettings, userId = useAuthStore.getState().user?.id ?? ''): void {
  try {
    localStorage.setItem(key(userId), JSON.stringify(settings))
  } catch {
    /* storage unavailable: the change lasts for this visit */
  }
}
