import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import type { ResumeContact, ResumeDocument, ResumeSectionKey, ResumeSkills } from '@/types/resumeDocument'
import { templates } from '@/utils/resumeTemplates'
import type { SkillsMode } from '@/utils/resumeTemplates'

const PAGE_WIDTH = 794 // A4 at 96dpi
const PAGE_HEIGHT = 1123

/** Scales the fixed-width page down to fit the panel while keeping true layout. */
function ScaledPage({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [height, setHeight] = useState(PAGE_HEIGHT)

  useEffect(() => {
    const measure = () => {
      if (!wrapRef.current || !innerRef.current) return
      setScale(Math.min(1, wrapRef.current.clientWidth / PAGE_WIDTH))
      setHeight(innerRef.current.offsetHeight)
    }
    measure()
    const observer = new ResizeObserver(measure)
    if (wrapRef.current) observer.observe(wrapRef.current)
    if (innerRef.current) observer.observe(innerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className="w-full">
      <div style={{ height: height * scale, width: PAGE_WIDTH * scale }} className="mx-auto">
        <div ref={innerRef} style={{ width: PAGE_WIDTH, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

function Heading({ css, children }: { css: CSSProperties; children: ReactNode }) {
  return <h2 style={css}>{children}</h2>
}

function Block({ gap, children }: { gap: number; children: ReactNode }) {
  return <section style={{ marginTop: gap }}>{children}</section>
}

const row: CSSProperties = { display: 'flex', justifyContent: 'space-between', gap: 16 }

function Bullets({ items }: { items: string[] }) {
  const filled = items.filter((item) => item.trim())
  if (filled.length === 0) return null
  return (
    <ul style={{ listStyle: 'disc', paddingLeft: 20, margin: '2px 0 0' }}>
      {filled.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  )
}

const skillGroups = (skills: ResumeSkills) =>
  [
    ['Technical', skills.technical],
    ['Tools', skills.tools],
    ['Other', skills.other],
  ] as const

function SkillsBlock({ skills, mode, accent }: { skills: ResumeSkills; mode: SkillsMode; accent?: string }) {
  const groups = skillGroups(skills).filter(([, list]) => list.length > 0)
  if (mode === 'chips') {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {groups.flatMap(([, list]) => list).map((skill, index) => (
          <span key={index} style={{ border: `1px solid ${accent ?? '#999'}55`, background: '#f4f8f6', borderRadius: 999, padding: '1px 10px', fontSize: '0.92em' }}>
            {skill}
          </span>
        ))}
      </div>
    )
  }
  if (mode === 'grid') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', rowGap: 3, columnGap: 12 }}>
        {groups.map(([label, list]) => (
          <div key={label} style={{ display: 'contents' }}>
            <strong>{label}</strong>
            <span>{list.join(', ')}</span>
          </div>
        ))}
      </div>
    )
  }
  return (
    <>
      {groups.map(([label, list]) => (
        <div key={label}>
          <strong>{label}:</strong> {list.join(', ')}
        </div>
      ))}
    </>
  )
}

const contactItems = (c: ResumeContact) => [c.email, c.phone, c.location, c.linkedin, c.github, c.portfolio].filter(Boolean)

/** Real-text documents: every layout uses standard headings and selectable text, which is what an ATS parser expects. */
export function ResumePreview({ doc }: { doc: ResumeDocument }) {
  const style = templates[doc.template]
  const { contact, summary, experience, education, projects, skills, certifications } = doc.content
  const items = contactItems(contact)
  const contactLine = items.join(' | ')
  const label = (key: ResumeSectionKey | 'summary', fallback: string) => style.labels?.[key] ?? fallback
  const mode = style.skills ?? 'lines'
  const sidebar = style.layout === 'sidebar'

  const isBlank = !summary.trim() && experience.length + education.length + projects.length + certifications.length === 0 && !skills.technical.length && !skills.tools.length && !skills.other.length
  const hasSkills = skills.technical.length + skills.tools.length + skills.other.length > 0

  const sections: Record<ResumeSectionKey, ReactNode> = {
    experience:
      experience.length > 0 && (
        <Block key="experience" gap={style.sectionGap}>
          <Heading css={style.heading}>{label('experience', 'Experience')}</Heading>
          {experience.map((item) => (
            <div key={item.id} style={{ marginBottom: style.itemGap }}>
              <div style={row}>
                <strong>{item.title}</strong>
                <span style={{ whiteSpace: 'nowrap' }}>{[item.start, item.end].filter(Boolean).join(' – ')}</span>
              </div>
              {(item.company || item.location) && <div style={{ fontStyle: 'italic' }}>{[item.company, item.location].filter(Boolean).join(', ')}</div>}
              {item.description && <p style={{ margin: '2px 0 0' }}>{item.description}</p>}
              <Bullets items={item.bullets} />
            </div>
          ))}
        </Block>
      ),
    education:
      education.length > 0 && (
        <Block key="education" gap={style.sectionGap}>
          <Heading css={style.heading}>{label('education', 'Education')}</Heading>
          {education.map((item) => (
            <div key={item.id} style={{ marginBottom: style.itemGap }}>
              <div style={row}>
                <strong>{item.degree || item.institution}</strong>
                <span style={{ whiteSpace: 'nowrap' }}>{item.dates}</span>
              </div>
              {item.degree && (item.institution || item.location) && <div>{[item.institution, item.location].filter(Boolean).join(', ')}</div>}
              {item.details && <div>{item.details}</div>}
            </div>
          ))}
        </Block>
      ),
    projects:
      projects.length > 0 && (
        <Block key="projects" gap={style.sectionGap}>
          <Heading css={style.heading}>{label('projects', 'Projects')}</Heading>
          {projects.map((item) => (
            <div key={item.id} style={{ marginBottom: style.itemGap }}>
              <div style={row}>
                <strong>{item.name}</strong>
                {item.link && <span>{item.link}</span>}
              </div>
              {item.tech.length > 0 && <div style={{ fontStyle: 'italic' }}>{item.tech.join(', ')}</div>}
              {item.description && <p style={{ margin: '2px 0 0' }}>{item.description}</p>}
              <Bullets items={item.bullets} />
            </div>
          ))}
        </Block>
      ),
    skills:
      hasSkills && (
        <Block key="skills" gap={style.sectionGap}>
          <Heading css={style.heading}>{label('skills', 'Skills')}</Heading>
          <SkillsBlock skills={skills} mode={mode} accent={style.accent} />
        </Block>
      ),
    certifications:
      certifications.length > 0 && (
        <Block key="certifications" gap={style.sectionGap}>
          <Heading css={style.heading}>{label('certifications', 'Certifications')}</Heading>
          {certifications.map((item) => (
            <div key={item.id} style={row}>
              <span>
                <strong>{item.name}</strong>
                {item.issuer && `, ${item.issuer}`}
                {item.link && ` (${item.link})`}
              </span>
              <span style={{ whiteSpace: 'nowrap' }}>{item.date}</span>
            </div>
          ))}
        </Block>
      ),
  }

  const roleLine = style.role && doc.targetRole ? <p style={{ margin: '2px 0 0', color: style.layout === 'band' ? '#a7f3d0' : style.accent ?? '#555', fontSize: '1.05em' }}>{doc.targetRole}</p> : null
  const nameEl = <h1 style={{ ...style.name, color: contact.name ? style.name.color ?? '#111' : '#aaa', margin: 0, lineHeight: 1.15 }}>{contact.name || 'Your Name'}</h1>
  const summaryEl = summary.trim() && (
    <Block gap={style.sectionGap}>
      <Heading css={style.heading}>{label('summary', 'Summary')}</Heading>
      <p style={{ margin: 0 }}>{summary}</p>
    </Block>
  )
  // Skeleton placeholder lines shown while the resume is still blank
  const BlankSkeleton = () => (
    <div style={{ marginTop: 28 }}>
      {[['Summary', 3], ['Experience', 4], ['Education', 2], ['Skills', 1]] .map(([heading, lines]) => (
        <div key={heading as string} style={{ marginBottom: 22 }}>
          <div style={{ height: 11, width: 90, background: '#e4ebe7', borderRadius: 3, marginBottom: 10 }} />
          <div style={{ height: 1, background: '#dde5e1', marginBottom: 10 }} />
          {Array.from({ length: lines as number }).map((_, i) => (
            <div key={i} style={{ height: 9, background: '#edf2ef', borderRadius: 3, marginBottom: 6, width: i === (lines as number) - 1 ? '65%' : '90%' }} />
          ))}
        </div>
      ))}
      <p style={{ marginTop: 24, fontSize: 11, color: '#aaa', textAlign: 'center', letterSpacing: '0.01em' }}>
        Your resume will appear here as you fill in the sections on the left.
      </p>
    </div>
  )

  const body = (
    <>
      {summaryEl}
      {doc.sectionOrder.filter((key) => !(sidebar && key === 'skills')).map((key) => sections[key])}
      {isBlank && <BlankSkeleton />}
    </>
  )

  const articleBase: CSSProperties = { ...style.page, color: style.page.color ?? '#111', minHeight: PAGE_HEIGHT }
  const frame = 'bg-white'

  let content: ReactNode
  if (sidebar) {
    content = (
      <article aria-label="Resume preview" className={frame} style={{ ...articleBase, display: 'grid', gridTemplateColumns: '230px 1fr' }}>
        <aside style={{ background: style.soft, padding: '52px 24px' }}>
          <h2 style={{ ...style.heading, marginBottom: 8 }}>Contact</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, wordBreak: 'break-word', fontSize: '0.92em', color: '#333' }}>
            {items.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          {hasSkills && (
            <Block gap={style.sectionGap}>
              <Heading css={style.heading}>{label('skills', 'Skills')}</Heading>
              <div style={{ fontSize: '0.92em' }}>
                <SkillsBlock skills={skills} mode="lines" />
              </div>
            </Block>
          )}
        </aside>
        <div style={{ padding: '52px 44px 56px 36px' }}>
          <header>
            {nameEl}
            {roleLine}
          </header>
          {body}
        </div>
      </article>
    )
  } else if (style.layout === 'band') {
    content = (
      <article aria-label="Resume preview" className={frame} style={articleBase}>
        <header style={{ background: style.accent, padding: '44px 60px 34px' }}>
          {nameEl}
          {roleLine}
          {contactLine && <p style={{ margin: '12px 0 0', ...style.contact }}>{contactLine}</p>}
        </header>
        <div style={{ padding: '10px 60px 56px' }}>{body}</div>
      </article>
    )
  } else {
    content = (
      <article aria-label="Resume preview" className={frame} style={{ ...articleBase, padding: style.pad ?? '56px 60px' }}>
        {style.layout === 'split' ? (
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, borderBottom: `2px solid ${style.accent}`, paddingBottom: 14 }}>
            <div>
              {nameEl}
              {roleLine}
            </div>
            <div style={{ ...style.contact, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              {items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </header>
        ) : (
          <header>
            {nameEl}
            {roleLine && <div style={{ textAlign: style.name.textAlign }}>{roleLine}</div>}
            {contactLine && <p style={{ margin: '6px 0 0', ...style.contact }}>{contactLine}</p>}
          </header>
        )}
        {body}
      </article>
    )
  }

  return <ScaledPage>{content}</ScaledPage>
}
