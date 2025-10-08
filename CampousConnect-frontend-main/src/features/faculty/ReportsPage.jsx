import React from 'react'
import { DashboardLayout } from '../../layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card'
import { Button } from '../../components/ui/button'

const mockReports = [
  { id: 1, title: 'Monthly Performance Summary', date: '2024-01-10', description: 'Overview of student application performance and outcomes.' },
  { id: 2, title: 'Interview Success Metrics', date: '2024-01-08', description: 'Analysis of interview stages and conversion rates.' },
  { id: 3, title: 'Skill Gap Analysis', date: '2024-01-05', description: 'Identified skill gaps across departments.' },
]

export default function ReportsPage() {
  return (
    <DashboardLayout role="faculty">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>
      <div className="space-y-4">
        {mockReports.map(report => (
          <Card key={report.id} className="hover:shadow-sm transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{report.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{new Date(report.date).toLocaleDateString()}</p>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                </div>
                <div className="flex flex-col md:w-48 gap-2">
                  <Button variant="outline" className="w-full bg-transparent">View</Button>
                  <Button variant="outline" className="w-full bg-transparent">Download</Button>
                  <Button variant="outline" className="w-full bg-transparent">Share</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}
