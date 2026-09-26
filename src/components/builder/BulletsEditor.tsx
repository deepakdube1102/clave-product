import { Plus, X } from 'lucide-react'
import { AiActions } from '@/components/builder/AiActions'
import { Button } from '@/components/ui/Button'
import { controlStyles } from '@/components/ui/controlStyles'
import { IconButton } from '@/components/ui/IconButton'

interface BulletsEditorProps {
  bullets: string[]
  onChange: (bullets: string[]) => void
  context?: { role?: string; skills?: string[] }
}

export function BulletsEditor({ bullets, onChange, context }: BulletsEditorProps) {
  const setBullet = (index: number, value: string) => onChange(bullets.map((b, i) => (i === index ? value : b)))

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-text">Bullet points</span>
      {bullets.map((bullet, index) => (
        <div key={index} className="flex items-start gap-1">
          <textarea
            aria-label={`Bullet ${index + 1}`}
            rows={2}
            value={bullet}
            onChange={(event) => setBullet(index, event.target.value)}
            className={`${controlStyles()} min-w-0 flex-1 resize-y py-2`}
          />
          <div className="flex flex-col">
            <AiActions compact label={`AI actions for bullet ${index + 1}`} text={bullet} context={context} onResult={(text) => setBullet(index, text)} />
            <IconButton label={`Remove bullet ${index + 1}`} size="sm" onClick={() => onChange(bullets.filter((_, i) => i !== index))}>
              <X className="size-4" aria-hidden />
            </IconButton>
          </div>
        </div>
      ))}
      <div>
        <Button variant="ghost" size="sm" leadingIcon={<Plus className="size-4" />} onClick={() => onChange([...bullets, ''])} className="-ml-3">
          Add bullet
        </Button>
      </div>
    </div>
  )
}
