import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { seedSavedJobs } from '@/mocks/jobs.mock'

interface SavedJobsState {
  /** userId -> (jobId -> ISO date saved). A missing user gets the seed list. */
  byUser: Record<string, Record<string, string>>
  toggle: (userId: string, jobId: string) => boolean
}

/** Mock saved-jobs state, shared by the Dashboard and Jobs. Returns whether the job is now saved. */
export const useSavedJobsStore = create<SavedJobsState>()(
  persist(
    (set, get) => ({
      byUser: {},
      toggle: (userId, jobId) => {
        const current = get().byUser[userId] ?? seedSavedJobs()
        const next = { ...current }
        const nowSaved = !(jobId in next)
        if (nowSaved) next[jobId] = new Date().toISOString()
        else delete next[jobId]
        set({ byUser: { ...get().byUser, [userId]: next } })
        return nowSaved
      },
    }),
    { name: 'clave.saved-jobs' },
  ),
)
