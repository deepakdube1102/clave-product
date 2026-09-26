import { ArrowRight, GraduationCap, Zap, Users, TrendingUp, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'
import GradientWaves from '@/components/effects/GradientWaves'
import { LandingContainer } from '@/components/landing/LandingContainer'
import { LandingFooter } from '@/components/landing/LandingFooter'
import { paths } from '@/routes/navigation'
import { ScrollReveal } from '@/components/transitions/ScrollReveal'

import teamPhoto from '@/assets/about/team.png'
import naimPhoto from '@/assets/about/naim.png'
import deepakPhoto from '@/assets/about/deepak.png'
import shravaniPhoto from '@/assets/about/shravani.png'
import zohaPhoto from '@/assets/about/zoha.png'

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

const FOUNDERS = [
  {
    name: 'Naim Nayak',
    roleTag: 'Founder',
    roleName: 'Developer',
    image: naimPhoto,
    description: 'Builds and ships products, handles product development and technical architecture, and turns ideas into reality.',
    socials: [
      { name: 'LinkedIn', icon: LinkedInIcon, href: 'https://linkedin.com' },
      { name: 'GitHub', icon: GithubIcon, href: 'https://github.com' },
    ],
  },
  {
    name: 'Deepak Dubey',
    roleTag: 'Co-founder',
    roleName: 'Product Designer',
    image: deepakPhoto,
    description: 'Designs intuitive experiences, focuses on product design and user experience, and makes technology simple and useful.',
    socials: [
      { name: 'LinkedIn', icon: LinkedInIcon, href: 'https://linkedin.com' },
      { name: 'Portfolio', icon: Globe, href: 'https://dribbble.com' },
    ],
  },
  {
    name: 'Shravani Sawant',
    roleTag: 'Co-founder',
    roleName: 'Marketing',
    image: shravaniPhoto,
    description: 'Builds the brand and community, leads marketing, and helps connect our products with the right students and opportunities.',
    socials: [
      { name: 'LinkedIn', icon: LinkedInIcon, href: 'https://linkedin.com' },
      { name: 'Instagram', icon: InstagramIcon, href: 'https://instagram.com' },
    ],
  },
  {
    name: 'Zoha Sayyed',
    roleTag: 'Co-founder',
    roleName: 'Finance',
    image: zohaPhoto,
    description: 'Keeps the business grounded and sustainable, manages finance and operations, and helps us build for the long run.',
    socials: [
      { name: 'LinkedIn', icon: LinkedInIcon, href: 'https://linkedin.com' },
      { name: 'Instagram', icon: InstagramIcon, href: 'https://instagram.com' },
    ],
  },
]

const VALUES = [
  {
    icon: GraduationCap,
    title: 'Student First',
    description: 'We build for students and early professionals, not just companies.',
  },
  {
    icon: Zap,
    title: 'Practical Impact',
    description: 'We focus on real problems and practical solutions that create opportunities.',
  },
  {
    icon: Users,
    title: 'Open & Collaborative',
    description: 'We believe in learning, sharing, and growing together.',
  },
  {
    icon: TrendingUp,
    title: 'Long-term Thinking',
    description: 'We build sustainable products that create lasting value.',
  },
]

export function AboutPage() {
  return (
    <div className="relative min-h-dvh flex flex-col bg-black text-[#F5F7F6] overflow-hidden">
      {/* Emerald gradient wave on pure black background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-55">
        <GradientWaves
          horizonColor="#000000"
          waveColor="#087F5B"
          crestColor="#10B981"
          speed={0.25}
          fogDepth={40}
          height={2.8}
          brightness={1.05}
          grainIntensity={0.03}
        />
      </div>

      {/* Atmospheric vignette overlays to keep content readable on black */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(16,185,129,0.08),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90"
      />

      <main className="relative z-10 flex-1 pt-6 sm:pt-8 lg:pt-12 pb-20 sm:pb-28">
        <LandingContainer className="max-w-[1200px]">
          {/* 3. ABOUT HERO: Center aligned, Newsreader heading */}
          <div className="text-center max-w-3xl mx-auto">
            <span className="animate-entrance-eyebrow text-xs font-semibold tracking-widest text-[#10B981] uppercase block">
              ABOUT ATELIER DEVS
            </span>

            <h1 className="animate-entrance-heading mt-3 font-editorial text-4xl sm:text-5xl lg:text-[56px] font-medium tracking-tight text-[#F5F7F6] leading-[1.1]">
              Students building better products,{' '}
              <em className="text-[#10B981] font-normal italic font-editorial">together.</em>
            </h1>

            <p className="animate-entrance-subtext mt-4 text-sm sm:text-base lg:text-lg leading-relaxed text-[#A7B5B1] max-w-2xl mx-auto">
              Atelier Devs is a student-led product studio building practical, AI-powered products that help students and early-career professionals prepare for real opportunities.
            </p>
          </div>

          {/* 4. TEAM PHOTO SECTION - Shifted up */}
          <div className="animate-entrance-cta relative mt-6 sm:mt-8 lg:mt-10 max-w-[1140px] mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-5 lg:gap-7">
              {/* Left Editorial Annotation - Dedicated width, always visible, never hidden by image */}
              <div className="hidden lg:flex flex-col items-end text-right select-none shrink-0 w-32 self-center lg:-mt-10">
                <span className="font-editorial italic text-base text-[#10B981] font-normal leading-tight">
                  Different skills.
                </span>
                <span className="font-editorial italic text-base text-[#F5F7F6]/90 font-normal leading-tight">
                  Same mission.
                </span>
                <svg className="w-10 h-8 mt-1.5 text-[#10B981]/70" viewBox="0 0 40 32" fill="none">
                  <path
                    d="M4 6 C16 20, 26 24, 36 26"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="2 3"
                  />
                  <path
                    d="M30 27 L36 26 L35 20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Main Team Image Container */}
              <div className="relative w-full max-w-[860px] rounded-2xl border border-[#19352F] bg-[#071A17]/80 p-2 sm:p-2.5 backdrop-blur-sm shadow-[0_0_55px_-10px_rgba(16,185,129,0.28)] shrink">
                <img
                  src={teamPhoto}
                  alt="Atelier Devs Team working together"
                  className="w-full h-auto rounded-xl object-cover block"
                />
              </div>

              {/* Right Editorial Annotation - Dedicated width, always visible, never hidden by image */}
              <div className="hidden lg:flex flex-col items-start select-none shrink-0 w-32 self-center lg:-mt-6">
                <span className="font-editorial italic text-[15px] leading-snug text-[#A7B5B1] font-normal">
                  Building tools for a <em className="text-[#10B981] font-normal not-italic">brighter tomorrow.</em>
                </span>
              </div>
            </div>

            {/* Mobile/Tablet annotations (visible when side columns collapse) */}
            <div className="flex lg:hidden items-center justify-between mt-3 px-2 text-xs sm:text-sm">
              <span className="font-editorial italic text-[#10B981]">Different skills. Same mission.</span>
              <span className="font-editorial italic text-[#A7B5B1]">
                Building tools for a <em className="text-[#10B981] not-italic">brighter tomorrow.</em>
              </span>
            </div>

            {/* Below Image Editorial Text (Tag) - Shifted up closer to image */}
            <p className="mt-4 sm:mt-5 text-center text-sm sm:text-base leading-relaxed text-[#A7B5B1] max-w-2xl mx-auto">
              We combine design, technology, marketing, and business to create simple, powerful products that make career growth more accessible for students.
            </p>
          </div>

          {/* 5. MEET THE FOUNDERS */}
          <ScrollReveal>
            <div className="mt-16 sm:mt-24 lg:mt-28 border-t border-[#19352F]/70 pt-14 sm:pt-16">
              <div>
                <span className="text-xs font-semibold tracking-widest text-[#10B981] uppercase">
                  MEET THE FOUNDERS
                </span>
                <h2 className="mt-2 font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#F5F7F6]">
                  A small team with a big vision.
                </h2>
                <p className="mt-3 text-sm sm:text-base text-[#A7B5B1] max-w-2xl">
                  We're a group of students, builders, designers, and problem-solvers working to make career growth simpler and more accessible.
                </p>
              </div>

              {/* Founder Cards Grid: 4 columns on desktop, 2x2 tablet, stacked mobile */}
              <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
                {FOUNDERS.map((founder) => (
                  <div
                    key={founder.name}
                    className="group relative flex flex-col justify-between rounded-[16px] border border-[#19352F] bg-[#071A17] p-4.5 sm:p-5 transition-all duration-200 hover:border-[#10B981]/50 hover:bg-[#071A17]/95"
                  >
                    <div>
                      {/* Portrait */}
                      <div className="overflow-hidden rounded-[12px] border border-[#19352F]/80 bg-black/40 aspect-[4/3]">
                        <img
                          src={founder.image}
                          alt={founder.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      </div>

                      {/* Info */}
                      <div className="mt-4">
                        <h3 className="text-base font-semibold text-[#F5F7F6] leading-tight">
                          {founder.name}
                        </h3>
                        <div className="mt-1 flex items-center gap-1.5 text-xs text-[#10B981] font-medium">
                          <span>{founder.roleTag}</span>
                          <span className="text-[#6F7D79]">•</span>
                          <span>{founder.roleName}</span>
                        </div>
                        <p className="mt-2.5 text-[13px] leading-relaxed text-[#A7B5B1]">
                          {founder.description}
                        </p>
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="mt-5 pt-4 border-t border-[#19352F]/60 flex items-center gap-3">
                      {founder.socials.map((social) => {
                        const Icon = social.icon
                        return (
                          <a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${founder.name} on ${social.name}`}
                            className="text-[#6F7D79] transition-colors hover:text-[#10B981] btn-micro-interact"
                          >
                            <Icon className="size-4" />
                          </a>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* 6. OUR VALUES */}
          <ScrollReveal>
            <div className="mt-24 sm:mt-32 border-t border-[#19352F]/70 pt-16 sm:pt-20">
              <div>
                <span className="text-xs font-semibold tracking-widest text-[#10B981] uppercase">
                  OUR VALUES
                </span>
                <h2 className="mt-2 font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#F5F7F6]">
                  What drives us.
                </h2>
                <p className="mt-3 text-sm sm:text-base text-[#A7B5B1] max-w-xl">
                  These values guide how we build, make decisions, and show up every day.
                </p>
              </div>

              {/* Values Cards */}
              <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {VALUES.map((val) => {
                  const Icon = val.icon
                  return (
                    <div
                      key={val.title}
                      className="flex flex-col rounded-[16px] border border-[#19352F] bg-[#071A17] p-5 sm:p-6 transition-all duration-200 hover:border-[#10B981]/40"
                    >
                      <div className="size-10 rounded-lg bg-[#087F5B]/20 border border-[#087F5B]/40 flex items-center justify-center text-[#10B981] shrink-0">
                        <Icon className="size-5" />
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-[#F5F7F6]">{val.title}</h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-[#A7B5B1]">
                        {val.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* 7. ATELIER DEVS → CLAVE (OUR NEXT CHAPTER) */}
          <ScrollReveal>
            <div className="mt-20 sm:mt-28 lg:mt-32">
              <div className="relative rounded-[20px] border border-[#19352F] bg-[#071A17]/80 p-7 sm:p-10 lg:p-12 backdrop-blur-sm shadow-[0_0_40px_-15px_rgba(8,127,91,0.2)]">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div className="max-w-xl">
                    <span className="text-xs font-semibold tracking-widest text-[#10B981] uppercase">
                      OUR NEXT CHAPTER
                    </span>
                    <h2 className="mt-2.5 font-editorial text-3xl sm:text-4xl lg:text-[44px] font-medium tracking-tight text-[#F5F7F6] leading-[1.15]">
                      Building more tools for{' '}
                      <em className="text-[#10B981] font-normal italic font-editorial">your career.</em>
                    </h2>
                    <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-[#A7B5B1]">
                      Clave is just the beginning. We're building a suite of career tools that help students learn, build, and unlock better opportunities.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
                    <Link
                      to={paths.signup}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#10B981] px-6 text-sm font-semibold text-[#030706] shadow-sm transition-all hover:bg-[#0fa070] active:scale-[0.99] cursor-pointer btn-micro-interact"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </LandingContainer>
      </main>

      {/* Shared Landing Footer */}
      <LandingFooter />
    </div>
  )
}
