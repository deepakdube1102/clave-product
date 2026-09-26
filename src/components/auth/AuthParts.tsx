import type { ReactNode } from 'react'
import { Button } from '@/components/ui/Button'

export function AuthHeading({ title, description }: { title: string; description: ReactNode }) {
  return (
    <div className="mb-8">
      <h1 className="font-editorial text-4xl font-medium tracking-tight text-text">{title}</h1>
      <p className="mt-2 text-sm text-secondary">{description}</p>
    </div>
  )
}

export function AuthDivider() {
  return (
    <div className="my-6 flex items-center gap-4" role="separator">
      <span className="h-px flex-1 bg-border" />
      <span className="text-xs text-muted">or</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  )
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p role="alert" className="rounded-control border border-error/20 bg-error/5 px-3 py-2 text-sm text-error">
      {message}
    </p>
  )
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4.5" aria-hidden>
      <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.57-5.17 3.57-8.81Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3c-1.07.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.94H1.28v3.09A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.29 14.3a7.2 7.2 0 0 1 0-4.6V6.61H1.28a12 12 0 0 0 0 10.78l4.01-3.09Z" />
      <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.95 1.19 15.23 0 12 0A12 12 0 0 0 1.28 6.61l4.01 3.09C6.23 6.86 8.88 4.75 12 4.75Z" />
    </svg>
  )
}

export function GoogleButton({ onClick, loading, disabled }: { onClick: () => void; loading?: boolean; disabled?: boolean }) {
  return (
    <Button
      variant="secondary"
      size="lg"
      fullWidth
      onClick={onClick}
      loading={loading}
      disabled={disabled}
      leadingIcon={<GoogleMark />}
    >
      Continue with Google
    </Button>
  )
}
