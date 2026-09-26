import type { ReactNode } from 'react'
import { ProfileSection } from '@/components/onboarding/ProfileSection'
import * as Editors from '@/components/onboarding/sectionEditors'
import * as Views from '@/components/onboarding/sectionViews'
import type { ProfileData, SectionKey } from '@/types/profile'
import { isSectionEmpty, sectionOrder } from '@/utils/profile'

interface SectionConfig {
  title: string
  hint?: (data: ProfileData) => string | undefined
  emptyText: string
  view: (data: ProfileData) => ReactNode
  editor: (props: Editors.EditorProps) => ReactNode
}

const sections: Record<SectionKey, SectionConfig> = {
  overview: {
    title: 'Overview',
    emptyText: 'Nothing here yet.',
    view: (data) => <Views.OverviewView data={data} />,
    editor: (props) => <Editors.OverviewEditor {...props} />,
  },
  experience: {
    title: 'Experience',
    hint: (data) => (data.experienceLevel === 'student' || data.experienceLevel === 'fresher' ? 'Internships and part-time work count. No experience yet? Projects work just as well.' : undefined),
    emptyText: 'Nothing added yet. You can add this anytime.',
    view: (data) => <Views.ExperienceView data={data} />,
    editor: (props) => <Editors.ExperienceEditor {...props} />,
  },
  education: {
    title: 'Education',
    emptyText: 'Nothing added yet. You can add this anytime.',
    view: (data) => <Views.EducationView data={data} />,
    editor: (props) => <Editors.EducationEditor {...props} />,
  },
  projects: {
    title: 'Projects',
    hint: (data) => (data.experienceLevel === 'student' || data.experienceLevel === 'fresher' ? 'A great way to show what you can do.' : undefined),
    emptyText: 'Nothing added yet. You can add this anytime.',
    view: (data) => <Views.ProjectsView data={data} />,
    editor: (props) => <Editors.ProjectsEditor {...props} />,
  },
  skills: {
    title: 'Skills',
    emptyText: 'Nothing added yet. You can add this anytime.',
    view: (data) => <Views.SkillsView data={data} />,
    editor: (props) => <Editors.SkillsEditor {...props} />,
  },
  certifications: {
    title: 'Certifications & achievements',
    emptyText: 'Nothing added yet. You can add this anytime.',
    view: (data) => <Views.CertificationsView data={data} />,
    editor: (props) => <Editors.CertificationsEditor {...props} />,
  },
  links: {
    title: 'Links',
    emptyText: 'Nothing added yet. You can add this anytime.',
    view: (data) => <Views.LinksView data={data} />,
    editor: (props) => <Editors.LinksEditor {...props} />,
  },
  preferences: {
    title: 'Work preferences',
    emptyText: 'Not set. You can add this anytime.',
    view: (data) => <Views.PreferencesView data={data} />,
    editor: (props) => <Editors.PreferencesEditor {...props} />,
  },
}

interface ProfileSectionsProps {
  draft: ProfileData
  onChange: (next: ProfileData) => void
  /** Limit and order the sections shown; defaults to the full set in level-aware order. */
  only?: SectionKey[]
}

export function ProfileSections({ draft, onChange, only }: ProfileSectionsProps) {
  const keys = only ?? sectionOrder(draft.experienceLevel)

  return (
    <div className="flex flex-col gap-4">
      {keys.map((key) => {
        const config = sections[key]
        return (
          <ProfileSection
            key={key}
            title={config.title}
            hint={config.hint?.(draft)}
            emptyText={config.emptyText}
            isEmpty={isSectionEmpty(key, draft)}
            draft={draft}
            onSave={onChange}
            view={config.view(draft)}
            editor={config.editor}
          />
        )
      })}
    </div>
  )
}
