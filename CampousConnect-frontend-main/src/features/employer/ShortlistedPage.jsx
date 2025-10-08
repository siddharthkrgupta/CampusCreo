import React, { useState } from 'react'
import { DashboardLayout } from '../../layout/DashboardLayout'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { UserMinus, MapPin, Briefcase } from 'lucide-react'

const mockShortlisted = [
  { id: 1, name: 'Aarav Sharma', role: 'Software Engineering Intern', location: 'Bengaluru, India', skills: ['React', 'Node.js', 'SQL'] },
  { id: 2, name: 'Sarah Chen', role: 'Data Science Intern', location: 'Remote', skills: ['Python', 'ML', 'Pandas'] },
]

export default function ShortlistedPage() {
  const [candidates, setCandidates] = useState(mockShortlisted)
  const handleRemove = id => setCandidates(candidates.filter(c => c.id !== id))
  return (
    <DashboardLayout role="employer">
      <h1 className="text-3xl font-bold mb-6">Shortlisted Candidates</h1>
      <div className="space-y-4">
        {candidates.map(candidate => (
          <Card key={candidate.id} className="hover:shadow-sm transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{candidate.name}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                    <Briefcase className="h-4 w-4" />{candidate.role}
                    <span>•</span>
                    <MapPin className="h-4 w-4" />{candidate.location}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {candidate.skills.map(skill => (<Badge key={skill} variant="secondary">{skill}</Badge>))}
                  </div>
                </div>
                <div className="flex flex-col md:w-48 gap-2">
                  <Button variant="outline" className="w-full bg-transparent" onClick={() => handleRemove(candidate.id)}><UserMinus className="h-4 w-4 mr-2" />Remove</Button>
                  <Button variant="outline" className="w-full bg-transparent">Message</Button>
                  <Button variant="outline" className="w-full bg-transparent">Schedule</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {candidates.length === 0 && <p className="text-muted-foreground text-sm">No shortlisted candidates.</p>}
      </div>
    </DashboardLayout>
  )
}
