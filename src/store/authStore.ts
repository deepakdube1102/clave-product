import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { StateStorage } from 'zustand/middleware'
import { useOnboardingStore } from '@/store/onboardingStore'
import * as authService from '@/services/auth.service'
import type { AuthSession, LoginInput, SignupInput } from '@/types/auth'
import type { User } from '@/types/user'

interface AuthState {
  user: User | null
  onboardingComplete: boolean
  /** Persist the session across browser restarts (localStorage) or only this tab (sessionStorage). */
  remember: boolean
  signIn: (input: LoginInput & { remember: boolean }) => Promise<void>
  signUp: (input: SignupInput) => Promise<void>
  signInWithGoogle: () => Promise<void>
  completeOnboarding: () => Promise<void>
  signOut: () => void
  /** Mock account edits (name, email, photo). The real API would PATCH /me. */
  updateUser: (patch: Partial<Pick<User, 'name' | 'email' | 'avatarUrl'>>) => void
  deleteAccount: () => Promise<void>
}

const rememberAwareStorage: StateStorage = {
  getItem: (name) => localStorage.getItem(name) ?? sessionStorage.getItem(name),
  setItem: (name, value) => {
    const remember = (JSON.parse(value) as { state?: { remember?: boolean } }).state?.remember
    const [target, other] = remember ? [localStorage, sessionStorage] : [sessionStorage, localStorage]
    target.setItem(name, value)
    other.removeItem(name)
  },
  removeItem: (name) => {
    localStorage.removeItem(name)
    sessionStorage.removeItem(name)
  },
}

const fromSession = (session: AuthSession, remember: boolean) => ({
  user: session.user,
  onboardingComplete: session.onboardingComplete,
  remember,
})

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      onboardingComplete: false,
      remember: true,
      signIn: async ({ remember, ...credentials }) => {
        set(fromSession(await authService.login(credentials), remember))
      },
      signUp: async (input) => {
        set(fromSession(await authService.signup(input), true))
      },
      signInWithGoogle: async () => {
        set(fromSession(await authService.continueWithGoogle(), true))
      },
      completeOnboarding: async () => {
        const { user } = get()
        if (!user) return
        await authService.markOnboardingComplete(user.email)
        set({ onboardingComplete: true })
      },
      signOut: () => {
        useOnboardingStore.getState().reset()
        set({ user: null, onboardingComplete: false })
      },
      updateUser: (patch) => set((state) => (state.user ? { user: { ...state.user, ...patch } } : state)),
      deleteAccount: async () => {
        const { user } = get()
        if (user) await authService.deleteAccount(user.email)
        useOnboardingStore.getState().reset()
        set({ user: null, onboardingComplete: false })
      },
    }),
    {
      name: 'clave.auth',
      storage: createJSONStorage(() => rememberAwareStorage),
      partialize: ({ user, onboardingComplete, remember }) => ({ user, onboardingComplete, remember }),
    },
  ),
)
