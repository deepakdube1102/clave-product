import type { Resume } from '@/types/resume'

const daysAgo = (days: number, hours = 0) =>
  new Date(Date.now() - days * 86_400_000 - hours * 3_600_000).toISOString()

export function buildMockResumes(): Resume[] {
  return [
    { id: 'res_product_designer', name: 'Product Designer', targetRole: 'Product Designer', atsScore: 86, updatedAt: daysAgo(0, 3), type: 'base' },
    { id: 'res_ux_designer', name: 'UX Designer', targetRole: 'UX Designer', atsScore: 78, updatedAt: daysAgo(2), type: 'base' },
    { id: 'res_design_intern', name: 'Product Design Intern', targetRole: 'Product Design Intern', atsScore: 91, updatedAt: daysAgo(5), type: 'tailored', tailoredFor: 'Kite & Co.' },
    { id: 'res_designer_lumen', name: 'Product Designer, Lumen Labs', targetRole: 'Product Designer', atsScore: 84, updatedAt: daysAgo(9), type: 'tailored', tailoredFor: 'Lumen Labs' },
    { id: 'res_ux_researcher', name: 'UX Research Associate', targetRole: 'UX Researcher', atsScore: 62, updatedAt: daysAgo(21), type: 'base', status: 'draft' },
  ]
}
