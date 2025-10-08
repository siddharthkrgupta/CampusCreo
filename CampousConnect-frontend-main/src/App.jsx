import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom'
import { motion, LayoutGroup, useReducedMotion } from 'framer-motion'
import { LandingPage } from './features/landing/LandingPage'
import { StudentDashboard } from './features/student/StudentDashboard'
import { PlacementCellDashboard } from './features/placementCell/PlacementCellDashboard'
import { FacultyDashboard } from './features/faculty/FacultyDashboard'
import { EmployerDashboard } from './features/employer/EmployerDashboard'

// Student secondary / heavy pages (lazy)
const ApplicationsPage = lazy(() => import('./features/student/ApplicationsPage'))
const ApplicationDetail = lazy(() => import('./features/student/ApplicationDetail'))
const StudentProfile = lazy(() => import('./features/student/StudentProfile'))
const OpportunitiesPage = lazy(() => import('./features/student/OpportunitiesPage'))
const SettingsPage = lazy(() => import('./features/student/SettingsPage'))
const CalendarPage = lazy(() => import('./features/student/CalendarPage'))

// Settings pages for other roles
const PlacementCellSettingsPage = lazy(() => import('./features/placementCell/SettingsPage'))
const FacultySettingsPage = lazy(() => import('./features/faculty/SettingsPage'))
const EmployerSettingsPage = lazy(() => import('./features/employer/SettingsPage'))

const JobsPage = lazy(() => import('./features/placementCell/JobsPage'))
const ApplicantsPage = lazy(() => import('./features/placementCell/ApplicantsPage'))
const AnalyticsPage = lazy(() => import('./features/placementCell/AnalyticsPage'))

const ApprovalsPage = lazy(() => import('./features/faculty/ApprovalsPage'))
const MenteesPage = lazy(() => import('./features/faculty/MenteesPage'))
const ReportsPage = lazy(() => import('./features/faculty/ReportsPage'))

const CandidatesPage = lazy(() => import('./features/employer/CandidatesPage'))
const ShortlistedPage = lazy(() => import('./features/employer/ShortlistedPage'))
const FeedbackPage = lazy(() => import('./features/employer/FeedbackPage'))
const PostJobPage = lazy(() => import('./features/employer/PostJob'))

function LandingWrapper() {
  const navigate = useNavigate()
  // Go directly to dashboard to avoid a two-step redirect animation.
  return <LandingPage onSelectRole={(role) => navigate(`/${role}/dashboard`)} />
}

function AnimatedRouteContainer({ children }) {
  const location = useLocation()
  const reduce = useReducedMotion()
  const initial = reduce ? { opacity: 0 } : { opacity: 0, y: 8 }
  const animate = reduce ? { opacity: 1 } : { opacity: 1, y: 0 }
  return (
    <motion.div
      key={location.pathname}
      className="min-h-dvh"
      initial={initial}
      animate={animate}
      transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <LayoutGroup>
        <Suspense fallback={<div className="p-6 text-sm text-muted-foreground animate-fade-in-up">Loading...</div>}>
          <AnimatedRouteContainer>
            <Routes>
              <Route path="/" element={<LandingWrapper />} />
              {/* Student */}
              <Route path="/student" element={<Navigate to="/student/dashboard" replace />} />
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/profile" element={<StudentProfile />} />
              <Route path="/student/opportunities" element={<OpportunitiesPage />} />
              <Route path="/student/applications" element={<ApplicationsPage />} />
              <Route path="/student/applications/:id" element={<ApplicationDetail />} />
              <Route path="/student/calendar" element={<CalendarPage />} />
              <Route path="/student/settings" element={<SettingsPage />} />
              {/* Placement Cell */}
              <Route path="/placement-cell" element={<Navigate to="/placement-cell/dashboard" replace />} />
              <Route path="/placement-cell/dashboard" element={<PlacementCellDashboard />} />
              <Route path="/placement-cell/jobs" element={<JobsPage />} />
              <Route path="/placement-cell/applicants" element={<ApplicantsPage />} />
              <Route path="/placement-cell/analytics" element={<AnalyticsPage />} />
              <Route path="/placement-cell/settings" element={<PlacementCellSettingsPage />} />
              {/* Faculty */}
              <Route path="/faculty" element={<Navigate to="/faculty/dashboard" replace />} />
              <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
              <Route path="/faculty/approvals" element={<ApprovalsPage />} />
              <Route path="/faculty/mentees" element={<MenteesPage />} />
              <Route path="/faculty/reports" element={<ReportsPage />} />
              <Route path="/faculty/settings" element={<FacultySettingsPage />} />
              {/* Employer */}
              <Route path="/employer" element={<Navigate to="/employer/dashboard" replace />} />
              <Route path="/employer/dashboard" element={<EmployerDashboard />} />
              <Route path="/employer/post-job" element={<PostJobPage />} />
              <Route path="/employer/candidates" element={<CandidatesPage />} />
              <Route path="/employer/shortlisted" element={<ShortlistedPage />} />
              <Route path="/employer/feedback" element={<FeedbackPage />} />
              <Route path="/employer/settings" element={<EmployerSettingsPage />} />
            </Routes>
          </AnimatedRouteContainer>
        </Suspense>
      </LayoutGroup>
    </BrowserRouter>
  )
}
