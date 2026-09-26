/**
 * jobAnalysis.service.ts
 *
 * Owns the contract for POST /api/resumes/analyze-job.
 *
 * HOW TO MIGRATE TO THE REAL BACKEND
 * ────────────────────────────────────────────────────────────────────────────
 * Replace the body of `analyzeJobDescription` with:
 *
 *   const res = await fetch('/api/resumes/analyze-job', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(request),
 *   })
 *   if (!res.ok) throw new Error(`Analysis failed: ${res.statusText}`)
 *   return res.json() as Promise<JobAnalysisResponse>
 *
 * The backend handles AI provider selection and API keys.
 * The frontend is completely provider-agnostic — no API key lives here.
 * ────────────────────────────────────────────────────────────────────────────
 */

import { extractKeywords } from '@/services/tailor.service'
import type { ProfileData } from '@/types/profile'

// ─── API request shape ────────────────────────────────────────────────────────
// Sent to POST /api/resumes/analyze-job

export interface JobAnalysisRequest {
  targetRole: string
  jobDescription: string
  /** Full Career Profile object — the backend uses it for matching. */
  careerProfile: ProfileData
}

// ─── API response shape ───────────────────────────────────────────────────────
// Returned by POST /api/resumes/analyze-job
// This is the single source of truth for the Step 2 UI.

export type InsightType = 'strength' | 'opportunity' | 'gap'

export interface JobInsight {
  /** Machine-readable type — the UI maps this to an icon. */
  type: InsightType
  title: string
  body: string
}

export interface JobAnalysisResponse {
  /** Parsed or inferred job title from the JD. */
  role: string
  /** Company name parsed from the JD. Empty string if not found. */
  company: string
  /** Location parsed from the JD. Empty string if not found. */
  location: string
  /** e.g. "Hybrid", "Remote", "On-site". Empty string if not found. */
  workType: string
  /** e.g. "1–3 years", "0–2 years". Empty string if not found. */
  experience: string
  /**
   * Profile-to-job alignment score (0–100).
   * NOT an ATS score — this measures Career Profile coverage of the JD.
   * Used as a preliminary indicator before the resume is generated.
   */
  alignmentScore: number
  /** All key requirements identified in the JD. */
  keyRequirements: string[]
  /** Subset of keyRequirements already present in the Career Profile. */
  matchedSkills: string[]
  /** Constructive gaps — requirements not well-covered by the profile. */
  gaps: string[]
  /** High-level observations about the profile ↔ job match. */
  insights: JobInsight[]
}

// ─── Mock implementation ──────────────────────────────────────────────────────
// Replace `analyzeJobDescription` body with a real fetch when backend is ready.

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))
const toTitle = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase())

const ROLE_DEFAULTS: Record<string, string[]> = {
  design: ['Figma', 'User Research', 'Design Systems', 'Prototyping', 'Usability Testing', 'Product Thinking', 'Accessibility'],
  frontend: ['React', 'TypeScript', 'JavaScript', 'CSS', 'Performance Optimisation', 'Accessibility'],
  product: ['Analytics', 'Roadmap Planning', 'Stakeholder Management', 'SQL', 'User Research', 'Metrics'],
}

function inferRoleKey(role: string): string {
  if (/design|ux|ui/i.test(role)) return 'design'
  if (/front|web|developer|engineer/i.test(role)) return 'frontend'
  if (/product|analyst/i.test(role)) return 'product'
  return 'design'
}

function buildMockResponse({ targetRole, jobDescription, careerProfile }: JobAnalysisRequest): JobAnalysisResponse {
  const jdKeywords = extractKeywords(jobDescription).map(toTitle)
  const defaults = ROLE_DEFAULTS[inferRoleKey(targetRole)]
  const keyRequirements = [...new Set([...jdKeywords, ...defaults])].slice(0, 7)

  const profileText = [
    ...careerProfile.skills,
    careerProfile.summary,
    ...careerProfile.experience.map((e) => `${e.role} ${e.summary}`),
    ...careerProfile.projects.map((p) => `${p.name} ${p.description} ${p.technologies.join(' ')}`),
  ]
    .join(' ')
    .toLowerCase()

  const matchedSkills = keyRequirements.filter((req) => profileText.includes(req.toLowerCase()))
  const unmatched = keyRequirements.filter((r) => !matchedSkills.includes(r))
  const gaps = [...unmatched.slice(0, 2), 'Quantified impact'].slice(0, 3)

  const ratio = keyRequirements.length > 0 ? matchedSkills.length / keyRequirements.length : 0
  const alignmentScore = Math.min(92, Math.round(40 + ratio * 52))

  // Insights: the real backend returns these from its LLM analysis.
  // The mock generates plausible static observations.
  const insights: JobInsight[] = [
    {
      type: 'strength',
      title: 'Strong skill overlap',
      body: 'Your profile already includes several core skills mentioned in the role.',
    },
    {
      type: 'strength',
      title: 'Relevant project evidence',
      body: 'Your projects can support the requirements of this position.',
    },
    {
      type: 'opportunity',
      title: 'Content opportunity',
      body: 'Your resume can better emphasize measurable impact and strengthen key gaps.',
    },
  ]

  return {
    role: targetRole,
    company: '',      // real backend parses from JD
    location: careerProfile.location || '',
    workType: '',     // real backend parses from JD
    experience: '',   // real backend parses from JD
    alignmentScore,
    keyRequirements,
    matchedSkills,
    gaps,
    insights,
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Analyzes a job description against a Career Profile.
 *
 * Currently returns mock data with a simulated network delay.
 * Replace the body with a real fetch to POST /api/resumes/analyze-job
 * when the backend is available. See the file header for migration steps.
 */
export async function analyzeJobDescription(request: JobAnalysisRequest): Promise<JobAnalysisResponse> {
  // ── Replace everything below with a real fetch ──
  await wait(1400) // simulate network latency
  return buildMockResponse(request)
  // ───────────────────────────────────────────────
}
