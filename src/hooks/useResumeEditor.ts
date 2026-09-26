import { useCallback, useEffect, useRef, useState } from 'react'
import { getResumeDocument, saveResumeDocument } from '@/services/resumeDocument.service'
import type { ResumeDocument } from '@/types/resumeDocument'

export type SaveState = 'saved' | 'saving' | 'unsaved'
type Recipe = (doc: ResumeDocument) => ResumeDocument
export type ResumeUpdater = (recipe: Recipe) => void

const AUTOSAVE_DELAY_MS = 900

/** Loads a resume, applies edits immediately, and autosaves shortly after the last change. */
export function useResumeEditor(id: string) {
  const [doc, setDoc] = useState<ResumeDocument | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'notFound'>('loading')
  const [saveState, setSaveState] = useState<SaveState>('saved')
  const docRef = useRef<ResumeDocument | null>(null)
  const version = useRef(0)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    let active = true
    getResumeDocument(id).then((loaded) => {
      if (!active) return
      docRef.current = loaded
      setDoc(loaded)
      setStatus(loaded ? 'ready' : 'notFound')
    })
    return () => {
      active = false
    }
  }, [id])

  const persist = useCallback(async () => {
    const current = docRef.current
    if (!current) return
    if (timer.current) clearTimeout(timer.current)
    timer.current = null
    const saving = version.current
    setSaveState('saving')
    await saveResumeDocument(current)
    if (saving === version.current) setSaveState('saved')
  }, [])

  const update = useCallback(
    (recipe: Recipe) => {
      if (!docRef.current) return
      const next = recipe(docRef.current)
      docRef.current = next
      version.current += 1
      setDoc(next)
      setSaveState('unsaved')
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => void persist(), AUTOSAVE_DELAY_MS)
    },
    [persist],
  )

  // Leaving the page (route change or tab close) must not lose a pending edit.
  useEffect(() => {
    const flush = () => {
      if (timer.current && docRef.current) {
        clearTimeout(timer.current)
        timer.current = null
        void saveResumeDocument(docRef.current)
      }
    }
    window.addEventListener('pagehide', flush)
    return () => {
      window.removeEventListener('pagehide', flush)
      flush()
    }
  }, [])

  return { doc, status, saveState, update, saveNow: persist }
}
