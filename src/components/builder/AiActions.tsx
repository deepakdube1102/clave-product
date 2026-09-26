import { RefreshCw, Scissors, Sparkles, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown'
import { IconButton } from '@/components/ui/IconButton'
import { aiActionLabels, transformText } from '@/services/ai.service'
import type { AiAction } from '@/services/ai.service'
import { toast } from '@/store/toastStore'

interface AiActionsProps {
  text: string
  onResult: (text: string) => void
  context?: { role?: string; skills?: string[]; kind?: 'summary' }
  /** Summary can be drafted from nothing; bullets need existing text. */
  allowEmpty?: boolean
  /** Icon-only trigger for tight spaces such as bullet rows. */
  compact?: boolean
  label?: string
}

const icons: Record<AiAction, typeof Sparkles> = { improve: Sparkles, rewrite: RefreshCw, concise: Scissors, impact: TrendingUp }

export function AiActions({ text, onResult, context, allowEmpty, compact, label = 'Improve with AI' }: AiActionsProps) {
  const [busy, setBusy] = useState(false)

  const run = async (action: AiAction) => {
    if (!text.trim() && !allowEmpty) {
      toast.info('Write something first', 'AI actions work on text you’ve already added.')
      return
    }
    setBusy(true)
    try {
      onResult(await transformText(text, action, context))
    } catch {
      toast.error('AI couldn’t help right now', 'Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Dropdown
      label="AI actions"
      align="start"
      trigger={(triggerProps) =>
        compact ? (
          <IconButton label={label} size="sm" loading={busy} className="text-primary/80 hover:text-primary" {...triggerProps}>
            <Sparkles className="size-3.5" aria-hidden />
          </IconButton>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            loading={busy}
            leadingIcon={<Sparkles className="size-3.5 text-primary" aria-hidden />}
            className="text-primary/80 hover:text-primary hover:bg-primary/5"
            {...triggerProps}
          >
            {label}
          </Button>
        )
      }
    >
      {(Object.keys(aiActionLabels) as AiAction[]).map((action) => (
        <DropdownItem key={action} icon={icons[action]} onSelect={() => void run(action)}>
          {aiActionLabels[action]}
        </DropdownItem>
      ))}
    </Dropdown>
  )
}
