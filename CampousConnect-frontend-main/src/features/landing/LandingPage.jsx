import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../components/ui/button'
import { AnimatedCard } from '../../components/ui/animated-card'
import { CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { GraduationCap, Building2, Users, Briefcase, Sparkles } from 'lucide-react'
import { BrandLogo } from '../../components/ui/brand-logo'

const roles = [
  { id: 'student', title: 'Student', description: 'Manage your profile, browse opportunities, and track applications', icon: GraduationCap, color: 'bg-gradient-to-br from-blue-500 to-blue-600', hoverColor: 'hover:from-blue-600 hover:to-blue-700', gradientRing: 'from-blue-400/40 via-blue-500/30 to-transparent' },
  { id: 'placement-cell', title: 'Placement Cell', description: 'Post openings, manage applicants, and view analytics', icon: Building2, color: 'bg-gradient-to-br from-green-500 to-green-600', hoverColor: 'hover:from-green-600 hover:to-green-700', gradientRing: 'from-emerald-400/40 via-emerald-500/30 to-transparent' },
  { id: 'faculty', title: 'Faculty Mentor', description: 'Review and approve student applications', icon: Users, color: 'bg-gradient-to-br from-purple-500 to-purple-600', hoverColor: 'hover:from-purple-600 hover:to-purple-700', gradientRing: 'from-purple-400/40 via-purple-500/30 to-transparent' },
  { id: 'employer', title: 'Employer', description: 'View candidates, shortlist, and provide feedback', icon: Briefcase, color: 'bg-gradient-to-br from-orange-500 to-orange-600', hoverColor: 'hover:from-orange-600 hover:to-orange-700', gradientRing: 'from-orange-400/40 via-orange-500/30 to-transparent' },
]

// Removed stats, feature bullets and CTA sections per request.

export function LandingPage({ onSelectRole }) {
  const [selectedRole, setSelectedRole] = useState(null)
  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId)
    onSelectRole?.(roleId)
  }

  return (
    <div className="relative h-screen overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.12),transparent_60%),radial-gradient(circle_at_80%_30%,rgba(139,92,246,0.14),transparent_55%)]">
      {/* Ambient gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-10 h-80 w-80 rounded-full bg-green-600/12 blur-3xl animate-float" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-purple-600/12 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative container mx-auto px-5 py-8 h-full flex flex-col justify-between">
        {/* Hero Section */}
        <motion.section className="text-center max-w-5xl mx-auto flex-grow flex flex-col justify-center pt-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border bg-white/70 dark:bg-white/5 backdrop-blur px-4 py-2 text-xs font-medium text-muted-foreground shadow-sm">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Actively Powering Campus Success
          </div>
          <motion.div
            className="mb-10 flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: -10, scale: .97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <BrandLogo size="xl" variant="hero" showTagline glow={false} />
          </motion.div>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto mb-4">
            A unified, insight-driven platform connecting students, faculty, employers and placement cells with real-time analytics & modern workflows.
          </p>
          {/* More sparkles animations */}
          <motion.div className="absolute top-24 left-8 text-blue-200" animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
            <Sparkles className="h-6 w-6" />
          </motion.div>
          <motion.div className="absolute top-40 right-16 text-purple-200" animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
            <Sparkles className="h-4 w-4" />
          </motion.div>
          <motion.div className="absolute top-12 right-20 text-emerald-200" animate={{ y: [0, -8, 0], rotate: [0, -3, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
            <Sparkles className="h-5 w-5" />
          </motion.div>
          <motion.div className="absolute top-32 left-24 text-yellow-200" animate={{ y: [0, 8, 0], rotate: [0, 4, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}>
            <Sparkles className="h-4 w-4" />
          </motion.div>
          <motion.div className="absolute top-16 left-1/2 text-pink-200" animate={{ y: [0, -6, 0], rotate: [0, 6, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 2 }}>
            <Sparkles className="h-3 w-3" />
          </motion.div>
          <motion.div className="absolute top-36 right-8 text-indigo-200" animate={{ y: [0, 12, 0], rotate: [0, -4, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}>
            <Sparkles className="h-5 w-5" />
          </motion.div>
        </motion.section>

        {/* Role Selection */}
        <section className="pb-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto place-items-stretch">
            {roles.map((role, index) => {
              const Icon = role.icon
              return (
                <AnimatedCard
                  key={role.id}
                  delay={0.05 * index}
                  className="cursor-pointer group relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-full flex flex-col hover:cursor-pointer min-h-[230px]"
                  onClick={() => handleRoleSelect(role.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleRoleSelect(role.id) } }}
                  aria-label={`Access ${role.title} dashboard`}
                >
                  <div className={`pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-conic-to-br from-transparent via-white/10 to-transparent`} />
                  <CardHeader className="text-center pb-4 relative flex-shrink-0" padding="default">
                    <motion.div className={`relative rounded-2xl p-4 w-fit mx-auto mb-6 shadow-lg transition-all duration-300 ${role.color} ${role.hoverColor}`}
                      whileHover={{ scale: 1.05, rotate: 2 }}>
                      <div className={`absolute -inset-2 rounded-3xl bg-gradient-to-r ${role.gradientRing} opacity-0 group-hover:opacity-100 blur-lg transition-opacity`} />
                      <Icon className="h-8 w-8 text-white relative" />
                    </motion.div>
                    <CardTitle className="text-xl font-semibold text-balance group-hover:text-primary transition-colors">{role.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center flex-1 flex flex-col justify-center" padding="default">
                    <CardDescription className="text-sm leading-relaxed text-pretty line-clamp-4">{role.description}</CardDescription>
                  </CardContent>
                </AnimatedCard>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
