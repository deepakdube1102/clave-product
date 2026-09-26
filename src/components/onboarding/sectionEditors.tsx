import { useState } from 'react'
import { ListEditor } from '@/components/onboarding/ListEditor'
import { Checkbox } from '@/components/ui/Checkbox'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { TagInput } from '@/components/ui/TagInput'
import { Textarea } from '@/components/ui/Textarea'
import type { ExperienceLevel, ProfileData, WorkMode } from '@/types/profile'
import { experienceLevelLabels, workModeLabels } from '@/utils/profile'

export interface EditorProps {
  value: ProfileData
  onChange: (patch: Partial<ProfileData>) => void
}

export function OverviewEditor({ value, onChange }: EditorProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Input label="Full name" autoComplete="name" value={value.name} onChange={(e) => onChange({ name: e.target.value })} />
      <Input label="Email" type="email" autoComplete="email" value={value.email} onChange={(e) => onChange({ email: e.target.value })} />
      <Input label="Phone" type="tel" autoComplete="tel" value={value.phone} onChange={(e) => onChange({ phone: e.target.value })} />
      <Input label="Location" autoComplete="address-level2" value={value.location} onChange={(e) => onChange({ location: e.target.value })} />
      <Textarea
        className="sm:col-span-2"
        label="Professional summary"
        hint="Two or three sentences on who you are and what you're aiming for."
        rows={3}
        value={value.summary}
        onChange={(e) => onChange({ summary: e.target.value })}
      />
      <TagInput
        className="sm:col-span-2"
        label="Target roles"
        placeholder="e.g. Frontend Developer"
        hint="Press Enter after each role."
        value={value.targetRoles}
        onChange={(targetRoles) => onChange({ targetRoles })}
      />
      <Select
        label="Experience level"
        value={value.experienceLevel ?? ''}
        onChange={(e) => onChange({ experienceLevel: (e.target.value || null) as ExperienceLevel | null })}
      >
        <option value="">Select…</option>
        {Object.entries(experienceLevelLabels).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </Select>
    </div>
  )
}

export function ExperienceEditor({ value, onChange }: EditorProps) {
  return (
    <ListEditor
      items={value.experience}
      onChange={(experience) => onChange({ experience })}
      itemLabel="Experience"
      createItem={(id) => ({ id, role: '', company: '', location: '', period: '', summary: '' })}
      renderFields={(item, update) => (
        <>
          <Input label="Role" value={item.role} onChange={(e) => update({ role: e.target.value })} />
          <Input label="Company" value={item.company} onChange={(e) => update({ company: e.target.value })} />
          <Input label="Location" value={item.location} onChange={(e) => update({ location: e.target.value })} />
          <Input label="Period" placeholder="e.g. Jan 2025 – Jun 2025" value={item.period} onChange={(e) => update({ period: e.target.value })} />
          <Textarea className="sm:col-span-2" label="What you did" rows={3} value={item.summary} onChange={(e) => update({ summary: e.target.value })} />
        </>
      )}
    />
  )
}

export function EducationEditor({ value, onChange }: EditorProps) {
  return (
    <ListEditor
      items={value.education}
      onChange={(education) => onChange({ education })}
      itemLabel="Education"
      createItem={(id) => ({ id, institution: '', degree: '', period: '', details: '' })}
      renderFields={(item, update) => (
        <>
          <Input className="sm:col-span-2" label="Institution" value={item.institution} onChange={(e) => update({ institution: e.target.value })} />
          <Input label="Degree or course" value={item.degree} onChange={(e) => update({ degree: e.target.value })} />
          <Input label="Period" placeholder="e.g. 2021 – 2025" value={item.period} onChange={(e) => update({ period: e.target.value })} />
          <Input label="Relevant details" placeholder="e.g. CGPA, coursework" value={item.details} onChange={(e) => update({ details: e.target.value })} />
        </>
      )}
    />
  )
}

export function ProjectsEditor({ value, onChange }: EditorProps) {
  return (
    <ListEditor
      items={value.projects}
      onChange={(projects) => onChange({ projects })}
      itemLabel="Project"
      createItem={(id) => ({ id, name: '', description: '', technologies: [], link: '' })}
      renderFields={(item, update) => (
        <>
          <Input label="Project name" value={item.name} onChange={(e) => update({ name: e.target.value })} />
          <Input label="Link" placeholder="Optional" value={item.link} onChange={(e) => update({ link: e.target.value })} />
          <Textarea className="sm:col-span-2" label="What it does" rows={3} value={item.description} onChange={(e) => update({ description: e.target.value })} />
          <TagInput className="sm:col-span-2" label="Technologies" placeholder="e.g. React" value={item.technologies} onChange={(technologies) => update({ technologies })} />
        </>
      )}
    />
  )
}

export function SkillsEditor({ value, onChange }: EditorProps) {
  return (
    <TagInput
      label="Skills"
      placeholder="e.g. React, SQL, Figma"
      hint="Press Enter or comma after each skill."
      value={value.skills}
      onChange={(skills) => onChange({ skills })}
    />
  )
}

export function CertificationsEditor({ value, onChange }: EditorProps) {
  const [achievementsText, setAchievementsText] = useState(value.achievements.join('\n'))

  return (
    <div className="flex flex-col gap-6">
      <ListEditor
        items={value.certifications}
        onChange={(certifications) => onChange({ certifications })}
        itemLabel="Certification"
        createItem={(id) => ({ id, name: '', issuer: '', year: '' })}
        renderFields={(item, update) => (
          <>
            <Input className="sm:col-span-2" label="Certification" value={item.name} onChange={(e) => update({ name: e.target.value })} />
            <Input label="Issuer" value={item.issuer} onChange={(e) => update({ issuer: e.target.value })} />
            <Input label="Year" value={item.year} onChange={(e) => update({ year: e.target.value })} />
          </>
        )}
      />
      <Textarea
        label="Achievements"
        hint="One per line: awards, hackathons, rankings."
        rows={3}
        value={achievementsText}
        onChange={(e) => {
          setAchievementsText(e.target.value)
          onChange({ achievements: e.target.value.split('\n') })
        }}
      />
    </div>
  )
}

export function LinksEditor({ value, onChange }: EditorProps) {
  return (
    <ListEditor
      items={value.links}
      onChange={(links) => onChange({ links })}
      itemLabel="Link"
      createItem={(id) => ({ id, label: '', url: '' })}
      renderFields={(item, update) => (
        <>
          <Input label="Label" placeholder="e.g. GitHub" value={item.label} onChange={(e) => update({ label: e.target.value })} />
          <Input label="URL" value={item.url} onChange={(e) => update({ url: e.target.value })} />
        </>
      )}
    />
  )
}

export function PreferencesEditor({ value, onChange }: EditorProps) {
  const toggle = (mode: WorkMode, checked: boolean) =>
    onChange({ workModes: checked ? [...value.workModes, mode] : value.workModes.filter((m) => m !== mode) })

  return (
    <div className="flex flex-col gap-4">
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-text">Work style</legend>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {(Object.keys(workModeLabels) as WorkMode[]).map((mode) => (
            <Checkbox key={mode} label={workModeLabels[mode]} checked={value.workModes.includes(mode)} onChange={(e) => toggle(mode, e.target.checked)} />
          ))}
        </div>
      </fieldset>
      <Input
        label="Preferred locations"
        placeholder="e.g. Bengaluru, Pune, Remote"
        value={value.preferredLocations}
        onChange={(e) => onChange({ preferredLocations: e.target.value })}
      />
      <TagInput
        label="Industries"
        placeholder="e.g. SaaS, FinTech"
        hint="Press Enter after each one."
        value={value.industries}
        onChange={(industries) => onChange({ industries })}
      />
    </div>
  )
}

/** Target roles plus work preferences, edited together from the Career Profile page. */
export function DirectionEditor({ value, onChange }: EditorProps) {
  return (
    <div className="flex flex-col gap-4">
      <TagInput
        label="Target roles"
        placeholder="e.g. Frontend Developer"
        hint="Press Enter after each role."
        value={value.targetRoles}
        onChange={(targetRoles) => onChange({ targetRoles })}
      />
      <PreferencesEditor value={value} onChange={onChange} />
    </div>
  )
}
