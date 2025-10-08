import React from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardLayout } from '../../layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { StatCard } from '../../components/ui/stat-card'
import { PageHeader } from '../../components/ui/page-header'
import { StatGrid } from '../../components/ui/stat-grid'
import { Badge } from '../../components/ui/badge'
import { EmptyState } from '../../components/ui/empty-state'
import { Button } from '../../components/ui/button'
import { Progress } from '../../components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
import { User, Briefcase, FileText, Clock, CheckCircle, AlertCircle, TrendingUp, Calendar, MapPin, DollarSign } from 'lucide-react'
import { NotificationsBell } from '../../components/notifications/NotificationsBell'

const mockEvents = [
  { id: 1, title: 'Technical Interview - Infosys Digital', date: '2025-10-05', time: '2:00 PM', type: 'interview' },
  { id: 2, title: 'Campus Career Fair - Indian Tech & Product Companies', date: '2025-10-12', time: '10:00 AM', type: 'event' }
]

import { statusConfig } from './statusConfig'

import { useStudentData } from './useStudentData'

export function StudentDashboard() {
  const navigate = useNavigate()
  const { profile, profileCompletion, stats, recentApplications } = useStudentData()

  const ringSize = 72
  const stroke = 6
  const radius = (ringSize - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const progressOffset = circumference - (profileCompletion / 100) * circumference

  return (
    <DashboardLayout role="student">
      <div className="space-y-8 pt-4">
        <PageHeader
          title={`Welcome back, ${profile.personalInfo?.name || profile.name}`}
          description="Track your internship journey and discover new opportunities"
          actions={[
            <Button key="opp" variant="outline" onClick={() => navigate('/student/opportunities')}> <Briefcase className="h-4 w-4 mr-2" /> Browse Opportunities </Button>,
            <Button key="prof" onClick={() => navigate('/student/profile')}> <User className="h-4 w-4 mr-2" /> Update Profile </Button>,
            <div key="notify" className="ml-2"><NotificationsBell role="student" /></div>
          ]}
        />
        <Card variant="soft" className="border-l-4 border-l-teal-600 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center mr-3" style={{ width: ringSize, height: ringSize }}>
                  <svg
                    width={ringSize}
                    height={ringSize}
                    role="img"
                    aria-label={`Profile completion ${profileCompletion}%`}
                  >
                    <circle
                      cx={ringSize / 2}
                      cy={ringSize / 2}
                      r={radius}
                      stroke="var(--border)"
                      strokeWidth={stroke}
                      fill="none"
                    />
                    <circle
                      cx={ringSize / 2}
                      cy={ringSize / 2}
                      r={radius}
                      stroke="var(--primary)"
                      strokeWidth={stroke}
                      fill="none"
                      strokeDasharray={circumference}
                      strokeDashoffset={progressOffset}
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dashoffset .6s ease' }}
                    />
                  </svg>
                  <Avatar className="h-12 w-12 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ring-2 ring-[var(--background)] shadow-sm">
                    <AvatarImage src={profile.personalInfo?.avatar || profile.avatar || '/assets/user_default.jpg'} alt={profile.personalInfo?.name || profile.name} />
                    <AvatarFallback>{(profile.personalInfo?.name || profile.name || 'U')?.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <CardTitle className="text-lg">Profile Completion</CardTitle>
                  <CardDescription>Complete your profile to get better matches</CardDescription>
                </div>
              </div>
              <Badge variant="secondary">{profileCompletion}%</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={profileCompletion} className="mb-2" />
            {profileCompletion === 100 && (
              <p className="text-green-600 text-xs font-semibold mt-2">Profile is 100% complete!</p>
            )}
          </CardContent>
        </Card>
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard icon={FileText} title="Applications" value={stats.applications} diff={stats.applications} trend="up" delay={0.05} />
          <StatCard icon={Calendar} title="Interviews" value={stats.interviews} diff={stats.interviews} trend="up" delay={0.1} />
          <StatCard icon={CheckCircle} title="Offers" value={stats.offers} diff={stats.offers} trend="up" delay={0.15} />
          <StatCard icon={TrendingUp} title="Profile Views" value={stats.profileViews} diff={stats.profileViews} trend="up" delay={0.2} />
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card variant="soft" className="card-hover">
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Track the status of your latest applications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentApplications.length === 0 && (
                  <EmptyState title="No applications" message="You haven't applied to any opportunities yet." />
                )}
                {recentApplications.map(application => {
                  const statusInfo = statusConfig[application.status]
                  const StatusIcon = statusInfo.icon
                  return (
                    <div key={application.id} className="flex items-center justify-between p-4 rounded-lg border bg-[var(--card)]/60 hover:bg-[var(--card)]/90 transition-colors group">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">{application.company}</h4>
                          <Badge className={`${statusInfo.color} text-white shadow-sm`}> <StatusIcon className="h-3 w-3 mr-1" /> {statusInfo.label} </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{application.position}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {application.location}</span>
                          <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" /> {application.stipend}</span>
                          <span>Applied: {new Date(application.appliedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="opacity-70 group-hover:opacity-100 transition-opacity" onClick={() => navigate(`/student/applications/${application.id}`)}>View Details</Button>
                    </div>
                  )
                })}
                <Button variant="outline" className="w-full bg-transparent hover:bg-[var(--card)]/70" onClick={() => navigate('/student/applications')}>View All Applications</Button>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card variant="soft" className="card-hover">
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Don't miss important dates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockEvents.length === 0 && (
                  <EmptyState title="No events" message="No upcoming events scheduled." />
                )}
                {mockEvents.map(event => (
                  <div key={event.id} className="p-3 rounded-lg border bg-[var(--card)]/60 hover:bg-[var(--card)]/90 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-2.5 h-2.5 rounded-full ring-2 ring-offset-1 ring-[var(--background)] ${event.type === 'interview' ? 'bg-purple-500' : 'bg-teal-600'}`} />
                      <h4 className="font-medium text-sm">{event.title}</h4>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      <p>{new Date(event.date).toLocaleDateString()}</p>
                      <p>{event.time}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full bg-transparent hover:bg-[var(--card)]/70" onClick={() => navigate('/student/calendar')}>View Calendar</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}