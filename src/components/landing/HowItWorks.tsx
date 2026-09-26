import { LandingContainer } from '@/components/landing/LandingContainer'

const steps = [
  {
    title: 'Tell Clave about you',
    description:
      'Share your education, skills, projects and goals once. Your career profile becomes the foundation for everything else.',
  },
  {
    title: 'Build a resume that fits',
    description: 'Create clear, well-structured resumes from your profile, with AI helping shape the wording.',
  },
  {
    title: 'Discover relevant jobs',
    description:
      'See roles that match your background, along with the skills that make each one a fit, and save the ones worth pursuing.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-8 border-t border-border py-24 md:py-32">
      <LandingContainer className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-20">
        <div>
          <h2 className="font-editorial text-4xl leading-tight font-medium tracking-tight text-text">
            How Clave works
          </h2>
          <p className="mt-4 text-secondary">Three steps from where you are to where you’re headed.</p>
        </div>
        <ol className="divide-y divide-border border-y border-border">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-6 py-8 sm:gap-10">
              <span className="font-editorial text-3xl text-muted" aria-hidden>
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-text">{step.title}</h3>
                <p className="mt-2 max-w-lg leading-relaxed text-secondary">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </LandingContainer>
    </section>
  )
}
