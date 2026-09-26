import { useSearchParams } from 'react-router-dom'

export type JobsView = 'all' | 'saved' | 'matched' | 'applied' | 'interviewing' | 'rejected'

export const MATCHED_THRESHOLD = 90

const views: JobsView[] = ['all', 'saved', 'matched', 'applied', 'interviewing', 'rejected']

export function useJobsView(): [JobsView, (view: JobsView) => void] {
  const [params, setParams] = useSearchParams()
  const raw = params.get('view')
  const view = views.includes(raw as JobsView) ? (raw as JobsView) : 'all'
  return [view, (next) => setParams(next === 'all' ? {} : { view: next }, { replace: true })]
}
