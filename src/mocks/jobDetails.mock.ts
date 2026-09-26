import type { JobDetail } from '@/types/job'

export const mockJobDetails: Record<string, JobDetail> = {
  job_product_designer_kite: {
    jobType: 'Full-time',
    about:
      'Kite & Co. builds payments tools for small businesses. As a Product Designer you will own the design of our merchant app end to end, from early research and flows through to polished, developer-ready screens. You will work in a small cross-functional squad with a product manager and three engineers, and your work will ship to thousands of merchants every week.',
    responsibilities: [
      'Turn research findings into clear flows, wireframes and high-fidelity prototypes',
      'Run usability sessions and use what you learn to shape the roadmap',
      'Contribute to and evolve our design system in Figma',
      'Partner with engineers through handoff and review',
    ],
    requirements: [
      '1–3 years designing digital products, internships included',
      'A portfolio showing your process from problem to shipped solution',
      'Strong Figma skills, including components and prototyping',
      'Comfort presenting your work and taking feedback',
    ],
    niceToHave: ['Experience with fintech or payments products', 'Familiarity with product analytics and A/B testing'],
    stretchSkill: 'product analytics',
  },
  job_ux_designer_meridian: {
    jobType: 'Full-time',
    about:
      'Meridian Health is improving how patients book, prepare for and follow up on care. The UX Designer will shape patient-facing experiences across web and mobile, working closely with clinicians and researchers to keep every flow clear, calm and accessible.',
    responsibilities: [
      'Map patient journeys and design flows for scheduling, reminders and records',
      'Create wireframes and interactive prototypes for testing',
      'Document decisions in our design system and accessibility guidelines',
      'Collaborate with clinicians to validate designs against real workflows',
    ],
    requirements: [
      '1–3 years of UX or product design experience',
      'A working knowledge of accessibility standards (WCAG)',
      'Experience planning and running usability tests',
      'Clear written and verbal communication',
    ],
    niceToHave: ['Experience in healthcare or another regulated space', 'Basic HTML and CSS'],
    stretchSkill: 'service design',
  },
  job_product_design_intern_finlo: {
    jobType: 'Internship',
    about:
      'Finlo is a UPI-first payments startup. This six-month internship puts you inside our product team, designing real features that ship. You will be mentored by a senior designer and get hands-on experience across research, prototyping and design systems.',
    responsibilities: [
      'Design screens and flows for payments and onboarding features',
      'Build and maintain reusable components in Figma',
      'Support usability testing and summarise insights',
      'Present your work in weekly design reviews',
    ],
    requirements: [
      'Currently studying, or recently graduated in design, HCI or a related field',
      'A portfolio with two or more case studies',
      'Working knowledge of Figma and prototyping',
    ],
    niceToHave: ['Experience with mobile app design', 'Interest in fintech'],
    stretchSkill: 'motion design',
  },
  job_uiux_designer_northwind: {
    jobType: 'Full-time',
    about:
      'Northwind Labs makes operations software for logistics teams. We need a UI/UX Designer who cares about craft and clarity, someone who can make dense workflows feel simple and who enjoys working closely with engineers in the same office.',
    responsibilities: [
      'Design dashboards, tables and workflow tools that stay readable at scale',
      'Prototype interactions and validate them with internal users',
      'Apply and extend our visual design language',
      'Work with developers to keep implementation faithful to the design',
    ],
    requirements: [
      '0–2 years in UI or UX design',
      'Strong visual design fundamentals: type, layout and colour',
      'Proficiency in Figma',
      'Willingness to work on-site in Pune',
    ],
    niceToHave: ['Experience designing data-heavy interfaces', 'Familiarity with design systems'],
    stretchSkill: 'data visualisation',
  },
  job_junior_designer_orbit: {
    jobType: 'Full-time',
    about:
      'Orbit Health is a remote-first team building tools for chronic-care coaching. As a Junior Product Designer you will join a small, friendly design team, take on well-scoped projects from day one and grow quickly with regular mentoring.',
    responsibilities: [
      'Design features from problem framing through to final UI',
      'Keep our design system consistent and well documented',
      'Join user interviews and help turn notes into insights',
      'Share progress openly with the wider product team',
    ],
    requirements: [
      '0–1 years of professional design experience, or strong project work',
      'Good understanding of design systems and component thinking',
      'Solid Figma skills',
      'Comfort working remotely and asynchronously',
    ],
    niceToHave: ['Experience with health or wellness products', 'Some exposure to research methods'],
    stretchSkill: 'product analytics',
  },
  job_frontend_lumen: {
    jobType: 'Full-time',
    about:
      'Lumen Labs is building an analytics dashboard used by product teams. The Frontend Developer will turn designs into fast, accessible React interfaces and work closely with designers to get the details right.',
    responsibilities: [
      'Build and maintain React and TypeScript components',
      'Translate Figma designs into pixel-accurate, responsive UI',
      'Write tests and keep performance in check',
      'Review code and share knowledge with the team',
    ],
    requirements: [
      '0–2 years of frontend experience, internships included',
      'Solid React and TypeScript fundamentals',
      'An eye for design and comfort reading Figma files',
    ],
    niceToHave: ['Experience with design systems in code', 'Testing with Jest or Playwright'],
    stretchSkill: 'testing',
  },
  job_assoc_designer_lumen: {
    jobType: 'Full-time',
    about:
      'Lumen Labs is hiring an Associate Product Designer to help shape its analytics dashboard. You will design features alongside a senior designer, run usability sessions and ship improvements every sprint.',
    responsibilities: [
      'Design new dashboard features from flow to high-fidelity',
      'Prototype and test ideas with real users',
      'Support the design system with new components',
    ],
    requirements: ['0–2 years of product design experience', 'Strong Figma and prototyping skills', 'Experience with usability testing'],
    niceToHave: ['Experience with analytics or B2B tools'],
    stretchSkill: 'data visualisation',
  },
  job_design_systems_kite: {
    jobType: 'Full-time',
    about:
      'Kite & Co. is investing in a shared design system used by four product teams. You will own its components, documentation and accessibility standards, and help teams adopt it.',
    responsibilities: [
      'Design, document and maintain the component library',
      'Set accessibility standards and audit against them',
      'Partner with engineers on tokens and implementation',
    ],
    requirements: ['3+ years in product or systems design', 'Deep Figma expertise, including variables and components', 'Strong knowledge of accessibility'],
    niceToHave: ['Experience with design tokens', 'Prior experience leading a system'],
    stretchSkill: 'design tokens',
  },
  job_ux_researcher_meridian: {
    jobType: 'Full-time',
    about:
      'Meridian Health needs a UX Researcher to understand patients and clinicians and bring their needs into product decisions. You will plan studies, run sessions and turn findings into clear recommendations.',
    responsibilities: [
      'Plan and run interviews, surveys and usability tests',
      'Synthesise findings into insights and recommendations',
      'Partner with design and product on research roadmaps',
    ],
    requirements: ['1–3 years in UX research or a related field', 'Experience with qualitative and mixed methods', 'Strong synthesis and storytelling skills'],
    niceToHave: ['Experience with analytics tools', 'Healthcare research experience'],
    stretchSkill: 'quantitative research',
  },
}
