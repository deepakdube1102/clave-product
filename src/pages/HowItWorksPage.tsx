import { Link } from 'react-router-dom'
import { ArrowRight, Briefcase, ChevronRight, ClipboardPaste, FileText, Sparkles } from 'lucide-react'
import GradientWaves from '@/components/effects/GradientWaves'
import { LandingContainer } from '@/components/landing/LandingContainer'
import { LandingFooter } from '@/components/landing/LandingFooter'
import { paths } from '@/routes/navigation'
import { ScrollReveal } from '@/components/transitions/ScrollReveal'

export function HowItWorksPage() {
  return (
    <div className="relative min-h-dvh flex flex-col bg-black text-[#F5F7F6] overflow-hidden">
      {/* Emerald gradient waves on black background */}
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

      {/* Subtle vignette to seamlessly blend into pure black */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90"
      />

      <main className="relative z-10 flex-1 pt-4 sm:pt-6 lg:pt-8 pb-16 sm:pb-20 lg:pb-24">
        <LandingContainer className="max-w-[1240px]">
          {/* HERO SECTION: Left aligned with generous whitespace */}
          <div className="max-w-3xl">
            <span className="animate-entrance-eyebrow text-xs font-semibold tracking-widest text-[#10B981] uppercase block">
              HOW IT WORKS
            </span>

            <h1 className="animate-entrance-heading mt-2.5 font-editorial text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#F5F7F6] leading-[1.08]">
              From your profile to opportunities,{' '}
              <em className="text-[#10B981] font-normal italic font-editorial">in minutes.</em>
            </h1>

            <p className="animate-entrance-subtext mt-3.5 text-base sm:text-lg leading-relaxed text-[#A7B5B1]">
              Clave uses AI to help you create ATS-friendly resumes, match with relevant jobs, and keep your entire
              career profile in one place.
            </p>
          </div>

          {/* MAIN WORKFLOW: 4-Step Horizontal Journey */}
          <div className="mt-10 sm:mt-12 lg:mt-14">
            {/* Desktop connecting line */}
            <div className="relative">
              <div
                className="hidden lg:block absolute top-[210px] left-[10%] right-[10%] h-[1px] bg-[#10B981]/30 z-0 pointer-events-none"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
                {/* STEP 01: Create your profile */}
                <div className="flex flex-col">
                  {/* Compact UI Preview Card */}
                  <div className="h-[170px] w-full rounded-2xl border border-[#1B3933] bg-[#0B211D] p-3.5 flex flex-col justify-between shadow-sm">
                    <div className="flex items-center gap-2.5">
                      <div className="size-9 rounded-full bg-[#10B981]/20 border border-[#10B981]/30 flex items-center justify-center text-xs font-semibold text-[#10B981]">
                        DD
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-semibold text-[#F5F7F6] truncate">Deepak Dube</p>
                        <p className="text-[11px] text-[#A7B5B1] truncate">Product Designer · Mumbai</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 my-auto">
                      <span className="rounded-md border border-[#1B3933] bg-[#071A17] px-2 py-0.5 text-[10px] text-[#A7B5B1]">
                        Figma
                      </span>
                      <span className="rounded-md border border-[#1B3933] bg-[#071A17] px-2 py-0.5 text-[10px] text-[#A7B5B1]">
                        User Research
                      </span>
                      <span className="rounded-md border border-[#1B3933] bg-[#071A17] px-2 py-0.5 text-[10px] text-[#A7B5B1]">
                        Wireframing
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1.5 border-t border-[#1B3933]/60 text-[10.5px] text-[#A7B5B1]">
                      <span>Source of truth</span>
                      <span className="text-[#10B981]">Linked ✓</span>
                    </div>
                  </div>

                  {/* Step Marker */}
                  <div className="mt-6 flex items-center gap-3">
                    <div className="size-8 rounded-full border border-[#10B981]/50 bg-black flex items-center justify-center text-xs font-semibold text-[#10B981]">
                      01
                    </div>
                    <div className="h-[1px] flex-1 bg-[#10B981]/25 lg:hidden" />
                  </div>

                  {/* Step Description */}
                  <div className="mt-3">
                    <h3 className="text-base font-semibold text-[#F5F7F6]">Create your profile</h3>
                    <p className="mt-1.5 text-sm text-[#A7B5B1] leading-relaxed">
                      Add your basic details, education, skills, and experience. You can also import from LinkedIn.
                    </p>
                  </div>
                </div>

                {/* STEP 02: Paste a job description */}
                <div className="flex flex-col">
                  {/* Compact UI Preview Card */}
                  <div className="h-[170px] w-full rounded-2xl border border-[#1B3933] bg-[#0B211D] p-3.5 flex flex-col justify-between shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-medium text-[#A7B5B1] flex items-center gap-1.5">
                        <Briefcase className="size-3 text-[#10B981]" />
                        Target role
                      </span>
                      <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] font-semibold">
                        RECOMMENDED
                      </span>
                    </div>

                    <div className="rounded-lg border border-[#1B3933] bg-[#071A17] p-2 text-[11px] text-[#F5F7F6]">
                      <p className="font-medium text-[#F5F7F6]">Product Designer</p>
                      <p className="text-[10px] text-[#A7B5B1] line-clamp-2 mt-0.5">
                        Looking for a product designer with 2+ years experience in Figma, design systems, and user
                        research...
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10.5px] text-[#A7B5B1]">
                      <ClipboardPaste className="size-3 text-[#10B981]" />
                      <span>Paste from clipboard (0/5,000)</span>
                    </div>
                  </div>

                  {/* Step Marker */}
                  <div className="mt-6 flex items-center gap-3">
                    <div className="size-8 rounded-full border border-[#10B981]/50 bg-black flex items-center justify-center text-xs font-semibold text-[#10B981]">
                      02
                    </div>
                    <div className="h-[1px] flex-1 bg-[#10B981]/25 lg:hidden" />
                  </div>

                  {/* Step Description */}
                  <div className="mt-3">
                    <h3 className="text-base font-semibold text-[#F5F7F6]">Paste a job description</h3>
                    <p className="mt-1.5 text-sm text-[#A7B5B1] leading-relaxed">
                      Paste any job description and let Clave understand the key skills, requirements, and role details.
                    </p>
                  </div>
                </div>

                {/* STEP 03: Generate your resume */}
                <div className="flex flex-col">
                  {/* Compact UI Preview Card */}
                  <div className="h-[170px] w-full rounded-2xl border border-[#1B3933] bg-[#0B211D] p-3.5 flex flex-col justify-between shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <FileText className="size-3 text-[#10B981]" />
                        <span className="text-[11px] font-medium text-[#F5F7F6]">Tailored Resume</span>
                      </div>
                      <span className="text-[10px] font-semibold text-[#10B981] bg-[#10B981]/15 px-1.5 py-0.5 rounded">
                        ✓ 86 ATS
                      </span>
                    </div>

                    <div className="rounded-lg border border-[#1B3933] bg-[#071A17] p-2 space-y-1">
                      <div className="h-1.5 w-3/4 rounded-full bg-white/20" />
                      <div className="h-1.5 w-full rounded-full bg-white/10" />
                      <div className="h-1.5 w-5/6 rounded-full bg-white/10" />
                    </div>

                    <div className="flex items-center justify-between pt-1.5 border-t border-[#1B3933]/60 text-[10.5px]">
                      <span className="text-[#A7B5B1]">Updated 2 days ago</span>
                      <span className="text-[#10B981] font-medium flex items-center gap-0.5">
                        Tailor <ArrowRight className="size-2.5" />
                      </span>
                    </div>
                  </div>

                  {/* Step Marker */}
                  <div className="mt-6 flex items-center gap-3">
                    <div className="size-8 rounded-full border border-[#10B981]/50 bg-black flex items-center justify-center text-xs font-semibold text-[#10B981]">
                      03
                    </div>
                    <div className="h-[1px] flex-1 bg-[#10B981]/25 lg:hidden" />
                  </div>

                  {/* Step Description */}
                  <div className="mt-3">
                    <h3 className="text-base font-semibold text-[#F5F7F6]">Generate your resume</h3>
                    <p className="mt-1.5 text-sm text-[#A7B5B1] leading-relaxed">
                      Get an ATS-friendly resume tailored to the opportunity, using your Career Profile as the source of
                      truth.
                    </p>
                  </div>
                </div>

                {/* STEP 04: Discover opportunities */}
                <div className="flex flex-col">
                  {/* Compact UI Preview Card */}
                  <div className="h-[170px] w-full rounded-2xl border border-[#1B3933] bg-[#0B211D] p-3.5 flex flex-col justify-between shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-medium text-[#A7B5B1]">Top Job Matches</span>
                      <span className="text-[10px] text-[#10B981] font-semibold">Active</span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="rounded-lg border border-[#1B3933] bg-[#071A17] p-1.5 flex items-center justify-between">
                        <div className="min-w-0">
                          <p className="text-[11px] font-medium text-[#F5F7F6] truncate">Product Designer</p>
                          <p className="text-[9.5px] text-[#A7B5B1]">Stripe · Remote</p>
                        </div>
                        <span className="text-[9.5px] font-semibold text-[#10B981] bg-[#10B981]/15 px-1 rounded shrink-0">
                          94%
                        </span>
                      </div>

                      <div className="rounded-lg border border-[#1B3933] bg-[#071A17] p-1.5 flex items-center justify-between">
                        <div className="min-w-0">
                          <p className="text-[11px] font-medium text-[#F5F7F6] truncate">UX Designer</p>
                          <p className="text-[9.5px] text-[#A7B5B1]">Linear · San Francisco</p>
                        </div>
                        <span className="text-[9.5px] font-semibold text-[#10B981] bg-[#10B981]/15 px-1 rounded shrink-0">
                          91%
                        </span>
                      </div>
                    </div>

                    <div className="text-[10.5px] text-[#A7B5B1] flex items-center justify-between pt-1 border-t border-[#1B3933]/60">
                      <span>Matched to profile</span>
                      <span className="text-[#10B981]">View all →</span>
                    </div>
                  </div>

                  {/* Step Marker */}
                  <div className="mt-6 flex items-center gap-3">
                    <div className="size-8 rounded-full border border-[#10B981]/50 bg-black flex items-center justify-center text-xs font-semibold text-[#10B981]">
                      04
                    </div>
                    <div className="h-[1px] flex-1 bg-[#10B981]/25 lg:hidden" />
                  </div>

                  {/* Step Description */}
                  <div className="mt-3">
                    <h3 className="text-base font-semibold text-[#F5F7F6]">Discover opportunities</h3>
                    <p className="mt-1.5 text-sm text-[#A7B5B1] leading-relaxed">
                      Explore relevant jobs based on your profile and get personalized recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PRODUCT SHOWCASE: See It In Action */}
          <ScrollReveal>
            <div className="mt-16 sm:mt-20 lg:mt-24 border-t border-[#1B3933] pt-12 sm:pt-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                {/* Left Side: Editorial text & CTA */}
                <div className="lg:col-span-5">
                  <span className="text-xs font-semibold tracking-widest text-[#10B981] uppercase">
                    SEE IT IN ACTION
                  </span>

                  <h2 className="mt-3 font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#F5F7F6] leading-[1.1]">
                    A career workspace built for you.
                  </h2>

                  <p className="mt-4 text-base text-[#A7B5B1] leading-relaxed">
                    From resume building to job discovery, everything you need in one simple, powerful platform.
                  </p>

                  <div className="mt-8">
                    <Link
                      to={paths.dashboard}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#087F5B] hover:bg-[#056B4D] px-6 text-sm font-medium text-white shadow-sm transition-all duration-150 active:scale-[0.99] cursor-pointer btn-micro-interact"
                    >
                      <span>Explore Clave</span>
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                {/* Right Side: Authentic Product Mockup inside subtle dark frame */}
                <div className="lg:col-span-7">
                  <div className="rounded-2xl border border-[#1B3933] bg-[#0B211D] p-3 sm:p-4 shadow-2xl shadow-black/60">
                    {/* Mockup Window Chrome */}
                    <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#1B3933]">
                      <div className="flex items-center gap-1.5">
                        <div className="size-2.5 rounded-full bg-white/15" />
                        <div className="size-2.5 rounded-full bg-white/15" />
                        <div className="size-2.5 rounded-full bg-white/15" />
                      </div>
                      <div className="mx-auto text-[11px] text-[#A7B5B1]/70 font-mono">clave.app/dashboard</div>
                    </div>

                    {/* Inner Mockup UI */}
                    <div className="rounded-xl border border-[#1B3933] bg-[#071A17] p-4 sm:p-6 text-white space-y-5">
                      {/* Mockup Top Header */}
                      <div className="flex items-center justify-between pb-4 border-b border-[#1B3933]/60">
                        <div>
                          <p className="text-[11px] font-semibold text-[#10B981] uppercase tracking-wider">
                            Early career (1–3 years)
                          </p>
                          <h4 className="font-editorial text-xl sm:text-2xl font-medium text-[#F5F7F6]">
                            Welcome back, Deepak
                          </h4>
                        </div>
                        <span className="rounded-md border border-[#1B3933] bg-[#0B211D] px-3 py-1 text-xs text-[#A7B5B1]">
                          ATS Status: <strong className="text-[#10B981]">Optimized</strong>
                        </span>
                      </div>

                      {/* Mockup Grid: Career Insight + Resume card */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {/* Career Profile Card */}
                        <div className="rounded-xl border border-[#1B3933] bg-[#0B211D] p-3.5 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#F5F7F6]">Career Profile</span>
                            <span className="text-[10px] text-[#10B981] font-medium">85% Complete</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-[#071A17] overflow-hidden">
                            <div className="h-full w-[85%] rounded-full bg-[#10B981]" />
                          </div>
                          <p className="text-[11px] text-[#A7B5B1]">3 skills ready to highlight in next application</p>
                        </div>

                        {/* Active Resume Card */}
                        <div className="rounded-xl border border-[#1B3933] bg-[#0B211D] p-3.5 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#F5F7F6]">Active Resume</span>
                            <span className="text-[10px] text-[#10B981] font-semibold bg-[#10B981]/15 px-1.5 py-0.5 rounded">
                              ✓ 86 ATS
                            </span>
                          </div>
                          <p className="text-xs text-[#F5F7F6] font-medium">Product Designer Resume</p>
                          <p className="text-[11px] text-[#A7B5B1]">Tailored for Stripe Product Designer role</p>
                        </div>
                      </div>

                      {/* Mockup Recommendations Row */}
                      <div className="rounded-xl border border-[#1B3933] bg-[#0B211D] p-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-lg bg-[#10B981]/20 flex items-center justify-center text-[#10B981]">
                            <Sparkles className="size-4" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-[#F5F7F6]">Senior Product Designer · Figma</p>
                            <p className="text-[10.5px] text-[#A7B5B1]">San Francisco, CA · 94% Profile Match</p>
                          </div>
                        </div>
                        <span className="text-xs font-medium text-[#10B981] flex items-center gap-1">
                          Apply with Clave <ChevronRight className="size-3.5" />
                        </span>
                      </div>
                    </div>
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
