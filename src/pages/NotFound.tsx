import { SearchX } from 'lucide-react'
import { Link } from 'react-router-dom'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { EmptyState } from '@/components/ui/EmptyState'
import { paths } from '@/routes/navigation'

export function NotFound() {
  return (
    <EmptyState
      icon={SearchX}
      title="Page not found"
      description="The page you’re looking for doesn’t exist or has moved."
      action={
        <Link to={paths.dashboard} className={buttonStyles({ variant: 'secondary' })}>
          Back to Dashboard
        </Link>
      }
      className="py-24"
    />
  )
}
