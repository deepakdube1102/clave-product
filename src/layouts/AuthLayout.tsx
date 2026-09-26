import { Link, Outlet } from 'react-router-dom'
import { ClaveLogo, ClaveMark } from '@/components/brand/ClaveLogo'
import { paths } from '@/routes/navigation'

export function AuthLayout() {
  return (
    <div className="grid min-h-dvh bg-canvas lg:grid-cols-2">
      <div className="flex flex-col px-4 py-6 sm:px-10">
        <Link to={paths.landing} aria-label="Clave home" className="w-fit rounded-control">
          <ClaveLogo variant="compact" />
        </Link>
        <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12">
          <Outlet />
        </main>
      </div>

      <aside className="surface-dark relative hidden flex-col justify-end overflow-hidden bg-sidebar p-16 lg:flex">
        <ClaveMark size={460} aria-hidden className="pointer-events-none absolute -top-16 -right-24 opacity-[0.12]" />
        <p className="relative font-editorial text-6xl leading-[1.05] font-medium tracking-tight text-white">
          Build your <em className="text-primary-on-dark">next.</em>
        </p>
        <p className="relative mt-6 max-w-sm text-sm leading-relaxed text-white/60">
          An AI-powered career workspace for students and early-career professionals.
        </p>
      </aside>
    </div>
  )
}
