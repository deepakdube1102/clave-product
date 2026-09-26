import type { CareerProfile } from '@/types/career'
import { deriveCareerOverview } from '@/utils/careerOverview'
import { getProfile } from '@/services/profile.service'

/** Dashboard overview derived from the saved Career Profile (or its absence). */
export async function getCareerProfile(): Promise<CareerProfile> {
  return deriveCareerOverview(await getProfile())
}
