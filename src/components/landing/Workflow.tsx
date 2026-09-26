import { ArrowDown, ArrowRight, Briefcase, FileText, UserCog } from 'lucide-react'
import { Fragment } from 'react'
import { LandingContainer } from '@/components/landing/LandingContainer'

const nodes = [
  { icon: UserCog, name: 'Career Profile', description: 'Who you are and where you’re headed.' },
  { icon: FileText, name: 'Resume', description: 'Built from your profile, ready to send.' },
  { icon: Briefcase, name: 'Jobs', description: 'Roles matched to both.' },
]

export function Workflow() {
  return (
    <section className="surface-dark bg-sidebar py-24 text-white md:py-32">
      <LandingContainer>
        <h2 className="max-w-2xl font-editorial text-4xl leading-tight font-medium tracking-tight sm:text-5xl">
          One profile. <em className="text-primary-on-dark">Every next step.</em>
        </h2>
        <p className="mt-4 max-w-xl text-muted">
          Your career profile feeds your resume. Together, they point to the jobs worth your time.
        </p>

        <ol className="mt-14 flex flex-col items-stretch gap-3 md:flex-row md:items-center">
          {nodes.map(({ icon: Icon, name, description }, index) => (
            <Fragment key={name}>
              <li className="flex-1 rounded-default border border-white/15 p-6">
                <Icon className="size-6 text-primary-on-dark" strokeWidth={1.5} aria-hidden />
                <h3 className="mt-6 text-lg font-semibold">{name}</h3>
                <p className="mt-1 text-sm text-muted">{description}</p>
              </li>
              {index < nodes.length - 1 && (
                <li aria-hidden className="flex justify-center text-primary-on-dark">
                  <ArrowRight className="hidden size-5 md:block" />
                  <ArrowDown className="size-5 md:hidden" />
                </li>
              )}
            </Fragment>
          ))}
        </ol>
      </LandingContainer>
    </section>
  )
}
