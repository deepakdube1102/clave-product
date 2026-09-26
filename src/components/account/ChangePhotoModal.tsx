import { ImagePlus } from 'lucide-react'
import { useRef, useState } from 'react'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { useAuthStore } from '@/store/authStore'
import { toast } from '@/store/toastStore'

const MAX_BYTES = 1_000_000

/** Mock upload: the image is kept in the browser. The real API would upload it and return a URL. */
export function ChangePhotoModal({ onClose }: { onClose: () => void }) {
  const user = useAuthStore((state) => state.user)
  const updateUser = useAuthStore((state) => state.updateUser)
  const input = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | undefined>(user?.avatarUrl)
  const [error, setError] = useState('')

  if (!user) return null

  const pick = (file: File | undefined) => {
    if (!file) return
    if (!file.type.startsWith('image/')) return setError('Choose an image file (PNG, JPG or WebP).')
    if (file.size > MAX_BYTES) return setError('Choose an image under 1 MB.')
    setError('')
    const reader = new FileReader()
    reader.onload = () => setPreview(String(reader.result))
    reader.readAsDataURL(file)
  }

  return (
    <Modal
      open
      onClose={onClose}
      title="Change photo"
      description="Your photo appears in the top bar and account menu."
      footer={
        <>
          {user.avatarUrl && (
            <Button
              variant="ghost"
              onClick={() => {
                updateUser({ avatarUrl: undefined })
                toast.success('Photo removed')
                onClose()
              }}
            >
              Remove photo
            </Button>
          )}
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={!preview || preview === user.avatarUrl}
            onClick={() => {
              updateUser({ avatarUrl: preview })
              toast.success('Photo updated')
              onClose()
            }}
          >
            Save photo
          </Button>
        </>
      }
    >
      <div className="flex flex-col items-center gap-4 py-2">
        <Avatar name={user.name} src={preview} size="xl" className="size-28 text-4xl" />
        <input ref={input} type="file" accept="image/*" className="sr-only" aria-label="Choose a photo" onChange={(event) => pick(event.target.files?.[0])} />
        <Button variant="secondary" leadingIcon={<ImagePlus className="size-4" />} onClick={() => input.current?.click()}>
          Choose image
        </Button>
        {error ? <p role="alert" className="text-sm text-error">{error}</p> : <p className="text-xs text-muted">PNG, JPG or WebP, up to 1 MB.</p>}
      </div>
    </Modal>
  )
}
