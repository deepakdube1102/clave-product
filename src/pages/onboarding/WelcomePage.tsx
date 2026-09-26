import { ArrowRight, FileUp, PenLine } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { paths } from '@/routes/navigation'

const options: Array<{ to: string; icon: ReactNode; title: string; description: string }> = [
  {
    to: `${paths.onboarding}/import-resume`,
    icon: <FileUp className="size-5" strokeWidth={1.75} aria-hidden />,
    title: 'Import Resume',
    description: 'Start with your existing resume.',
  },
  {
    to: `${paths.onboarding}/import-linkedin`,
    icon: (
      <span className="text-sm leading-none font-bold" aria-hidden>
        in
      </span>
    ),
    title: 'Import LinkedIn',
    description: 'Bring in your professional profile.',
  },
  {
    to: `${paths.onboarding}/manual`,
    icon: <PenLine className="size-5" strokeWidth={1.75} aria-hidden />,
    title: 'Build Manually',
    description: 'Add your career details yourself.',
  },
]

export function WelcomePage() {
  return (
    <div className="mx-auto w-full max-w-xl pt-4 sm:pt-10">
      <h1 className="font-editorial text-4xl font-medium tracking-tight text-text sm:text-5xl">Welcome to Clave</h1>
      <p className="mt-3 text-xl text-text">Let’s build your career profile.</p>
      <p className="mt-2 text-secondary">
        Your Career Profile powers your resumes, job recommendations, and Clave’s AI.
      </p>

      <ul className="mt-10 flex flex-col gap-3">
        {options.map(({ to, icon, title, description }) => (
          <li key={to}>
            <Link
              to={to}
              className="group flex items-center gap-4 rounded-default border border-border bg-surface p-4 shadow-xs transition-colors hover:border-muted"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-control icon-tile">
                {icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-text">{title}</span>
                <span className="mt-0.5 block text-sm text-secondary">{description}</span>
              </span>
              <ArrowRight
                className="size-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-text"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
