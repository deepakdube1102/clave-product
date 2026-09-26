import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { useAuthStore } from '@/store/authStore'
import { toast } from '@/store/toastStore'

const PHRASE = 'DELETE'

/** Deleting needs a typed confirmation. Mock: removes the local account and signs out. */
export function DeleteAccountModal({ onClose }: { onClose: () => void }) {
  const deleteAccount = useAuthStore((state) => state.deleteAccount)
  const [typed, setTyped] = useState('')
  const [busy, setBusy] = useState(false)

  return (
    <Modal
      open
      onClose={onClose}
      title="Delete your account?"
      description="This permanently deletes your resumes, Career Profile and settings. It can’t be undone."
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            loading={busy}
            disabled={typed !== PHRASE}
            onClick={async () => {
              setBusy(true)
              await deleteAccount()
              toast.success('Account deleted')
            }}
          >
            Delete account
          </Button>
        </>
      }
    >
      <Input label={`Type ${PHRASE} to confirm`} value={typed} autoComplete="off" onChange={(event) => setTyped(event.target.value)} />
    </Modal>
  )
}
