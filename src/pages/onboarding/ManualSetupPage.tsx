import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { OnboardingHeader } from '@/components/onboarding/OnboardingHeader'
import { ProfileSections } from '@/components/onboarding/ProfileSections'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { TagInput } from '@/components/ui/TagInput'
import { paths } from '@/routes/navigation'
import { useAuthStore } from '@/store/authStore'
import { useOnboardingStore } from '@/store/onboardingStore'
import type { ExperienceLevel, ProfileData } from '@/types/profile'
import { emptyProfile, experienceLevelLabels, isEarlyStage, isSectionEmpty, sectionOrder } from '@/utils/profile'

interface EssentialsProps {
  draft: ProfileData
  onContinue: (next: ProfileData) => void
}

function Essentials({ draft, onContinue }: EssentialsProps) {
  const [name, setName] = useState(draft.name)
  const [roles, setRoles] = useState(draft.targetRoles)
  const [level, setLevel] = useState<ExperienceLevel | ''>(draft.experienceLevel ?? '')
  const [errors, setErrors] = useState<{ name?: string; roles?: string; level?: string }>({})

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const next: typeof errors = {}
    if (!name.trim()) next.name = 'Tell us your name.'
    if (roles.length === 0) next.roles = 'Add at least one role you’re aiming for.'
    if (!level) next.level = 'Choose the option that fits you best.'
    setErrors(next)
    if (Object.keys(next).length > 0 || !level) return
    onContinue({ ...draft, name: name.trim(), targetRoles: roles, experienceLevel: level })
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <Input label="Your name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
      <TagInput
        label="Target role(s)"
        placeholder="e.g. Frontend Developer"
        hint="The roles you’re aiming for. Press Enter after each one."
        value={roles}
        onChange={setRoles}
        error={errors.roles}
      />
      <Select label="Experience level" value={level} onChange={(e) => setLevel(e.target.value as ExperienceLevel | '')} error={errors.level}>
        <option value="">Select…</option>
        {Object.entries(experienceLevelLabels).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </Select>
      <div>
        <Button type="submit" size="lg">
          Continue
        </Button>
      </div>
    </form>
  )
}

export function ManualSetupPage() {
  const user = useAuthStore((state) => state.user)
  const { draft, source, setDraft, updateDraft } = useOnboardingStore()
  const navigate = useNavigate()
  const [phase, setPhase] = useState<'essentials' | 'optional'>('essentials')

  useEffect(() => {
    if (source !== 'manual' && user) setDraft(emptyProfile(user.name, user.email), 'manual')
  }, [source, user, setDraft])

  if (!draft || source !== 'manual') return null

  if (phase === 'essentials') {
    return (
      <>
        <OnboardingHeader
          title="Let’s start with the essentials"
          description="Just three things. Everything else is optional."
          step={1}
          backTo={paths.onboarding}
        />
        <Essentials
          draft={draft}
          onContinue={(next) => {
            updateDraft(next)
            setPhase('optional')
          }}
        />
      </>
    )
  }

  const optionalKeys = sectionOrder(draft.experienceLevel).filter((key) => key !== 'overview')
  const hasOptional = optionalKeys.some((key) => !isSectionEmpty(key, draft))

  return (
    <>
      <OnboardingHeader
        title="Anything else to add?"
        description={
          isEarlyStage(draft.experienceLevel)
            ? 'All optional. Projects and education are a great place to start; they matter as much as work experience.'
            : 'All optional. Add what you have now and finish the rest whenever you like.'
        }
        step={1}
        onBack={() => setPhase('essentials')}
      />
      <ProfileSections draft={draft} onChange={updateDraft} only={optionalKeys} />
      <div className="mt-8 flex justify-end">
        <Button size="lg" variant={hasOptional ? 'primary' : 'secondary'} onClick={() => navigate(`${paths.onboarding}/review`)}>
          {hasOptional ? 'Continue' : 'Skip for now'}
        </Button>
      </div>
    </>
  )
}
