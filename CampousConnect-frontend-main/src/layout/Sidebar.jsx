import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation, NavLink } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { GraduationCap, Home, User, Briefcase, FileText, BarChart3, Users, Settings, CheckCircle, Eye, Building2, Calendar } from 'lucide-react'
import { cn } from '../lib/utils'
import { ThemeToggle } from '../components/theme/ThemeToggle'

const roleConfigs = {
  student: {
    title: 'Student Portal',
    icon: GraduationCap,
    color: 'bg-blue-500',
    items: [
      { icon: Home, label: 'Dashboard', href: '/student/dashboard' },
      { icon: User, label: 'Profile', href: '/student/profile' },
      { icon: Briefcase, label: 'Opportunities', href: '/student/opportunities', badge: '12' },
      { icon: FileText, label: 'Applications', href: '/student/applications', badge: '3' },
      { icon: Calendar, label: 'Calendar', href: '/student/calendar' },
      { icon: Settings, label: 'Settings', href: '/student/settings' }
    ]
  },
  'placement-cell': {
    title: 'Placement Cell',
    icon: Building2,
    color: 'bg-green-500',
    items: [
      { icon: Home, label: 'Dashboard', href: '/placement-cell/dashboard' },
      { icon: Briefcase, label: 'Job Postings', href: '/placement-cell/jobs', badge: '8' },
      { icon: Users, label: 'Applicants', href: '/placement-cell/applicants', badge: '45' },
      { icon: BarChart3, label: 'Analytics', href: '/placement-cell/analytics' },
      { icon: Settings, label: 'Settings', href: '/placement-cell/settings' }
    ]
  },
  faculty: {
    title: 'Faculty Mentor',
    icon: Users,
    color: 'bg-purple-500',
    items: [
      { icon: Home, label: 'Dashboard', href: '/faculty/dashboard' },
      { icon: CheckCircle, label: 'Approvals', href: '/faculty/approvals', badge: '7' },
      { icon: Users, label: 'Mentees', href: '/faculty/mentees', badge: '15' },
      { icon: FileText, label: 'Reports', href: '/faculty/reports' },
      { icon: Settings, label: 'Settings', href: '/faculty/settings' }
    ]
  },
  employer: {
    title: 'Employer Portal',
    icon: Briefcase,
    color: 'bg-orange-500',
    items: [
      { icon: Home, label: 'Dashboard', href: '/employer/dashboard' },
      { icon: Briefcase, label: 'Post Job', href: '/employer/post-job' },
      { icon: Eye, label: 'Candidates', href: '/employer/candidates', badge: '23' },
      { icon: Users, label: 'Shortlisted', href: '/employer/shortlisted', badge: '8' },
      { icon: FileText, label: 'Feedback', href: '/employer/feedback' },
      { icon: Settings, label: 'Settings', href: '/employer/settings' }
    ]
  },
}

export function Sidebar({ role = 'student' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  // Track breakpoint so the sidebar is always visible on md+ screens
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setIsDesktop(mq.matches)
    try { mq.addEventListener('change', update) } catch { mq.addListener(update) }
    update()
    return () => { try { mq.removeEventListener('change', update) } catch { mq.removeListener(update) } }
  }, [])
  const config = roleConfigs[role]
  const Icon = config.icon
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <>
      <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <span>&times;</span> : <span>≡</span>}
      </Button>
      <motion.div
        initial={false}
        animate={{ x: isDesktop ? 0 : (isOpen ? 0 : -256) }}
        transition={{
          type: 'tween',
          duration: 0.4,
          ease: [0.25, 0.1, 0.25, 1.0]
        }}
        className={cn('fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border sidebar-border-fade')}
        style={{ willChange: 'transform' }}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className={`${config.color} rounded-lg p-2`}><Icon className="h-5 w-5 text-white" /></div>
              <div>
                <h2 className="font-semibold text-sm">{config.title}</h2>
                <p className="text-xs text-muted-foreground">Dashboard</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 p-4 space-y-2 relative">
            {config.items.map(item => {
              const ItemIcon = item.icon
              const isActive = currentPath === item.href
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive: active }) =>
                    cn(
                      'w-full justify-start gap-3 h-10 inline-flex items-center rounded-md px-3 text-sm font-medium transition-colors relative z-10',
                      active
                        ? 'bg-secondary text-secondary-foreground'
                        : 'hover:bg-accent hover:text-accent-foreground',
                    )
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <ItemIcon className="h-4 w-4" />
                  <span className="flex-1 text-left">{item.label}</span>
                </NavLink>
              )
            })}
          </nav>
          <div className="p-4 border-t border-border space-y-2">
            <Button variant="ghost" className="w-full justify-start gap-3 h-10" onClick={() => navigate('/')}> <GraduationCap className="h-4 w-4" /> <span>Switch Role</span> </Button>
            <div className="flex items-center justify-between rounded-md bg-secondary px-3 py-2">
              <span className="text-xs font-medium text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {!isDesktop && isOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
