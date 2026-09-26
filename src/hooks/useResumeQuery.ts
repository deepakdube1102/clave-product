import { useSearchParams } from 'react-router-dom'

/** Query lives in the URL (?q=) so the navbar search and the library list stay in sync. */
export function useResumeQuery(): [string, (value: string) => void] {
  const [params, setParams] = useSearchParams()
  return [params.get('q') ?? '', (value) => setParams(value ? { q: value } : {}, { replace: true })]
}
