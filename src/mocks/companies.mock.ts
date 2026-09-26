import type { CompanyInfo } from '@/types/job'

/** Company profiles by name. Real data would come from the jobs API. */
export const mockCompanies: Record<string, CompanyInfo> = {
  'Kite & Co.': { description: 'Payments and invoicing tools that help small businesses get paid faster.', industry: 'Fintech', size: '50–200 employees', location: 'Bengaluru, India' },
  'Meridian Health': { description: 'Patient-first software for booking, preparing for and following up on care.', industry: 'Healthcare', size: '200–500 employees', location: 'Mumbai, India' },
  Finlo: { description: 'A money-management app that makes everyday saving and spending simple.', industry: 'Fintech', size: '10–50 employees', location: 'Mumbai, India' },
  'Northwind Labs': { description: 'A product studio building logistics and operations software for growing teams.', industry: 'Software', size: '50–200 employees', location: 'Pune, India' },
  'Orbit Health': { description: 'Remote-first care coordination for people managing long-term conditions.', industry: 'Healthcare', size: '50–200 employees', location: 'Remote, India' },
  'Lumen Labs': { description: 'Design-led engineering for analytics and education products.', industry: 'Software', size: '10–50 employees', location: 'Bengaluru, India' },
}
