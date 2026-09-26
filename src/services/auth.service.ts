import { mockCurrentUser } from '@/mocks/user.mock'
import type { AuthSession, LoginInput, SignupInput } from '@/types/auth'

/**
 * Mock auth backed by localStorage so accounts survive reloads. Passwords are
 * NOT stored or verified. Replace each function with an `apiClient` call to the
 * FastAPI auth endpoints; the signatures can stay the same.
 *
 * demo@clave.app is a pre-seeded account with onboarding already complete.
 */
const ACCOUNTS_KEY = 'clave.mock.accounts'
const DEMO_EMAIL = 'demo@clave.app'
const GOOGLE_EMAIL = 'google.user@example.com'

type Accounts = Record<string, AuthSession>

const wait = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms))
const normalize = (email: string) => email.trim().toLowerCase()

function readAccounts(): Accounts {
  let stored: Accounts = {}
  try {
    stored = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) ?? '{}') as Accounts
  } catch {
    stored = {}
  }
  return {
    [DEMO_EMAIL]: { user: { ...mockCurrentUser, email: DEMO_EMAIL }, onboardingComplete: true },
    ...stored,
  }
}

function writeAccount(session: AuthSession) {
  const accounts = readAccounts()
  accounts[session.user.email] = session
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
}

export async function login({ email }: LoginInput): Promise<AuthSession> {
  await wait()
  const account = readAccounts()[normalize(email)]
  if (!account) throw new Error('Incorrect email or password.')
  return account
}

export async function signup({ name, email }: SignupInput): Promise<AuthSession> {
  await wait()
  const key = normalize(email)
  if (readAccounts()[key]) throw new Error('An account with this email already exists. Try logging in instead.')
  const session: AuthSession = {
    user: { id: `usr_${crypto.randomUUID()}`, name: name.trim(), email: key },
    onboardingComplete: false,
  }
  writeAccount(session)
  return session
}

export async function continueWithGoogle(): Promise<AuthSession> {
  await wait()
  const existing = readAccounts()[GOOGLE_EMAIL]
  if (existing) return existing
  const session: AuthSession = {
    user: { id: 'usr_google', name: 'Google User', email: GOOGLE_EMAIL },
    onboardingComplete: false,
  }
  writeAccount(session)
  return session
}

export async function requestPasswordReset(email: string): Promise<void> {
  void email
  await wait()
}

export async function markOnboardingComplete(email: string): Promise<void> {
  const account = readAccounts()[email]
  if (account) writeAccount({ ...account, onboardingComplete: true })
}

/** Removes a mock account. The pre-seeded demo account comes back on the next read, like a fresh demo. */
export async function deleteAccount(email: string): Promise<void> {
  await wait()
  const stored = readAccounts()
  delete stored[email]
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(stored))
}
