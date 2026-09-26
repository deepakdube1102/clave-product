import { useEffect, useState } from 'react'

type AsyncState<T> = { status: 'loading' } | { status: 'error' } | { status: 'success'; data: T }

/** Runs `load` once on mount. Pass a stable function (e.g. a service export). */
export function useAsyncData<T>(load: () => Promise<T>): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ status: 'loading' })

  useEffect(() => {
    let active = true
    load().then(
      (data) => active && setState({ status: 'success', data }),
      () => active && setState({ status: 'error' }),
    )
    return () => {
      active = false
    }
  }, [load])

  return state
}
