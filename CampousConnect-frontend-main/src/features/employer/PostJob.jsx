import React, { useState } from 'react'
import { DashboardLayout } from '../../layout/DashboardLayout'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../components/ui/select'

// Simple Job Posting form stored in localStorage for now
export function PostJob() {
  const SKILL_OPTIONS = [
    'JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'SQL', 'HTML', 'CSS', 'Machine Learning', 'Data Analysis', 'Communication', 'Leadership'
  ]

  const [job, setJob] = useState({
    title: '',
    description: '',
    skills: [],
    branch: '',
    degree: '',
    cgpa: '',
    backlog: 'No',
    college: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setJob(prev => ({ ...prev, [name]: value }))
  }

  const handleSkillToggle = skill => {
    setJob(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const existing = JSON.parse(localStorage.getItem('jobs')) || []
    existing.push({ ...job, id: Date.now() })
    localStorage.setItem('jobs', JSON.stringify(existing))
    setJob({ title: '', description: '', skills: [], branch: '', degree: '', cgpa: '', backlog: 'No', college: '' })
    alert('Job posted successfully ✅')
  }

  return (
    <DashboardLayout role="employer">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Post a New Job</h1>
          <p className="text-sm text-muted-foreground">Create a new opportunity. This prototype stores jobs locally only.</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>Fill in the required information for the new role.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Job Title</label>
                  <input
                    type="text"
                    name="title"
                    value={job.title}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-teal-300 outline-none bg-white"
                    placeholder="e.g. Frontend Engineer Intern"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    name="description"
                    value={job.description}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-teal-300 outline-none bg-white resize-y"
                    placeholder="Role responsibilities, required experience, compensation, etc."
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium flex items-center gap-2">Skills Required <span className="text-xs text-muted-foreground">(click to toggle)</span></label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {SKILL_OPTIONS.map(skill => {
                      const active = job.skills.includes(skill)
                      return (
                        <button
                          type="button"
                          key={skill}
                          onClick={() => handleSkillToggle(skill)}
                          className={`px-3 py-2 rounded-md text-xs font-medium border transition-all duration-150 text-left ${active ? 'bg-teal-600 text-white border-teal-700 shadow' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
                        >
                          {skill}
                        </button>
                      )
                    })}
                  </div>
                  {job.skills.length === 0 && <p className="text-xs text-red-500 mt-1">Select at least one skill.</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Eligible Branch</label>
                  <Select value={job.branch} onValueChange={val => setJob(prev => ({ ...prev, branch: val }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CSE">CSE</SelectItem>
                      <SelectItem value="ECE">ECE</SelectItem>
                      <SelectItem value="MECH">MECH</SelectItem>
                      <SelectItem value="CIVIL">CIVIL</SelectItem>
                      <SelectItem value="EEE">EEE</SelectItem>
                    </SelectContent>
                  </Select>
                  {!job.branch && <p className="text-[11px] text-red-500">Branch is required.</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Degree Required</label>
                  <Select value={job.degree} onValueChange={val => setJob(prev => ({ ...prev, degree: val }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Degree" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="B.Tech">B.Tech</SelectItem>
                      <SelectItem value="M.Tech">M.Tech</SelectItem>
                      <SelectItem value="MBA">MBA</SelectItem>
                      <SelectItem value="BBA">BBA</SelectItem>
                      <SelectItem value="BCA">BCA</SelectItem>
                    </SelectContent>
                  </Select>
                  {!job.degree && <p className="text-[11px] text-red-500">Degree is required.</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Minimum CGPA</label>
                  <input
                    type="number"
                    step="0.01"
                    name="cgpa"
                    value={job.cgpa}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-teal-300 outline-none bg-white"
                    placeholder="e.g. 7.5"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Backlogs</label>
                  <Select value={job.backlog} onValueChange={val => setJob(prev => ({ ...prev, backlog: val }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="No">No Backlogs Allowed</SelectItem>
                      <SelectItem value="Yes">Backlogs Allowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">College</label>
                  <Select value={job.college} onValueChange={val => setJob(prev => ({ ...prev, college: val }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select College" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IIT Delhi">IIT Delhi</SelectItem>
                      <SelectItem value="NIT Trichy">NIT Trichy</SelectItem>
                      <SelectItem value="BITS Pilani">BITS Pilani</SelectItem>
                      <SelectItem value="DTU">DTU</SelectItem>
                      <SelectItem value="NSUT">NSUT</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {!job.college && <p className="text-[11px] text-red-500">College is required.</p>}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {job.skills.map(s => <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>)}
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={!job.title || !job.description || !job.branch || !job.degree || !job.cgpa || !job.college || job.skills.length === 0}>
                  Post Job
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default PostJob