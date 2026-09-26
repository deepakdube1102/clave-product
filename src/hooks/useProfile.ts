import { useCallback, useEffect, useState } from 'react'
import { getProfile, saveProfile } from '@/services/profile.service'
import type { ProfileData } from '@/types/profile'
import { cleanProfile } from '@/utils/profile'

type State = { status: 'loading' } | { status: 'error' } | { status: 'ready'; profile: ProfileData | null }

export function useProfile() {
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    let active = true
    getProfile().then(
      (profile) => active && setState({ status: 'ready', profile }),
      () => active && setState({ status: 'error' }),
    )
    return () => {
      active = false
    }
  }, [])

  /** Persists the change, then updates what's on screen. Throws so callers can show an error. */
  const save = useCallback(async (next: ProfileData) => {
    const cleaned = cleanProfile(next)
    await saveProfile(cleaned)
    setState({ status: 'ready', profile: cleaned })
  }, [])

  return { state, save }
}
