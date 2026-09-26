import { buildMockResumes } from '@/mocks/resumes.mock'
import { readDoc, removeDoc, writeDoc } from '@/services/resumeDocStorage'
import { useAuthStore } from '@/store/authStore'
import type { Resume } from '@/types/resume'

/**
 * Mock resume library in localStorage, seeded on first read. Each mutation
 * returns the updated list. The real API identifies the user from the auth token.
 */
const KEY = 'clave.mock.resumes'

type Library = Record<string, Resume[]>

const userId = () => useAuthStore.getState().user?.id ?? ''

function readLibrary(): Library {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '{}') as Library
  } catch {
    return {}
  }
}

function write(next: Resume[]): Resume[] {
  localStorage.setItem(KEY, JSON.stringify({ ...readLibrary(), [userId()]: next }))
  return next
}

export async function listResumes(): Promise<Resume[]> {
  const stored = readLibrary()[userId()]
  if (!stored) return write(buildMockResumes())
  // Libraries seeded before `status` existed pick it up from the seed data.
  const seeded = new Map(buildMockResumes().map((r) => [r.id, r.status]))
  return stored.map((r) => (r.status === undefined && seeded.get(r.id) ? { ...r, status: seeded.get(r.id) } : r))
}

export async function renameResume(id: string, name: string): Promise<Resume[]> {
  const now = new Date().toISOString()
  return write((await listResumes()).map((r) => (r.id === id ? { ...r, name, updatedAt: now } : r)))
}

export async function duplicateResume(id: string): Promise<Resume[]> {
  const resumes = await listResumes()
  const original = resumes.find((r) => r.id === id)
  if (!original) return resumes
  const copy: Resume = { ...original, id: `res_${crypto.randomUUID()}`, name: `${original.name} (Copy)`, updatedAt: new Date().toISOString() }
  const originalDoc = readDoc(id)
  if (originalDoc) writeDoc({ ...originalDoc, id: copy.id, name: copy.name, updatedAt: copy.updatedAt })
  return write([copy, ...resumes])
}

/** Adds or replaces a resume's list entry (used by the builder). */
export async function upsertResume(resume: Resume): Promise<void> {
  const resumes = await listResumes()
  write(resumes.some((r) => r.id === resume.id) ? resumes.map((r) => (r.id === resume.id ? resume : r)) : [resume, ...resumes])
}

export async function deleteResume(id: string): Promise<Resume[]> {
  removeDoc(id)
  return write((await listResumes()).filter((r) => r.id !== id))
}
