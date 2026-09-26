import type { ProfileData } from '@/types/profile'
import type { ResumeContent, ResumeSectionKey } from '@/types/resumeDocument'
import { isEarlyStage, newId } from '@/utils/profile'

const TOOLS = new Set(['git', 'github', 'figma', 'jira', 'docker', 'postman', 'vs code', 'notion', 'slack', 'excel', 'power bi', 'tableau', 'firebase', 'figjam', 'maze', 'miro', 'framer'])

const findLink = (data: ProfileData, ...needles: string[]) =>
  data.links.find((link) => needles.some((needle) => `${link.label} ${link.url}`.toLowerCase().includes(needle)))?.url ?? ''

export function emptyResumeContent(name = '', email = ''): ResumeContent {
  return {
    contact: { name, email, phone: '', location: '', linkedin: '', github: '', portfolio: '' },
    summary: '',
    experience: [],
    education: [],
    projects: [],
    skills: { technical: [], tools: [], other: [] },
    certifications: [],
  }
}

export function defaultSectionOrder(profile: ProfileData | null): ResumeSectionKey[] {
  return isEarlyStage(profile?.experienceLevel ?? null)
    ? ['education', 'projects', 'experience', 'skills', 'certifications']
    : ['experience', 'projects', 'education', 'skills', 'certifications']
}

const splitPeriod = (period: string): [string, string] => {
  const [start = '', end = ''] = period.split(/\s*[–—-]\s*/)
  return [start.trim(), end.trim()]
}

/**
 * Copies the Career Profile into a resume. Everything is copied into new objects,
 * so editing the resume never touches the profile.
 */
export function buildContentFromProfile(profile: ProfileData, fallbackName = '', fallbackEmail = ''): ResumeContent {
  const isTool = (skill: string) => TOOLS.has(skill.toLowerCase())

  return {
    contact: {
      name: profile.name || fallbackName,
      email: profile.email || fallbackEmail,
      phone: profile.phone,
      location: profile.location,
      linkedin: findLink(profile, 'linkedin'),
      github: findLink(profile, 'github'),
      portfolio: findLink(profile, 'portfolio', 'website'),
    },
    summary: profile.summary,
    experience: profile.experience.map((entry) => {
      const [start, end] = splitPeriod(entry.period)
      return {
        id: newId(),
        title: entry.role,
        company: entry.company,
        location: entry.location,
        start,
        end,
        description: '',
        bullets: entry.summary.split('\n').map((line) => line.trim()).filter(Boolean),
      }
    }),
    education: profile.education.map((entry) => ({
      id: newId(),
      degree: entry.degree,
      institution: entry.institution,
      location: '',
      dates: entry.period,
      details: entry.details,
    })),
    projects: profile.projects.map((project) => {
      const [description = '', ...bullets] = project.description.split('\n').map((line) => line.trim()).filter(Boolean)
      return { id: newId(), name: project.name, description, tech: [...project.technologies], link: project.link, bullets }
    }),
    skills: {
      technical: profile.skills.filter((skill) => !isTool(skill)),
      tools: profile.skills.filter(isTool),
      other: [],
    },
    certifications: profile.certifications.map((cert) => ({ id: newId(), name: cert.name, issuer: cert.issuer, date: cert.year, link: '' })),
  }
}
