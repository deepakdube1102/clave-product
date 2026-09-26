import { getProfile } from '@/services/profile.service'
import { readSettings } from '@/services/settings.service'
import { listResumes, upsertResume } from '@/services/resume.service'
import { readDoc, writeDoc } from '@/services/resumeDocStorage'
import { useAuthStore } from '@/store/authStore'
import type { ResumeDocument, ResumeSectionKey, TemplateId } from '@/types/resumeDocument'
import { computeAts } from '@/utils/ats'
import { buildContentFromProfile, defaultSectionOrder, emptyResumeContent } from '@/utils/resumeFromProfile'

/** Mock builder persistence. The real API would store the document and return the same shape. */
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function buildDocument(id: string, name: string, targetRole: string, start: 'profile' | 'blank'): Promise<ResumeDocument> {
  const user = useAuthStore.getState().user
  const profile = start === 'profile' ? await getProfile() : null
  return {
    id,
    name,
    targetRole,
    template: 'classic',
    sectionOrder: defaultSectionOrder(profile),
    content: profile ? buildContentFromProfile(profile, user?.name, user?.email) : emptyResumeContent(user?.name, user?.email),
    updatedAt: new Date().toISOString(),
  }
}

/** Persists the document and mirrors its name, role and ATS score into the resume list. */
export async function saveResumeDocument(doc: ResumeDocument, options: { touch?: boolean } = { touch: true }): Promise<void> {
  const existing = (await listResumes()).find((r) => r.id === doc.id)
  const updatedAt = options.touch === false && existing ? existing.updatedAt : new Date().toISOString()
  writeDoc({ ...doc, updatedAt })
  await upsertResume({
    id: doc.id,
    name: doc.name,
    targetRole: doc.targetRole,
    atsScore: computeAts(doc).total,
    updatedAt,
    type: existing?.type ?? 'base',
    tailoredFor: existing?.tailoredFor,
    status: existing?.status,
  })
  await wait(350)
}

/** Opens a resume. Library resumes without a saved document are built from the Career Profile on first open. */
export async function getResumeDocument(id: string): Promise<ResumeDocument | null> {
  const meta = (await listResumes()).find((r) => r.id === id)
  const stored = readDoc(id)
  if (stored) return meta ? { ...stored, name: meta.name } : stored
  if (!meta) return null
  const doc = await buildDocument(id, meta.name, meta.targetRole, 'profile')
  await saveResumeDocument(doc, { touch: false })
  return doc
}

/** For library thumbnails: the saved document, or a fresh one from the Career Profile. Never writes. */
export async function getResumePreview(id: string): Promise<ResumeDocument | null> {
  const stored = readDoc(id)
  if (stored) return stored
  const meta = (await listResumes()).find((r) => r.id === id)
  return meta ? buildDocument(id, meta.name, meta.targetRole, 'profile') : null
}

export interface CreateOptions {
  start: 'profile' | 'blank'
  name?: string
  targetRole?: string
  template?: TemplateId
  sectionOrder?: ResumeSectionKey[]
}

/** Creates and saves a new resume for the manual and template flows. */
export async function createResumeDocument(options: CreateOptions): Promise<ResumeDocument> {
  const role = options.targetRole ?? (options.start === 'profile' ? ((await getProfile())?.targetRoles[0] ?? '') : '')
  const doc = await buildDocument(`res_${crypto.randomUUID()}`, 'Untitled Resume', role, options.start)
  const created: ResumeDocument = {
    ...doc,
    targetRole: role,
    name: options.name?.trim() || (role ? `${role} Resume` : 'Untitled Resume'),
    template: options.template ?? readSettings().defaultTemplate,
    sectionOrder: options.sectionOrder ?? doc.sectionOrder,
  }
  await saveResumeDocument(created)
  return created
}

/** Saves an already-prepared document (AI draft or tailored copy) as a new resume. */
export async function createResumeFromDocument(
  doc: ResumeDocument,
  extras: { type: 'base' | 'tailored'; tailoredFor?: string; name?: string },
): Promise<ResumeDocument> {
  const created: ResumeDocument = { ...doc, id: `res_${crypto.randomUUID()}`, name: extras.name ?? doc.name }
  writeDoc(created)
  await upsertResume({
    id: created.id,
    name: created.name,
    targetRole: created.targetRole,
    atsScore: computeAts(created).total,
    updatedAt: new Date().toISOString(),
    type: extras.type,
    tailoredFor: extras.tailoredFor,
  })
  return created
}
