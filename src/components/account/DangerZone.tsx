import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { AccountSection } from '@/components/account/AccountSection'
import { DeleteAccountModal } from '@/components/account/DeleteAccountModal'
import { SettingsRow } from '@/components/account/SettingsRow'
import { Button } from '@/components/ui/Button'

export function DangerZone() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <AccountSection tone="danger" title="Danger Zone" description="Permanently delete your Clave account and associated data. This action cannot be undone.">
        <div className="rounded-default border border-error/20 bg-error/5 p-4">
          <SettingsRow
            icon={Trash2}
            title="Delete Account"
            description="Permanently delete your Clave account and all associated data, including your resumes, profile, and settings."
            action={
              <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
                Delete Account
              </Button>
            }
          />
        </div>
      </AccountSection>
      {open && <DeleteAccountModal onClose={() => setOpen(false)} />}
    </>
  )
}
