import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { AppLayout } from '@/layouts/AppLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { OnboardingLayout } from '@/layouts/OnboardingLayout'
import { useUpgradeModalStore } from '@/store/upgradeModalStore'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { AboutPage } from '@/pages/AboutPage'
import { ContactPage } from '@/pages/ContactPage'
import { HowItWorksPage } from '@/pages/HowItWorksPage'
import { PricingPage } from '@/pages/PricingPage'
import { Dashboard } from '@/pages/Dashboard'
import { Landing } from '@/pages/Landing'
import { NotFound } from '@/pages/NotFound'
import { ResumeEditorPage } from '@/pages/ResumeEditorPage'
import { CreateResumePage } from '@/pages/CreateResumePage'
import { AIResumeFlow } from '@/components/resumes/flows/AIResumeFlow'
import { ManualResumeFlow } from '@/components/resumes/flows/ManualResumeFlow'
import { TailorResumeFlow } from '@/components/resumes/flows/TailorResumeFlow'
import { TemplateLibrary } from '@/components/resumes/templates/TemplateLibrary'
import { ResumesPage } from '@/pages/ResumesPage'
import { JobDetailPage } from '@/pages/JobDetailPage'
import { JobsPage } from '@/pages/JobsPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { AccountPage } from '@/pages/AccountPage'
import { SettingsPage } from '@/pages/SettingsPage'
import { AIAssistantPage } from '@/pages/AIAssistantPage'
import { AIMockInterviewPage } from '@/pages/AIMockInterviewPage'
import { PlaceholderPage } from '@/pages/PlaceholderPage'
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage'
import { LoginPage } from '@/pages/auth/LoginPage'
import { ImportLinkedInPage } from '@/pages/onboarding/ImportLinkedInPage'
import { ImportResumePage } from '@/pages/onboarding/ImportResumePage'
import { ManualSetupPage } from '@/pages/onboarding/ManualSetupPage'
import { ReviewPage } from '@/pages/onboarding/ReviewPage'
import { WelcomePage } from '@/pages/onboarding/WelcomePage'
import { SignupPage } from '@/pages/auth/SignupPage'
import { GuestOnly, OnboardingOnly, RequireAuth, RequireOnboarding } from '@/routes/guards'
import { paths, placeholderRoutes } from '@/routes/navigation'

/** Old links keep working: forward to the new route and keep any query string. */
function Redirect({ to }: { to: string }) {
  const { search } = useLocation()
  return <Navigate to={`${to}${search}`} replace />
}

function LegacyResumeRedirect() {
  const { resumeId } = useParams()
  return <Navigate to={`/resumes/${resumeId}/edit`} replace />
}

function UpgradeRouteRedirect() {
  const openUpgradeModal = useUpgradeModalStore((s) => s.openUpgradeModal)
  useEffect(() => {
    openUpgradeModal()
  }, [openUpgradeModal])
  return <Navigate to={paths.dashboard} replace />
}

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Marketing with persistent navbar and smooth transitions */}
      <Route element={<MarketingLayout />}>
        <Route path={paths.landing} element={<Landing />} />
        <Route path={paths.howItWorks} element={<HowItWorksPage />} />
        <Route path={paths.about} element={<AboutPage />} />
        <Route path={paths.contact} element={<ContactPage />} />
        <Route path={paths.pricing} element={<PricingPage />} />
      </Route>
      <Route element={<GuestOnly />}>
        <Route element={<AuthLayout />}>
          <Route path={paths.login} element={<LoginPage />} />
          <Route path={paths.signup} element={<SignupPage />} />
          <Route path={paths.forgotPassword} element={<ForgotPasswordPage />} />
        </Route>
      </Route>

      {/* Authenticated */}
      <Route element={<RequireAuth />}>
        <Route element={<OnboardingOnly />}>
          <Route element={<OnboardingLayout />}>
            <Route path={paths.onboarding}>
              <Route index element={<WelcomePage />} />
              <Route path="import-resume" element={<ImportResumePage />} />
              <Route path="import-linkedin" element={<ImportLinkedInPage />} />
              <Route path="manual" element={<ManualSetupPage />} />
              <Route path="review" element={<ReviewPage />} />
              <Route path="*" element={<Navigate to={paths.onboarding} replace />} />
            </Route>
          </Route>
        </Route>

        <Route element={<RequireOnboarding />}>
          {/* The editor is the shared destination of all four creation flows: a focused full-screen workspace outside the AppShell. */}
          <Route path="/resumes/:resumeId/edit" element={<ResumeEditorPage />} />
          <Route element={<AppLayout />}>
            <Route path={paths.dashboard} element={<Dashboard />} />
            <Route path={paths.careerProfile} element={<ProfilePage />} />
            <Route path={paths.jobs} element={<JobsPage />} />
            <Route path={paths.resumes} element={<ResumesPage />} />
            <Route path={paths.createResume} element={<CreateResumePage />} />
            <Route path={paths.createWithAi} element={<AIResumeFlow />} />
            <Route path={paths.tailorResume} element={<TailorResumeFlow />} />
            <Route path={paths.createManual} element={<ManualResumeFlow />} />
            <Route path={paths.createFromTemplate} element={<TemplateLibrary />} />
            <Route path="/resumes/tailor" element={<Redirect to={paths.tailorResume} />} />
            <Route path="/resumes/templates" element={<Redirect to={paths.createFromTemplate} />} />
            <Route path="/resumes/builder" element={<Redirect to={paths.createManual} />} />
            <Route path="/resumes/:resumeId" element={<LegacyResumeRedirect />} />
            <Route path="/jobs/:jobId" element={<JobDetailPage />} />
            <Route path={paths.assistant} element={<AIAssistantPage />} />
            <Route path={paths.account} element={<AccountPage />} />
            <Route path={paths.settings} element={<SettingsPage />} />
            <Route path={paths.mockInterview} element={<AIMockInterviewPage />} />
            <Route path={paths.upgrade} element={<UpgradeRouteRedirect />} />
            {placeholderRoutes.filter(({ path }) => path !== paths.assistant && path !== paths.mockInterview && path !== paths.account && path !== paths.settings && path !== paths.upgrade).map(({ path, title }) => (
              <Route key={path} path={path} element={<PlaceholderPage title={title} />} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}
