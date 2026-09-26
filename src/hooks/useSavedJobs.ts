import { useMemo } from 'react'
import { seedSavedJobs } from '@/mocks/jobs.mock'
import { useAuthStore } from '@/store/authStore'
import { useSavedJobsStore } from '@/store/savedJobsStore'
import { toast } from '@/store/toastStore'
import type { Job } from '@/types/job'

const seed = seedSavedJobs()

export function useSavedJobs() {
  const userId = useAuthStore((state) => state.user?.id ?? '')
  const stored = useSavedJobsStore((state) => state.byUser[userId])
  const toggleInStore = useSavedJobsStore((state) => state.toggle)
  const saved = stored ?? seed

  return useMemo(
    () => ({
      /** jobId -> ISO date saved */
      saved,
      isSaved: (jobId: string) => jobId in saved,
      toggle: (job: Job) => {
        if (toggleInStore(userId, job.id)) toast.success('Job saved', `${job.title} at ${job.company}`)
      },
    }),
    [saved, toggleInStore, userId],
  )
}
