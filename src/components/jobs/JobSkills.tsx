import { Badge } from '@/components/ui/Badge'

export function JobSkills({ skills }: { skills: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Relevant skills">
      {skills.map((skill) => (
        <li key={skill}>
          <Badge>{skill}</Badge>
        </li>
      ))}
    </ul>
  )
}
