import { BadgeIndianRupee, BarChart3, Briefcase, Building2, CalendarDays, MapPin, Users } from 'lucide-react'
import type { ReactNode } from 'react'
import type { CompanyInfo, Job, JobDetail } from '@/types/job'
import { workTypeLabels } from '@/utils/jobFilters'
import { postedLong } from '@/utils/relativeTime'

interface JobDetailsProps {
  job: Job
  detail: JobDetail
  company: CompanyInfo | undefined
}

export function JobDetails({ job, detail, company }: JobDetailsProps) {
  const rows: Array<[string, string, ReactNode]> = [
    ['Location', `${job.city === 'Remote' ? 'India' : job.city} · ${workTypeLabels[job.workType]}`, <MapPin key="l" />],
    ['Employment type', detail.jobType, <Briefcase key="e" />],
    ['Experience level', job.experience, <BarChart3 key="x" />],
    ['Salary range', job.salary ?? 'Not disclosed', <BadgeIndianRupee key="s" />],
    ['Industry', company?.industry ?? 'Not listed', <Building2 key="i" />],
    ['Team', job.roleType, <Users key="t" />],
    ['Posted', postedLong(job.postedDaysAgo).replace(/^./, (c) => c.toUpperCase()), <CalendarDays key="p" />],
  ]

  return (
    <section aria-labelledby="details-title" className="rounded-large border border-border bg-surface p-5 shadow-xs sm:p-6">
      <h2 id="details-title" className="font-editorial text-2xl font-medium tracking-tight text-text">
        Job details
      </h2>
      <dl className="mt-4 flex flex-col gap-3.5">
        {rows.map(([label, value, icon]) => (
          <div key={label} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] items-start gap-3 text-sm">
            <dt className="flex items-center gap-2.5 text-secondary">
              <span className="text-muted [&>svg]:size-[18px]" aria-hidden>
                {icon}
              </span>
              {label}
            </dt>
            <dd className="font-medium text-text">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
