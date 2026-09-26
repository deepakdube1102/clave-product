import { ArrowLeft, ArrowRight, Briefcase, Check, ClipboardPaste, FileText, Layers, RefreshCw, Search, Target, TrendingUp, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ImportProgress } from '@/components/onboarding/ImportProgress'
import { FlowShell } from '@/components/resumes/FlowShell'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { EmptyState } from '@/components/ui/EmptyState'
import { LoadingState } from '@/components/ui/LoadingState'
import { paths, resumePath } from '@/routes/navigation'
import { getProfile } from '@/services/profile.service'
import { generateResumeFromProfile, generationStages, missingProfileInfo } from '@/services/resumeGeneration.service'
import type { GeneratedResume, GenerationInput } from '@/services/resumeGeneration.service'
import { createResumeFromDocument } from '@/services/resumeDocument.service'
import { analyzeJobDescription } from '@/services/jobAnalysis.service'
import type { JobAnalysisResponse } from '@/services/jobAnalysis.service'
import { extractKeywords } from '@/services/tailor.service'
import { toast } from '@/store/toastStore'
import type { ProfileData } from '@/types/profile'
import { computeAts } from '@/utils/ats'
import { cn } from '@/utils/cn'
import { experienceLevelLabels } from '@/utils/profile'

type Phase = 'setup' | 'analyze' | 'generating' | 'review'

const list = (items: string[]) => (items.length > 1 ? `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}` : (items[0] ?? ''))

// ─── Shared sub-components ────────────────────────────────────────────────────

function Chips({ options, value, onPick, label }: { options: string[]; value: string; onPick: (option: string) => void; label: string }) {
  if (options.length === 0) return null
  return (
    <div className="mt-2.5 flex flex-wrap gap-1.5" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onPick(option)}
          aria-pressed={value === option}
          className={cn(
            'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
            value === option
              ? 'border-primary bg-primary/8 text-primary-deep'
              : 'border-border bg-surface text-secondary hover:border-primary/40 hover:text-text',
          )}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

function ReviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="py-6 first:pt-0">
      <h2 className="text-xs font-medium tracking-wide text-muted uppercase">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  )
}

// ─── JD Analysis preview ──────────────────────────────────────────────────────

/** Groups of terms extracted from the JD text. Purely client-side using the existing extractKeywords vocab. */
function JdAnalysisPreview({ jd, role }: { jd: string; role: string }) {
  const keywords = extractKeywords(jd)

  // Simple heuristic grouping from the existing VOCAB
  const skillTerms = keywords.filter((k) =>
    ['react', 'typescript', 'figma', 'sql', 'html', 'css', 'jira', 'design system'].includes(k),
  )
  const methodTerms = keywords.filter((k) =>
    ['user research', 'wireframing', 'prototyping', 'usability testing', 'a/b testing', 'journey mapping', 'design thinking', 'user flows', 'interaction design', 'visual design', 'information architecture'].includes(k),
  )
  const generalTerms = keywords.filter((k) => !skillTerms.includes(k) && !methodTerms.includes(k))

  // Compose display groups — at least show role as a keyword hint if no matches
  const groups: { label: string; items: string[] }[] = []
  if (skillTerms.length > 0) groups.push({ label: 'Skills & tools', items: skillTerms })
  if (methodTerms.length > 0) groups.push({ label: 'Methods & practices', items: methodTerms })
  if (generalTerms.length > 0) groups.push({ label: 'Keywords', items: generalTerms })

  if (keywords.length === 0) {
    // No vocab matches — show the role and a neutral message
    return (
      <div className="mt-4 rounded-lg border border-border bg-background/60 px-4 py-3">
        <p className="text-xs text-muted">
          No specific keywords detected yet. Clave will still use the full text to tailor your resume for{' '}
          <span className="font-medium text-secondary">{role || 'your target role'}</span>.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-4 rounded-lg border border-primary/15 bg-primary/[0.025] px-4 py-3.5">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-primary/70">
        Detected from job description
      </p>
      <div className="flex flex-col gap-2.5">
        {groups.map(({ label, items }) => (
          <div key={label} className="flex flex-wrap items-baseline gap-x-2 gap-y-1.5">
            <span className="shrink-0 text-xs font-medium text-secondary">{label}</span>
            <span className="text-muted" aria-hidden>·</span>
            {items.map((item) => (
              <span
                key={item}
                className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-text ring-1 ring-border"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </span>
            ))}
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-muted">
        {keywords.length} keyword{keywords.length !== 1 ? 's' : ''} identified · Clave will align your resume to these terms
      </p>
    </div>
  )
}

// ─── How it works sidebar ──────────────────────────────────────────────────────

const HOW_IT_WORKS = [
  {
    icon: ClipboardPaste,
    step: 1,
    title: 'Paste the job description',
    body: 'Tell Clave what role you\'re applying for.',
  },
  {
    icon: Target,
    step: 2,
    title: 'Clave analyzes the opportunity',
    body: 'Identifies relevant skills, keywords, and requirements.',
  },
  {
    icon: FileText,
    step: 3,
    title: 'Generate your tailored resume',
    body: 'Uses your Career Profile to create a resume for the role.',
  },
]

// ─── Main flow ────────────────────────────────────────────────────────────────────────

/** Target role → generating → review → shared editor. Uses the Career Profile so nothing is re-entered. */
export function AIResumeFlow() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState<ProfileData | null | undefined>(undefined)
  const [role, setRole] = useState('')
  const [industry] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [roleError, setRoleError] = useState<string>()
  const [phase, setPhase] = useState<Phase>('setup')
  const [analysis, setAnalysis] = useState<JobAnalysisResponse | null>(null)
  const [isAnalyzingJd, setIsAnalyzingJd] = useState(false)
  const [stageIndex, setStageIndex] = useState(0)
  const [result, setResult] = useState<GeneratedResume | null>(null)
  const [attempt, setAttempt] = useState(0)
  const [opening, setOpening] = useState(false)
  const runId = useRef(0)
  const jdRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    let active = true
    getProfile().then((loaded) => {
      if (!active) return
      setProfile(loaded)
      setRole(loaded?.targetRoles[0] ?? '')
    })
    return () => { active = false }
  }, [])

  if (profile === undefined) return <LoadingState label="Reading your Career Profile…" />

  const hasAnything =
    !!profile &&
    profile.targetRoles.length + profile.experience.length + profile.projects.length + profile.skills.length + profile.education.length > 0

  if (!profile || !hasAnything) {
    return (
      <FlowShell title="Build your resume with AI" editorial description="Use your Career Profile and the job you're targeting to create a tailored resume.">
        <EmptyState
          title="Your Career Profile is empty"
          description="Add a few details first — a target role, skills, experience or projects — and Clave can draft a tailored resume for you."
          action={
            <Link to={paths.careerProfile} className={buttonStyles()}>
              Open Career Profile
            </Link>
          }
        />
      </FlowShell>
    )
  }

  // ── Actions ──────────────────────────────────────────────────────────────────

  const generate = async (nextAttempt: number) => {
    const target = role.trim()
    if (!target) {
      setRoleError('Tell us which role this resume is for.')
      return
    }
    setRoleError(undefined)
    const id = ++runId.current
    const input: GenerationInput = { role: target, industry, jobDescription, attempt: nextAttempt }
    setAttempt(nextAttempt)
    setStageIndex(0)
    setPhase('generating')
    try {
      const generated = await generateResumeFromProfile(profile, input, (index) => id === runId.current && setStageIndex(index))
      if (id !== runId.current) return
      setResult(generated)
      setPhase('review')
    } catch {
      if (id !== runId.current) return
      toast.error('We couldn\'t generate your resume', 'Please try again.')
      setPhase('setup')
    }
  }

  /**
   * Validates Step 1 inputs, calls the job analysis service, then
   * transitions to the 'analyze' phase (Step 2) with the result.
   * When the backend is live, analyzeJobDescription() will hit
   * POST /api/resumes/analyze-job — no changes needed here.
   */
  const goToAnalyze = async () => {
    const target = role.trim()
    if (!target) {
      setRoleError('Tell us which role this resume is for.')
      return
    }
    setRoleError(undefined)
    setIsAnalyzingJd(true)
    try {
      const result = await analyzeJobDescription({
        targetRole: target,
        jobDescription,
        careerProfile: profile,
      })
      setAnalysis(result)
      setPhase('analyze')
    } catch {
      toast.error('Could not analyze the job description', 'Please try again.')
    } finally {
      setIsAnalyzingJd(false)
    }
  }

  const backToSetup = () => { runId.current++; setPhase('setup') }
  const backFromStep3 = () => {
    runId.current++
    if (analysis) {
      setPhase('analyze')
    } else {
      setPhase('setup')
    }
  }

  const openInEditor = async () => {
    if (!result) return
    setOpening(true)
    try {
      const created = await createResumeFromDocument(result.doc, { type: 'base' })
      navigate(resumePath(created.id), { replace: true })
    } catch {
      toast.error('Couldn\'t open the editor', 'Please try again.')
      setOpening(false)
    }
  }

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (text.trim()) {
        setJobDescription(text)
        jdRef.current?.focus()
      }
    } catch {
      toast.info('Clipboard access denied', 'Paste the job description manually.')
    }
  }

  // ── Phase: analyze (Step 2) ──────────────────────────────────────────────────

  if (phase === 'analyze' && analysis) {
    const jobTitle = analysis.role
    const meta = [analysis.location, analysis.workType, analysis.experience].filter(Boolean).join(' · ')

    // Alignment copy by score band
    const alignCopy =
      analysis.alignmentScore >= 75
        ? `Your profile covers many of the role\u2019s core requirements. Clave will prioritize the strongest evidence in your resume and strengthen relevant gaps where possible.`
        : analysis.alignmentScore >= 55
        ? `Your profile has a solid foundation for this role. Clave will highlight your most relevant experience and help you address key gaps in the resume.`
        : `There are meaningful gaps between this role and your current profile. Clave will work with your strongest evidence and suggest where to focus future development.`

    // Map insight type to icon — no sparkles.
    const insightIcon = (type: import('@/services/jobAnalysis.service').InsightType) => {
      if (type === 'strength') return Layers
      if (type === 'opportunity') return TrendingUp
      return Search
    }

    return (
      <FlowShell
        editorial
        title="Understanding the opportunity"
        description="Clave is comparing this job with your Career Profile to identify what matters most for this role."
        step={{ current: 2, total: 3, label: 'Analyze' }}
        onBack={backToSetup}
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px] lg:items-start lg:gap-10">

          {/* ── Left column ──────────────────────────────────────────────── */}
          <div className="flex flex-col gap-5">

            {/* Job Match Analysis card */}
            <div className="rounded-xl border border-border bg-surface p-5">
              {/* Card header */}
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-muted/70">Job Match Analysis</p>

              {/* Job metadata */}
              <div className="mb-5 flex items-start gap-3 border-b border-border pb-5">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
                  <Briefcase className="size-4 text-secondary" aria-hidden />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">{jobTitle}</p>
                  <p className="mt-0.5 text-xs text-secondary">
                    {meta || (analysis.company ? analysis.company : 'From your job description')}
                  </p>
                </div>
              </div>

              {/* Key requirements */}
              <div className="mb-5">
                <p className="mb-2.5 text-xs font-semibold text-text">Key requirements</p>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.keyRequirements.map((req) => (
                    <span
                      key={req}
                      className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs font-medium text-secondary"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              {/* Covered */}
              {analysis.matchedSkills.length > 0 && (
                <div className="mb-5">
                  <p className="mb-2.5 text-xs font-semibold text-text">Your profile already covers</p>
                  <ul className="flex flex-col gap-1.5">
                    {analysis.matchedSkills.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Check className="size-2.5 text-primary" strokeWidth={3} aria-hidden />
                        </span>
                        <span className="text-sm text-text">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Gaps */}
              {analysis.gaps.length > 0 && (
                <div>
                  <p className="mb-2.5 text-xs font-semibold text-text">Worth strengthening</p>
                  <ul className="flex flex-col gap-1.5">
                    {analysis.gaps.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-border">
                          <span className="size-1.5 rounded-full bg-muted" aria-hidden />
                        </span>
                        <span className="text-sm text-secondary">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Profile alignment */}
            <div className="rounded-xl border border-border bg-surface p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold text-text">Profile alignment</p>
                <span className="text-lg font-bold tabular-nums text-text">
                  {analysis.alignmentScore}
                  <span className="text-sm font-normal text-muted">%</span>
                </span>
              </div>
              {/* Progress bar */}
              <div className="mb-3 h-1.5 rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-700"
                  style={{ width: `${analysis.alignmentScore}%` }}
                  role="progressbar"
                  aria-valuenow={analysis.alignmentScore}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Profile alignment: ${analysis.alignmentScore}%`}
                />
              </div>
              <p className="text-xs leading-relaxed text-secondary">{alignCopy}</p>
            </div>

            {/* Action area */}
            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => void generate(0)}
                style={{ backgroundColor: '#087F5B', height: 48, borderRadius: 9 }}
                className="flex w-full items-center justify-center gap-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Build My Tailored Resume
                <ArrowRight className="size-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={backToSetup}
                className="w-full pt-0.5 text-center text-xs text-muted transition-colors hover:text-secondary"
              >
                Back to Job Description
              </button>
            </div>
          </div>

          {/* ── Right column ─────────────────────────────────────────────── */}
          <aside className="flex flex-col gap-4" aria-label="What Clave found">

            {/* What Clave found */}
            <div className="rounded-xl border border-border bg-surface px-5 py-4">
              <p className="mb-3.5 text-[11px] font-semibold uppercase tracking-wider text-muted/70">What Clave found</p>
              <ol className="flex flex-col gap-4">
                {analysis.insights.map((insight, i) => {
                  const Icon = insightIcon(insight.type)
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <div className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
                        <Icon className="size-3.5 text-secondary" aria-hidden />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-text">{insight.title}</p>
                        <p className="mt-0.5 text-[11px] leading-relaxed text-muted">{insight.body}</p>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </div>

            {/* Career Profile context */}
            <div className="rounded-xl border border-border bg-background/60 px-4 py-3.5">
              <div className="mb-1.5 flex items-center gap-1.5">
                <FileText className="size-3 text-muted" aria-hidden />
                <p className="text-[11px] font-semibold text-secondary">Using your Career Profile</p>
              </div>
              <p className="text-[11px] leading-relaxed text-muted">
                Your Career Profile remains the source of truth. Clave will only tailor the presentation of your experience, projects, and skills to this opportunity.
              </p>
            </div>
          </aside>
        </div>
      </FlowShell>
    )
  }

  // ── Phase: generating ────────────────────────────────────────────────────────

  if (phase === 'generating') {
    return (
      <FlowShell title="Building your resume…" step={{ current: 3, total: 3, label: 'Resume' }} onBack={backFromStep3}>
        <div className="mx-auto max-w-md pt-4">
          <ImportProgress stages={generationStages} current={generationStages[stageIndex]} />
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={backFromStep3}
              className="text-xs text-muted hover:text-secondary transition-colors"
            >
              Cancel and return to previous step
            </button>
          </div>
        </div>
      </FlowShell>
    )
  }

  // ── Phase: review ─────────────────────────────────────────────────────────────

  if (phase === 'review' && result) {
    const { doc, keywords, usedJobDescription } = result
    const ats = computeAts(doc).total
    const { content } = doc
    const skills = [...content.skills.technical, ...content.skills.tools, ...content.skills.other]

    return (
      <FlowShell
        editorial
        title="Your resume is ready"
        description={`Built from your Career Profile for ${doc.targetRole}${industry.trim() ? ` in ${industry.trim()}` : ''}${usedJobDescription ? ', using your job description' : ''}. Review it, then open the editor to refine.`}
        step={{ current: 3, total: 3, label: 'Review' }}
        onBack={backFromStep3}
      >
        <div className="max-w-3xl">
          <Badge variant="success" dot>
            Estimated ATS score {ats}/100
          </Badge>

          <div className="mt-6 divide-y divide-border">
            <ReviewSection title="Professional summary">
              <p className="text-base leading-relaxed text-text">{content.summary}</p>
            </ReviewSection>

            <ReviewSection title="Experience">
              {content.experience.length === 0 ? (
                <p className="text-sm text-muted">No experience in your profile yet. You can add some in the editor.</p>
              ) : (
                <ul className="flex flex-col gap-3">
                  {content.experience.map((e) => (
                    <li key={e.id} className="text-sm">
                      <span className="font-medium text-text">{[e.title, e.company].filter(Boolean).join(' · ')}</span>
                      <span className="text-secondary"> · {e.bullets.length} {e.bullets.length === 1 ? 'bullet' : 'bullets'}</span>
                    </li>
                  ))}
                </ul>
              )}
            </ReviewSection>

            <ReviewSection title="Projects">
              {content.projects.length === 0 ? (
                <p className="text-sm text-muted">No projects in your profile yet.</p>
              ) : (
                <ul className="flex flex-col gap-3">
                  {content.projects.map((p) => (
                    <li key={p.id} className="text-sm">
                      <span className="font-medium text-text">{p.name}</span>
                      {p.description && <span className="block text-secondary">{p.description}</span>}
                    </li>
                  ))}
                </ul>
              )}
            </ReviewSection>

            <ReviewSection title="Skills">
              {skills.length === 0 ? (
                <p className="text-sm text-muted">No skills in your profile yet.</p>
              ) : (
                <ul className="flex flex-wrap gap-1.5" aria-label="Skills">
                  {skills.map((skill, index) => (
                    <li key={skill}>
                      <Badge variant={index < 4 ? 'primary' : 'neutral'}>{skill}</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </ReviewSection>

            <ReviewSection title="ATS-focused keywords">
              {keywords.length === 0 ? (
                <p className="text-sm text-muted">Add a job description next time to focus on its keywords.</p>
              ) : (
                <>
                  <ul className="flex flex-wrap gap-1.5" aria-label="ATS keywords">
                    {keywords.map((keyword) => (
                      <li key={keyword}>
                        <Badge variant="success">{keyword}</Badge>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-sm text-secondary">
                    Covered on your resume: {list(keywords.slice(0, 3))}{keywords.length > 3 ? ' and more' : ''}.
                  </p>
                </>
              )}
            </ReviewSection>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" loading={opening} onClick={openInEditor}>
              Open in Resume Editor
            </Button>
            <Button variant="ghost" size="lg" leadingIcon={<RefreshCw className="size-4" />} onClick={() => void generate(attempt + 1)} disabled={opening}>
              Regenerate
            </Button>
            <Button variant="secondary" size="lg" leadingIcon={<ArrowLeft className="size-4" />} onClick={backFromStep3} disabled={opening}>
              {analysis ? 'Back to Analysis' : 'Back to Job Details'}
            </Button>
          </div>
        </div>
      </FlowShell>
    )
  }

  // ── Phase: setup (Step 1) ─────────────────────────────────────────────────────

  const missing = missingProfileInfo(profile)
  const topSkills = profile.skills.slice(0, 6)
  const hasJd = jobDescription.trim().length > 0

  return (
    <FlowShell
      editorial
      title="Build your resume with AI"
      description="Use your Career Profile and the job you're targeting to create a tailored resume."
      step={{ current: 1, total: 3, label: 'Job' }}
    >
      <form
        noValidate
        onSubmit={(e) => { e.preventDefault(); void goToAnalyze() }}
        className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_320px] lg:items-start lg:gap-10"
      >
        {/* ── Left column: main inputs ───────────────────────────────────────── */}
        <div className="flex flex-col gap-6">

          {/* Career Profile context card */}
          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-3">
                {/* Avatar initial */}
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {(profile.name || 'U').charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-text">{profile.name || 'Your Career Profile'}</span>
                    {profile.experienceLevel && (
                      <Badge variant="primary">{experienceLevelLabels[profile.experienceLevel]}</Badge>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-secondary">
                    {profile.targetRoles.length > 0 ? profile.targetRoles.join(' · ') : 'No target role set'}
                    {profile.location ? ` · ${profile.location}` : ''}
                  </p>
                  <p className="mt-1.5 text-xs text-muted">Using your Career Profile as the source of truth.</p>
                </div>
              </div>
              <Link
                to={paths.careerProfile}
                className="shrink-0 text-xs font-medium text-primary transition-colors hover:text-primary-deep"
              >
                View profile →
              </Link>
            </div>

            {/* Top skills */}
            {topSkills.length > 0 && (
              <ul className="mt-3.5 flex flex-wrap gap-1.5 border-t border-border pt-3.5" aria-label="Top skills">
                {topSkills.map((skill) => (
                  <li key={skill}>
                    <Badge variant="neutral">{skill}</Badge>
                  </li>
                ))}
                {profile.skills.length > 6 && (
                  <li>
                    <Badge variant="neutral">+{profile.skills.length - 6} more</Badge>
                  </li>
                )}
              </ul>
            )}

            {/* Missing info notice */}
            {missing.length > 0 && (
              <p className="mt-3 border-t border-border pt-3 text-xs text-secondary">
                Your profile doesn't include {list(missing)} yet. You can continue without {missing.length === 1 ? 'it' : 'them'}, or{' '}
                <Link to={paths.careerProfile} className="font-medium text-primary hover:underline">
                  add {missing.length === 1 ? 'it' : 'them'} first
                </Link>
                .
              </p>
            )}
          </div>

          {/* Target role */}
          <div>
            <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-text">
              <Briefcase className="size-3.5 text-muted" aria-hidden />
              Target role
            </label>
            <input
              type="text"
              aria-label="Target role"
              placeholder="e.g. Frontend Developer"
              value={role}
              onChange={(e) => { setRole(e.target.value); setRoleError(undefined) }}
              className={cn(
                'w-full rounded-control border bg-surface px-3 py-2.5 text-sm text-text shadow-xs transition-colors placeholder:text-muted',
                'focus:outline-none focus:ring-2',
                roleError
                  ? 'border-error focus:border-error focus:ring-error/20'
                  : 'border-border hover:border-muted focus:border-primary focus:ring-primary/20',
              )}
            />
            {roleError && <p className="mt-1.5 text-sm text-error">{roleError}</p>}
            <Chips options={profile.targetRoles} value={role} onPick={setRole} label="Your target roles" />
          </div>

          {/* ── Job Description — PRIMARY SECTION ────────────────────────────── */}
          <div>
            {/* Section label */}
            <div className="mb-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <FileText className="size-3.5 text-primary" aria-hidden />
                <span className="text-sm font-semibold text-text">Job Description</span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                  Recommended
                </span>
              </div>
              {hasJd && (
                <button
                  type="button"
                  aria-label="Clear job description"
                  onClick={() => setJobDescription('')}
                  className="flex items-center gap-1 text-xs text-muted transition-colors hover:text-text"
                >
                  <X className="size-3" aria-hidden />
                  Clear
                </button>
              )}
            </div>

            <p className="mb-3 text-sm text-secondary">
              Paste the job you're applying for. Clave will analyze the role, responsibilities, skills, and keywords to tailor your resume.
            </p>

            {/* Large textarea — primary input on the page */}
            <div>
              <textarea
                ref={jdRef}
                aria-label="Job description"
                rows={7}
                maxLength={5000}
                placeholder="Paste the full job description here…"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full resize-none rounded-xl border border-border bg-surface px-4 py-3.5 text-sm text-text shadow-xs transition-colors placeholder:text-muted focus:outline-none"
                style={{
                  // Use exact Clave emerald on focus — overrides Tailwind reset
                  ['--tw-ring-color' as string]: 'rgba(8,127,91,0.18)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#087F5B'
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(8,127,91,0.12)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = ''
                  e.currentTarget.style.boxShadow = ''
                }}
              />
              {/* Below-textarea row: paste action + char count */}
              <div className="mt-1.5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={pasteFromClipboard}
                  className="flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-primary"
                >
                  <ClipboardPaste className="size-3" aria-hidden />
                  Paste from clipboard
                </button>
                <span className={cn('text-xs tabular-nums', jobDescription.length > 4800 ? 'text-warning' : 'text-muted')}>
                  {jobDescription.length.toLocaleString()}/5,000
                </span>
              </div>
            </div>

            {/* Helper copy */}
            <p className="mt-1 text-xs text-muted">
              The more complete the job description, the better Clave can tailor your resume.
            </p>

            {/* JD analysis preview — only when JD has meaningful content */}
            {jobDescription.trim().length > 80 && (
              <JdAnalysisPreview jd={jobDescription} role={role} />
            )}

          </div>

          {/* ── Action area ─────────────────────────────────────────────── */}
          <div className="flex flex-col gap-2.5 pt-1 pb-1">
            {/* Helper line — contextual, sits right above the button */}
            <p className="text-xs text-muted">
              Your resume will be tailored using your Career Profile and this job description.
            </p>

            {/* Primary CTA — full-width, exact Clave emerald */}
            <button
              type="submit"
              disabled={isAnalyzingJd}
              style={{
                backgroundColor: '#087F5B',
                height: 48,
                borderRadius: 9,
              }}
              className="flex w-full items-center justify-center gap-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-60"
            >
              {isAnalyzingJd ? 'Analyzing…' : 'Generate Tailored Resume'}
              {!isAnalyzingJd && <ArrowRight className="size-4" aria-hidden />}
            </button>

            {/* Secondary action — muted, centred, no border */}
            <button
              type="button"
              onClick={() => void generate(0)}
              className="w-full pt-0.5 text-center text-xs text-muted transition-colors hover:text-secondary"
            >
              Skip JD &amp; Create General Resume
            </button>
          </div>
        </div>

        {/* ── Right column: How it works + Pro tip ──────────────────────────── */}
        <aside className="mt-6 flex flex-col gap-4 lg:mt-0" aria-label="How it works">
          {/* How it works */}
          <div className="rounded-xl border border-border bg-surface px-5 py-4">
            <p className="mb-3.5 text-[11px] font-semibold uppercase tracking-wider text-muted/70">How it works</p>
            <ol className="flex flex-col gap-3.5">
              {HOW_IT_WORKS.map(({ icon: Icon, step, title, body }) => (
                <li key={step} className="flex items-start gap-3">
                  <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-border">
                    <span className="text-[10px] font-semibold text-secondary">{step}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <Icon className="size-3 text-muted" aria-hidden />
                      <p className="text-xs font-semibold text-text">{title}</p>
                    </div>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-muted">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Pro tip */}
          <div className="rounded-xl border border-primary/15 bg-primary/[0.025] p-4">
            <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-primary">
              <Target className="size-3.5" aria-hidden />
              Pro tip
            </p>
            <p className="text-xs leading-relaxed text-secondary">
              Paste the complete job description whenever possible. It gives Clave more context to tailor your resume and improve ATS alignment.
            </p>
          </div>
        </aside>
      </form>
    </FlowShell>
  )
}
