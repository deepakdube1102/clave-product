import { buildDemoProfile } from '@/mocks/profile.mock'
import { mockCurrentUser } from '@/mocks/user.mock'
import { emptyProfile } from '@/utils/profile'
import { useAuthStore } from '@/store/authStore'
import type { ProfileData } from '@/types/profile'

/**
 * Mock career-profile persistence in localStorage, keyed by user. The real API
 * identifies the user from the auth token, so callers never pass an id.
 */
const PROFILES_KEY = 'clave.mock.profiles'

type Profiles = Record<string, ProfileData>

const currentUserId = () => useAuthStore.getState().user?.id ?? ''

function readProfiles(): Profiles {
  try {
    return JSON.parse(localStorage.getItem(PROFILES_KEY) ?? '{}') as Profiles
  } catch {
    return {}
  }
}

/** Fills fields added after a profile was saved so older records still render. */
const normalize = (data: ProfileData): ProfileData => ({ ...emptyProfile(), ...data })

export async function getProfile(): Promise<ProfileData | null> {
  const id = currentUserId()
  const stored = readProfiles()[id] ?? (id === mockCurrentUser.id ? buildDemoProfile() : null)
  return stored ? normalize(stored) : null
}

export async function saveProfile(data: ProfileData): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 900))
  localStorage.setItem(PROFILES_KEY, JSON.stringify({ ...readProfiles(), [currentUserId()]: data }))
}
