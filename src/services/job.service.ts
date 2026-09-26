import { mockJobDetails } from '@/mocks/jobDetails.mock'
import { mockJobs, recommendedJobIds } from '@/mocks/jobs.mock'
import { mockCompanies } from '@/mocks/companies.mock'
import type { CompanyInfo, Job, JobDetail } from '@/types/job'

/** Mock-backed. Swap for `apiClient.get<Job[]>('/jobs')` and `/jobs/recommended` later. */
export async function getJobs(): Promise<Job[]> {
  return Promise.resolve(mockJobs)
}

export async function getRecommendedJobs(limit = 3): Promise<Job[]> {
  return Promise.resolve(mockJobs.filter((job) => recommendedJobIds.includes(job.id)).slice(0, limit))
}

/** Mock-backed. Swap for `apiClient.get<Job & JobDetail>(`/jobs/${id}`)` later. */
export async function getJobById(id: string): Promise<{ job: Job; detail: JobDetail } | null> {
  const job = mockJobs.find((candidate) => candidate.id === id)
  const detail = mockJobDetails[id]
  return Promise.resolve(job && detail ? { job, detail } : null)
}

/** Mock-backed. Swap for a batched details endpoint (or per-job fetch on selection) later. */
export async function getJobDetails(): Promise<Record<string, JobDetail>> {
  return Promise.resolve(mockJobDetails)
}

/** Mock-backed. Swap for `apiClient.get('/companies/:id')` (or include it in the job payload) later. */
export async function getCompanies(): Promise<Record<string, CompanyInfo>> {
  return Promise.resolve(mockCompanies)
}
