import React from 'react'
import { DashboardLayout } from '../../layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card'
import { PageHeader } from '../../components/ui/page-header'
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts'

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

export default function AnalyticsPage() {
  // No custom legend needed; we'll show styled grid boxes below chart
  return (
    <DashboardLayout role="placement-cell">
      <div className="space-y-8">
        <PageHeader
          title="Analytics"
          description="Visualize application trends and department distribution"
        />
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Application Trends</CardTitle>
              <CardDescription>Applications vs placements over recent months</CardDescription>
            </CardHeader>
            <CardContent className="h-72 relative p-0">
              <figure className="absolute inset-0 p-6" aria-labelledby="applications-trend-heading">
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
                <figcaption id="applications-trend-heading" className="sr-only">Line chart showing monthly comparison between total applications and placements.</figcaption>
              </figure>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Department Distribution</CardTitle>
              <CardDescription>Share of applicants by department</CardDescription>
            </CardHeader>
            <CardContent className="pt-2 space-y-6">
              <figure className="w-full flex justify-center" aria-labelledby="dept-distribution-heading">
                <div className="w-[260px] h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie dataKey="value" data={departmentStats} outerRadius={100} strokeWidth={1} label={(d) => d.value}>
                        {departmentStats.map(entry => <Cell key={entry.name} fill={entry.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ fontSize: '12px' }} wrapperStyle={{ outline: 'none' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <figcaption id="dept-distribution-heading" className="sr-only">Pie chart showing applicant distribution by academic department.</figcaption>
              </figure>
              <div className="grid grid-cols-2 gap-3">
                {departmentStats.map(d => (
                  <div key={d.name} className="flex items-center gap-2 p-3 rounded-lg bg-white border hover:shadow-sm transition hover:bg-muted/40">
                    <span className="w-3.5 h-3.5 rounded-full border" style={{ background: d.color }} />
                    <div className="flex-1 text-xs font-medium leading-tight">
                      {d.name.includes(' ') ? d.name.split(' ').slice(0, 2).join(' ') : d.name}
                      {d.name.split(' ').length > 2 && <span className="block">{d.name.split(' ').slice(2).join(' ')}</span>}
                    </div>
                    <span className="text-[11px] font-semibold bg-muted rounded-full px-2 py-0.5 text-foreground/80">{d.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
