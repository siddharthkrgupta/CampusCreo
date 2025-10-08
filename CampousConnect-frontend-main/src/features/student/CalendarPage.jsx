import React, { useEffect, useState } from 'react'
import { DashboardLayout } from '../../layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Calendar as CalendarIcon, Clock, MapPin, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// Simple event storage key
const KEY = 'studentEvents'
const seedEvents = [
  { id: 1, title: 'Technical Interview - TechCorp', date: '2025-10-05T14:00:00', location: 'Virtual', type: 'interview' },
  { id: 2, title: 'Career Fair - Tech Companies', date: '2025-10-12T10:00:00', location: 'Campus Auditorium', type: 'event' }
]

export default function CalendarPage() {
  const navigate = useNavigate()
  const [events, setEvents] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem(KEY)
    if (stored) setEvents(JSON.parse(stored))
    else {
      localStorage.setItem(KEY, JSON.stringify(seedEvents))
      setEvents(seedEvents)
    }
  }, [])

  const upcoming = [...events].sort((a, b) => new Date(a.date) - new Date(b.date))

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Calendar & Events</h1>
            <p className="text-muted-foreground">Your upcoming interviews and campus activities</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/student/dashboard')}><ArrowLeft className="h-4 w-4 mr-2" />Back</Button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcoming.map(ev => (
            <Card key={ev.id} className="relative overflow-hidden">
              <div className={`absolute top-0 left-0 h-1 w-full ${ev.type === 'interview' ? 'bg-purple-500' : 'bg-blue-500'}`} />
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2"><CalendarIcon className="h-4 w-4" />{ev.title}</CardTitle>
                <CardDescription>{ev.type === 'interview' ? 'Interview' : 'Event'}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground"><Clock className="h-4 w-4" /> {new Date(ev.date).toLocaleString()}</div>
                <div className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4" /> {ev.location}</div>
              </CardContent>
            </Card>
          ))}
          {upcoming.length === 0 && (
            <Card className="col-span-full"><CardContent className="p-12 text-center text-muted-foreground">No events scheduled.</CardContent></Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
