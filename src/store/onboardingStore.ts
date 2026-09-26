import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { ProfileData, ProfileSource } from '@/types/profile'

interface OnboardingState {
  draft: ProfileData | null
  source: ProfileSource | null
  setDraft: (draft: ProfileData, source: ProfileSource) => void
  updateDraft: (draft: ProfileData) => void
  reset: () => void
}

/** The in-progress profile, kept for this tab only so a refresh doesn't lose it. */
export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      draft: null,
      source: null,
      setDraft: (draft, source) => set({ draft, source }),
      updateDraft: (draft) => set({ draft }),
      reset: () => set({ draft: null, source: null }),
    }),
    { name: 'clave.onboarding', storage: createJSONStorage(() => sessionStorage) },
  ),
)
