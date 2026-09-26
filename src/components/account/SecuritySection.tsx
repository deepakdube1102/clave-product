import { Laptop, LockKeyhole } from 'lucide-react'
import { useState } from 'react'
import { AccountSection } from '@/components/account/AccountSection'
import { SecurityIllustration } from '@/components/account/AccountIllustrations'
import { ChangePasswordModal } from '@/components/account/ChangePasswordModal'
import { ConnectedAccounts } from '@/components/account/ConnectedAccounts'
import { SessionsModal } from '@/components/account/SessionsModal'
import { SettingsRow } from '@/components/account/SettingsRow'
import { Button } from '@/components/ui/Button'
import type { useAccountSettings } from '@/hooks/useAccountSettings'
import { formatRelativeTime } from '@/utils/relativeTime'

type Props = ReturnType<typeof useAccountSettings>

export function SecuritySection({ settings, update }: Props) {
  const [passwordOpen, setPasswordOpen] = useState(false)
  const [sessionsOpen, setSessionsOpen] = useState(false)

  return (
    <>
      <AccountSection title="Login & Security" description="Keep your account secure and manage your login options." illustration={<SecurityIllustration />}>
        <div className="divide-y divide-border">
          <SettingsRow
            icon={LockKeyhole}
            title="Password"
            description={`Last changed ${formatRelativeTime(settings.passwordChangedAt)}`}
            action={
              <Button variant="secondary" size="sm" onClick={() => setPasswordOpen(true)}>
                Change password
              </Button>
            }
          />
          <ConnectedAccounts connected={settings.googleConnected} onChange={(googleConnected) => update({ googleConnected })} />
          <SettingsRow
            icon={Laptop}
            title="Active sessions"
            description="Manage devices where you’re signed in to your account."
            status={`${settings.sessions.length} active ${settings.sessions.length === 1 ? 'session' : 'sessions'}`}
            action={
              <Button variant="secondary" size="sm" onClick={() => setSessionsOpen(true)}>
                Manage sessions
              </Button>
            }
          />
        </div>
      </AccountSection>

      {passwordOpen && <ChangePasswordModal onClose={() => setPasswordOpen(false)} onChanged={() => update({ passwordChangedAt: new Date().toISOString() })} />}
      {sessionsOpen && <SessionsModal sessions={settings.sessions} onChange={(sessions) => update({ sessions })} onClose={() => setSessionsOpen(false)} />}
    </>
  )
}
