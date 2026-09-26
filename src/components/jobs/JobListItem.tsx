import { Bookmark, BookmarkCheck } from 'lucide-react'
import { CompanyLogo } from '@/components/jobs/CompanyLogo'
import { Badge } from '@/components/ui/Badge'
import type { Job } from '@/types/job'
import { cn } from '@/utils/cn'
import { workTypeLabels } from '@/utils/jobFilters'
import { postedLabel } from '@/utils/relativeTime'

interface JobListItemProps {
  job: Job
  selected: boolean
  saved: boolean
  onSelect: () => void
  onToggleSave: () => void
}

/** Compact row for the desktop split view. The whole row selects; the bookmark sits above it. */
export function JobListItem({ job, selected, saved, onSelect, onToggleSave }: JobListItemProps) {
  const { title, company, city, workType, experience, matchPercent, postedDaysAgo, skills } = job

  return (
    <div
      className={cn(
        'relative h-[122px] rounded-default border bg-surface transition-colors',
        selected ? 'border-primary/40 bg-tint shadow-card ring-1 ring-primary/20' : 'border-border hover:border-primary/30',
      )}
    >
      <button
        type="button"
        aria-current={selected ? 'true' : undefined}
        aria-label={`${title} at ${company}`}
        onClick={onSelect}
        className="flex h-full w-full items-start gap-3.5 rounded-default p-3.5 pr-12 text-left"
      >
        <CompanyLogo company={company} className="size-10 rounded-[11px]" />
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2">
            <span className="truncate text-sm font-semibold text-text">{title}</span>
            <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary-deep ring-1 ring-inset ring-primary/20">{matchPercent}% match</span>
          </span>
          <span className="mt-1 block truncate text-xs text-secondary">
            {company} · {city === 'Remote' ? 'India' : city} · {workTypeLabels[workType]} · {experience}
          </span>
          <span className="mt-3 flex flex-nowrap gap-1.5 overflow-hidden">
            {skills.slice(0, 3).map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </span>
        </span>
      </button>
      <span className="pointer-events-none absolute top-3 right-3 text-xs text-muted">{postedLabel(postedDaysAgo)}</span>
      <button
        type="button"
        aria-pressed={saved}
        aria-label={`Save ${title} at ${company}`}
        onClick={onToggleSave}
        className={cn(
          'absolute right-2.5 bottom-2.5 flex size-8 items-center justify-center rounded-control transition-colors',
          saved ? 'bg-primary/10 text-primary' : 'text-muted hover:bg-background hover:text-text',
        )}
      >
        {saved ? <BookmarkCheck className="size-[18px]" aria-hidden /> : <Bookmark className="size-[18px]" aria-hidden />}
      </button>
    </div>
  )
}
