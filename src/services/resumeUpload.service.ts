/**
 * resumeUpload.service.ts
 *
 * Backend service abstraction for uploading, parsing, and creating
 * a base resume document from an external PDF or DOCX file.
 *
 * HOW TO MIGRATE TO REAL BACKEND:
 * ──────────────────────────────────────
 * 1. uploadResume: Replace FormData mock with POST /api/resumes/upload
 * 2. parseUploadedResume: Replace mock parser with POST /api/resumes/parse
 * 3. createResumeFromUpload: Coordinates upload + parse and creates a ResumeDocument
 *
 * Product Rule: The uploaded original resume document remains untouched as the
 * base source. The tailoring flow will produce a NEW tailored resume from it.
 */

import { saveResumeDocument } from '@/services/resumeDocument.service'
import type { ResumeDocument } from '@/types/resumeDocument'
import { computeAts } from '@/utils/ats'

export interface UploadResumeResult {
  fileId: string
  fileName: string
  fileSize: number
  fileType: 'pdf' | 'docx'
  fileUrl?: string
}

export interface ParsedResumeResult {
  fileId: string
  targetRole: string
  name: string
  document: ResumeDocument
  atsScore: number
}

export interface UploadedResumeInfo {
  id: string
  fileName: string
  fileSize: number
  fileSizeFormatted: string
  fileType: 'pdf' | 'docx'
  status: 'uploading' | 'parsing' | 'ready' | 'error'
  error?: string
  atsScore?: number
  document?: ResumeDocument
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/**
 * Validates and uploads a resume file.
 * Future: Sends multipart/form-data to POST /api/resumes/upload
 */
export async function uploadResume(file: File): Promise<UploadResumeResult> {
  const extension = file.name.split('.').pop()?.toLowerCase()
  if (extension !== 'pdf' && extension !== 'docx' && extension !== 'doc') {
    throw new Error('Unsupported file type. Please upload a PDF or DOCX file.')
  }

  // 10 MB limit check
  const maxBytes = 10 * 1024 * 1024
  if (file.size > maxBytes) {
    throw new Error('File exceeds the 10 MB limit. Please upload a smaller file.')
  }

  // Simulate network upload delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const fileId = `file_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
  return {
    fileId,
    fileName: file.name,
    fileSize: file.size,
    fileType: extension === 'pdf' ? 'pdf' : 'docx',
  }
}

/**
 * Parses an uploaded resume file into a structured ResumeDocument.
 * Future: Calls backend document parser / NLP extraction endpoint.
 */
export async function parseUploadedResume(fileId: string, file: File): Promise<ParsedResumeResult> {
  // Simulate parsing delay
  await new Promise((resolve) => setTimeout(resolve, 700))

  // Clean filename for the resume title
  const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
  const docId = `res_upload_${Date.now()}`

  // Derive target role from name if possible, or fallback to sensible default
  let derivedRole = 'Product Designer'
  const lowerName = file.name.toLowerCase()
  if (lowerName.includes('ux') || lowerName.includes('research')) derivedRole = 'UX Researcher'
  else if (lowerName.includes('engineer') || lowerName.includes('dev') || lowerName.includes('frontend')) derivedRole = 'Frontend Engineer'
  else if (lowerName.includes('pm') || lowerName.includes('product manager')) derivedRole = 'Product Manager'

  const document: ResumeDocument = {
    id: docId,
    name: cleanName || 'Uploaded Resume',
    targetRole: derivedRole,
    template: 'classic',
    sectionOrder: ['experience', 'education', 'projects', 'skills'],
    content: {
      contact: {
        name: cleanName.split(' ')[0] || 'Candidate',
        email: 'candidate@example.com',
        phone: '+1 (555) 012-3456',
        location: 'Bengaluru, India',
        linkedin: 'linkedin.com/in/candidate',
        github: '',
        portfolio: '',
      },
      summary: `Experienced ${derivedRole} with a strong track record of delivering end-to-end product experiences, collaborating with cross-functional teams, and driving business impact through design thinking and user-centric problem solving.`,
      experience: [
        {
          id: 'exp_upload_1',
          title: derivedRole,
          company: 'Kite & Co.',
          location: 'Bengaluru, India',
          start: '2023',
          end: 'Present',
          description: 'Led core product design initiatives across multiple user touchpoints.',
          bullets: [
            'Spearheaded user research and redesigned key workflows, improving engagement by 28%.',
            'Collaborated with engineering to establish design system tokens, reducing UI cycle times by 35%.',
          ],
        },
        {
          id: 'exp_upload_2',
          title: `Associate ${derivedRole}`,
          company: 'Lumen Labs',
          location: 'Bengaluru, India',
          start: '2021',
          end: '2023',
          description: 'Contributed to discovery, wireframing, prototyping and testing.',
          bullets: [
            'Conducted 20+ usability sessions to inform navigation restructuring.',
            'Delivered high-fidelity Figma components used across 4 product squads.',
          ],
        },
      ],
      education: [
        {
          id: 'edu_upload_1',
          degree: 'Bachelor of Design',
          institution: 'National Institute of Design',
          location: 'Ahmedabad, India',
          dates: '2017 – 2021',
          details: 'Specialization in Interaction Design',
        },
      ],
      projects: [
        {
          id: 'proj_upload_1',
          name: 'Design System & Component Library',
          description: 'Scalable multi-platform component architecture in Figma and React.',
          tech: ['Figma', 'React', 'Design Tokens', 'Storybook'],
          link: '',
          bullets: ['Defined tokens for color, typography, and spacing consumed by web and mobile.'],
        },
      ],
      skills: {
        technical: ['Design Systems', 'User Research', 'Prototyping', 'Wireframing', 'Information Architecture'],
        tools: ['Figma', 'FigJam', 'Miro', 'Notion', 'Jira'],
        other: ['Design Thinking', 'Cross-functional Collaboration', 'A/B Testing'],
      },
      certifications: [],
    },
    updatedAt: new Date().toISOString(),
  }

  const atsScore = computeAts(document).total

  return {
    fileId,
    targetRole: derivedRole,
    name: document.name,
    document,
    atsScore,
  }
}

/**
 * End-to-end convenience method:
 * 1. Uploads file
 * 2. Parses file into ResumeDocument
 * 3. Persists document into local storage so getResumeDocument() finds it
 * 4. Returns UploadedResumeInfo for UI consumption
 */
export async function createResumeFromUpload(file: File): Promise<UploadedResumeInfo> {
  const uploadRes = await uploadResume(file)
  const parseRes = await parseUploadedResume(uploadRes.fileId, file)

  // Save the base document (remains unchanged as base)
  await saveResumeDocument(parseRes.document, { touch: true })

  return {
    id: parseRes.document.id,
    fileName: file.name,
    fileSize: file.size,
    fileSizeFormatted: formatFileSize(file.size),
    fileType: uploadRes.fileType,
    status: 'ready',
    atsScore: parseRes.atsScore,
    document: parseRes.document,
  }
}
