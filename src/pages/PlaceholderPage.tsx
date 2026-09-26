import { Compass } from 'lucide-react'
import { EmptyState } from '@/components/ui/EmptyState'

/** Stand-in until the real screen for a route is built. */
export function PlaceholderPage({ title }: { title: string }) {
  return (
    <EmptyState
      icon={Compass}
      title={title}
      description="This screen hasn’t been built yet."
      className="py-24"
    />
  )
}
