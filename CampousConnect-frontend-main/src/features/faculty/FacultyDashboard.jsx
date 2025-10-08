import React from 'react'
import { motion } from 'framer-motion'
import { DashboardLayout } from '../../layout/DashboardLayout'
import { StatCard } from '../../components/ui/stat-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { cn } from '../../lib/utils'
import { PageHeader } from '../../components/ui/page-header'
import { StatGrid } from '../../components/ui/stat-grid'
import { Users, CheckCircle2, AlertCircle, FileText, GraduationCap, BarChart3, Clock } from 'lucide-react'
import { NotificationsBell } from '../../components/notifications/NotificationsBell'

const mock = {
  mentees: 42,
  approvalsPending: 7,
  approvalsCompleted: 123,
  recommendations: 18,
  recentApprovals: [
    { id: 1, student: 'Aarav Sharma', position: 'Software Intern - Infosys Digital', status: 'approved', date: '2024-01-14' },
    { id: 2, student: 'Sarah Chen', position: 'Data Intern - DataFlow', status: 'pending', date: '2024-01-15' },
    { id: 3, student: 'Ravi Patel', position: 'Full Stack - StartupXYZ', status: 'approved', date: '2024-01-15' }
  ]
}

export function FacultyDashboard() {
  return (
    <DashboardLayout role="faculty">
      <div className="space-y-8">
        <PageHeader
          title="Faculty Mentor Dashboard"
          description="Review student applications, manage recommendations and track mentee outcomes."
          actions={[
            <Button key="approvals" variant="outline" className="bg-transparent"><FileText className="h-4 w-4 mr-2" /> Approvals</Button>,
            <Button key="analytics"><BarChart3 className="h-4 w-4 mr-2" /> Analytics</Button>,
            <div key="notify" className="ml-2"><NotificationsBell role="faculty" /></div>
          ]}
        />
        <StatGrid className="grid-cols-2 md:grid-cols-4">
          <StatCard icon={Users} title="Mentees" value={mock.mentees} diff={4} />
          <StatCard icon={Clock} title="Pending" value={mock.approvalsPending} diff={-2} trend="down" />
          <StatCard icon={CheckCircle2} title="Approved" value={mock.approvalsCompleted} diff={6} />
          <StatCard icon={FileText} title="Recommendations" value={mock.recommendations} diff={3} />
        </StatGrid>
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Approvals</CardTitle>
              <CardDescription>Latest application decisions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-4">
                {mock.recentApprovals.map(item => (
                  <li key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-sm mb-1">{item.student}</h4>
                      <p className="text-xs text-muted-foreground mb-1">{item.position}</p>
                      <p className="text-[11px] text-muted-foreground">{new Date(item.date).toLocaleDateString()}</p>
                    </div>
                    <Badge className={item.status === 'approved' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}>
                      {item.status === 'approved' ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                      {item.status}
                    </Badge>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full bg-transparent">View All</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common mentor workflows</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Button variant="outline" className="justify-start bg-transparent"><CheckCircle2 className="h-4 w-4 mr-2" /> Pending Approvals</Button>
              <Button variant="outline" className="justify-start bg-transparent"><Users className="h-4 w-4 mr-2" /> View Mentees</Button>
              <Button variant="outline" className="justify-start bg-transparent"><FileText className="h-4 w-4 mr-2" /> Recommendations</Button>
              <Button variant="outline" className="justify-start bg-transparent"><BarChart3 className="h-4 w-4 mr-2" /> Reports</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
