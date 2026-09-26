import { SearchInput } from '@/components/ui/SearchInput'

export function JobSearch({ value, onChange, className }: { value: string; onChange: (value: string) => void; className?: string }) {
  return <SearchInput label="Search jobs" placeholder="Search jobs, roles, or companies..." value={value} onChange={(event) => onChange(event.target.value)} className={className} />
}
