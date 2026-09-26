import { ArrowRight, Bookmark, BookmarkCheck, MapPin, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CompanyLogo } from '@/components/jobs/CompanyLogo'
import { Badge } from '@/components/ui/Badge'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { jobPath } from '@/routes/navigation'
import type { Job } from '@/types/job'
import { workTypeLabels } from '@/utils/jobFilters'
import { cn } from '@/utils/cn'
import { postedLabel } from '@/utils/relativeTime'

interface JobCardProps {
  job: Job
  saved: boolean
  onToggleSave: () => void
}

const MAX_SKILLS = 3

/** The whole card opens the job (stretched title link); the bookmark sits above it. */
export function JobCard({ job, saved, onToggleSave }: JobCardProps) {
  const { id, title, company, city, workType, experience, matchPercent, postedDaysAgo, skills } = job
  const extra = skills.length - MAX_SKILLS

  return (
    <article className="group relative flex h-full flex-col rounded-large border border-border bg-surface p-5 shadow-xs transition-all hover:border-primary/30 hover:shadow-card">
      <div className="flex items-start gap-3">
        <CompanyLogo company={company} className="size-12 rounded-[14px] text-xl" />
        <div className="min-w-0">
          <h3 className="text-base leading-snug font-semibold text-text">
            <Link
              to={jobPath(id)}
              aria-label={`View Job: ${title} at ${company}`}
              className="rounded-sm after:absolute after:inset-0 after:rounded-large focus-visible:after:outline-2 focus-visible:after:outline-primary"
            >
              {title}
            </Link>
          </h3>
          <p className="mt-0.5 text-sm text-secondary">{company}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 text-sm">
        <p className="flex min-w-0 items-center gap-2 text-secondary">
          <MapPin className="size-4 shrink-0 text-muted" aria-hidden />
          <span>
            {city === 'Remote' ? 'India' : city} · {workTypeLabels[workType]} · {experience}
          </span>
        </p>
        <span className="shrink-0 text-xs text-muted">{postedLabel(postedDaysAgo)}</span>
      </div>

      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Relevant skills">
        {skills.slice(0, MAX_SKILLS).map((skill) => (
          <li key={skill}>
            <Badge>{skill}</Badge>
          </li>
        ))}
        {extra > 0 && (
          <li className="px-1.5 py-0.5 text-xs text-muted">+{extra} more</li>
        )}
      </ul>

      <div className="mt-auto flex items-center justify-between gap-2 pt-5">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary-deep ring-1 ring-inset ring-primary/20">
          <Sparkles className="size-3.5" aria-hidden />
          {matchPercent}% match
        </span>
        <span className="relative z-10 flex items-center gap-2">
          <button
            type="button"
            aria-pressed={saved}
            onClick={onToggleSave}
            className={cn(
              'inline-flex h-9 items-center gap-1.5 rounded-control border px-3 text-sm font-medium transition-colors',
              saved ? 'border-primary/30 bg-primary/10 text-primary-deep' : 'border-border text-text hover:bg-background',
            )}
          >
            {saved ? <BookmarkCheck className="size-4" aria-hidden /> : <Bookmark className="size-4" aria-hidden />}
            {saved ? 'Saved' : 'Save'}
          </button>
          <Link to={jobPath(id)} className={buttonStyles({ size: 'sm' })}>
            View Job
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </span>
      </div>
    </article>
  )
}
