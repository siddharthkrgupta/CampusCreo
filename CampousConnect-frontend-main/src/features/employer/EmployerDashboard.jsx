// Enhanced Employer Dashboard integrating charts, filters, and status cards
import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '../../layout/DashboardLayout'

// UI Components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { PageHeader } from '../../components/ui/page-header'
import { StatGrid } from '../../components/ui/stat-grid'
import { FilterBar } from '../../components/ui/filter-bar'
import { StatCard } from '../../components/ui/stat-card'

// Icons
import { Users, Briefcase, Star, ClipboardList } from 'lucide-react'
import { NotificationsBell } from '../../components/notifications/NotificationsBell'

// Charts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

export function EmployerDashboard() {
  // Persistent stats (could be replaced with API calls later)
  const [stats, setStats] = useState({
    candidates: 250,
    positions: 12,
    shortlisted: 75,
    interviews: 20
  })

  // Simple filter state (placeholder for future backend integration)
  const [filters, setFilters] = useState({
    location: 'all',
    jobType: 'all'
  })

  // Load stats from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('employer-stats')
    if (saved) setStats(JSON.parse(saved))
  }, [])

  // Persist stats whenever they change
  useEffect(() => {
    localStorage.setItem('employer-stats', JSON.stringify(stats))
  }, [stats])

  // Filter helpers
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  // Demo applications data (would be fetched using filters in a real implementation)
  const getApplicationsData = () => {
    if (filters.jobType === 'dev') {
      return [
        { month: 'Jan', applications: 60 },
        { month: 'Feb', applications: 45 },
        { month: 'Mar', applications: 75 },
        { month: 'Apr', applications: 50 },
        { month: 'May', applications: 90 }
      ]
    }
    return [
      { month: 'Jan', applications: 40 },
      { month: 'Feb', applications: 55 },
      { month: 'Mar', applications: 65 },
      { month: 'Apr', applications: 30 },
      { month: 'May', applications: 80 }
    ]
  }

  const applicationsData = getApplicationsData()

  const statusData = [
    { name: 'Shortlisted', value: stats.shortlisted },
    { name: 'Interviewed', value: stats.interviews },
    { name: 'Hired', value: 10 },
    { name: 'Rejected', value: 40 }
  ]

  const COLORS = ['#0ea5e9', '#6366f1', '#facc15', '#f87171']

  return (
    <DashboardLayout role="employer">
      <div className="space-y-8">
        <PageHeader
          title="Employer Dashboard"
          description="Monitor candidate pipeline, engagement trends, and role performance"
          actions={[<div key="notify" className="ml-2"><NotificationsBell role="employer" /></div>]}
        />

        <FilterBar>
          <div className="flex items-center gap-2">
            <label htmlFor="location-filter" className="font-medium">Location</label>
            <select
              id="location-filter"
              value={filters.location}
              onChange={e => handleFilterChange('location', e.target.value)}
              className="border rounded px-2 py-1 bg-white"
            >
              <option value="all">All</option>
              <option value="bangalore">Bangalore Tech Hub</option>
              <option value="iit">IITs/NITs (Tier 1)</option>
              <option value="mumbai">Mumbai/Pune</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="jobtype-filter" className="font-medium">Job Type</label>
            <select
              id="jobtype-filter"
              value={filters.jobType}
              onChange={e => handleFilterChange('jobType', e.target.value)}
              className="border rounded px-2 py-1 bg-white"
            >
              <option value="all">All</option>
              <option value="dev">Software Development</option>
              <option value="data">Data Science/ML</option>
              <option value="sales">Sales/Marketing</option>
            </select>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilters({ location: 'all', jobType: 'all' })}
            className="text-xs px-2 py-1"
          >
            Reset
          </Button>
        </FilterBar>

        {/* Summary Cards */}
        <StatGrid className="md:grid-cols-4 mb-4">
          <StatCard icon={Users} title="Total Candidates" value={stats.candidates} subtitle="In pipeline" />
          <StatCard icon={Briefcase} title="Open Positions" value={stats.positions} subtitle="Active roles" />
          <StatCard icon={Star} title="Shortlisted" value={stats.shortlisted} subtitle="Qualified" />
          <StatCard icon={ClipboardList} title="Interviews" value={stats.interviews} subtitle="Scheduled" />
        </StatGrid>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-gray-700">Applications Over Time</CardTitle>
              <CardDescription className="text-sm">
                Data is filtered by: {filters.location === 'all' ? 'All Locations' : filters.location} and {filters.jobType === 'all' ? 'All Job Types' : filters.jobType}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={applicationsData}>
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="applications" fill="#6366f1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-gray-700">Candidate Status</CardTitle>
              <CardDescription className="text-sm">Overall status of candidates in the pipeline.</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
