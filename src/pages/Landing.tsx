import { Capabilities } from '@/components/landing/Capabilities'
import { FinalCta } from '@/components/landing/FinalCta'
import { Hero } from '@/components/landing/Hero'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { LandingFooter } from '@/components/landing/LandingFooter'
import { Workflow } from '@/components/landing/Workflow'
import { ScrollReveal } from '@/components/transitions/ScrollReveal'

export function Landing() {
  return (
    <div className="min-h-screen bg-[#030706] text-[#F5F7F6]">
      {/* Hero container pulling behind transparent navbar for full-bleed wave backdrop */}
      <div className="surface-dark relative -mt-20 pt-20 flex min-h-dvh flex-col overflow-hidden bg-black text-white">
        <Hero />
      </div>

      <main className="bg-canvas text-text">
        <ScrollReveal>
          <HowItWorks />
        </ScrollReveal>
        <ScrollReveal>
          <Capabilities />
        </ScrollReveal>
        <ScrollReveal>
          <Workflow />
        </ScrollReveal>
        <ScrollReveal>
          <FinalCta />
        </ScrollReveal>
      </main>

      <LandingFooter />
    </div>
  )
}
