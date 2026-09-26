import { useAuthStore } from '@/store/authStore'

export function useCurrentUser() {
  const user = useAuthStore((state) => state.user)
  return { user, isLoading: false }
}
