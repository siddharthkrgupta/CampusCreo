import React, { useState } from 'react'
import { DashboardLayout } from '../../layout/DashboardLayout'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card'
import { Switch } from '../../components/ui/switch'
import { Button } from '../../components/ui/button'
import { useTheme } from '../../components/theme/ThemeProvider'

export default function FacultySettingsPage() {
  const [alertOnNewReport, setAlertOnNewReport] = useState(true)
  const [menteeDigest, setMenteeDigest] = useState(false)
  const { resolvedTheme, toggleTheme } = useTheme()

  return (
    <DashboardLayout role="faculty">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="grid gap-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Mentorship Preferences</CardTitle>
            <CardDescription>Manage how you receive updates about your mentees</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Alerts on new reports</p>
                <p className="text-xs text-muted-foreground">Email me when a mentee submits a weekly report</p>
              </div>
              <Switch checked={alertOnNewReport} onCheckedChange={setAlertOnNewReport} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Weekly mentee digest</p>
                <p className="text-xs text-muted-foreground">Summary of progress sent every Monday</p>
              </div>
              <Switch checked={menteeDigest} onCheckedChange={setMenteeDigest} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Dark Mode</p>
                <p className="text-xs text-muted-foreground">Current: {resolvedTheme}</p>
              </div>
              <Switch checked={resolvedTheme === 'dark'} onCheckedChange={toggleTheme} />
            </div>
            <div className="flex justify-end pt-2">
              <Button onClick={() => alert('Settings saved!')}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
