import { useSearchParams } from 'react-router-dom'

/** The search text lives in the URL (?q=) so the navbar field and the library stay in sync. */
export function useTemplateQuery(): [string, (value: string) => void] {
  const [params, setParams] = useSearchParams()
  return [params.get('q') ?? '', (value) => setParams(value ? { q: value } : {}, { replace: true })]
}
