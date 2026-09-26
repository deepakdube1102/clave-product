import { JobListItem } from '@/components/jobs/JobListItem'
import type { Job } from '@/types/job'

interface JobListProps {
  jobs: Job[]
  selectedId: string | undefined
  isSaved: (id: string) => boolean
  onSelect: (id: string) => void
  onToggleSave: (job: Job) => void
}

/** Scrollable job list for the desktop split view. */
export function JobList({ jobs, selectedId, isSaved, onSelect, onToggleSave }: JobListProps) {
  return (
    <ul aria-label="Jobs" className="flex min-h-0 flex-col gap-3 overflow-y-auto pr-1 pb-2">
      {jobs.map((job) => (
        <li key={job.id} className="shrink-0">
          <JobListItem job={job} selected={job.id === selectedId} saved={isSaved(job.id)} onSelect={() => onSelect(job.id)} onToggleSave={() => onToggleSave(job)} />
        </li>
      ))}
    </ul>
  )
}
