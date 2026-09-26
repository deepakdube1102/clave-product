import { useState } from 'react'
import type { ReactNode } from 'react'
import * as Editors from '@/components/onboarding/sectionEditors'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import type { ProfileData } from '@/types/profile'
import { newId } from '@/utils/profile'

export type EditableSection = 'overview' | 'experience' | 'education' | 'projects' | 'skills' | 'direction'

export interface EditRequest {
  section: EditableSection
  /** Open with a fresh blank entry appended (the "Add …" buttons). */
  addNew?: boolean
}

const config: Record<
  EditableSection,
  { title: string; editor: (props: Editors.EditorProps) => ReactNode; addBlank?: (data: ProfileData) => ProfileData; wide?: boolean }
> = {
  overview: { title: 'Edit profile', editor: (p) => <Editors.OverviewEditor {...p} />, wide: true },
  experience: {
    title: 'Work experience',
    editor: (p) => <Editors.ExperienceEditor {...p} />,
    addBlank: (d) => ({ ...d, experience: [...d.experience, { id: newId(), role: '', company: '', location: '', period: '', summary: '' }] }),
    wide: true,
  },
  education: {
    title: 'Education',
    editor: (p) => <Editors.EducationEditor {...p} />,
    addBlank: (d) => ({ ...d, education: [...d.education, { id: newId(), institution: '', degree: '', period: '', details: '' }] }),
    wide: true,
  },
  projects: {
    title: 'Projects',
    editor: (p) => <Editors.ProjectsEditor {...p} />,
    addBlank: (d) => ({ ...d, projects: [...d.projects, { id: newId(), name: '', description: '', technologies: [], link: '' }] }),
    wide: true,
  },
  skills: { title: 'Skills', editor: (p) => <Editors.SkillsEditor {...p} /> },
  direction: { title: 'Career direction', editor: (p) => <Editors.DirectionEditor {...p} /> },
}

interface EditSectionModalProps {
  request: EditRequest
  profile: ProfileData
  onClose: () => void
  onSave: (next: ProfileData) => Promise<void>
}

/** Mount only while editing so the working copy starts fresh each time. */
export function EditSectionModal({ request, profile, onClose, onSave }: EditSectionModalProps) {
  const { title, editor, addBlank, wide } = config[request.section]
  const [working, setWorking] = useState(() => (request.addNew && addBlank ? addBlank(profile) : profile))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string>()

  const submit = async () => {
    setSaving(true)
    setError(undefined)
    try {
      await onSave(working)
      onClose()
    } catch {
      setError('We couldn’t save your changes. Please try again.')
      setSaving(false)
    }
  }

  return (
    <Modal
      open
      onClose={onClose}
      title={title}
      size={wide ? 'lg' : 'md'}
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button type="submit" form="edit-profile-form" loading={saving}>
            Save changes
          </Button>
        </>
      }
    >
      <form
        id="edit-profile-form"
        onSubmit={(event) => {
          event.preventDefault()
          void submit()
        }}
        className="flex flex-col gap-4"
      >
        {error && (
          <p role="alert" className="rounded-control border border-error/20 bg-error/5 px-3 py-2 text-sm text-error">
            {error}
          </p>
        )}
        {editor({ value: working, onChange: (patch) => setWorking((current) => ({ ...current, ...patch })) })}
      </form>
    </Modal>
  )
}
