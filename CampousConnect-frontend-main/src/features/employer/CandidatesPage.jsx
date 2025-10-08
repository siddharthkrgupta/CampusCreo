import React, { useState } from 'react'
import { DashboardLayout } from '../../layout/DashboardLayout'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Search, Filter, UserCheck, MapPin, Briefcase, Star } from 'lucide-react'
import { Input } from '../../components/ui/input'

const mockCandidates = [
  { id: 1, name: 'Aarav Sharma', role: 'Software Engineering Intern', location: 'Bengaluru, India', skills: ['React', 'Node.js', 'SQL'], rating: 4 },
  { id: 2, name: 'Sarah Chen', role: 'Data Science Intern', location: 'Remote', skills: ['Python', 'ML', 'Pandas'], rating: 5 },
  { id: 3, name: 'Mike Rodriguez', role: 'Full Stack Developer', location: 'New York, NY', skills: ['React', 'MongoDB', 'AWS'], rating: 3 },
]

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState(mockCandidates)
  const [search, setSearch] = useState('')
  const filtered = candidates.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.role.toLowerCase().includes(search.toLowerCase()) || c.skills.some(s => s.toLowerCase().includes(search.toLowerCase())))
  return (
    <DashboardLayout role="employer">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Candidates</h1>
          <p className="text-muted-foreground">Browse and shortlist potential candidates</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline"><Filter className="h-4 w-4 mr-2" />Filters</Button>
          <Button variant="outline"><UserCheck className="h-4 w-4 mr-2" />Shortlisted (0)</Button>
        </div>
      </div>
      <div className="mb-4 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search candidates..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
      </div>
      <div className="space-y-4">
        {filtered.map(candidate => (
          <Card key={candidate.id} className="hover:shadow-sm transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">{candidate.name}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                    <Briefcase className="h-4 w-4" />{candidate.role}
                    <span>•</span>
                    <MapPin className="h-4 w-4" />{candidate.location}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {candidate.skills.map(skill => (<Badge key={skill} variant="secondary">{skill}</Badge>))}
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < candidate.rating ? 'fill-current' : 'opacity-30'}`} />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col md:w-48 gap-2">
                  <Button variant="outline" className="w-full bg-transparent">View Profile</Button>
                  <Button variant="outline" className="w-full bg-transparent">Shortlist</Button>
                  <Button variant="outline" className="w-full bg-transparent">Feedback</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}
