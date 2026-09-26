import { Briefcase, FileText, MessagesSquare, Sparkles, UserCog } from 'lucide-react'
import { LandingContainer } from '@/components/landing/LandingContainer'

const capabilities = [
  { icon: UserCog, name: 'Career Profile', description: 'One structured record of your education, skills, experience and goals.' },
  { icon: FileText, name: 'Resumes', description: 'Build and refine resumes without starting from a blank page.' },
  { icon: Briefcase, name: 'Jobs', description: 'Relevant openings, with match insight and the skills behind each one.' },
  { icon: Sparkles, name: 'AI Assistant', description: 'Career guidance that draws on your own profile, not generic advice.' },
  { icon: MessagesSquare, name: 'AI Mock Interview', description: 'Practice the conversation before the real one.' },
]

export function Capabilities() {
  return (
    <section id="capabilities" className="scroll-mt-8 border-t border-border py-24 md:py-32">
      <LandingContainer>
        <h2 className="max-w-md font-editorial text-4xl leading-tight font-medium tracking-tight text-text">
          Core capabilities
        </h2>
        <ul className="mt-12 divide-y divide-border border-y border-border">
          {capabilities.map(({ icon: Icon, name, description }) => (
            <li key={name} className="grid gap-2 py-6 sm:grid-cols-[2fr_3fr] sm:items-center sm:gap-12">
              <h3 className="flex items-center gap-3 text-base font-semibold text-text">
                <Icon className="size-5 text-primary" strokeWidth={1.75} aria-hidden />
                {name}
              </h3>
              <p className="text-secondary">{description}</p>
            </li>
          ))}
        </ul>
      </LandingContainer>
    </section>
  )
}
