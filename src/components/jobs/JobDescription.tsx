import type { JobDetail } from '@/types/job'

function Bullets({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null
  return (
    <section className="border-t border-border pt-6">
      <h3 className="font-editorial text-2xl font-medium tracking-tight text-text">{title}</h3>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-secondary marker:text-primary">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}

/** The written description, one continuous editorial surface. */
export function JobDescription({ detail }: { detail: JobDetail }) {
  return (
    <div className="flex flex-col gap-6 rounded-large border border-border bg-surface p-5 shadow-xs sm:p-6">
      <section>
        <h2 className="font-editorial text-2xl font-medium tracking-tight text-text">About the role</h2>
        <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-secondary">{detail.about}</p>
      </section>
      <Bullets title="Responsibilities" items={detail.responsibilities} />
      <Bullets title="Requirements" items={detail.requirements} />
      <Bullets title="Nice to have" items={detail.niceToHave} />
    </div>
  )
}
