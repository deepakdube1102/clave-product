import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { EditorProps } from '@/components/onboarding/sectionEditors'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import type { ProfileData } from '@/types/profile'
import { cleanProfile } from '@/utils/profile'

interface ProfileSectionProps {
  title: string
  hint?: string
  emptyText: string
  isEmpty: boolean
  draft: ProfileData
  onSave: (next: ProfileData) => void
  view: ReactNode
  editor: (props: EditorProps) => ReactNode
}

/** One editable block of the profile: read view by default, inline editor on Edit/Add. */
export function ProfileSection({ title, hint, emptyText, isEmpty, draft, onSave, view, editor }: ProfileSectionProps) {
  const [editing, setEditing] = useState(false)
  const [working, setWorking] = useState(draft)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const restoreFocus = useRef(false)

  useEffect(() => {
    if (!editing && restoreFocus.current) {
      restoreFocus.current = false
      triggerRef.current?.focus()
    }
  }, [editing])

  const close = () => {
    restoreFocus.current = true
    setEditing(false)
  }

  return (
    <Card padding="none" className="p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-text">{title}</h3>
          {hint && <p className="mt-0.5 text-sm text-secondary">{hint}</p>}
        </div>
        {!editing && (
          <Button
            ref={triggerRef}
            variant="ghost"
            size="sm"
            className="-mt-1 -mr-2"
            aria-label={`${isEmpty ? 'Add' : 'Edit'} ${title}`}
            onClick={() => {
              setWorking(draft)
              setEditing(true)
            }}
          >
            {isEmpty ? 'Add' : 'Edit'}
          </Button>
        )}
      </div>

      {editing ? (
        <form
          className="mt-4"
          onSubmit={(event) => {
            event.preventDefault()
            onSave(cleanProfile(working))
            close()
          }}
        >
          {editor({ value: working, onChange: (patch) => setWorking((current) => ({ ...current, ...patch })) })}
          <div className="mt-5 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={close}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Save
            </Button>
          </div>
        </form>
      ) : (
        <div className="mt-4">{isEmpty ? <p className="text-sm text-muted">{emptyText}</p> : view}</div>
      )}
    </Card>
  )
}
