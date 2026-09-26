import { TemplateCard } from '@/components/resumes/templates/TemplateCard'
import type { TemplateInfo } from '@/types/template'
import type { TemplateId } from '@/types/resumeDocument'

interface TemplateGridProps {
  templates: TemplateInfo[]
  busyId: TemplateId | null
  onPreview: (template: TemplateInfo) => void
  onUse: (template: TemplateInfo) => void
}

export function TemplateGrid({ templates, busyId, onPreview, onUse }: TemplateGridProps) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {templates.map((template) => (
        <li key={template.id}>
          <TemplateCard template={template} busy={busyId === template.id} onPreview={() => onPreview(template)} onUse={() => onUse(template)} />
        </li>
      ))}
    </ul>
  )
}
