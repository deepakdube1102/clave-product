import { Badge } from '@/components/ui/Badge'

/** Small tag on cards; "ATS Friendly" gets the emerald treatment. */
export function TemplateBadge({ children }: { children: string }) {
  return <Badge variant={children === 'ATS Friendly' ? 'primary' : 'neutral'}>{children}</Badge>
}
