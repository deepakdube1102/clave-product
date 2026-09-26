import finlo from '@/assets/companies/finlo.svg'
import kite from '@/assets/companies/kite.svg'
import lumen from '@/assets/companies/lumen.svg'
import meridian from '@/assets/companies/meridian.svg'
import northwind from '@/assets/companies/northwind.svg'
import orbit from '@/assets/companies/orbit.svg'
import { cn } from '@/utils/cn'

/** Logo images by company name. Real logos would come from the jobs API. */
const logos: Record<string, string> = {
  'Kite & Co.': kite,
  'Meridian Health': meridian,
  Finlo: finlo,
  'Northwind Labs': northwind,
  'Orbit Health': orbit,
  'Lumen Labs': lumen,
}

const fallbackPalettes = ['from-emerald-500 to-teal-600', 'from-indigo-500 to-violet-600', 'from-slate-600 to-slate-800']
const hash = (text: string) => [...text].reduce((sum, char) => (sum * 31 + char.charCodeAt(0)) >>> 0, 7)

export function CompanyLogo({ company, className }: { company: string; className?: string }) {
  const src = logos[company]

  if (src) {
    return <img src={src} alt="" draggable={false} className={cn('size-11 shrink-0 rounded-[12px] object-cover shadow-xs', className)} />
  }

  return (
    <span
      aria-hidden
      className={cn(
        'flex size-11 shrink-0 items-center justify-center rounded-[12px] bg-linear-to-br text-lg font-semibold text-white shadow-xs',
        fallbackPalettes[hash(company) % fallbackPalettes.length],
        className,
      )}
    >
      {company.trim().charAt(0).toUpperCase()}
    </span>
  )
}
