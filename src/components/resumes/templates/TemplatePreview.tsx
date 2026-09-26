import { ResumePreview } from '@/components/builder/ResumePreview'
import type { TemplateInfo } from '@/types/template'
import { cn } from '@/utils/cn'
import { templates } from '@/utils/resumeTemplates'

/** A real render of the template with its sample resume. Decorative in cards; the card names it. */
export function TemplatePreview({ template, className }: { template: TemplateInfo; className?: string }) {
  return (
    <div aria-hidden={className ? true : undefined} className={cn('pointer-events-none relative overflow-hidden bg-white select-none', className)}>
      <ResumePreview
        doc={{
          id: `preview-${template.id}`,
          name: template.name,
          targetRole: template.previewRole,
          template: template.id,
          sectionOrder: templates[template.id].sectionOrder,
          content: template.preview,
          updatedAt: '',
        }}
      />
    </div>
  )
}
