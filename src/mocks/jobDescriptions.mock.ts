export interface SampleJob {
  id: string
  title: string
  company: string
  description: string
}

export const sampleJobs: SampleJob[] = [
  {
    id: 'jd_kite',
    title: 'Product Designer',
    company: 'Kite & Co.',
    description:
      'We are hiring a Product Designer to own end-to-end design for our payments app. You will run user research and usability testing, create wireframes and prototypes in Figma, contribute to our design system, and partner closely with engineers and product managers. Experience with A/B testing, analytics, accessibility and clear stakeholder communication is a plus.',
  },
  {
    id: 'jd_meridian',
    title: 'UX Designer',
    company: 'Meridian Health',
    description:
      'Meridian Health is looking for a UX Designer to improve patient-facing experiences. Responsibilities include information architecture, user flows, interaction design and journey mapping, backed by user research. You will document decisions in a design system and use accessibility best practices throughout. Comfort with agile teams and collaboration with clinicians is important.',
  },
  {
    id: 'jd_lumen',
    title: 'Associate Product Designer',
    company: 'Lumen Labs',
    description:
      'As an Associate Product Designer at Lumen Labs you will design features for a SaaS analytics dashboard. You will create user flows, wireframing and high-fidelity prototyping in Figma, run usability testing sessions, and use analytics and metrics to validate decisions. Familiarity with design thinking, visual design and working within a design system is required.',
  },
]
