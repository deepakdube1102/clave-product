import { ArrowRight, Eye } from 'lucide-react'
import { TemplateBadge } from '@/components/resumes/templates/TemplateBadge'
import { TemplatePreview } from '@/components/resumes/templates/TemplatePreview'
import { Button } from '@/components/ui/Button'
import type { TemplateInfo } from '@/types/template'
import { templates } from '@/utils/resumeTemplates'

interface TemplateCardProps {
  template: TemplateInfo
  busy: boolean
  onPreview: () => void
  onUse: () => void
}

export function TemplateCard({ template, busy, onPreview, onUse }: TemplateCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-large border border-border bg-surface shadow-xs transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card">
      <button type="button" onClick={onPreview} aria-label={`Preview ${template.name}`} style={{ backgroundColor: `${templates[template.id].accent ?? '#087F5B'}14` }} className="relative block p-3 text-left">
        <TemplatePreview template={template} className="h-[300px] rounded-[3px] shadow-card ring-1 ring-border" />
      </button>
      <div className="flex flex-1 flex-col gap-3 p-3.5">
        <div>
          <h3 className="text-[15px] font-semibold text-text">{template.name}</h3>
          <p className="mt-1 text-xs leading-snug text-secondary">{template.description}</p>
        </div>
        <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
          {template.tags.map((tag) => (
            <li key={tag}>
              <TemplateBadge>{tag}</TemplateBadge>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center gap-2">
          <Button variant="secondary" size="sm" className="h-7! min-w-0 flex-1 gap-1.5! px-2.5! text-xs!" leadingIcon={<Eye className="size-3.5" />} onClick={onPreview}>
            Preview
          </Button>
          <Button size="sm" className="h-7! min-w-0 flex-[1.3] gap-1.5! px-2.5! text-xs!" loading={busy} trailingIcon={<ArrowRight className="size-3.5" />} onClick={onUse}>
            Use Template
          </Button>
        </div>
      </div>
    </article>
  )
}
