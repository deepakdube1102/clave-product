import { BadgeIndianRupee, Briefcase, Clock, MapPin, Laptop, UserRound } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Job, JobDetail } from '@/types/job'
import { workTypeLabels } from '@/utils/jobFilters'
import { postedLong } from '@/utils/relativeTime'

export function JobOverview({ job, detail }: { job: Job; detail: JobDetail }) {
  const items: Array<[string, string, ReactNode]> = [
    ['Location', job.city === 'Remote' ? 'India (Remote)' : job.city, <MapPin key="l" />],
    ['Salary', job.salary ?? 'Not disclosed', <BadgeIndianRupee key="s" />],
    ['Work type', workTypeLabels[job.workType], <Laptop key="w" />],
    ['Job type', detail.jobType, <Briefcase key="j" />],
    ['Experience', job.experience, <UserRound key="e" />],
    ['Posted', postedLong(job.postedDaysAgo).replace(/^./, (c) => c.toUpperCase()), <Clock key="p" />],
  ]

  return (
    <section aria-label="Job overview" className="rounded-default border border-border bg-surface p-4">
      <h3 className="text-base font-semibold text-text">Job Overview</h3>
      <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3.5">
        {items.map(([label, value, icon]) => (
          <div key={label} className="flex items-start gap-2.5">
            <span className="mt-0.5 text-primary [&>svg]:size-4" aria-hidden>
              {icon}
            </span>
            <div>
              <dt className="text-xs text-muted">{label}</dt>
              <dd className="mt-0.5 text-[13px] font-medium text-text">{value}</dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  )
}
