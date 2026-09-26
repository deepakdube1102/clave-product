import { useCallback, useEffect, useState } from 'react'
import { deleteResume, duplicateResume, listResumes, renameResume } from '@/services/resume.service'
import type { Resume } from '@/types/resume'

type State = { status: 'loading' } | { status: 'error' } | { status: 'ready'; resumes: Resume[] }

export function useResumes() {
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    let active = true
    listResumes().then(
      (resumes) => active && setState({ status: 'ready', resumes }),
      () => active && setState({ status: 'error' }),
    )
    return () => {
      active = false
    }
  }, [])

  const apply = useCallback(async (mutation: () => Promise<Resume[]>) => {
    setState({ status: 'ready', resumes: await mutation() })
  }, [])

  return {
    state,
    rename: (id: string, name: string) => apply(() => renameResume(id, name)),
    duplicate: (id: string) => apply(() => duplicateResume(id)),
    remove: (id: string) => apply(() => deleteResume(id)),
  }
}
