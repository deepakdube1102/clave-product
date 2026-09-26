import { Badge } from '@/components/ui/Badge'

export function SkillsList({ skills }: { skills: string[] }) {
  return (
    <section aria-labelledby="skills-title" className="rounded-large border border-border bg-surface p-5 shadow-xs sm:p-6">
      <h2 id="skills-title" className="font-editorial text-2xl font-medium tracking-tight text-text">
        Skills
      </h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <li key={skill}>
            <Badge className="px-3 py-1 text-[13px]">{skill}</Badge>
          </li>
        ))}
      </ul>
    </section>
  )
}
