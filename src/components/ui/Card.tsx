import type { ComponentPropsWithRef } from 'react'
import { cn } from '@/utils/cn'

type CardPadding = 'none' | 'sm' | 'md' | 'lg'

const paddings: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

interface CardProps extends ComponentPropsWithRef<'div'> {
  padding?: CardPadding
}

export function Card({ padding = 'md', className, ...props }: CardProps) {
  return (
    <div
      className={cn('rounded-default border border-border bg-surface shadow-card', paddings[padding], className)}
      {...props}
    />
  )
}
