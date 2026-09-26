import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { OnboardingHeader } from '@/components/onboarding/OnboardingHeader'
import { ProfileSections } from '@/components/onboarding/ProfileSections'
import { Button } from '@/components/ui/Button'
import { paths } from '@/routes/navigation'
import { saveProfile } from '@/services/profile.service'
import { useAuthStore } from '@/store/authStore'
import { useOnboardingStore } from '@/store/onboardingStore'
import { toast } from '@/store/toastStore'
import type { ProfileSource } from '@/types/profile'
import { cleanProfile, isSectionEmpty, sectionOrder } from '@/utils/profile'

const backTargets: Record<ProfileSource, string> = {
  resume: `${paths.onboarding}/import-resume`,
  linkedin: `${paths.onboarding}/import-linkedin`,
  manual: `${paths.onboarding}/manual`,
}

export function ReviewPage() {
  const { draft, source, updateDraft, reset } = useOnboardingStore()
  const completeOnboarding = useAuthStore((state) => state.completeOnboarding)
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string>()
  // Decided once on entry: clearing the draft after saving must not bounce us back to /onboarding.
  const [arrivedWithoutDraft] = useState(() => !useOnboardingStore.getState().draft)

  if (arrivedWithoutDraft) return <Navigate to={paths.onboarding} replace />
  if (!draft || !source) return null

  const hasEmptySections = sectionOrder(draft.experienceLevel).some((key) => isSectionEmpty(key, draft))

  const build = async () => {
    setSaving(true)
    setError(undefined)
    try {
      await saveProfile(cleanProfile(draft))
      await completeOnboarding()
      toast.success('Your Career Profile is ready')
      navigate(paths.dashboard, { replace: true })
      reset()
    } catch {
      setError('We couldn’t save your profile. Please try again.')
      setSaving(false)
    }
  }

  return (
    <>
      <OnboardingHeader
        title="Review your Career Profile"
        description="This powers your resumes, job recommendations, and Clave’s AI. Edit anything now, or change it later."
        step={2}
        backTo={backTargets[source]}
      />
      <ProfileSections draft={draft} onChange={updateDraft} />

      <div className="mt-8 flex flex-col gap-3">
        {error && (
          <p role="alert" className="rounded-control border border-error/20 bg-error/5 px-3 py-2 text-sm text-error">
            {error}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-sm text-sm text-secondary">
            {hasEmptySections ? 'Some sections are empty, and that’s fine. You can fill them in any time.' : 'Everything looks complete.'}
          </p>
          <Button size="lg" loading={saving} onClick={build}>
            Build My Career Profile
          </Button>
        </div>
      </div>
    </>
  )
}
