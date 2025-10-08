import React, { useState } from 'react'
import { DashboardLayout } from '../../layout/DashboardLayout'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Eye, CheckCircle, Clock, Building2 } from 'lucide-react'

const mockJobs = [
  { id: 1, title: 'Software Engineering Intern', company: 'TechCorp Solutions', applicants: 45, status: 'active', type: 'internship', stipend: '$2,500/month', deadline: '2024-02-15' },
  { id: 2, title: 'Data Science Intern', company: 'DataFlow Inc', applicants: 32, status: 'active', type: 'internship', stipend: '$2,000/month', deadline: '2024-02-10' },
  { id: 3, title: 'Full Stack Developer', company: 'StartupXYZ', applicants: 28, status: 'closed', type: 'placement', stipend: '$3,000/month', deadline: '2024-02-05' },
]

export default function JobsPage() {
  const [jobs] = useState(mockJobs)
  return (
    <DashboardLayout role="placement-cell">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Job Postings</h1>
          <p className="text-muted-foreground">Manage and monitor active and past job listings</p>
        </div>
      </div>
      <div className="space-y-4">
        {jobs.map(job => (
          <Card key={job.id} className="hover:shadow-sm transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <span className="text-muted-foreground">• {job.company}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="secondary">{job.type}</Badge>
                    <Badge variant="outline">Applicants: {job.applicants}</Badge>
                    <Badge variant="outline">{job.stipend}</Badge>
                    <Badge variant={job.status === 'active' ? 'secondary' : 'outline'}>{job.status}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Deadline: {new Date(job.deadline).toLocaleDateString()}</p>
                </div>
                <div className="flex flex-col md:w-48 gap-2">
                  <Button variant="outline" className="w-full bg-transparent"><Eye className="h-4 w-4 mr-2" />View</Button>
                  <Button variant="outline" className="w-full bg-transparent"><CheckCircle className="h-4 w-4 mr-2" />Approve</Button>
                  <Button variant="outline" className="w-full bg-transparent"><Clock className="h-4 w-4 mr-2" />Schedule</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}
