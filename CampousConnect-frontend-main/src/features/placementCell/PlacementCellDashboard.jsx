import React from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardLayout } from '../../layout/DashboardLayout'
import { StatCard } from '../../components/ui/stat-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { PageHeader } from '../../components/ui/page-header'
import { StatGrid } from '../../components/ui/stat-grid'
import { EmptyState } from '../../components/ui/empty-state'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts'
import { Briefcase, CheckCircle2, Users, BarChart3, FileText, Clock, Calendar } from 'lucide-react'
import { NotificationsBell } from '../../components/notifications/NotificationsBell'
import { motion } from 'framer-motion'

const metrics = {
  totalJobs: 24,
  activeJobs: 18,
  applicants: 342,
  placed: 89,
  interviews: 15,
  pending: 7,
}

const applicationTrends = [
  { month: 'Sep', applications: 45, placements: 12 },
  { month: 'Oct', applications: 67, placements: 18 },
  { month: 'Nov', applications: 89, placements: 25 },
  { month: 'Dec', applications: 123, placements: 34 },
  { month: 'Jan', applications: 156, placements: 42 },
]

const departmentStats = [
  { name: 'Computer Science', value: 45, color: '#3b82f6' },
  { name: 'Electrical Eng', value: 28, color: '#10b981' },
  { name: 'Mechanical Eng', value: 22, color: '#f59e0b' },
  { name: 'Business Admin', value: 18, color: '#ef4444' },
  { name: 'Others', value: 12, color: '#8b5cf6' },
]

const recentPostings = [
  { id: 1, title: 'Software Engineering Intern', company: 'TechCorp Solutions', applicants: 45, status: 'active', posted: '2024-01-12' },
  { id: 2, title: 'Data Science Intern', company: 'DataFlow Inc', applicants: 32, status: 'active', posted: '2024-01-11' },
  { id: 3, title: 'Full Stack Developer', company: 'StartupXYZ', applicants: 21, status: 'draft', posted: '2024-01-10' },
]

const upcomingInterviews = [
  { id: 1, candidate: 'Aarav Sharma', role: 'Software Engineering Intern', type: 'Technical', date: '2024-01-20', time: '2:00 PM' },
  { id: 2, candidate: 'Sara Khan', role: 'Data Science Intern', type: 'HR', date: '2024-01-22', time: '11:00 AM' },
]

export function PlacementCellDashboard() {
  const navigate = useNavigate()

  return (
    <DashboardLayout role="placement-cell">
      <div className="space-y-8">
        <PageHeader
          title="Placement Cell Dashboard"
          description="Manage job postings, track applicants, and monitor placement statistics"
          actions={[
            <Button key="analytics" variant="outline" className="bg-transparent" onClick={() => navigate('/placement-cell/analytics')}><BarChart3 className="h-4 w-4 mr-2" /> View Analytics</Button>,
            <div key="notify" className="ml-2"><NotificationsBell role="placement-cell" /></div>
          ]}
        />
        <StatGrid className="grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <StatCard icon={FileText} title="Total Jobs" value={metrics.totalJobs} diff={12} />
          <StatCard icon={Briefcase} title="Active Jobs" value={metrics.activeJobs} diff={4} />
          <StatCard icon={Users} title="Applicants" value={metrics.applicants} diff={18} />
          <StatCard icon={CheckCircle2} title="Placed" value={metrics.placed} diff={6} />
          <StatCard icon={Calendar} title="Interviews" value={metrics.interviews} diff={2} />
          <StatCard icon={Clock} title="Pending" value={metrics.pending} diff={-3} trend="down" />
        </StatGrid>
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 overflow-hidden">
            <CardHeader>
              <CardTitle>Application & Placement Trends</CardTitle>
              <CardDescription>Monthly overview of applications and placements</CardDescription>
            </CardHeader>
            <CardContent className="h-72 relative p-0">
              <div className="absolute inset-0 p-6">
                <div className="w-full h-full overflow-hidden">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={applicationTrends} margin={{ left: 4, right: 12, top: 4, bottom: 4 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" stroke="currentColor" tick={{ fontSize: 12 }} />
                      <YAxis stroke="currentColor" tick={{ fontSize: 12 }} width={32} />
                      <Tooltip contentStyle={{ fontSize: '12px' }} wrapperStyle={{ outline: 'none' }} />
                      <Line type="monotone" dataKey="applications" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                      <Line type="monotone" dataKey="placements" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Applications by Department</CardTitle>
              <CardDescription>Distribution across departments</CardDescription>
            </CardHeader>
            <CardContent className="pt-2 space-y-6">
              <div className="w-full flex justify-center">
                <div className="w-[240px] h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie dataKey="value" data={departmentStats} outerRadius={72} strokeWidth={1} label={({ value }) => value}>
                        {departmentStats.map(d => <Cell key={d.name} fill={d.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ fontSize: '12px' }} wrapperStyle={{ outline: 'none' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {departmentStats.map(d => (
                  <div key={d.name} className="flex items-center gap-2 p-3 rounded-lg bg-white border hover:shadow-sm transition hover:bg-muted/40">
                    <span className="w-3.5 h-3.5 rounded-full border" style={{ background: d.color }} />
                    <span className="font-medium text-xs leading-tight flex-1">{d.name}</span>
                    <Badge variant="secondary" className="text-xs px-2 py-0.5">{d.value}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Job Postings</CardTitle>
              <CardDescription>Latest opportunities added</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentPostings.length === 0 && (
                <EmptyState title="No postings" message="You have no recent job postings yet." />
              )}
              {recentPostings.length > 0 && (
                <ul className="space-y-4">
                  {recentPostings.map(job => (
                    <li key={job.id} className="p-4 border rounded-lg flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-sm mb-1">{job.title}</h4>
                        <p className="text-xs text-muted-foreground mb-1">{job.company}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{job.applicants} applicants</span>
                          <span>Posted: {new Date(job.posted).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={job.status === 'active' ? 'bg-green-500 text-white' : 'bg-muted text-foreground'}>{job.status}</Badge>
                        <Button variant="outline" size="sm" className="bg-transparent">Manage</Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <Button variant="outline" className="w-full bg-transparent">View All Jobs</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Interviews</CardTitle>
              <CardDescription>Scheduled interviews this week</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingInterviews.length === 0 && (
                <EmptyState title="No interviews" message="No upcoming interviews scheduled." />
              )}
              {upcomingInterviews.length > 0 && (
                <ul className="space-y-4">
                  {upcomingInterviews.map(iv => (
                    <li key={iv.id} className="p-4 border rounded-lg flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-sm mb-1">{iv.candidate}</h4>
                        <p className="text-xs text-muted-foreground mb-1">{iv.role}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{iv.type}</span>
                          <span>{new Date(iv.date).toLocaleDateString()}</span>
                          <span>{iv.time}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="bg-transparent">Details</Button>
                    </li>
                  ))}
                </ul>
              )}
              <Button variant="outline" className="w-full bg-transparent">View Calendar</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}