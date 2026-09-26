import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'

const stepLabels = ['Add your info', 'Review']

function Progress({ step }: { step: 1 | 2 }) {
  return (
    <div
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={2}
      aria-valuenow={step}
      aria-valuetext={`Step ${step} of 2: ${stepLabels[step - 1]}`}
      className="flex items-center gap-3"
    >
      <span className="text-xs text-secondary">
        Step {step} of 2 <span aria-hidden>·</span> {stepLabels[step - 1]}
      </span>
      <span className="flex gap-1" aria-hidden>
        {[1, 2].map((n) => (
          <span key={n} className={cn('h-1 w-6 rounded-full', n <= step ? 'bg-primary' : 'bg-border')} />
        ))}
      </span>
    </div>
  )
}

interface OnboardingHeaderProps {
  title: string
  description?: ReactNode
  step?: 1 | 2
  backTo?: string
  onBack?: () => void
}

const backClass =
  'inline-flex items-center gap-1.5 rounded-control text-sm font-medium text-secondary transition-colors hover:text-text'

export function OnboardingHeader({ title, description, step, backTo, onBack }: OnboardingHeaderProps) {
  return (
    <div className="mb-8">
      <div className="mb-8 flex min-h-6 items-center justify-between gap-4">
        {backTo ? (
          <Link to={backTo} className={backClass}>
            <ArrowLeft className="size-4" aria-hidden />
            Back
          </Link>
        ) : onBack ? (
          <button type="button" onClick={onBack} className={backClass}>
            <ArrowLeft className="size-4" aria-hidden />
            Back
          </button>
        ) : (
          <span />
        )}
        {step && <Progress step={step} />}
      </div>
      <h1 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">{title}</h1>
      {description && <p className="mt-2 max-w-xl text-secondary">{description}</p>}
    </div>
  )
}
