import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardLayout } from '../../layout/DashboardLayout'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { Progress } from '../../components/ui/progress'
import { Clock, CheckCircle, AlertCircle, Calendar, MapPin, DollarSign, Building2, Download, Eye, MessageSquare } from 'lucide-react'
import { statusConfig } from './statusConfig'
import { useToast } from '../../components/ui/toast-provider'
import { cn } from '../../lib/utils'

export default function ApplicationsPage() {
  const navigate = useNavigate()
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [applications, setApplications] = useState([])
  const [modalApplication, setModalApplication] = useState(null)
  const [modalHR, setModalHR] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('studentApplications')
    setApplications(stored ? JSON.parse(stored) : [])
  }, [])

  const getApplicationsByStatus = (status) => status === 'all' ? applications : applications.filter(app => app.status === status)
  const stats = {
    total: applications.length,
    pending: applications.filter(a => ['applied', 'under-review', 'interview'].includes(a.status)).length,
    offers: applications.filter(a => a.status === 'offer').length,
    rejected: applications.filter(a => a.status === 'rejected').length
  }

  const { push } = useToast()

  useEffect(() => {
    if (!localStorage.getItem('hrData')) {
      localStorage.setItem('hrData', JSON.stringify({
        name: 'Priya Sharma',
        email: 'hr@company.in',
        phone: '+91-9876543210',
        company: 'Company',
        location: 'India'
      }))
    }
    if (!localStorage.getItem('studentApplications')) {
      localStorage.setItem('studentApplications', JSON.stringify([
        { id: 201, company: 'Wipro', position: 'Backend Developer', status: 'applied', appliedDate: '2025-09-01', location: 'Hyderabad, India', stipend: '₹35,000/month', progress: 20, nextStep: 'Resume Review', timeline: [{ step: 'Applied', date: '2025-09-01', completed: true }], notes: 'Prepare for coding round.' }
      ]))
    }
  }, [])

  const handleAppCardClick = (application) => {
    setModalApplication(application)
    setModalHR(null)
  }
  const handleContactHR = (application) => {
    const hrData = JSON.parse(localStorage.getItem('hrData')) || {
      name: 'Priya Sharma',
      email: `hr@${application.company.replace(/\s+/g, '').toLowerCase()}.in`,
      phone: '+91-9876543210',
      company: application.company,
      location: application.location || 'India'
    }
    setModalApplication({ ...application, hr: hrData })
    setModalHR(null)
    push({ title: 'HR Contact Loaded', message: `You can now view HR details for ${application.company}.`, variant: 'success' })
  }

  const closeModal = () => {
    setModalApplication(null)
    setModalHR(null)
  }

  return (
    <DashboardLayout role="student">
      <div className={cn('space-y-6', modalApplication && 'modal-open')}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Applications</h1>
            <p className="text-muted-foreground">Track the status of all your applications</p>
          </div>
          <Button onClick={() => navigate('/student/opportunities')}>Browse Opportunities</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold">{stats.total}</p><p className="text-sm text-muted-foreground">Total</p></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-yellow-600">{stats.pending}</p><p className="text-sm text-muted-foreground">In Progress</p></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-green-600">{stats.offers}</p><p className="text-sm text-muted-foreground">Offers</p></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-red-600">{stats.rejected}</p><p className="text-sm text-muted-foreground">Rejected</p></CardContent></Card>
        </div>
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5"><TabsTrigger value="all">All ({stats.total})</TabsTrigger><TabsTrigger value="under-review">In Review</TabsTrigger><TabsTrigger value="interview">Interviews</TabsTrigger><TabsTrigger value="offer">Offers</TabsTrigger><TabsTrigger value="rejected">Rejected</TabsTrigger></TabsList>
          {['all', 'under-review', 'interview', 'offer', 'rejected'].map(status => (
            <TabsContent key={status} value={status} className="space-y-4">
              {getApplicationsByStatus(status).map(application => {
                const statusInfo = statusConfig[application.status]
                const StatusIcon = statusInfo.icon
                return (
                  <Card key={application.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleAppCardClick(application)}>
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-semibold mb-1">{application.position}</h3>
                              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                                <Building2 className="h-4 w-4" /> <span>{application.company}</span> <span>•</span> <MapPin className="h-4 w-4" /> <span>{application.location}</span>
                              </div>
                            </div>
                            <Badge className={`${statusInfo.color} text-white`}> <StatusIcon className="h-3 w-3 mr-1" /> {statusInfo.label} </Badge>
                          </div>
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2"><span className="text-sm font-medium">Progress</span><span className="text-sm text-muted-foreground">{application.progress}%</span></div>
                            <Progress value={application.progress} className="h-2" />
                          </div>
                          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                            <span className="flex items-center gap-1"><DollarSign className="h-4 w-4" /> {application.stipend}</span>
                            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> Applied: {new Date(application.appliedDate).toLocaleDateString()}</span>
                          </div>
                          <div className="bg-muted/50 rounded-lg p-3 mb-4"><p className="text-sm font-medium mb-1">Next Step:</p><p className="text-sm text-muted-foreground">{application.nextStep}</p></div>
                          {application.notes && <div className="bg-blue-50 border-l-4 border-l-blue-500 p-3 rounded"><p className="text-sm">{application.notes}</p></div>}
                        </div>
                        <div className="flex flex-col gap-2 lg:w-48" onClick={e => e.stopPropagation()}>
                          <Button variant="outline" className="w-full bg-transparent" onClick={() => setSelectedApplication(selectedApplication === application.id ? null : application.id)}> <Eye className="h-4 w-4 mr-2" /> View Timeline </Button>
                          <Button variant="outline" className="w-full bg-transparent" onClick={() => navigate(`/student/applications/${application.id}`)}>Open Detail</Button>
                          <Button variant="outline" className="w-full bg-transparent" onClick={() => handleContactHR(application)}> <MessageSquare className="h-4 w-4 mr-2" /> Contact HR </Button>
                          {application.status === 'offer' && <Button className="w-full"> <Download className="h-4 w-4 mr-2" /> Download Offer </Button>}
                        </div>
                      </div>
                      {selectedApplication === application.id && (
                        <div className="mt-6 pt-6 border-t">
                          <h4 className="font-semibold mb-4">Application Timeline</h4>
                          <div className="space-y-4">
                            {application.timeline.map((step, idx) => (
                              <div key={idx} className="flex items-center gap-4">
                                <div className={`w-4 h-4 rounded-full border-2 ${step.completed ? 'bg-green-500 border-green-500' : 'bg-background border-muted-foreground'}`} />
                                <div className="flex-1">
                                  <p className={`font-medium ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>{step.step}</p>
                                  <p className="text-sm text-muted-foreground">{step.date === 'TBD' ? 'To be determined' : new Date(step.date).toLocaleDateString()}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
              {getApplicationsByStatus(status).length === 0 && (
                <Card><CardContent className="p-12 text-center"><AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" /><h3 className="text-lg font-semibold mb-2">No applications found</h3><p className="text-muted-foreground mb-4">{status === 'all' ? "You haven't applied to any opportunities yet." : `No applications with ${status.replace('-', ' ')} status.`}</p><Button>Browse Opportunities</Button></CardContent></Card>
              )}
            </TabsContent>
          ))}
        </Tabs>
        {modalApplication && (
          <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay px-4" onClick={closeModal}>
            <div className="relative w-full max-w-2xl rounded-xl border border-border/60 bg-white dark:bg-white shadow-lg p-8 md:p-12" onClick={e => e.stopPropagation()}>
              <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={closeModal}>&times;</button>
              <h2 className="text-3xl font-bold mb-4">{modalApplication.position || modalApplication.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-2"><b>Company:</b> {modalApplication.company}</p>
                  <p className="mb-2"><b>Location:</b> {modalApplication.location}</p>
                  <p className="mb-2"><b>Stipend:</b> {modalApplication.stipend}</p>
                  <p className="mb-2"><b>Status:</b> {modalApplication.status}</p>
                  <p className="mb-2"><b>Next Step:</b> {modalApplication.nextStep}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {modalApplication.timeline?.map((step, i) => <Badge key={i} variant="secondary">{step.step} ({step.completed ? 'Done' : 'Pending'})</Badge>)}
                  </div>
                  {modalApplication.notes && <div className="mt-2 bg-blue-50 border-l-4 border-l-blue-500 p-3 rounded"><p className="text-sm">{modalApplication.notes}</p></div>}
                </div>
                {modalApplication.hr && (
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Contact HR</h3>
                    <p className="mb-2"><b>Name:</b> {modalApplication.hr.name}</p>
                    <p className="mb-2"><b>Email:</b> {modalApplication.hr.email}</p>
                    <p className="mb-2"><b>Phone:</b> {modalApplication.hr.phone}</p>
                    <p className="mb-2"><b>Company:</b> {modalApplication.hr.company}</p>
                    <p className="mb-2"><b>Location:</b> {modalApplication.hr.location}</p>
                    <p className="mb-2"><b>Department:</b> Human Resources</p>
                    <p className="mb-2"><b>Office Address:</b> 123, Corporate Park, Mumbai, India</p>
                    <p className="mb-2"><b>Working Hours:</b> 9:00 AM - 6:00 PM IST</p>
                    <p className="mb-2"><b>Languages:</b> Hindi, English</p>
                    <p className="mb-2"><b>Support:</b> Mon-Fri</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
