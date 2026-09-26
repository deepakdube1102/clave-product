import { useEffect, useState } from 'react'
import { ResumePreview } from '@/components/builder/ResumePreview'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { getResumePreview } from '@/services/resumeDocument.service'
import type { Resume } from '@/types/resume'
import type { ResumeDocument } from '@/types/resumeDocument'

function PreviewBody({ resume }: { resume: Resume }) {
  const [doc, setDoc] = useState<ResumeDocument | null>(null)
  useEffect(() => {
    let active = true
    getResumePreview(resume.id).then((found) => active && setDoc(found))
    return () => {
      active = false
    }
  }, [resume.id])
  return <div className="bg-chip p-4">{doc ? <ResumePreview doc={doc} /> : <p className="py-16 text-center text-sm text-secondary">Loading preview…</p>}</div>
}

export function ResumePreviewDialog({ resume, onClose, onOpen }: { resume: Resume; onClose: () => void; onOpen: () => void }) {
  return (
    <Modal
      open
      size="lg"
      onClose={onClose}
      title={resume.name}
      description="A quick look. Open the resume to edit it."
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onOpen}>Open Resume</Button>
        </>
      }
    >
      <PreviewBody resume={resume} />
    </Modal>
  )
}
