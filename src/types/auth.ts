import type { User } from '@/types/user'

export interface AuthSession {
  user: User
  onboardingComplete: boolean
}

export interface LoginInput {
  email: string
  password: string
}

export interface SignupInput extends LoginInput {
  name: string
}
