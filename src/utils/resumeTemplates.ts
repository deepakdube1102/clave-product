import type { CSSProperties } from 'react'
import type { ResumeSectionKey, TemplateId } from '@/types/resumeDocument'

export type TemplateLayout = 'single' | 'split' | 'sidebar' | 'band'
export type SkillsMode = 'lines' | 'chips' | 'grid'

export interface TemplateStyle {
  label: string
  description: string
  layout: TemplateLayout
  page: CSSProperties
  name: CSSProperties
  contact: CSSProperties
  heading: CSSProperties
  sectionGap: number
  itemGap: number
  /** Page padding for single and split layouts. */
  pad?: string
  /** Show the target role under the name. */
  role?: boolean
  accent?: string
  soft?: string
  skills?: SkillsMode
  /** Renamed headings, e.g. Projects → Research & Publications. */
  labels?: Partial<Record<ResumeSectionKey | 'summary', string>>
  /** Section order applied when a new resume starts from this template. */
  sectionOrder: ResumeSectionKey[]
}

const ACCENT = '#056B4D'
const SOFT = '#eaf4ef'

/** Every layout is real, selectable text with standard headings: ATS parsers read them all. They differ in structure and hierarchy. */
export const templates: Record<TemplateId, TemplateStyle> = {
  classic: {
    label: 'Classic ATS',
    description: 'Serif type, centred header, ruled headings',
    layout: 'single',
    page: { fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 13, lineHeight: 1.45 },
    name: { fontSize: 30, fontWeight: 700, textAlign: 'center', letterSpacing: '0.01em' },
    contact: { textAlign: 'center' },
    heading: { fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0b5d45', borderBottom: '1px solid #0b5d45', paddingBottom: 2, marginBottom: 8 },
    accent: '#0b5d45',
    sectionGap: 18,
    itemGap: 10,
    sectionOrder: ['experience', 'projects', 'education', 'skills', 'certifications'],
  },
  modern: {
    label: 'Modern ATS',
    description: 'Sidebar for contact and skills, main column for experience',
    layout: 'sidebar',
    page: { fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 12, lineHeight: 1.5 },
    name: { fontSize: 30, fontWeight: 700, textAlign: 'left', color: ACCENT },
    contact: { textAlign: 'left', color: '#444' },
    heading: { fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: ACCENT, borderBottom: '2px solid #cfe6db', paddingBottom: 3, marginBottom: 8 },
    sectionGap: 20,
    itemGap: 12,
    role: true,
    accent: ACCENT,
    soft: SOFT,
    skills: 'lines',
    sectionOrder: ['experience', 'projects', 'education', 'skills', 'certifications'],
  },
  compact: {
    label: 'Compact',
    description: 'Dense and readable, fits more on one page',
    layout: 'single',
    page: { fontFamily: 'Calibri, Arial, sans-serif', fontSize: 11.5, lineHeight: 1.3 },
    name: { fontSize: 24, fontWeight: 700, textAlign: 'left' },
    contact: { textAlign: 'left', color: '#444' },
    heading: { fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#0f766e', borderBottom: '1px solid #99d5cf', marginBottom: 4 },
    accent: '#0f766e',
    sectionGap: 10,
    itemGap: 6,
    pad: '40px 46px',
    sectionOrder: ['experience', 'projects', 'education', 'skills', 'certifications'],
  },
  minimal: {
    label: 'Minimal',
    description: 'Generous whitespace and restrained type',
    layout: 'single',
    page: { fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: 12, lineHeight: 1.65, color: '#222' },
    name: { fontSize: 34, fontWeight: 300, letterSpacing: '0.02em', textAlign: 'left' },
    contact: { textAlign: 'left', color: '#777', fontSize: 11 },
    heading: { fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#b45309', marginBottom: 10 },
    sectionGap: 30,
    itemGap: 14,
    pad: '72px 84px',
    role: true,
    accent: '#b45309',
    skills: 'lines',
    sectionOrder: ['experience', 'projects', 'education', 'skills', 'certifications'],
  },
  student: {
    label: 'Student',
    description: 'Education and projects lead, skills as chips',
    layout: 'single',
    page: { fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 12, lineHeight: 1.5 },
    name: { fontSize: 28, fontWeight: 700, textAlign: 'center' },
    contact: { textAlign: 'center', color: '#444' },
    heading: { fontSize: 12.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0d7a6b', borderLeft: '4px solid #f59e0b', paddingLeft: 8, marginBottom: 8 },
    sectionGap: 18,
    itemGap: 10,
    role: true,
    accent: '#0d7a6b',
    soft: SOFT,
    skills: 'chips',
    labels: { projects: 'Academic & Personal Projects', experience: 'Internships & Experience' },
    sectionOrder: ['education', 'projects', 'experience', 'skills', 'certifications'],
  },
  designer: {
    label: 'Product Designer',
    description: 'Split header, projects first, skills as pills',
    layout: 'split',
    page: { fontFamily: '"Helvetica Neue", Arial, sans-serif', fontSize: 12, lineHeight: 1.5 },
    name: { fontSize: 34, fontWeight: 700, letterSpacing: '-0.01em', color: '#1c1917' },
    contact: { textAlign: 'right', color: '#555', fontSize: 11.5, lineHeight: 1.6 },
    heading: { fontSize: 11.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#c2410c', marginBottom: 8 },
    sectionGap: 22,
    itemGap: 12,
    role: true,
    accent: '#c2410c',
    soft: SOFT,
    skills: 'chips',
    labels: { projects: 'Selected Projects', experience: 'Product Experience' },
    sectionOrder: ['projects', 'experience', 'skills', 'education', 'certifications'],
  },
  engineer: {
    label: 'Software Engineer',
    description: 'Technical skills table, then projects and experience',
    layout: 'single',
    page: { fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 12, lineHeight: 1.45 },
    name: { fontSize: 26, fontWeight: 700, textAlign: 'left' },
    contact: { textAlign: 'left', color: '#444' },
    heading: { fontFamily: 'Menlo, Consolas, "Courier New", monospace', fontSize: 11.5, fontWeight: 700, color: '#065f46', background: '#e3f6ee', borderLeft: '3px solid #10B981', padding: '3px 8px', marginBottom: 8 },
    sectionGap: 16,
    itemGap: 9,
    role: true,
    accent: '#059669',
    skills: 'grid',
    labels: { skills: 'Technical Skills' },
    sectionOrder: ['skills', 'experience', 'projects', 'education', 'certifications'],
  },
  business: {
    label: 'Business Professional',
    description: 'Shaded section bands, achievements first',
    layout: 'single',
    page: { fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 12.5, lineHeight: 1.45 },
    name: { color: '#0f3d2e', fontSize: 28, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'left' },
    contact: { textAlign: 'left', color: '#444' },
    heading: { fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 11.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#0f3d2e', background: '#d9ebe2', padding: '4px 8px', marginBottom: 8 },
    sectionGap: 16,
    itemGap: 10,
    role: true,
    accent: '#0f3d2e',
    skills: 'lines',
    labels: { experience: 'Professional Experience', projects: 'Key Initiatives', skills: 'Core Competencies' },
    sectionOrder: ['experience', 'education', 'skills', 'projects', 'certifications'],
  },
  academic: {
    label: 'Academic',
    description: 'Education, research and publications lead',
    layout: 'single',
    page: { fontFamily: '"Times New Roman", Times, serif', fontSize: 13, lineHeight: 1.4 },
    name: { fontSize: 28, fontWeight: 400, textAlign: 'center', fontVariant: 'small-caps', letterSpacing: '0.04em' },
    contact: { textAlign: 'center', color: '#333' },
    heading: { fontSize: 14, fontWeight: 700, fontVariant: 'small-caps', letterSpacing: '0.05em', color: '#7f1d1d', borderBottom: '1px solid #7f1d1d', paddingBottom: 1, marginBottom: 6 },
    sectionGap: 16,
    itemGap: 8,
    role: true,
    accent: '#7f1d1d',
    labels: { experience: 'Research & Teaching Experience', projects: 'Publications & Research', certifications: 'Awards & Honours', skills: 'Skills & Methods' },
    sectionOrder: ['education', 'experience', 'projects', 'certifications', 'skills'],
  },
  executive: {
    label: 'Executive',
    description: 'Strong header band and profile-led hierarchy',
    layout: 'band',
    page: { fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 12.5, lineHeight: 1.5 },
    name: { fontSize: 32, fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff' },
    contact: { color: '#cfe6db', fontSize: 11.5 },
    heading: { fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 11.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#a16207', borderBottom: '1.5px solid #d9b45f', paddingBottom: 4, marginBottom: 10 },
    sectionGap: 20,
    itemGap: 12,
    role: true,
    accent: '#0d2b26',
    soft: SOFT,
    skills: 'lines',
    labels: { summary: 'Executive Profile', experience: 'Career History', projects: 'Board & Strategic Initiatives', skills: 'Areas of Expertise' },
    sectionOrder: ['experience', 'education', 'certifications', 'skills', 'projects'],
  },
}

export const templateIds = Object.keys(templates) as TemplateId[]
