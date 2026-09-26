import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import type { Resume } from '@/types/resume'

interface DialogProps {
  resume: Resume
  onClose: () => void
}

/** Mounted only while open, so the field starts from the current name each time. */
export function RenameResumeDialog({ resume, onClose, onRename }: DialogProps & { onRename: (name: string) => Promise<void> }) {
  const [name, setName] = useState(resume.name)
  const [error, setError] = useState<string>()
  const [saving, setSaving] = useState(false)

  const submit = async () => {
    if (!name.trim()) {
      setError('Give your resume a name.')
      return
    }
    setSaving(true)
    await onRename(name.trim())
    onClose()
  }

  return (
    <Modal
      open
      onClose={onClose}
      title="Rename resume"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="rename-resume-form" loading={saving}>
            Save
          </Button>
        </>
      }
    >
      <form
        id="rename-resume-form"
        noValidate
        onSubmit={(event) => {
          event.preventDefault()
          void submit()
        }}
      >
        <Input label="Resume name" value={name} onChange={(e) => setName(e.target.value)} error={error} autoFocus />
      </form>
    </Modal>
  )
}

export function DeleteResumeDialog({ resume, onClose, onDelete }: DialogProps & { onDelete: () => Promise<void> }) {
  const [deleting, setDeleting] = useState(false)

  return (
    <Modal
      open
      onClose={onClose}
      title="Delete this resume?"
      description={`“${resume.name}” will be permanently removed. This can’t be undone.`}
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={deleting}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            loading={deleting}
            onClick={async () => {
              setDeleting(true)
              await onDelete()
              onClose()
            }}
          >
            Delete resume
          </Button>
        </>
      }
    />
  )
}
