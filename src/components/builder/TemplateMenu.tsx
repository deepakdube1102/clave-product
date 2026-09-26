import { LayoutTemplate } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown'
import { IconButton } from '@/components/ui/IconButton'
import type { TemplateId } from '@/types/resumeDocument'
import { templateIds, templates } from '@/utils/resumeTemplates'

/** Toolbar template picker. Shows the current name on wide screens, just an icon on narrow ones. */
export function TemplateMenu({ value, onChange, compact }: { value: TemplateId; onChange: (id: TemplateId) => void; compact?: boolean }) {
  return (
    <Dropdown
      label="Resume template"
      trigger={(triggerProps) =>
        compact ? (
          <IconButton label={`Template: ${templates[value].label}`} variant="secondary" {...triggerProps}>
            <LayoutTemplate className="size-4" aria-hidden />
          </IconButton>
        ) : (
          <Button variant="secondary" size="sm" leadingIcon={<LayoutTemplate className="size-4" />} {...triggerProps}>
            {templates[value].label}
          </Button>
        )
      }
    >
      {templateIds.map((id) => (
        <DropdownItem key={id} hint={id === value ? 'Current' : undefined} onSelect={() => onChange(id)}>
          <span className="block font-medium">{templates[id].label}</span>
          <span className="block text-xs text-muted">{templates[id].description}</span>
        </DropdownItem>
      ))}
    </Dropdown>
  )
}
