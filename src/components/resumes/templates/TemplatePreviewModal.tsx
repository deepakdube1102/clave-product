import { TemplatePreview } from '@/components/resumes/templates/TemplatePreview'
import { TemplatePreviewPanel } from '@/components/resumes/templates/TemplatePreviewPanel'
import { Modal } from '@/components/ui/Modal'
import type { TemplateInfo } from '@/types/template'

interface Props {
  template: TemplateInfo
  busy: boolean
  onUse: () => void
  onClose: () => void
}

/** Focused preview: large page on the left, details on the right (stacked on phones). */
export function TemplatePreviewModal({ template, busy, onUse, onClose }: Props) {
  return (
    <Modal open size="xl" onClose={onClose} title={`${template.name} template`}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_260px]">
        <div className="max-h-[70dvh] overflow-y-auto rounded-default bg-chip p-3 sm:p-4">
          <TemplatePreview template={template} className="rounded-[3px] shadow-card ring-1 ring-border" />
        </div>
        <TemplatePreviewPanel template={template} busy={busy} onUse={onUse} />
      </div>
    </Modal>
  )
}
