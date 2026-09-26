import { useParams } from 'react-router-dom'
import { ResumeEditor } from '@/components/builder/ResumeEditor'

export function ResumeEditorPage() {
  const { resumeId } = useParams()
  return resumeId ? <ResumeEditor key={resumeId} id={resumeId} /> : null
}
