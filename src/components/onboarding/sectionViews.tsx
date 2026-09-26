import { Badge } from '@/components/ui/Badge'
import type { ProfileData } from '@/types/profile'
import { experienceLevelLabels, workModeLabels } from '@/utils/profile'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-medium tracking-wide text-muted uppercase">{label}</dt>
      <dd className="mt-1 text-sm text-text">{children}</dd>
    </div>
  )
}

const missing = <span className="text-muted">Not added</span>

export function OverviewView({ data }: { data: ProfileData }) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2">
      <Field label="Name">{data.name || missing}</Field>
      <Field label="Experience level">{data.experienceLevel ? experienceLevelLabels[data.experienceLevel] : missing}</Field>
      <Field label="Target roles">
        {data.targetRoles.length > 0 ? (
          <span className="flex flex-wrap gap-1.5">
            {data.targetRoles.map((role) => (
              <Badge key={role} variant="primary">
                {role}
              </Badge>
            ))}
          </span>
        ) : (
          missing
        )}
      </Field>
      <Field label="Location">{data.location || missing}</Field>
      <Field label="Email">{data.email || missing}</Field>
      <Field label="Phone">{data.phone || missing}</Field>
    </dl>
  )
}

const entryList = 'flex flex-col divide-y divide-border'

export function ExperienceView({ data }: { data: ProfileData }) {
  return (
    <ul className={entryList}>
      {data.experience.map((e) => (
        <li key={e.id} className="py-3 first:pt-0 last:pb-0">
          <p className="text-sm font-medium text-text">{[e.role, e.company].filter(Boolean).join(' · ')}</p>
          {e.period && <p className="text-sm text-secondary">{e.period}</p>}
          {e.summary && <p className="mt-1 text-sm text-secondary">{e.summary}</p>}
        </li>
      ))}
    </ul>
  )
}

export function EducationView({ data }: { data: ProfileData }) {
  return (
    <ul className={entryList}>
      {data.education.map((e) => (
        <li key={e.id} className="py-3 first:pt-0 last:pb-0">
          <p className="text-sm font-medium text-text">{e.institution}</p>
          <p className="text-sm text-secondary">{[e.degree, e.period].filter(Boolean).join(' · ')}</p>
        </li>
      ))}
    </ul>
  )
}

export function ProjectsView({ data }: { data: ProfileData }) {
  return (
    <ul className={entryList}>
      {data.projects.map((p) => (
        <li key={p.id} className="py-3 first:pt-0 last:pb-0">
          <p className="text-sm font-medium text-text">{p.name}</p>
          {p.description && <p className="mt-0.5 text-sm text-secondary">{p.description}</p>}
          {p.technologies.length > 0 && (
            <p className="mt-2 flex flex-wrap gap-1.5">
              {p.technologies.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </p>
          )}
        </li>
      ))}
    </ul>
  )
}

export function SkillsView({ data }: { data: ProfileData }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Skills">
      {data.skills.map((skill) => (
        <li key={skill}>
          <Badge>{skill}</Badge>
        </li>
      ))}
    </ul>
  )
}

export function CertificationsView({ data }: { data: ProfileData }) {
  return (
    <div className="flex flex-col gap-3">
      {data.certifications.length > 0 && (
        <ul className={entryList}>
          {data.certifications.map((c) => (
            <li key={c.id} className="py-3 first:pt-0 last:pb-0">
              <p className="text-sm font-medium text-text">{c.name}</p>
              <p className="text-sm text-secondary">{[c.issuer, c.year].filter(Boolean).join(' · ')}</p>
            </li>
          ))}
        </ul>
      )}
      {data.achievements.length > 0 && (
        <ul className="list-disc pl-5 text-sm text-secondary marker:text-muted">
          {data.achievements.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function LinksView({ data }: { data: ProfileData }) {
  return (
    <ul className="flex flex-col gap-1.5">
      {data.links.map((l) => (
        <li key={l.id} className="text-sm">
          <span className="font-medium text-text">{l.label}</span> <span className="text-secondary">{l.url}</span>
        </li>
      ))}
    </ul>
  )
}

export function PreferencesView({ data }: { data: ProfileData }) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2">
      <Field label="Work style">
        {data.workModes.length > 0 ? data.workModes.map((m) => workModeLabels[m]).join(', ') : missing}
      </Field>
      <Field label="Preferred locations">{data.preferredLocations || missing}</Field>
    </dl>
  )
}
