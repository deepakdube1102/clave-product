import { templatePreviews } from '@/mocks/templatePreviews.mock'
import type { TemplateCategory, TemplateInfo } from '@/types/template'
import type { TemplateId } from '@/types/resumeDocument'

export const templateCategories: Array<'All' | TemplateCategory> = ['All', 'ATS Friendly', 'Product & Design', 'Engineering', 'Business', 'Marketing', 'Finance', 'Student', 'Academic', 'Creative']

type Meta = Omit<TemplateInfo, 'id' | 'preview' | 'previewRole'>

const meta: Record<TemplateId, Meta> = {
  classic: { name: 'Classic ATS', category: 'ATS Friendly', categories: ['ATS Friendly', 'Business', 'Finance'], description: 'Clean and timeless, optimised for ATS.', bestFor: ['Business', 'Finance', 'Any role'], atsFriendly: true, tags: ['ATS Friendly', 'Professional'] },
  modern: { name: 'Modern ATS', category: 'ATS Friendly', categories: ['ATS Friendly', 'Product & Design', 'Engineering', 'Marketing'], description: 'Modern layout with strong visual hierarchy.', bestFor: ['Product Design', 'Engineering', 'Marketing'], atsFriendly: true, tags: ['ATS Friendly', 'Modern'] },
  compact: { name: 'Compact', category: 'ATS Friendly', categories: ['ATS Friendly', 'Engineering', 'Business'], description: 'Fits more information while staying readable.', bestFor: ['Engineering', 'Consulting', 'Longer histories'], atsFriendly: true, tags: ['ATS Friendly', 'High Density'] },
  minimal: { name: 'Minimal', category: 'Creative', categories: ['Creative', 'Product & Design'], description: 'Clean, minimal design with maximum readability.', bestFor: ['Design', 'Writing', 'Early career'], atsFriendly: true, tags: ['Clean', 'Minimal'] },
  student: { name: 'Student', category: 'Student', categories: ['Student', 'ATS Friendly'], description: 'Perfect for students and recent graduates.', bestFor: ['Students', 'Internships', 'Recent graduates'], atsFriendly: true, tags: ['Student', 'Education Focused'] },
  designer: { name: 'Product Designer', category: 'Product & Design', categories: ['Product & Design', 'Creative', 'Marketing'], description: 'Showcase your product work and design process.', bestFor: ['Product Design', 'UX', 'Brand'], atsFriendly: true, tags: ['Design Focused', 'Portfolio'] },
  engineer: { name: 'Software Engineer', category: 'Engineering', categories: ['Engineering', 'ATS Friendly'], description: 'Technical layout with skills and projects.', bestFor: ['Software Engineering', 'Data', 'DevOps'], atsFriendly: true, tags: ['Technical', 'Engineering'] },
  business: { name: 'Business Professional', category: 'Business', categories: ['Business', 'Finance', 'Marketing'], description: 'Ideal for business, consulting and management roles.', bestFor: ['Consulting', 'Operations', 'Management'], atsFriendly: true, tags: ['Business', 'Consulting'] },
  academic: { name: 'Academic', category: 'Academic', categories: ['Academic', 'Student'], description: 'Designed for research, academic and PhD applications.', bestFor: ['Research', 'PhD applications', 'Teaching'], atsFriendly: false, tags: ['Academic', 'Research'] },
  executive: { name: 'Executive', category: 'Business', categories: ['Business', 'Finance'], description: 'For senior professionals and leadership roles.', bestFor: ['Directors', 'Senior managers', 'Leadership'], atsFriendly: false, tags: ['Executive', 'Leadership'] },
}

export const templateLibrary: TemplateInfo[] = (Object.keys(meta) as TemplateId[]).map((id) => ({
  id,
  ...meta[id],
  previewRole: templatePreviews[id].role,
  preview: templatePreviews[id].content,
}))
