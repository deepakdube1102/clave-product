import { ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { SectionHeader } from '@/components/profile/SectionHeader'
import type { ProfileData } from '@/types/profile'

interface SectionProps {
  profile: ProfileData
  onEdit: () => void
  onAdd: () => void
}

const emptyText = 'text-sm text-muted'

export function ExperienceSection({ profile, onEdit, onAdd }: SectionProps) {
  const items = profile.experience
  return (
    <section>
      <SectionHeader title="Work Experience" onEdit={onEdit} onAdd={onAdd} addLabel="Add Experience" hasContent={items.length > 0} />
      {items.length === 0 ? (
        <p className={emptyText}>No experience added yet. Internships and part-time work count, and projects work just as well.</p>
      ) : (
        <ol className="ml-1.5 border-l border-border">
          {items.map((item) => (
            <li key={item.id} className="relative pb-6 pl-6 last:pb-0">
              <span aria-hidden className="absolute top-1.5 -left-[5px] size-2.5 rounded-full border-2 border-surface bg-primary" />
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="text-base font-semibold text-text">{item.role}</h3>
                {item.period && <p className="text-sm whitespace-nowrap text-secondary">{item.period}</p>}
              </div>
              <p className="text-sm font-medium text-primary">{[item.company, item.location].filter(Boolean).join(' · ')}</p>
              {item.summary && <p className="mt-2 text-sm leading-relaxed whitespace-pre-line text-secondary">{item.summary}</p>}
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}

export function EducationSection({ profile, onEdit, onAdd }: SectionProps) {
  const items = profile.education
  return (
    <section>
      <SectionHeader title="Education" onEdit={onEdit} onAdd={onAdd} addLabel="Add Education" hasContent={items.length > 0} />
      {items.length === 0 ? (
        <p className={emptyText}>No education added yet.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {items.map((item) => (
            <li key={item.id}>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="text-base font-semibold text-text">{item.degree || item.institution}</h3>
                {item.period && <p className="text-sm whitespace-nowrap text-secondary">{item.period}</p>}
              </div>
              {item.degree && <p className="text-sm text-secondary">{item.institution}</p>}
              {item.details && <p className="mt-1 text-sm text-muted">{item.details}</p>}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

const toHref = (url: string) => (/^https?:\/\//i.test(url) ? url : `https://${url}`)

export function ProjectsSection({ profile, onEdit, onAdd }: SectionProps) {
  const items = profile.projects
  return (
    <section>
      <SectionHeader title="Projects" onEdit={onEdit} onAdd={onAdd} addLabel="Add Project" hasContent={items.length > 0} />
      {items.length === 0 ? (
        <p className={emptyText}>No projects added yet. Projects are a great way to show what you can build.</p>
      ) : (
        <ul className="flex flex-col divide-y divide-border">
          {items.map((item) => (
            <li key={item.id} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-base font-semibold text-text">{item.name}</h3>
                {item.link && (
                  <a
                    href={toHref(item.link)}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:text-primary-deep hover:underline"
                  >
                    View project
                    <ExternalLink className="size-3.5" aria-hidden />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </div>
              {item.description && <p className="mt-1 text-sm leading-relaxed whitespace-pre-line text-secondary">{item.description}</p>}
              {item.technologies.length > 0 && (
                <ul className="mt-2.5 flex flex-wrap gap-1.5" aria-label="Tech stack">
                  {item.technologies.map((tech) => (
                    <li key={tech}>
                      <Badge>{tech}</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
