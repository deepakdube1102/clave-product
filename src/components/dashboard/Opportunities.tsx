import { JobRow } from '@/components/jobs/JobRow'
import { Card } from '@/components/ui/Card'
import { useSavedJobs } from '@/hooks/useSavedJobs'
import type { Job } from '@/types/job'

export function Opportunities({ jobs }: { jobs: Job[] }) {
  const { isSaved, toggle } = useSavedJobs()

  return (
    <Card padding="none" className="divide-y divide-border overflow-hidden rounded-large shadow-none [@media(max-height:820px)]:[&>article:nth-child(n+3)]:hidden">
      {jobs.map((job) => (
        <JobRow key={job.id} job={job} saved={isSaved(job.id)} onToggleSave={() => toggle(job)} />
      ))}
    </Card>
  )
}
