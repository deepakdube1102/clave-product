import type { ProfileData } from '@/types/profile'
import { emptyProfile, newId } from '@/utils/profile'

interface Identity {
  name: string
  email: string
}

/** What "reading a resume" returns. Certifications are found; achievements and most links are not. */
export function buildResumeExtraction({ name, email }: Identity): ProfileData {
  return {
    ...emptyProfile(name, email),
    phone: '+91 98765 43210',
    location: 'Pune, India',
    summary:
      'Computer science graduate who enjoys turning product ideas into fast, accessible interfaces. Shipped React components used across a live customer dashboard during an internship.',
    targetRoles: ['Frontend Developer'],
    experienceLevel: 'fresher',
    education: [
      {
        id: newId(),
        institution: 'Northfield Institute of Technology',
        degree: 'B.Tech, Computer Science',
        period: '2021 – 2025',
        details: 'CGPA 8.4 · Data Structures, Web Development',
      },
    ],
    experience: [
      {
        id: newId(),
        role: 'Frontend Intern',
        company: 'Lumen Labs',
        location: 'Bengaluru, India',
        period: 'Jan 2025 – Jun 2025',
        summary: 'Built and shipped reusable React components used across the customer dashboard.',
      },
    ],
    projects: [
      {
        id: newId(),
        name: 'Campus Placement Tracker',
        description: 'A web app that helps students track applications and deadlines in one place.',
        technologies: ['React', 'TypeScript', 'Node.js'],
        link: '',
      },
      {
        id: newId(),
        name: 'Expense Splitter',
        description: 'Split shared costs with friends and settle up with a single tap.',
        technologies: ['JavaScript', 'Firebase'],
        link: '',
      },
    ],
    skills: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Node.js', 'Git', 'REST APIs', 'SQL'],
    certifications: [
      { id: newId(), name: 'Meta Front-End Developer Certificate', issuer: 'Coursera', year: '2024' },
    ],
    links: [{ id: newId(), label: 'GitHub', url: 'github.com/deepak-dube' }],
    workModes: ['hybrid', 'remote'],
    preferredLocations: 'Bengaluru, Pune, Remote',
    industries: ['SaaS', 'EdTech'],
  }
}

/** What "importing LinkedIn" returns. No certifications; a wider skills list and a LinkedIn link. */
export function buildLinkedInImport({ name, email }: Identity, profileUrl: string): ProfileData {
  return {
    ...emptyProfile(name, email),
    location: 'Pune, India',
    targetRoles: ['Frontend Developer', 'Product Engineer'],
    experienceLevel: 'fresher',
    education: [
      {
        id: newId(),
        institution: 'Northfield Institute of Technology',
        degree: 'B.Tech, Computer Science',
        period: '2021 – 2025',
        details: '',
      },
    ],
    experience: [
      {
        id: newId(),
        role: 'Frontend Intern',
        company: 'Lumen Labs',
        location: 'Bengaluru, India',
        period: 'Jan 2025 – Jun 2025',
        summary: '',
      },
    ],
    projects: [
      {
        id: newId(),
        name: 'Campus Placement Tracker',
        description: 'A web app that helps students track applications and deadlines in one place.',
        technologies: ['React', 'TypeScript'],
        link: '',
      },
    ],
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Git', 'Figma', 'Accessibility'],
    links: [{ id: newId(), label: 'LinkedIn', url: profileUrl }],
  }
}

/** Pre-seeded profile for the demo account, which starts already onboarded. Multi-line text is one bullet per line. */
export function buildDemoProfile(): ProfileData {
  return {
    ...emptyProfile('Deepak Dube', 'deepak.dube@example.com'),
    phone: '+91 98200 12345',
    location: 'Mumbai, India',
    summary:
      'Product designer with a background in interaction design and two years of hands-on experience across fintech and freelance work. I turn messy user problems into clear, accessible flows, and I am most at home between research, design systems and developer handoff.',
    targetRoles: ['Product Designer', 'UX Designer'],
    experienceLevel: 'early',
    education: [
      {
        id: newId(),
        institution: 'Mumbai School of Design',
        degree: 'B.Des, Interaction Design',
        period: '2020 – 2024',
        details: 'CGPA 8.6 · Thesis: designing accessible banking flows',
      },
    ],
    experience: [
      {
        id: newId(),
        role: 'Product Design Intern',
        company: 'Finlo',
        location: 'Mumbai, India',
        period: 'Jun 2024 – Dec 2024',
        summary:
          'Redesigned the onboarding flow for a UPI payments app, cutting drop-off by 22% across 4,000+ weekly signups\nRan 12 usability sessions and turned the findings into 9 prioritised design fixes shipped within two sprints\nBuilt 30+ reusable components in Figma, speeding up handoff for a team of 5 engineers',
      },
      {
        id: newId(),
        role: 'UX Design Freelancer',
        company: 'Self-employed',
        location: 'Remote',
        period: 'Jan 2023 – May 2024',
        summary:
          'Designed websites and mobile prototypes for 8 small businesses, from research through developer handoff\nIntroduced simple accessibility checks (contrast, tap targets) that lifted client usability test scores by 15%',
      },
    ],
    projects: [
      {
        id: newId(),
        name: 'Fare Split: Ride-sharing Redesign',
        description:
          'A case study redesigning fare splitting for shared rides.\nInterviewed 14 commuters to map pain points around payment friction\nPrototyped a one-tap settle flow that tested 30% faster than the existing flow',
        technologies: ['Figma', 'FigJam', 'Maze'],
        link: 'deepakdube.design/fare-split',
      },
      {
        id: newId(),
        name: 'Sahaj: Accessible Banking Concept',
        description:
          'A screen-reader-first mobile banking concept for first-time smartphone users.\nDesigned to WCAG 2.1 AA with large tap targets and plain-language labels\nPresented at a national student design showcase, top 10 of 120 entries',
        technologies: ['Figma', 'Accessibility', 'Prototyping'],
        link: 'deepakdube.design/sahaj',
      },
    ],
    skills: [
      'Figma',
      'User Research',
      'Wireframing',
      'Prototyping',
      'Design Systems',
      'Usability Testing',
      'Information Architecture',
      'Accessibility (WCAG)',
      'FigJam',
      'Maze',
    ],
    certifications: [
      { id: newId(), name: 'Google UX Design Professional Certificate', issuer: 'Coursera', year: '2024' },
      { id: newId(), name: 'Human-Computer Interaction Specialization', issuer: 'Coursera', year: '2023' },
    ],
    links: [
      { id: newId(), label: 'LinkedIn', url: 'linkedin.com/in/deepak-dube' },
      { id: newId(), label: 'Portfolio', url: 'deepakdube.design' },
    ],
    workModes: ['hybrid', 'remote'],
    preferredLocations: 'Mumbai, Bengaluru, Remote',
    industries: ['FinTech', 'Health tech', 'SaaS'],
  }
}
