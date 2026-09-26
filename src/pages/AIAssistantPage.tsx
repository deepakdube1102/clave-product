import { BriefcaseBusiness, FileText, HelpCircle } from 'lucide-react'
import { AssistantHero } from '@/components/assistant/AssistantHero'
import { CapabilityCard } from '@/components/assistant/CapabilityCard'

const capabilities = [
  {
    icon: HelpCircle,
    title: 'Ask Career Questions',
    description: 'Get answers grounded in your career profile, experience, and goals.',
    prompts: ['What skills should I learn for product roles?', 'How can I switch to a UI/UX career?', 'What do recruiters look for in my profile?'],
  },
  {
    icon: FileText,
    title: 'Improve Your Resume',
    description: 'Get suggestions for stronger bullets, summaries, skills, and job-specific content.',
    prompts: ['How can I make this experience sound better?', 'Suggest skills for this job description.', 'Review my resume for ATS compatibility.'],
  },
  {
    icon: BriefcaseBusiness,
    title: 'Understand Opportunities',
    description: 'Break down job descriptions and understand how they connect to your profile.',
    prompts: ['Does this role match my profile?', 'What are the key requirements for this job?', 'How should I prepare for this role?'],
  },
]

export function AIAssistantPage() {
  return (
    <div className="flex flex-col gap-11 lg:-mb-6">
      <AssistantHero />

      <section aria-labelledby="capabilities-heading">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">What it will do</p>
            <h2 id="capabilities-heading" className="mt-1.5 text-xl font-semibold tracking-tight text-text">
              A smarter way to navigate your career.
            </h2>
          </div>
          <p className="max-w-xs text-sm text-secondary md:text-right">Personalized guidance, powered by your profile, designed to help you take the next step with confidence.</p>
        </div>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {capabilities.map((capability) => (
            <li key={capability.title}>
              <CapabilityCard {...capability} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
