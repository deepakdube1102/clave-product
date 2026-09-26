import { MapPin } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { ProfileData } from '@/types/profile'
import { experienceLevelLabels } from '@/utils/profile'

export function ProfileOverview({ profile, onEdit }: { profile: ProfileData; onEdit: () => void }) {
  const role = profile.targetRoles[0]

  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
      <Avatar name={profile.name || 'You'} size="xl" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-text">{profile.name || 'Your name'}</h2>
          {profile.experienceLevel && <Badge variant="primary">{experienceLevelLabels[profile.experienceLevel]}</Badge>}
        </div>
        <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-secondary">
          <span>{role ?? 'Add a target role'}</span>
          {profile.location && (
            <>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3.5" aria-hidden />
                {profile.location}
              </span>
            </>
          )}
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-secondary">
          {profile.summary || 'Add a short professional summary so your profile tells your story at a glance.'}
        </p>
      </div>
      <Button variant="secondary" onClick={onEdit} className="sm:shrink-0">
        Edit Profile
      </Button>
    </div>
  )
}
