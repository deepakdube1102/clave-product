import { Laptop, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import type { Session } from '@/hooks/useAccountSettings'
import { toast } from '@/store/toastStore'

interface Props {
  sessions: Session[]
  onChange: (sessions: Session[]) => void
  onClose: () => void
}

export function SessionsModal({ sessions, onChange, onClose }: Props) {
  const others = sessions.filter((session) => !session.current)

  return (
    <Modal
      open
      onClose={onClose}
      title="Active sessions"
      description="Devices where you’re signed in to Clave."
      footer={
        <>
          {others.length > 0 && (
            <Button
              variant="secondary"
              onClick={() => {
                onChange(sessions.filter((session) => session.current))
                toast.success('Signed out of other devices')
              }}
            >
              Sign out all other devices
            </Button>
          )}
          <Button onClick={onClose}>Done</Button>
        </>
      }
    >
      <ul className="flex flex-col divide-y divide-border">
        {sessions.map((session) => {
          const Icon = /iPhone|Android/.test(session.device) ? Smartphone : Laptop
          return (
            <li key={session.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-control icon-tile">
                <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-text">
                  {session.device}
                  {session.current && <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary-deep">This device</span>}
                </p>
                <p className="text-xs text-secondary">
                  {session.place} · {session.lastActive}
                </p>
              </div>
              {!session.current && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    onChange(sessions.filter((other) => other.id !== session.id))
                    toast.success('Signed out', session.device)
                  }}
                >
                  Sign out
                </Button>
              )}
            </li>
          )
        })}
      </ul>
    </Modal>
  )
}
