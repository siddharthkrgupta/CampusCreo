import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DashboardLayout } from '../../layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Progress } from '../../components/ui/progress'
import { Clock, CheckCircle, AlertCircle, Calendar, MapPin, DollarSign, ArrowLeft } from 'lucide-react'

const statusConfig = { applied: { color: 'bg-blue-500', label: 'Applied', icon: Clock }, 'under-review': { color: 'bg-yellow-500', label: 'Under Review', icon: AlertCircle }, interview: { color: 'bg-purple-500', label: 'Interview', icon: Calendar }, offer: { color: 'bg-green-500', label: 'Offer Received', icon: CheckCircle }, rejected: { color: 'bg-red-500', label: 'Rejected', icon: AlertCircle } }

export default function ApplicationDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [application, setApplication] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('studentApplications')
    if (stored) {
      const apps = JSON.parse(stored)
      const found = apps.find(a => String(a.id) === id)
      setApplication(found || null)
    }
  }, [id])

  if (!application) {
    return (
      <DashboardLayout role="student">
        <div className="p-6 space-y-4">
          <Button variant="outline" onClick={() => navigate(-1)}><ArrowLeft className="h-4 w-4 mr-2" />Back</Button>
          <Card><CardContent className="p-8 text-center text-muted-foreground">Application not found.</CardContent></Card>
        </div>
      </DashboardLayout>
    )
  }

  const statusInfo = statusConfig[application.status]
  const StatusIcon = statusInfo.icon

  return (
    <DashboardLayout role="student">
      <div className="space-y-6 p-0 md:p-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate(-1)}><ArrowLeft className="h-4 w-4 mr-2" />Back</Button>
            <h1 className="text-2xl font-bold">{application.position}</h1>
          </div>
          <Badge className={`${statusInfo.color} text-white`}> <StatusIcon className="h-3 w-3 mr-1" /> {statusInfo.label} </Badge>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Role Details</CardTitle>
                <CardDescription>Summary of the position</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <p><strong>Company:</strong> {application.company}</p>
                  <p><strong>Location:</strong> {application.location}</p>
                  <p><strong>Stipend:</strong> {application.stipend}</p>
                  <p><strong>Applied:</strong> {new Date(application.appliedDate).toLocaleDateString()}</p>
                  <p><strong>Next Step:</strong> {application.nextStep}</p>
                  <p><strong>Progress:</strong> {application.progress}%</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Timeline Progress</p>
                  <Progress value={application.progress} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
                <CardDescription>Recruitment journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {application.timeline?.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className={`w-4 h-4 rounded-full border-2 ${step.completed ? 'bg-green-500 border-green-500' : 'bg-background border-muted-foreground'}`} />
                    <div className="flex-1">
                      <p className={`font-medium ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>{step.step}</p>
                      <p className="text-xs text-muted-foreground">{step.date === 'TBD' ? 'To be determined' : new Date(step.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            {application.notes && (
              <Card>
                <CardHeader><CardTitle>Notes</CardTitle></CardHeader>
                <CardContent><p className="text-sm leading-relaxed whitespace-pre-line">{application.notes}</p></CardContent>
              </Card>
            )}
          </div>
          <div className="space-y-6">
            {application.hr && (
              <Card>
                <CardHeader>
                  <CardTitle>HR Contact</CardTitle>
                  <CardDescription>Point of communication</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Name:</strong> {application.hr.name}</p>
                  <p><strong>Email:</strong> {application.hr.email}</p>
                  <p><strong>Phone:</strong> {application.hr.phone}</p>
                  <p><strong>Company:</strong> {application.hr.company}</p>
                  <p><strong>Location:</strong> {application.hr.location}</p>
                </CardContent>
              </Card>
            )}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Button variant="outline" onClick={() => navigate('/student/applications')}>All Applications</Button>
                <Button variant="outline" onClick={() => navigate('/student/opportunities')}>Browse Opportunities</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
