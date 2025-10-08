import React, { useState } from 'react'
import { DashboardLayout } from '../../layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Textarea } from '../../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'

const mockFeedbackTargets = [
  { id: 1, name: 'Aarav Sharma', role: 'Software Engineering Intern' },
  { id: 2, name: 'Sarah Chen', role: 'Data Science Intern' },
  { id: 3, name: 'Mike Rodriguez', role: 'Full Stack Developer' },
]

export default function FeedbackPage() {
  const [target, setTarget] = useState('1')
  const [rating, setRating] = useState('5')
  const [comments, setComments] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    setIsSubmitted(true)
    setComments('')
    // Auto-hide success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <DashboardLayout role="employer">
      <h1 className="text-3xl font-bold mb-6">Feedback</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Candidate Feedback</CardTitle>
            <CardDescription>Provide structured feedback for candidates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Candidate</label>
              <Select value={target} onValueChange={setTarget}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {mockFeedbackTargets.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.name} – {c.role}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Rating</label>
              <Select value={rating} onValueChange={setRating}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 - Poor</SelectItem>
                  <SelectItem value="2">2 - Fair</SelectItem>
                  <SelectItem value="3">3 - Good</SelectItem>
                  <SelectItem value="4">4 - Very Good</SelectItem>
                  <SelectItem value="5">5 - Excellent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Comments</label>
              <Textarea value={comments} onChange={e => setComments(e.target.value)} placeholder="Enter feedback..." className="min-h-[180px]" />
            </div>
            {isSubmitted && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md">
                <p className="text-sm font-medium">✓ Feedback submitted successfully!</p>
              </div>
            )}
            <div className="flex justify-end">
              <Button type="submit" disabled={!comments.trim()}>
                Submit Feedback
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </DashboardLayout>
  )
}
