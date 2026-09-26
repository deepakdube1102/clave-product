import { ArrowRight, Bookmark, BookmarkCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CompanyLogo } from '@/components/jobs/CompanyLogo'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { jobPath } from '@/routes/navigation'
import type { Job } from '@/types/job'
import { workTypeLabels } from '@/utils/jobFilters'

interface JobRowProps {
  job: Job
  saved: boolean
  onToggleSave: () => void
}

/** One compact row: logo, role and match, three skills, Save and View Job. */
export function JobRow({ job, saved, onToggleSave }: JobRowProps) {
  const { id, title, company, city, workType, matchPercent, skills } = job

  return (
    <article className="flex flex-col gap-3 px-4 py-2.5 transition-colors hover:bg-primary/[0.03] sm:px-5 md:flex-row md:items-center md:gap-5">
      <div className="flex min-w-0 flex-1 items-center gap-3.5">
        <CompanyLogo company={company} className="size-10 rounded-[10px]" />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="text-sm font-semibold text-text">{title}</h3>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary-deep">{matchPercent}% match</span>
          </div>
          <p className="mt-0.5 text-[13px] text-secondary">
            {company} <span aria-hidden>·</span> {city === 'Remote' ? 'India' : city} <span aria-hidden>·</span> {workTypeLabels[workType]}
          </p>
        </div>
      </div>

      <ul className="hidden shrink-0 flex-wrap justify-end gap-1.5 lg:flex" aria-label="Relevant skills">
        {skills.slice(0, 3).map((skill) => (
          <li key={skill}>
            <Badge>{skill}</Badge>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2 md:shrink-0">
        <Button
          variant="ghost"
          size="sm"
          className="h-7! gap-1.5! px-2.5! text-xs!"
          aria-pressed={saved}
          aria-label={`Save ${title} at ${company}`}
          onClick={onToggleSave}
          leadingIcon={saved ? <BookmarkCheck className="size-3.5 text-primary" /> : <Bookmark className="size-3.5" />}
        >
          {saved ? 'Saved' : 'Save'}
        </Button>
        <Link to={jobPath(id)} aria-label={`View Job: ${title} at ${company}`} className={`${buttonStyles({ variant: 'tint', size: 'sm' })} h-7! gap-1.5! px-2.5! text-xs!`}>
          View Job
          <ArrowRight className="size-3" aria-hidden />
        </Link>
      </div>
    </article>
  )
}
