import { ArrowRight, BarChart3, Briefcase, Circle, Layers, Sparkles, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { paths } from '@/routes/navigation'
import type { CareerProfile } from '@/types/career'
import { cn } from '@/utils/cn'

function IncompleteInsight({ missingItems }: { missingItems: string[] }) {
  return (
    <div className="surface-dark relative grid gap-6 overflow-hidden rounded-large bg-brand-feature p-6 text-white shadow-card md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:gap-12 md:p-8">
      <div className="flex flex-col items-start">
        <h3 className="font-editorial text-2xl font-medium tracking-tight text-white md:text-3xl">Complete Career Setup</h3>
        <p className="mt-2 max-w-prose text-sm leading-relaxed text-white/80">
          A complete career profile helps Clave generate stronger resumes, recommend jobs that genuinely fit, and
          personalize every AI suggestion to your goals.
        </p>
        <Link to={paths.careerProfile} className={`${buttonStyles({ variant: 'inverse' })} mt-6`}>
          Complete Profile
        </Link>
      </div>

      <div className="border-t border-white/15 pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-12">
        <p className="text-xs font-medium tracking-wide text-white/60 uppercase">Still worth adding</p>
        <ul className="mt-3 flex flex-col gap-2.5">
          {missingItems.map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm text-white/85">
              <Circle className="size-3.5 shrink-0 text-primary-on-dark" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E\")"

/** Abstract desk scene: warm window light and a few stacked books. Decorative; no stock imagery. */
function EditorialVisual() {
  return (
    <div aria-hidden className="pointer-events-none absolute top-0 right-0 hidden h-[66%] w-[62%] [mask-image:linear-gradient(to_right,transparent,black_35%)] md:block">
      <div className="absolute inset-0 bg-[linear-gradient(112deg,transparent_28%,rgba(255,213,150,0.13)_44%,rgba(255,213,150,0.05)_58%,transparent_74%)]" />
      <div className="absolute -top-16 right-10 size-72 rounded-full bg-[#f5be6e]/[0.14] blur-3xl" />
      
      {/* stacked books */}
      <div className="absolute right-[6%] bottom-[4%] flex w-[40%] flex-col items-end gap-[3px]">
        <div className="h-4 w-[84%] rounded-[3px] bg-[#3a4a41] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]" />
        <div className="h-5 w-full rounded-[3px] bg-[#2c3b34] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" />
        <div className="h-4 w-[92%] rounded-[3px] bg-[#4a5a4c] shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]" />
      </div>
      <div className="absolute right-[8%] bottom-[34%] h-16 w-[26%] rounded-t-[10px] border border-white/10 bg-linear-to-b from-white/[0.08] to-white/[0.02]" />
      <p className="absolute top-[30%] right-[40%] rotate-[-6deg] font-editorial text-[17px] leading-snug text-white/75 italic">
        Build
        <br />a career you’re
        <br />
        proud of.
      </p>
    </div>
  )
}

const facts = (profile: Extract<CareerProfile, { status: 'complete' }>) =>
  [
    { label: 'Career direction', icon: Briefcase, value: <span className="text-sm text-white">{profile.direction}</span> },
    { label: 'Experience level', icon: BarChart3, value: <span className="text-sm text-white">{profile.experienceLevel}</span> },
    {
      label: 'Top skills',
      icon: Layers,
      value: (
        <span className="flex flex-wrap gap-1">
          {profile.topSkills.map((skill) => (
            <span key={skill} className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-white/90 ring-1 ring-white/10">
              {skill}
            </span>
          ))}
        </span>
      ),
    },
    { label: 'Growth opportunity', icon: TrendingUp, value: <span className="text-sm text-white">{profile.growthOpportunity}</span> },
  ] as const

function CompleteInsight({ profile }: { profile: Extract<CareerProfile, { status: 'complete' }> }) {
  const role = profile.direction.split(' · ')[0]
  const [first, second] = profile.topSkills
  const accent = 'text-[#6ee7b7]'

  return (
    <div className="surface-dark relative overflow-hidden rounded-large bg-[linear-gradient(135deg,#0c1f1b_0%,#0b3a2e_55%,#064e3b_100%)] p-4 text-white shadow-card sm:p-6">
      <EditorialVisual />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay" style={{ backgroundImage: grain }} />

      <div className="relative flex items-center justify-between gap-4">
        <h3 className="flex items-center gap-3 text-sm font-semibold text-white">
          <span className="flex size-8 items-center justify-center rounded-full bg-white/10 text-[#6ee7b7] ring-1 ring-white/15">
            <Sparkles className="size-4" aria-hidden />
          </span>
          Career Insight
        </h3>
        <Link to={paths.careerProfile} className="inline-flex items-center gap-1.5 text-xs font-medium text-white/80 transition-colors hover:text-white">
          View <span className="hidden sm:inline">Career&nbsp;</span>Profile
          <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </div>

      <p className="relative mt-4 max-w-[40rem] font-editorial text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.2] font-normal tracking-tight text-white">
        Your profile is strongest for <span className={accent}>{role}</span>, with {first && <span className={accent}>{first}</span>}
        {second && (
          <>
            {' '}
            and <span className={accent}>{second}</span>
          </>
        )}{' '}
        standing out.
      </p>

      <dl className="relative mt-5 grid grid-cols-2 gap-x-4 gap-y-3.5 border-t border-white/15 pt-3.5 sm:gap-y-4 sm:pt-4 lg:grid-cols-[1fr_1fr_1.8fr_1.1fr] lg:gap-0">
        {facts(profile).map(({ label, icon: Icon, value }, index) => (
          <div key={label} className={cn(index <= 1 && 'col-span-2 sm:col-span-1', index === 2 && 'order-last col-span-2 sm:order-none sm:col-span-1', index === 3 && 'hidden sm:block', index > 0 ? 'lg:border-l lg:border-white/12 lg:pl-5' : 'lg:pr-5')}>
            <div className="flex items-start gap-2.5 sm:gap-3">
              <Icon className="mt-0.5 size-4 sm:size-[18px] shrink-0 text-[#a7e8cc]" strokeWidth={1.5} aria-hidden />
              <div>
                <dt className="text-xs text-white/60">{label}</dt>
                <dd className="mt-1 leading-snug">{value}</dd>
              </div>
            </div>
          </div>
        ))}
      </dl>
    </div>
  )
}

export function CareerInsight({ profile }: { profile: CareerProfile }) {
  return profile.status === 'incomplete' ? (
    <IncompleteInsight missingItems={profile.missingItems} />
  ) : (
    <CompleteInsight profile={profile} />
  )
}
