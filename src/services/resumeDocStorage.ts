import { useAuthStore } from '@/store/authStore'
import type { ResumeDocument } from '@/types/resumeDocument'

/** Per-user localStorage map of resume documents. Shared by the resume list and builder services. */
const KEY = 'clave.mock.resume-docs'

type Store = Record<string, Record<string, ResumeDocument>>

const userId = () => useAuthStore.getState().user?.id ?? ''

function readStore(): Store {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '{}') as Store
  } catch {
    return {}
  }
}

export function readDoc(id: string): ResumeDocument | undefined {
  return readStore()[userId()]?.[id]
}

export function writeDoc(doc: ResumeDocument): void {
  const store = readStore()
  store[userId()] = { ...store[userId()], [doc.id]: doc }
  localStorage.setItem(KEY, JSON.stringify(store))
}

export function removeDoc(id: string): void {
  const store = readStore()
  const docs = { ...store[userId()] }
  delete docs[id]
  store[userId()] = docs
  localStorage.setItem(KEY, JSON.stringify(store))
}
