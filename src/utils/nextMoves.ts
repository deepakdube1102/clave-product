import { FilePlus2, MessagesSquare, Sparkles, UserCog } from 'lucide-react'
import { paths } from '@/routes/navigation'
import type { CareerProfile, NextMove } from '@/types/career'

const createResume: NextMove = {
  id: 'create-resume',
  title: 'Create a Resume',
  description: 'Build from your Career Profile.',
  to: paths.createResume,
  icon: FilePlus2,
  tint: 'mint',
}

const tailorResume: NextMove = {
  id: 'tailor-resume',
  title: 'Tailor a Resume',
  description: 'Optimize an existing resume for a specific job.',
  to: paths.tailorResume,
  icon: Sparkles,
  tint: 'amber',
}

const prepareForInterviews: NextMove = {
  id: 'prepare-for-interviews',
  title: 'Prepare for Interviews',
  description: 'Practice with an AI mock interview.',
  to: paths.mockInterview,
  icon: MessagesSquare,
  tint: 'amber',
}

const improveProfile: NextMove = {
  id: 'improve-profile',
  title: 'Improve Profile',
  description: 'Add the details that sharpen every recommendation.',
  to: paths.careerProfile,
  icon: UserCog,
  tint: 'mint',
}

export function getNextMoves(profile: CareerProfile): NextMove[] {
  return profile.status === 'incomplete'
    ? [createResume, improveProfile, prepareForInterviews]
    : [createResume, tailorResume]
}
