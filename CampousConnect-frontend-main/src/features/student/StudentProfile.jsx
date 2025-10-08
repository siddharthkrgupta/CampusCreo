import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '../../layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { Badge } from '../../components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Switch } from '../../components/ui/switch'
import { Upload, X, Plus, Download, Eye } from 'lucide-react'
import { allSkills } from './allSkills'
import { useStudentData } from './useStudentData'

const mockProfile = {
  personalInfo: { name: 'Aarav Sharma', email: 'aarav.sharma@university.ac.in', phone: '+91 98765 43210', department: 'Computer Science', year: 'Final Year', gpa: '8.2', avatar: '/assets/user_default.jpg' },
  skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git'],
  resume: { filename: 'Aarav_Sharma_Resume.pdf', uploadDate: '2025-08-20' },
  coverLetter: `Dear Hiring Manager,\n\nI am writing to express my interest in the Software Engineering Intern position. I am a final-year Computer Science undergraduate from India with hands-on experience building full‑stack applications using React, Node.js and modern tooling.\n\nAcross national hackathons, open-source contributions and internships with early‑stage startups, I have learned to deliver clean, maintainable code while collaborating across design and product functions. I mentor juniors in data structures and system design which keeps my fundamentals strong.\n\nYour organisation’s focus on scalable digital solutions for diverse users aligns with my goal of building impactful technology for India at scale. I believe my technical depth, curiosity and collaborative approach would allow me to contribute meaningfully.\n\nThank you for considering my application. I look forward to the possibility of contributing to your team.\n\nSincerely,\nAarav Sharma`,
}

function calculateProfileCompletion(profile) {
  let completed = 0;
  let total = 4; // name/email/phone, skills, cover letter, avatar
  if (profile.personalInfo?.name?.trim() && profile.personalInfo?.email?.trim() && profile.personalInfo?.phone?.trim()) completed++;
  if (Array.isArray(profile.skills) && profile.skills.length > 0) completed++;
  if (profile.coverLetter && profile.coverLetter.trim().length > 0) completed++;
  if (profile.personalInfo?.avatar && !profile.personalInfo.avatar.includes('user_default.jpg')) completed++;
  return Math.round((completed / total) * 100);
}

export default function StudentProfile() {
  const { profile, setProfile, calculateProfileCompletion } = useStudentData()
  const [newSkill, setNewSkill] = useState('')
  const [filteredSkills, setFilteredSkills] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const resumeInputRef = React.useRef(null)
  const photoInputRef = React.useRef(null)

  const handleAddSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile({ ...profile, skills: [...profile.skills, newSkill.trim()] })
      setNewSkill('')
      setFilteredSkills([])
    }
  }

  const handleRemoveSkill = (skillToRemove) => {
    setProfile({ ...profile, skills: profile.skills.filter(skill => skill !== skillToRemove) })
  }

  const handleResumeUpload = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'application/pdf' && file.size <= 5 * 1024 * 1024) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setProfile({
          ...profile,
          resume: { filename: file.name, uploadDate: new Date().toISOString(), data: ev.target.result }
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleResumeDownload = () => {
    if (profile.resume?.data) {
      const link = document.createElement('a')
      link.href = profile.resume.data
      link.download = profile.resume.filename
      link.click()
    }
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setProfile({
          ...profile,
          personalInfo: { ...profile.personalInfo, avatar: ev.target.result }
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePhotoDownload = () => {
    if (profile.personalInfo.avatar) {
      const link = document.createElement('a')
      link.href = profile.personalInfo.avatar
      link.download = 'profile_photo.png'
      link.click()
    }
  }

  const handleCoverLetterDownload = () => {
    const blob = new Blob([profile.coverLetter], { type: 'text/plain' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'cover_letter.txt'
    link.click()
  }

  const handleSkillInput = (e) => {
    setNewSkill(e.target.value)
    if (e.target.value.trim().length > 0) {
      setFilteredSkills(allSkills.filter(skill => skill.toLowerCase().startsWith(e.target.value.trim().toLowerCase()) && !profile.skills.includes(skill)))
    } else {
      setFilteredSkills([])
    }
  }

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Profile Management</h1>
            <p className="text-muted-foreground">Keep your profile updated to get better opportunities</p>
          </div>
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
          </div>
        </div>
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="resume">Resume</TabsTrigger>
            <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your basic information and academic details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.personalInfo.avatar || '/assets/user_default.jpg'} alt={profile.personalInfo.name} />
                    <AvatarFallback className="text-lg">{profile.personalInfo.name?.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <>
                      <Button variant="outline" size="sm" onClick={() => photoInputRef.current.click()}><Upload className="h-4 w-4 mr-2" />Change Photo</Button>
                      <input type="file" accept="image/*" ref={photoInputRef} style={{ display: 'none' }} onChange={handlePhotoUpload} />
                    </>
                  )}
                  {profile.personalInfo.avatar && (
                    <Button variant="outline" size="sm" onClick={handlePhotoDownload}><Download className="h-4 w-4 mr-2" />Download Photo</Button>
                  )}
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2"><label htmlFor="name" className="text-sm font-medium">Full Name</label><Input id="name" value={profile.personalInfo.name} disabled={!isEditing} className={!isEditing ? 'opacity-70 pointer-events-none' : ''} onChange={(e) => isEditing && setProfile({ ...profile, personalInfo: { ...profile.personalInfo, name: e.target.value } })} /></div>
                  <div className="space-y-2"><label htmlFor="email" className="text-sm font-medium">Email</label><Input id="email" type="email" value={profile.personalInfo.email} disabled={!isEditing} className={!isEditing ? 'opacity-70 pointer-events-none' : ''} onChange={(e) => isEditing && setProfile({ ...profile, personalInfo: { ...profile.personalInfo, email: e.target.value } })} /></div>
                  <div className="space-y-2"><label htmlFor="phone" className="text-sm font-medium">Phone Number</label><Input id="phone" value={profile.personalInfo.phone} disabled={!isEditing} className={!isEditing ? 'opacity-70 pointer-events-none' : ''} onChange={(e) => isEditing && setProfile({ ...profile, personalInfo: { ...profile.personalInfo, phone: e.target.value } })} /></div>
                  <div className="space-y-2"><label htmlFor="department" className="text-sm font-medium">Department</label><Select value={profile.personalInfo.department} disabled={!isEditing} onValueChange={(value) => isEditing && setProfile({ ...profile, personalInfo: { ...profile.personalInfo, department: value } })}><SelectTrigger className="bg-[var(--input)] border border-[color:var(--border)] shadow-sm focus:ring-2 focus:ring-[var(--ring)] disabled:opacity-70 disabled:cursor-not-allowed"><SelectValue /></SelectTrigger><SelectContent className="bg-[var(--card)] border border-[color:var(--border)] shadow-lg"><SelectItem value="Computer Science">Computer Science</SelectItem><SelectItem value="Electronics and Communication">Electronics and Communication</SelectItem><SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem><SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem><SelectItem value="Civil Engineering">Civil Engineering</SelectItem><SelectItem value="Metallurgical and Materials Engineering">Metallurgical and Materials Engineering</SelectItem><SelectItem value="MBA">MBA</SelectItem><SelectItem value="Mathematics and Data Science">Mathematics and Data Science</SelectItem></SelectContent></Select></div>
                  <div className="space-y-2"><label htmlFor="year" className="text-sm font-medium">Academic Year</label><Select value={profile.personalInfo.year} disabled={!isEditing} onValueChange={(value) => isEditing && setProfile({ ...profile, personalInfo: { ...profile.personalInfo, year: value } })}><SelectTrigger className="bg-[var(--input)] border border-[color:var(--border)] shadow-sm focus:ring-2 focus:ring-[var(--ring)] disabled:opacity-70 disabled:cursor-not-allowed"><SelectValue /></SelectTrigger><SelectContent className="bg-[var(--card)] border border-[color:var(--border)] shadow-lg"><SelectItem value="First Year">First Year</SelectItem><SelectItem value="Second Year">Second Year</SelectItem><SelectItem value="Third Year">Third Year</SelectItem><SelectItem value="Final Year">Final Year</SelectItem><SelectItem value="Graduate">Graduate</SelectItem></SelectContent></Select></div>
                  <div className="space-y-2"><label htmlFor="gpa" className="text-sm font-medium">GPA</label><Input id="gpa" value={profile.personalInfo.gpa} disabled={!isEditing} className={!isEditing ? 'opacity-70 pointer-events-none' : ''} onChange={(e) => isEditing && setProfile({ ...profile, personalInfo: { ...profile.personalInfo, gpa: e.target.value } })} /></div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Skills & Technologies</CardTitle>
                <CardDescription>Add your technical skills and competencies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {isEditing && (
                  <div className="flex flex-col gap-2 relative">
                    <div className="flex gap-2 items-center"><Input placeholder="Add a skill (e.g., React, Python, SQL)" value={newSkill} onChange={handleSkillInput} onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()} /><Button onClick={handleAddSkill} className="shrink-0" title="Add Skill"><Plus className="h-4 w-4" /></Button></div>
                    {filteredSkills.length > 0 && (
                      <div className="absolute z-10 top-12 left-0 w-full bg-[var(--card)] border border-[color:var(--border)] rounded-lg shadow-lg max-h-40 overflow-y-auto">
                        {filteredSkills.map(skill => (
                          <div key={skill} className="px-3 py-2 text-sm hover:bg-[var(--muted)]/70 cursor-pointer" onClick={() => { setNewSkill(skill); setFilteredSkills([]); }}>
                            {skill}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map(skill => (
                    <Badge key={skill} variant="secondary" className="text-sm py-1 px-3">{skill}{isEditing && (<button onClick={() => handleRemoveSkill(skill)} className="ml-2 hover:text-destructive"><X className="h-3 w-3" /></button>)}</Badge>
                  ))}
                </div>
                {profile.skills.length === 0 && (<p className="text-muted-foreground text-center py-8">No skills added yet. Add your technical skills to improve your profile.</p>)}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="resume">
            <Card>
              <CardHeader>
                <CardTitle>Resume</CardTitle>
                <CardDescription>Upload and manage your resume</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {profile.resume ? (
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div><h4 className="font-medium">{profile.resume.filename}</h4><p className="text-sm text-muted-foreground">Uploaded on {new Date(profile.resume.uploadDate).toLocaleDateString()}</p></div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => window.open(profile.resume.data, '_blank')}><Eye className="h-4 w-4 mr-2" />Preview</Button>
                        <Button variant="outline" size="sm" onClick={handleResumeDownload}><Download className="h-4 w-4 mr-2" />Download</Button>
                        {isEditing && <Button variant="outline" size="sm" onClick={() => resumeInputRef.current.click()}><Upload className="h-4 w-4 mr-2" />Replace</Button>}
                        <input type="file" accept="application/pdf" ref={resumeInputRef} style={{ display: 'none' }} onChange={handleResumeUpload} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center"><Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" /><h4 className="font-medium mb-2">Upload your resume</h4><p className="text-sm text-muted-foreground mb-4">PDF format recommended, max 5MB</p><Button onClick={() => resumeInputRef.current.click()}>Choose File</Button><input type="file" accept="application/pdf" ref={resumeInputRef} style={{ display: 'none' }} onChange={handleResumeUpload} /></div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="cover-letter">
            <Card>
              <CardHeader>
                <CardTitle>Cover Letter</CardTitle>
                <CardDescription>Write a compelling cover letter for your applications</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea placeholder="Write your cover letter here..." value={profile.coverLetter} disabled={!isEditing} onChange={(e) => isEditing && setProfile({ ...profile, coverLetter: e.target.value })} className="min-h-[300px] resize-none disabled:opacity-70" />
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm text-muted-foreground">{profile.coverLetter.length} characters</p>
                  <Button variant="outline" size="sm" onClick={handleCoverLetterDownload}>Download</Button>
                  {isEditing && <Button variant="outline" size="sm">AI Suggestions</Button>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--card)]/60 border border-[color:var(--border)]">
                  <div>
                    <p className="text-sm font-medium">Email Notifications</p>
                    <p className="text-xs text-muted-foreground">Get updates about applications and events</p>
                  </div>
                  <Switch checked={!!profile.emailNotifications} onCheckedChange={(val) => setProfile({ ...profile, emailNotifications: val })} />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--card)]/60 border border-[color:var(--border)]">
                  <div>
                    <p className="text-sm font-medium">Dark Mode</p>
                    <p className="text-xs text-muted-foreground">Toggle appearance (also available in sidebar)</p>
                  </div>
                  <Switch checked={!!profile.darkMode} onCheckedChange={(val) => setProfile({ ...profile, darkMode: val })} />
                </div>
                <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
