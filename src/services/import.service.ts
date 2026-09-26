import { buildLinkedInImport, buildResumeExtraction } from '@/mocks/profile.mock'
import type { ProfileData } from '@/types/profile'

/**
 * Simulated import. The real versions would upload the file / start the
 * LinkedIn import on FastAPI and return the same ProfileData shape.
 */
export const RESUME_MAX_BYTES = 5 * 1024 * 1024
export const RESUME_ACCEPT = '.pdf,.docx'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function validateResumeFile(file: File): string | null {
  const extension = file.name.split('.').pop()?.toLowerCase()
  if (extension !== 'pdf' && extension !== 'docx') return 'Please upload a PDF or DOCX file.'
  if (file.size === 0) return 'This file looks empty. Try a different one.'
  if (file.size > RESUME_MAX_BYTES) return 'This file is larger than 5 MB. Try a smaller one.'
  return null
}

export function isValidLinkedInUrl(value: string): boolean {
  return /^(https?:\/\/)?([\w-]+\.)?linkedin\.com\/in\/[\w%-]+\/?/i.test(value.trim())
}

export async function extractResume(
  _file: File,
  identity: { name: string; email: string },
  onStage: (stage: string) => void,
): Promise<ProfileData> {
  onStage('Reading your resume…')
  await wait(1300)
  onStage('Extracting your career information…')
  await wait(1500)
  return buildResumeExtraction(identity)
}

export async function importLinkedIn(
  profileUrl: string,
  identity: { name: string; email: string },
  onStage: (stage: string) => void,
): Promise<ProfileData> {
  onStage('Connecting to LinkedIn…')
  await wait(1100)
  onStage('Importing your professional profile…')
  await wait(1500)
  return buildLinkedInImport(identity, profileUrl.trim())
}
