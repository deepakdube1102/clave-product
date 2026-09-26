export type AiAction = 'improve' | 'rewrite' | 'concise' | 'impact'

export const aiActionLabels: Record<AiAction, string> = {
  improve: 'Improve wording',
  rewrite: 'Rewrite',
  concise: 'Make more concise',
  impact: 'Add measurable impact',
}

interface AiContext {
  role?: string
  skills?: string[]
  /** Summaries are prose; bullets get action-verb treatment. */
  kind?: 'summary'
}

/** Mock rewriting with simple text rules. The real version calls the AI backend. */
const WEAK_PHRASES: Array<[RegExp, string]> = [
  [/^worked on\b/i, 'Built'],
  [/^helped\b/i, 'Supported'],
  [/^responsible for\b/i, 'Owned'],
  [/^did\b/i, 'Delivered'],
  [/^made\b/i, 'Created'],
]
const STRONG_VERB = /^(built|led|created|designed|developed|delivered|launched|improved|reduced|increased|owned|shipped|supported|managed|analy[sz]ed|implemented)\b/i

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

export function improveText(text: string): string {
  let result = text.replace(/\s+/g, ' ').trim()
  for (const [pattern, replacement] of WEAK_PHRASES) result = result.replace(pattern, replacement)
  return capitalize(result)
}

export async function transformText(text: string, action: AiAction, context: AiContext = {}): Promise<string> {
  await wait(700)
  const base = text.trim()

  if (!base) {
    const skills = (context.skills ?? []).slice(0, 3).join(', ')
    return `${context.role ?? 'Motivated professional'} with hands-on experience${skills ? ` in ${skills}` : ''}. Focused on building reliable, user-friendly work and learning quickly in a team.`
  }

  switch (action) {
    case 'improve':
      return improveText(base)
    case 'rewrite': {
      const improved = improveText(base)
      if (context.kind === 'summary') return /[.!?]$/.test(improved) ? improved : `${improved}.`
      return STRONG_VERB.test(improved) ? improved : `Delivered ${improved.charAt(0).toLowerCase()}${improved.slice(1)}`
    }
    case 'concise': {
      const trimmed = improveText(base)
        .replace(/\b(very|really|basically|various|several|a number of)\s+/gi, '')
        .replace(/\bin order to\b/gi, 'to')
      const words = trimmed.split(' ')
      return words.length > 20 ? `${words.slice(0, 20).join(' ').replace(/[,;]$/, '')}` : trimmed
    }
    case 'impact': {
      const improved = improveText(base).replace(/\.$/, '')
      return /\d/.test(improved) ? improved : `${improved}, resulting in [X% improvement]`
    }
  }
}
