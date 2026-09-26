import { useState } from 'react'
import { EditSectionModal } from '@/components/profile/EditSectionModal'
import type { EditRequest } from '@/components/profile/EditSectionModal'
import { ProfileOverview } from '@/components/profile/ProfileOverview'
import { CareerDirectionPanel, ClaveInsightCard, SkillsPanel } from '@/components/profile/SidePanels'
import { EducationSection, ExperienceSection, ProjectsSection } from '@/components/profile/WorkSections'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { LoadingState } from '@/components/ui/LoadingState'
import { useProfile } from '@/hooks/useProfile'
import { useAuthStore } from '@/store/authStore'
import { toast } from '@/store/toastStore'
import type { ProfileData } from '@/types/profile'
import { emptyProfile } from '@/utils/profile'

export function ProfilePage() {
  const { state, save } = useProfile()
  const user = useAuthStore((store) => store.user)
  const [request, setRequest] = useState<EditRequest | null>(null)

  const profile: ProfileData | null =
    state.status === 'ready' ? (state.profile ?? emptyProfile(user?.name, user?.email)) : null

  const saveAndNotify = async (next: ProfileData) => {
    await save(next)
    toast.success('Profile updated')
  }

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">Your Career Profile</h1>
        <p className="mt-1 max-w-2xl text-secondary">
          Your professional identity that powers your resumes, job recommendations, and Clave’s AI.
        </p>
      </header>

      {state.status === 'loading' && <LoadingState label="Loading your profile…" />}
      {state.status === 'error' && (
        <EmptyState title="Couldn’t load your profile" description="Please refresh the page to try again." />
      )}

      {profile && (
        <Card padding="none" className="relative overflow-hidden p-5 sm:p-8">
          <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-brand" />
          <ProfileOverview profile={profile} onEdit={() => setRequest({ section: 'overview' })} />

          <div className="mt-8 grid gap-10 border-t border-border pt-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-12">
            <div className="flex flex-col gap-10">
              <ExperienceSection
                profile={profile}
                onEdit={() => setRequest({ section: 'experience' })}
                onAdd={() => setRequest({ section: 'experience', addNew: true })}
              />
              <div className="border-t border-border pt-10">
                <EducationSection
                  profile={profile}
                  onEdit={() => setRequest({ section: 'education' })}
                  onAdd={() => setRequest({ section: 'education', addNew: true })}
                />
              </div>
              <div className="border-t border-border pt-10">
                <ProjectsSection
                  profile={profile}
                  onEdit={() => setRequest({ section: 'projects' })}
                  onAdd={() => setRequest({ section: 'projects', addNew: true })}
                />
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-8 rounded-default border border-primary/10 bg-tint p-5">
                <SkillsPanel profile={profile} onEdit={() => setRequest({ section: 'skills' })} />
                <div className="border-t border-border pt-8">
                  <CareerDirectionPanel profile={profile} onEdit={() => setRequest({ section: 'direction' })} />
                </div>
              </div>
              <ClaveInsightCard profile={profile} />
            </div>
          </div>
        </Card>
      )}

      {request && profile && (
        <EditSectionModal request={request} profile={profile} onClose={() => setRequest(null)} onSave={saveAndNotify} />
      )}
    </div>
  )
}
