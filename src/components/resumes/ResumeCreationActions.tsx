import { ResumeCreationChoice } from '@/components/resumes/ResumeCreationChoice'

/** Compact horizontal row of the four creation paths. */
export function ResumeCreationActions() {
  return (
    <section aria-labelledby="create-heading" className="rounded-large border border-border bg-surface p-4 shadow-card sm:p-5">
      <h2 id="create-heading" className="mb-3.5 text-sm font-semibold text-text">
        Create a Resume
      </h2>
      <ResumeCreationChoice compact className="auto-rows-fr grid-cols-2 xl:grid-cols-4" />
    </section>
  )
}
