import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CareerInsight } from '@/components/dashboard/CareerInsight'
import { DashboardSection } from '@/components/dashboard/DashboardSection'
import { NextMoves } from '@/components/dashboard/NextMoves'
import { Opportunities } from '@/components/dashboard/Opportunities'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { EmptyState } from '@/components/ui/EmptyState'
import { LoadingState } from '@/components/ui/LoadingState'
import { useAsyncData } from '@/hooks/useAsyncData'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { paths } from '@/routes/navigation'
import { getCareerProfile } from '@/services/career.service'
import { getRecommendedJobs } from '@/services/job.service'
import { getGreeting } from '@/utils/greeting'
import { getNextMoves } from '@/utils/nextMoves'

const formatToday = (date = new Date()) =>
  `${date.toLocaleDateString('en-US', { weekday: 'short' })}, ${date.getDate()} ${date.toLocaleDateString('en-US', { month: 'short' })} ${date.getFullYear()}`

export function Dashboard() {
  const { user } = useCurrentUser()
  const profile = useAsyncData(getCareerProfile)
  const jobs = useAsyncData(getRecommendedJobs)
  const firstName = user?.name.split(' ')[0]

  return (
    <div className="flex flex-col gap-3.5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-editorial text-3xl leading-tight font-medium tracking-tight text-text sm:text-4xl">
            {getGreeting()}
            {firstName && `, ${firstName}`}
          </h1>
          <p className="mt-0.5 hidden text-sm text-secondary sm:block">Here’s what’s happening with your career.</p>
        </div>
        <div className="hidden sm:block sm:text-right">
          <p className="text-xs text-secondary">{formatToday()}</p>
          <p className="mt-1 text-xs text-secondary">“Consistent progress builds extraordinary careers.”</p>
        </div>
      </header>

      {profile.status === 'success' && (
        <>
          <DashboardSection title="Career Insight" hideTitle>
            <CareerInsight profile={profile.data} />
          </DashboardSection>
          <DashboardSection title="Your Next Move">
            <NextMoves moves={getNextMoves(profile.data)} />
          </DashboardSection>
        </>
      )}
      {profile.status === 'loading' && <LoadingState label="Loading your career overview…" />}
      {profile.status === 'error' && (
        <EmptyState title="Couldn’t load your career overview" description="Please refresh the page to try again." />
      )}

      <DashboardSection
        title="Opportunities for You"
        action={
          <Link to={paths.jobs} className={`${buttonStyles({ variant: 'ghost', size: 'sm' })} -mr-3`}>
            View All
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        }
      >
        {jobs.status === 'success' && <Opportunities jobs={jobs.data} />}
        {jobs.status === 'loading' && <LoadingState label="Finding opportunities…" />}
        {jobs.status === 'error' && (
          <EmptyState title="Couldn’t load opportunities" description="Please refresh the page to try again." />
        )}
      </DashboardSection>
    </div>
  )
}
