import { useEffect, useState } from 'react'
import { ResumePreview } from '@/components/builder/ResumePreview'
import { getResumePreview } from '@/services/resumeDocument.service'
import type { ResumeDocument } from '@/types/resumeDocument'
import { cn } from '@/utils/cn'

/** A real, scaled render of the resume's first page, cropped from the top. Decorative: the card carries the accessible name. */
export function ResumeThumbnail({ resumeId, updatedAt, className }: { resumeId: string; updatedAt: string; className?: string }) {
  const [doc, setDoc] = useState<ResumeDocument | null>(null)

  useEffect(() => {
    let active = true
    getResumePreview(resumeId).then((found) => active && setDoc(found))
    return () => {
      active = false
    }
  }, [resumeId, updatedAt])

  return (
    <div aria-hidden className={cn('pointer-events-none relative overflow-hidden bg-white shadow-card ring-1 ring-border select-none', className)}>
      {doc ? <ResumePreview doc={doc} /> : <div className="h-full w-full animate-pulse bg-chip" />}
    </div>
  )
}
