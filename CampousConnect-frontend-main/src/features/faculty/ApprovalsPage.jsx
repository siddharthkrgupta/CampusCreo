import React, { useState } from 'react'
import { DashboardLayout } from '../../layout/DashboardLayout'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Check, X, Calendar, User } from 'lucide-react'

const mockApprovals = [
  { id: 1, student: 'Aarav Sharma', type: 'Resume Update', submitted: '2024-01-15', status: 'pending' },
  { id: 2, student: 'Sarah Chen', type: 'Profile Change', submitted: '2024-01-14', status: 'pending' },
  { id: 3, student: 'Mike Rodriguez', type: 'Project Addition', submitted: '2024-01-13', status: 'approved' },
]

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState(mockApprovals)
  const handleDecision = (id, decision) => setApprovals(approvals.map(a => a.id === id ? { ...a, status: decision } : a))
  return (
    <DashboardLayout role="faculty">
      <h1 className="text-3xl font-bold mb-6">Approvals</h1>
      <div className="space-y-4">
        {approvals.map(item => (
          <Card key={item.id} className="hover:shadow-sm transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1 flex items-center gap-2"><User className="h-4 w-4" />{item.student}</h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="secondary">{item.type}</Badge>
                    <Badge variant="outline">Submitted: {new Date(item.submitted).toLocaleDateString()}</Badge>
                    <Badge variant={item.status === 'approved' ? 'secondary' : item.status === 'rejected' ? 'destructive' : 'outline'}>{item.status}</Badge>
                  </div>
                </div>
                <div className="flex flex-col md:w-48 gap-2">
                  <Button variant="outline" className="w-full bg-transparent" disabled={item.status !== 'pending'} onClick={() => handleDecision(item.id, 'approved')}><Check className="h-4 w-4 mr-2" />Approve</Button>
                  <Button variant="outline" className="w-full bg-transparent" disabled={item.status !== 'pending'} onClick={() => handleDecision(item.id, 'rejected')}><X className="h-4 w-4 mr-2" />Reject</Button>
                  <Button variant="outline" className="w-full bg-transparent"><Calendar className="h-4 w-4 mr-2" />Schedule</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}
