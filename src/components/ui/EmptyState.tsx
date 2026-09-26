import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center px-6 py-12 text-center', className)}>
      {Icon && (
        <span className="mb-4 flex size-12 items-center justify-center rounded-default icon-tile">
          <Icon className="size-6" strokeWidth={1.75} aria-hidden />
        </span>
      )}
      <h2 className="font-editorial text-2xl font-medium text-text">{title}</h2>
      {description && <p className="mt-2 max-w-sm text-sm text-secondary">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
