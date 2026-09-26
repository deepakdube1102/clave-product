import { Check } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ImportProgress } from '@/components/onboarding/ImportProgress'
import { OnboardingHeader } from '@/components/onboarding/OnboardingHeader'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { linkStyles } from '@/components/ui/linkStyles'
import { paths } from '@/routes/navigation'
import { importLinkedIn, isValidLinkedInUrl } from '@/services/import.service'
import { useAuthStore } from '@/store/authStore'
import { useOnboardingStore } from '@/store/onboardingStore'

const STAGES = ['Connecting to LinkedIn…', 'Importing your professional profile…']
const IMPORTS = ['Experience', 'Education', 'Skills', 'Projects', 'Profile links']

export function ImportLinkedInPage() {
  const user = useAuthStore((state) => state.user)
  const setDraft = useOnboardingStore((state) => state.setDraft)
  const navigate = useNavigate()

  const [url, setUrl] = useState('')
  const [fieldError, setFieldError] = useState<string>()
  const [formError, setFormError] = useState<string>()
  const [importing, setImporting] = useState(false)
  const [stage, setStage] = useState(STAGES[0])
  const mounted = useRef(true)

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!user) return
    if (!isValidLinkedInUrl(url)) {
      setFieldError('Enter a LinkedIn profile link, like linkedin.com/in/your-name.')
      return
    }
    setFieldError(undefined)
    setFormError(undefined)
    setStage(STAGES[0])
    setImporting(true)
    try {
      const data = await importLinkedIn(url, { name: user.name, email: user.email }, setStage)
      if (!mounted.current) return
      setDraft(data, 'linkedin')
      navigate(`${paths.onboarding}/review`)
    } catch {
      if (!mounted.current) return
      setFormError('We couldn’t import that profile. Check the link and try again.')
      setImporting(false)
    }
  }

  if (importing) {
    return (
      <>
        <OnboardingHeader title="Importing your profile" step={1} />
        <ImportProgress stages={STAGES} current={stage} />
      </>
    )
  }

  return (
    <>
      <OnboardingHeader
        title="Import from LinkedIn"
        description="Paste your profile link and Clave will bring in the essentials for you to review."
        step={1}
        backTo={paths.onboarding}
      />

      <Card padding="none" className="p-5 sm:p-6">
        <p className="text-sm font-semibold text-text">What we’ll import</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {IMPORTS.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-sm text-secondary">
              <Check className="size-4 shrink-0 text-primary" strokeWidth={2.25} aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </Card>

      <form onSubmit={onSubmit} noValidate className="mt-6 flex flex-col gap-4">
        {formError && (
          <p role="alert" className="rounded-control border border-error/20 bg-error/5 px-3 py-2 text-sm text-error">
            {formError}
          </p>
        )}
        <Input
          label="LinkedIn profile link"
          placeholder="linkedin.com/in/your-name"
          inputMode="url"
          autoComplete="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          error={fieldError}
        />
        <div>
          <Button type="submit" size="lg">
            Import profile
          </Button>
        </div>
      </form>

      <p className="mt-6 text-sm text-secondary">
        Prefer another way?{' '}
        <Link to={`${paths.onboarding}/import-resume`} className={linkStyles}>
          Import a resume
        </Link>{' '}
        or{' '}
        <Link to={`${paths.onboarding}/manual`} className={linkStyles}>
          build manually
        </Link>
        .
      </p>
    </>
  )
}
