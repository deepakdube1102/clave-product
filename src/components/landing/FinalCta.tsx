import { LandingContainer } from '@/components/landing/LandingContainer'
import { LandingCtas } from '@/components/landing/LandingCtas'

export function FinalCta() {
  return (
    <section className="py-20 md:py-28">
      <LandingContainer>
        <div className="relative flex flex-col items-center px-6 py-8 text-center sm:py-12">
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl leading-tight font-medium tracking-tight text-black">
            Ready to build your <em className="italic text-black">next?</em>
          </h2>
          <p className="mt-4 max-w-md text-base sm:text-lg text-black/70 leading-relaxed">
            Set up your career profile in minutes and let the rest follow.
          </p>
          <div className="mt-10">
            <LandingCtas tone="light" className="justify-center" />
          </div>
        </div>
      </LandingContainer>
    </section>
  )
}
