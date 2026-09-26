import { Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { SectionHeader } from '@/components/profile/SectionHeader'
import { paths } from '@/routes/navigation'
import type { ProfileData } from '@/types/profile'
import { deriveProfileInsight } from '@/utils/profileInsight'
import { workModeLabels } from '@/utils/profile'

const PRIMARY_SKILL_COUNT = 4

export function SkillsPanel({ profile, onEdit }: { profile: ProfileData; onEdit: () => void }) {
  const primary = profile.skills.slice(0, PRIMARY_SKILL_COUNT)
  const rest = profile.skills.slice(PRIMARY_SKILL_COUNT)

  return (
    <section>
      <SectionHeader title={`Skills${profile.skills.length ? ` (${profile.skills.length})` : ''}`} onEdit={onEdit} compact hasContent={profile.skills.length > 0} />
      {profile.skills.length === 0 ? (
        <p className="text-sm text-muted">No skills added yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          <ul className="flex flex-wrap gap-1.5" aria-label="Primary skills">
            {primary.map((skill) => (
              <li key={skill}>
                <Badge variant="primary" className="px-3 py-1 text-sm font-semibold">
                  {skill}
                </Badge>
              </li>
            ))}
          </ul>
          {rest.length > 0 && (
            <ul className="flex flex-wrap gap-1.5" aria-label="Other skills">
              {rest.map((skill) => (
                <li key={skill}>
                  <Badge>{skill}</Badge>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  )
}

function DirectionRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-medium tracking-wide text-muted uppercase">{label}</dt>
      <dd className="mt-1 text-sm text-text">{children}</dd>
    </div>
  )
}

export function CareerDirectionPanel({ profile, onEdit }: { profile: ProfileData; onEdit: () => void }) {
  const notSet = <span className="text-muted">Not set</span>
  const hasContent = profile.targetRoles.length + profile.workModes.length + profile.industries.length > 0 || !!profile.preferredLocations

  return (
    <section>
      <SectionHeader title="Career Direction" onEdit={onEdit} compact hasContent={hasContent} />
      <dl className="flex flex-col gap-4">
        <DirectionRow label="Target roles">
          {profile.targetRoles.length > 0 ? (
            <span className="flex flex-wrap gap-1.5">
              {profile.targetRoles.map((role) => (
                <Badge key={role} variant="primary">
                  {role}
                </Badge>
              ))}
            </span>
          ) : (
            notSet
          )}
        </DirectionRow>
        <DirectionRow label="Preferred locations">{profile.preferredLocations || notSet}</DirectionRow>
        <DirectionRow label="Work type">
          {profile.workModes.length > 0 ? profile.workModes.map((mode) => workModeLabels[mode]).join(', ') : notSet}
        </DirectionRow>
        <DirectionRow label="Industries">{profile.industries.length > 0 ? profile.industries.join(', ') : notSet}</DirectionRow>
      </dl>
    </section>
  )
}

export function ClaveInsightCard({ profile }: { profile: ProfileData }) {
  return (
    <aside className="surface-dark rounded-default bg-brand-feature p-5 text-white shadow-card">
      <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-primary-on-dark uppercase">
        <Sparkles className="size-3.5" aria-hidden />
        Clave Insight
      </p>
      <p className="mt-3 font-editorial text-lg leading-snug text-white">{deriveProfileInsight(profile)}</p>
      <Link to={paths.assistant} className="mt-4 inline-block text-sm font-medium text-white/90 hover:text-white hover:underline">
        Talk to AI Assistant →
      </Link>
    </aside>
  )
}
