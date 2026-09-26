import { Search, X } from 'lucide-react'
import { useTemplateQuery } from '@/hooks/useTemplateQuery'
import { cn } from '@/utils/cn'

export function TemplateSearch({ className }: { className?: string }) {
  const [query, setQuery] = useTemplateQuery()
  return (
    <label className={cn('relative block w-full', className)}>
      <span className="sr-only">Search templates</span>
      <Search className="pointer-events-none absolute top-1/2 left-3.5 size-3.5 -translate-y-1/2 text-muted" aria-hidden />
      <input
        type="search"
        placeholder="Search templates by role, industry, or style..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="h-9 w-full rounded-full border border-border bg-background pr-9 pl-10 text-[13px] text-text outline-none [appearance:none] placeholder:text-muted focus:border-primary focus:bg-surface focus:ring-2 focus:ring-primary/20 [&::-webkit-search-cancel-button]:hidden"
      />
      {query && (
        <button type="button" aria-label="Clear search" onClick={() => setQuery('')} className="absolute top-1/2 right-2.5 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:text-text">
          <X className="size-3.5" aria-hidden />
        </button>
      )}
    </label>
  )
}
