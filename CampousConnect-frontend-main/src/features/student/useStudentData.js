import { useState, useEffect, useCallback } from 'react'

function calculateProfileCompletion(profile) {
  let completed = 0
  let total = 4
  if (profile.personalInfo?.name?.trim() && profile.personalInfo?.email?.trim() && profile.personalInfo?.phone?.trim()) completed++
  if (Array.isArray(profile.skills) && profile.skills.length > 0) completed++
  if (profile.coverLetter && profile.coverLetter.trim().length > 0) completed++
  if (profile.personalInfo?.avatar && !profile.personalInfo.avatar.includes('user_default.jpg')) completed++
  return Math.round((completed / total) * 100)
}

const defaultProfile = {
  personalInfo: { name: 'Aarav Sharma', email: 'aarav.sharma@university.ac.in', phone: '+91 98765 43210', department: 'Computer Science', year: 'Final Year', gpa: '8.2', avatar: '/assets/user_default.jpg' },
  skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git'],
  resume: { filename: 'Aarav_Sharma_Resume.pdf', uploadDate: '2025-08-20' },
  coverLetter: `Dear Hiring Manager,

I am writing to express my interest in the Software Engineering Intern position. I am a final-year Computer Science undergraduate from India with hands-on experience building full‑stack applications using React, Node.js and modern tooling.

Across national hackathons, open-source contributions and internships with early‑stage startups, I have learned to deliver clean, maintainable code while collaborating across design and product functions. I mentor juniors in data structures and system design which keeps my fundamentals strong.

Your organisation's focus on scalable digital solutions for diverse users aligns with my goal of building impactful technology for India at scale. I believe my technical depth, curiosity and collaborative approach would allow me to contribute meaningfully.

Thank you for considering my application. I look forward to the possibility of contributing to your team.

Sincerely,
Aarav Sharma`,
  emailNotifications: true,
  darkMode: false
}

export function useStudentData() {
  const [profile, setProfile] = useState(defaultProfile)
  const [applications, setApplications] = useState([])
  const [stats, setStats] = useState({ applications: 0, interviews: 0, offers: 0, profileViews: 0 })
  const [profileCompletion, setProfileCompletion] = useState(0)

  // Load on mount
  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem('studentProfile')
      if (storedProfile) setProfile(JSON.parse(storedProfile))
      const storedApps = localStorage.getItem('studentApplications')
      if (storedApps) setApplications(JSON.parse(storedApps))
      const storedStats = localStorage.getItem('studentStats')
      if (storedStats) setStats(prev => ({ ...prev, ...JSON.parse(storedStats) }))
    } catch { }
  }, [])

  // Recalculate completion when profile changes
  useEffect(() => {
    const completion = calculateProfileCompletion(profile)
    setProfileCompletion(completion)
    try {
      localStorage.setItem('profileCompletion', completion)
    } catch { }
  }, [profile])

  // Keep derived stats in sync with applications length
  useEffect(() => {
    setStats(prev => ({ ...prev, applications: applications.length }))
  }, [applications])

  const saveProfile = useCallback((nextProfile) => {
    setProfile(nextProfile)
    try { localStorage.setItem('studentProfile', JSON.stringify(nextProfile)) } catch { }
  }, [])

  const addApplication = useCallback((application) => {
    setApplications(prev => {
      const exists = prev.some(a => a.id === application.id)
      const next = exists ? prev : [...prev, application]
      try { localStorage.setItem('studentApplications', JSON.stringify(next)) } catch { }
      return next
    })
  }, [])

  const updateApplication = useCallback((id, updater) => {
    setApplications(prev => {
      const next = prev.map(a => a.id === id ? { ...a, ...updater } : a)
      try { localStorage.setItem('studentApplications', JSON.stringify(next)) } catch { }
      return next
    })
  }, [])

  const recentApplications = [...applications].slice(-3).reverse()

  return {
    profile,
    setProfile: saveProfile,
    applications,
    addApplication,
    updateApplication,
    stats,
    profileCompletion,
    recentApplications,
    calculateProfileCompletion
  }
}
