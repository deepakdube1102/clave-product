import type { Job } from '@/types/job'
import { workTypeLabels } from '@/utils/jobFilters'

/** "Company · Location · Work type · Experience" */
export const jobMeta = (job: Job) =>
  [job.company, job.city === 'Remote' ? 'India' : job.city, workTypeLabels[job.workType], job.experience].join(' · ')
