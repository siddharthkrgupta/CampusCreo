import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '../../layout/DashboardLayout'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Badge } from '../../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Search, Filter, MapPin, DollarSign, Clock, Building2, Bookmark, BookmarkCheck, Calendar, Users } from 'lucide-react'
import { useToast } from '../../components/ui/toast-provider'
import { useStudentData } from './useStudentData'
import { statusConfig } from './statusConfig'
import { cn } from '../../lib/utils'

// India-focused sample data (₹ salaries, Indian cities & companies)
const mockOpportunities = [
  {
    id: 1,
    title: 'Software Engineering Intern',
    company: 'Infosys Digital',
    location: 'Bengaluru, India',
    type: 'internship',
    stipend: '₹30,000 / month',
    duration: '6 months',
    posted: '2025-08-10',
    deadline: '2025-09-20',
    description: 'Work with the Infosys Digital innovation team building scalable web platforms using React, Node.js and microservices.',
    requirements: ['JavaScript', 'React', 'Node.js', 'Git'],
    tags: ['IT Services', 'MNC', 'Hybrid'],
    applicants: 140,
    saved: false,
    applied: true
  },
  {
    id: 2,
    title: 'Data Science Intern',
    company: 'TCS Analytics Lab',
    location: 'Pune, India',
    type: 'internship',
    stipend: '₹28,000 / month',
    duration: '5 months',
    posted: '2025-08-05',
    deadline: '2025-09-10',
    description: 'Assist the Advanced Analytics team at TCS in building predictive models on large enterprise datasets.',
    requirements: ['Python', 'Pandas', 'SQL', 'Statistics'],
    tags: ['Analytics', 'Enterprise', 'Onsite'],
    applicants: 110,
    saved: true,
    applied: false
  },
  {
    id: 3,
    title: 'Full Stack Developer (Trainee)',
    company: 'Zoho Corp',
    location: 'Chennai, India',
    type: 'placement',
    stipend: '₹9 LPA (CTC)',
    duration: 'Full-time',
    posted: '2025-08-01',
    deadline: '2025-09-05',
    description: 'Join a product team at Zoho and contribute across the stack (React / Java / APIs) with mentoring for long-term growth.',
    requirements: ['React', 'Java', 'REST APIs', 'SQL'],
    tags: ['Product', 'Full-stack', 'Growth'],
    applicants: 95,
    saved: false,
    applied: false
  },
  {
    id: 4,
    title: 'UI/UX Design Intern',
    company: 'Flipkart Design',
    location: 'Bengaluru, India',
    type: 'internship',
    stipend: '₹32,000 / month',
    duration: '4 months',
    posted: '2025-08-03',
    deadline: '2025-09-08',
    description: 'Collaborate with product managers & engineers to craft intuitive commerce experiences for millions of Indian users.',
    requirements: ['Figma', 'Wireframing', 'Prototyping', 'User Research'],
    tags: ['E‑commerce', 'Design', 'Portfolio'],
    applicants: 180,
    saved: true,
    applied: false
  },
  {
    id: 5,
    title: 'DevOps Engineering Intern',
    company: 'Reliance Jio Platforms',
    location: 'Navi Mumbai, India',
    type: 'internship',
    stipend: '₹35,000 / month',
    duration: '5 months',
    posted: '2025-08-07',
    deadline: '2025-09-12',
    description: 'Help architect CI/CD pipelines and container orchestration for large-scale telecom & digital services infrastructure.',
    requirements: ['Docker', 'Kubernetes', 'Linux', 'CI/CD'],
    tags: ['DevOps', 'Cloud', 'Infrastructure'],
    applicants: 70,
    saved: false,
    applied: false
  }
]

export default function OpportunitiesPage() {
  const { addApplication } = useStudentData()
  const { push } = useToast()
  const [opportunities, setOpportunities] = useState(mockOpportunities)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [sortBy, setSortBy] = useState('recent')
  const [selectedOpportunity, setSelectedOpportunity] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('studentApplications')
    if (stored) {
      setOpportunities(opps =>
        opps.map(opp => {
          const found = JSON.parse(stored).find(a => a.id === opp.id)
          return found ? { ...opp, applied: true } : opp
        })
      )
    }
    if (!localStorage.getItem('indianOpportunities')) {
      localStorage.setItem('indianOpportunities', JSON.stringify([
        { id: 101, title: 'Software Developer Intern', company: 'Infosys', location: 'Bangalore, India', type: 'internship', stipend: '₹25,000/month', duration: '6 months', posted: '2025-08-01', deadline: '2025-09-15', description: 'Work on real-world projects with Infosys digital team.', requirements: ['Java', 'Spring Boot', 'SQL'], tags: ['IT', 'Internship', 'Onsite'], applicants: 120, saved: false, applied: false },
        { id: 102, title: 'Data Analyst', company: 'Tata Consultancy Services', location: 'Mumbai, India', type: 'placement', stipend: '₹40,000/month', duration: 'Full-time', posted: '2025-07-20', deadline: '2025-09-10', description: 'Analyze business data for TCS clients.', requirements: ['Python', 'Excel', 'Power BI'], tags: ['Analytics', 'Full-time', 'Remote'], applicants: 80, saved: false, applied: false }
      ]))
    }
  }, [])

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) || opp.company.toLowerCase().includes(searchTerm.toLowerCase()) || opp.requirements.some(req => req.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = selectedType === 'all' || opp.type === selectedType
    const matchesLocation = selectedLocation === 'all' || opp.location.includes(selectedLocation)
    return matchesSearch && matchesType && matchesLocation
  })

  const handleSaveToggle = id => setOpportunities(opportunities.map(opp => (opp.id === id ? { ...opp, saved: !opp.saved } : opp)))
  const handleApply = id => {
    setOpportunities(opportunities.map(opp => (opp.id === id ? { ...opp, applied: true } : opp)))
    const appliedOpp = opportunities.find(opp => opp.id === id)
    if (appliedOpp) {
      addApplication({ ...appliedOpp, applied: true, appliedDate: new Date().toISOString(), status: 'applied', progress: 10, nextStep: 'Resume Review', timeline: [{ step: 'Applied', date: new Date().toISOString(), completed: true }], notes: '' })
    }
    push({ title: 'Application Submitted', message: 'Your application was added to tracking.', variant: 'success' })
  }

  const handleCardClick = (opp) => {
    const indianData = JSON.parse(localStorage.getItem('indianOpportunities'))?.find(o => o.id === opp.id) || opp
    setSelectedOpportunity(indianData)
  }

  return (
    <DashboardLayout role="student">
      <div className={cn('space-y-6', selectedOpportunity && 'modal-open')}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Opportunities</h1>
            <p className="text-muted-foreground">Discover internships and placement opportunities</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline"><Filter className="h-4 w-4 mr-2" />Advanced Filters</Button>
            <Button variant="outline"><BookmarkCheck className="h-4 w-4 mr-2" />Saved ({opportunities.filter(opp => opp.saved).length})</Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search by title, company, or skills..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
                </div>
              </div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full md:w-48 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"><SelectValue placeholder="Type" labels={{ all: 'All Types', internship: 'Internships', placement: 'Placements' }} /></SelectTrigger>
                <SelectContent className="bg-white border-slate-200 text-slate-700 shadow-md">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="internship">Internships</SelectItem>
                  <SelectItem value="placement">Placements</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full md:w-48 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"><SelectValue placeholder="Location" labels={{ all: 'All Locations', Remote: 'Remote', Bengaluru: 'Bengaluru', Pune: 'Pune', Chennai: 'Chennai', Hyderabad: 'Hyderabad', Mumbai: 'Mumbai', Delhi: 'Delhi', Kolkata: 'Kolkata' }} /></SelectTrigger>
                <SelectContent className="bg-white border-slate-200 text-slate-700 shadow-md">
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="Bengaluru">Bengaluru</SelectItem>
                  <SelectItem value="Pune">Pune</SelectItem>
                  <SelectItem value="Chennai">Chennai</SelectItem>
                  <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                  <SelectItem value="Kolkata">Kolkata</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">Showing {filteredOpportunities.length} of {opportunities.length} opportunities</p>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50">
              <SelectValue placeholder="Sort" labels={{ recent: 'Most Recent', deadline: 'Deadline Soon', stipend: 'Highest Stipend', applicants: 'Fewest Applicants' }} />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200 text-slate-700 shadow-md">
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="deadline">Deadline Soon</SelectItem>
              <SelectItem value="stipend">Highest Stipend</SelectItem>
              <SelectItem value="applicants">Fewest Applicants</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {filteredOpportunities.map(opportunity => (
            <Card key={opportunity.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleCardClick(opportunity)}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{opportunity.title}</h3>
                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                          <Building2 className="h-4 w-4" />
                          <span>{opportunity.company}</span>
                          <span>•</span>
                          <MapPin className="h-4 w-4" />
                          <span>{opportunity.location}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleSaveToggle(opportunity.id)} className="text-muted-foreground hover:text-foreground">
                        {opportunity.saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                      </Button>
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{opportunity.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {opportunity.requirements.map(req => (<Badge key={req} variant="secondary">{req}</Badge>))}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {opportunity.tags.map(tag => (<Badge key={tag} variant="outline">{tag}</Badge>))}
                    </div>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><DollarSign className="h-4 w-4" />{opportunity.stipend}</span>
                      <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{opportunity.duration}</span>
                      <span className="flex items-center gap-1"><Users className="h-4 w-4" />{opportunity.applicants} applicants</span>
                      <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />Deadline: {new Date(opportunity.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 lg:w-48">
                    {opportunity.applied ? (
                      <Button disabled className="w-full">Applied</Button>
                    ) : (
                      <Button onClick={(e) => { e.stopPropagation(); handleApply(opportunity.id) }} className="w-full">Apply Now</Button>
                    )}
                    <Button variant="outline" className="w-full bg-transparent" onClick={e => { e.stopPropagation(); handleCardClick(opportunity) }}>View Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOpportunities.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No opportunities found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria or check back later for new postings.</p>
            </CardContent>
          </Card>
        )}

        {selectedOpportunity && (
          <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay px-4" onClick={() => setSelectedOpportunity(null)}>
            <div className="relative w-full max-w-lg rounded-xl border border-border/60 bg-white dark:bg-white shadow-lg p-8" onClick={e => e.stopPropagation()}>
              <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={() => setSelectedOpportunity(null)}>&times;</button>
              <h2 className="text-2xl font-bold mb-4">{selectedOpportunity.title}</h2>
              <div className="space-y-2 text-sm">
                <p><b>Company:</b> {selectedOpportunity.company}</p>
                <p><b>Location:</b> {selectedOpportunity.location}</p>
                <p><b>Stipend:</b> {selectedOpportunity.stipend}</p>
                <p><b>Duration:</b> {selectedOpportunity.duration}</p>
                <p className="leading-relaxed"><b>Description:</b> {selectedOpportunity.description}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedOpportunity.requirements?.map((req, i) => <Badge key={i} variant="secondary">{req}</Badge>)}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedOpportunity.tags?.map((tag, i) => <Badge key={i} variant="outline">{tag}</Badge>)}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
