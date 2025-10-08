import React, { useState } from 'react'
import { DashboardLayout } from '../../layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Eye, CheckCircle, Clock, Search } from 'lucide-react'
import { Input } from '../../components/ui/input'

const mockApplicants = [
  { id: 1, name: 'Aarav Sharma', role: 'Software Engineering Intern', status: 'interview', stage: 'Technical Round', applied: '2024-01-15' },
  { id: 2, name: 'Sarah Chen', role: 'Data Science Intern', status: 'submitted', stage: 'Initial Review', applied: '2024-01-14' },
  { id: 3, name: 'Mike Rodriguez', role: 'Full Stack Developer', status: 'offer', stage: 'Offer Extended', applied: '2024-01-12' },
]

const statusColor = { submitted: 'bg-blue-500', interview: 'bg-purple-500', offer: 'bg-green-500', rejected: 'bg-red-500' }

export default function ApplicantsPage() {
  const [applicants, setApplicants] = useState(mockApplicants)
  const [search, setSearch] = useState('')
  const filtered = applicants.filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.role.toLowerCase().includes(search.toLowerCase()))
  return (
    <DashboardLayout role="placement-cell">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Applicants</h1>
          <p className="text-muted-foreground">Track and manage applicants for open positions</p>
        </div>
      </div>
      <div className="mb-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search applicants..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
      </div>
      <div className="space-y-4">
        {filtered.map(applicant => (
          <Card key={applicant.id} className="hover:shadow-sm transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{applicant.name}</h3>
                    <Badge variant="outline">{applicant.role}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">Applied: {new Date(applicant.applied).toLocaleDateString()}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge className={`${statusColor[applicant.status]} text-white`}>{applicant.status}</Badge>
                    <Badge variant="secondary">{applicant.stage}</Badge>
                  </div>
                </div>
                <div className="flex flex-col md:w-48 gap-2">
                  <Button variant="outline" className="w-full bg-transparent"><Eye className="h-4 w-4 mr-2" />View</Button>
                  <Button variant="outline" className="w-full bg-transparent"><CheckCircle className="h-4 w-4 mr-2" />Advance</Button>
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
