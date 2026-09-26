import { Check } from 'lucide-react'
import { TemplateBadge } from '@/components/resumes/templates/TemplateBadge'
import { Button } from '@/components/ui/Button'
import type { TemplateInfo } from '@/types/template'

interface Props {
  template: TemplateInfo
  busy: boolean
  onUse: () => void
}

/** Information beside the large preview. Only "Use This Template" creates a resume. */
export function TemplatePreviewPanel({ template, busy, onUse }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="font-editorial text-2xl font-medium text-text">{template.name}</h3>
        <p className="mt-1.5 text-sm text-secondary">{template.description}</p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {template.atsFriendly && (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary-deep ring-1 ring-inset ring-primary/20">
            <Check className="size-3" strokeWidth={3} aria-hidden />
            ATS Friendly
          </span>
        )}
        {template.tags
          .filter((tag) => tag !== 'ATS Friendly')
          .map((tag) => (
            <TemplateBadge key={tag}>{tag}</TemplateBadge>
          ))}
      </div>
      <div>
        <h4 className="text-xs font-semibold tracking-wide text-muted uppercase">Best for</h4>
        <ul className="mt-2 flex flex-col gap-1.5 text-sm text-text">
          {template.bestFor.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
      {!template.atsFriendly && <p className="text-xs text-muted">Uses a richer layout; keep a plain version handy for applicant tracking systems.</p>}
      <div className="mt-2 flex flex-col gap-2.5">
        <Button size="lg" loading={busy} onClick={onUse}>
          Use This Template
        </Button>
      </div>
    </div>
  )
}
