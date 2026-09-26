import type { Job } from '@/types/job'

/** The first six are "recommended"; the last three only appear as saved seeds. */
export const mockJobs: Job[] = [
  { id: 'job_product_designer_kite', title: 'Product Designer', company: 'Kite & Co.', location: 'Bengaluru · Hybrid', city: 'Bengaluru', workType: 'hybrid', level: 'junior', roleType: 'Product Design', experience: '1–3 yrs', matchPercent: 94, skills: ['Figma', 'User Research', 'Design Systems', 'Prototyping'], postedDaysAgo: 2, salary: '₹12L – ₹18L' },
  { id: 'job_ux_designer_meridian', title: 'UX Designer', company: 'Meridian Health', location: 'Remote · India', city: 'Remote', workType: 'remote', level: 'junior', roleType: 'UX/UI Design', experience: '1–3 yrs', matchPercent: 91, skills: ['Wireframing', 'Usability Testing', 'Accessibility', 'Figma'], postedDaysAgo: 4, salary: '₹10L – ₹15L' },
  { id: 'job_product_design_intern_finlo', title: 'Product Design Intern', company: 'Finlo', location: 'Mumbai · Hybrid', city: 'Mumbai', workType: 'hybrid', level: 'internship', roleType: 'Product Design', experience: 'Internship', matchPercent: 89, skills: ['Figma', 'Prototyping', 'User Flows'], postedDaysAgo: 1, salary: '₹30K – ₹40K/mo' },
  { id: 'job_uiux_designer_northwind', title: 'UI/UX Designer', company: 'Northwind Labs', location: 'Pune · On-site', city: 'Pune', workType: 'onsite', level: 'entry', roleType: 'UX/UI Design', experience: '0–2 yrs', matchPercent: 86, skills: ['Figma', 'Visual Design', 'Prototyping', 'Design Systems'], postedDaysAgo: 6, salary: '₹8L – ₹12L' },
  { id: 'job_junior_designer_orbit', title: 'Junior Product Designer', company: 'Orbit Health', location: 'Remote · India', city: 'Remote', workType: 'remote', level: 'entry', roleType: 'Product Design', experience: '0–1 yrs', matchPercent: 84, skills: ['Design Systems', 'Figma', 'User Research'], postedDaysAgo: 9, salary: '₹7L – ₹10L' },
  { id: 'job_frontend_lumen', title: 'Frontend Developer', company: 'Lumen Labs', location: 'Mumbai · Hybrid', city: 'Mumbai', workType: 'hybrid', level: 'entry', roleType: 'Frontend Engineering', experience: '0–2 yrs', matchPercent: 78, skills: ['React', 'TypeScript', 'Figma'], postedDaysAgo: 12 },
  { id: 'job_assoc_designer_lumen', title: 'Associate Product Designer', company: 'Lumen Labs', location: 'Bengaluru · Hybrid', city: 'Bengaluru', workType: 'hybrid', level: 'entry', roleType: 'Product Design', experience: '0–2 yrs', matchPercent: 81, skills: ['Figma', 'Prototyping', 'Usability Testing'], postedDaysAgo: 15, salary: '₹9L – ₹13L' },
  { id: 'job_design_systems_kite', title: 'Design Systems Designer', company: 'Kite & Co.', location: 'Remote · India', city: 'Remote', workType: 'remote', level: 'mid', roleType: 'Product Design', experience: '3+ yrs', matchPercent: 72, skills: ['Design Systems', 'Figma', 'Accessibility'], postedDaysAgo: 20, salary: '₹22L – ₹30L' },
  { id: 'job_ux_researcher_meridian', title: 'UX Researcher', company: 'Meridian Health', location: 'Mumbai · On-site', city: 'Mumbai', workType: 'onsite', level: 'junior', roleType: 'UX/UI Design', experience: '1–3 yrs', matchPercent: 68, skills: ['User Research', 'Usability Testing', 'Analytics'], postedDaysAgo: 24 },
]

export const recommendedJobIds = mockJobs.slice(0, 6).map((job) => job.id)

const daysAgo = (days: number) => new Date(Date.now() - days * 86_400_000).toISOString()

/** New users start with a few saved jobs so the Saved section is never a blank page. */
export const seedSavedJobs = (): Record<string, string> => ({
  job_assoc_designer_lumen: daysAgo(2),
  job_design_systems_kite: daysAgo(5),
  job_ux_researcher_meridian: daysAgo(9),
})
