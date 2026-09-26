import type { ImgHTMLAttributes } from 'react'
import markSrc from '@/assets/brand/clave-mark.png'
import wordmarkDark from '@/assets/brand/clave-wordmark.png'
import wordmarkWhite from '@/assets/brand/clave-wordmark-white.png'
import { cn } from '@/utils/cn'

export type ClaveLogoVariant = 'full' | 'compact' | 'icon'

interface ClaveLogoProps {
  variant?: ClaveLogoVariant
  /** Light wordmark for dark backgrounds such as the sidebar. */
  reverse?: boolean
  className?: string
}

/** Source images are derived from src/assets/Clave logo (transparent, downsized). Swap the imports above to update the brand. */
export function ClaveMark({ size = 32, alt = '', ...props }: { size?: number } & Omit<ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height' | 'src'>) {
  return <img src={markSrc} alt={alt} height={size} className="w-auto" style={{ height: size }} draggable={false} {...props} />
}

export function ClaveLogo({ variant = 'full', reverse, className }: ClaveLogoProps) {
  if (variant === 'icon') {
    return <ClaveMark alt="Clave" size={32} className={cn('w-auto', className)} />
  }

  const compact = variant === 'compact'

  return (
    <span className={cn('inline-flex items-center', compact ? 'gap-2' : 'gap-2.5', className)}>
      <ClaveMark size={compact ? 26 : 36} />
      <img
        src={reverse ? wordmarkWhite : wordmarkDark}
        alt="Clave"
        style={{ height: compact ? 17 : 23 }}
        className="w-auto"
        draggable={false}
      />
    </span>
  )
}
