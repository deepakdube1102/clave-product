import { ResumeCreationChoice } from '@/components/resumes/ResumeCreationChoice'
import { FlowShell } from '@/components/resumes/FlowShell'
import { paths } from '@/routes/navigation'

export function CreateResumePage() {
  return (
    <FlowShell
      title="Create a Resume"
      description="Choose how you’d like to start. Each path prepares your resume differently, then opens the same editor."
      backTo={paths.resumes}
    >
      <ResumeCreationChoice variant="detailed" className="md:grid-cols-2" />
    </FlowShell>
  )
}
