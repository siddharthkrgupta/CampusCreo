import React, { useState } from 'react'
import { DashboardLayout } from '../../layout/DashboardLayout'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { User, Calendar, MessageSquare } from 'lucide-react'

const mockMentees = [
  { id: 1, name: 'Aarav Sharma', department: 'Computer Science', progress: 80, meetings: 5 },
  { id: 2, name: 'Sarah Chen', department: 'Data Science', progress: 65, meetings: 3 },
  { id: 3, name: 'Mike Rodriguez', department: 'Mechanical Eng', progress: 50, meetings: 4 },
]

export default function MenteesPage() {
  const [mentees] = useState(mockMentees)
  return (
    <DashboardLayout role="faculty">
      <h1 className="text-3xl font-bold mb-6">Mentees</h1>
      <div className="space-y-4">
        {mentees.map(m => (
          <Card key={m.id} className="hover:shadow-sm transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1 flex items-center gap-2"><User className="h-4 w-4" />{m.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="secondary">{m.department}</Badge>
                    <Badge variant="outline">Progress: {m.progress}%</Badge>
                    <Badge variant="outline">Meetings: {m.meetings}</Badge>
                  </div>
                </div>
                <div className="flex flex-col md:w-48 gap-2">
                  <Button variant="outline" className="w-full bg-transparent"><Calendar className="h-4 w-4 mr-2" />Schedule</Button>
                  <Button variant="outline" className="w-full bg-transparent"><MessageSquare className="h-4 w-4 mr-2" />Message</Button>
                  <Button variant="outline" className="w-full bg-transparent">Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}
