import { Link } from 'react-router-dom'
import GradientWaves from '@/components/effects/GradientWaves'
import { LandingContainer } from '@/components/landing/LandingContainer'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { paths } from '@/routes/navigation'
import { useAuthStore } from '@/store/authStore'
import { cn } from '@/utils/cn'

export function Hero() {
  const signedIn = useAuthStore((state) => state.user !== null)
  const destination = signedIn ? paths.dashboard : paths.signup

  return (
    <section className="flex flex-1 items-center">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <GradientWaves
          horizonColor="#000000"
          waveColor="#087F5B"
          crestColor="#6EE7B7"
          speed={0.3}
          fogDepth={40}
          height={3}
          brightness={1.1}
          grainIntensity={0.04}
        />
      </div>
      {/* Keeps the headline legible over the brighter crests. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/80 via-black/25 to-transparent" />
      <LandingContainer className="relative w-full py-[clamp(2.5rem,9vh,7rem)]">
        <p className="animate-entrance-eyebrow text-sm font-medium tracking-wide text-primary-on-dark uppercase">The AI-powered career workspace</p>
        <h1 className="animate-entrance-heading mt-[clamp(1rem,3vh,1.5rem)] max-w-3xl font-editorial text-[clamp(3rem,8.5vw,6.5rem)] leading-[0.95] font-medium tracking-tight text-white">
          Build your <em className="text-primary-on-dark">next.</em>
        </h1>
        <p className="animate-entrance-subtext mt-[clamp(1.25rem,4vh,2rem)] max-w-xl text-[clamp(1rem,1.3vw,1.125rem)] leading-relaxed text-white/70">
          Clave helps students and early-career professionals build better resumes, discover jobs that genuinely
          fit, and keep their whole career profile in one place.
        </p>
        <div className="animate-entrance-cta mt-[clamp(1.5rem,5vh,2.5rem)]">
          <Link
            to={destination}
            className={cn(
              buttonStyles({ variant: 'primary', size: 'lg' }),
              '!rounded-full px-8 text-base font-semibold shadow-brand'
            )}
          >
            Make your move
          </Link>
        </div>
      </LandingContainer>
    </section>
  )
}
