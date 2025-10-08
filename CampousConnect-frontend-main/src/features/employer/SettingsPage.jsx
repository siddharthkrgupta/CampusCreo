import React, { useState } from 'react'
import { DashboardLayout } from '../../layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Switch } from '../../components/ui/switch'
import { Button } from '../../components/ui/button'
import { useTheme } from '../../components/theme/ThemeProvider'

export default function EmployerSettingsPage() {
  const [autoShortlist, setAutoShortlist] = useState(false)
  const [notifyNewApplications, setNotifyNewApplications] = useState(true)
  const { resolvedTheme, toggleTheme } = useTheme()

  return (
    <DashboardLayout role="employer">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="grid gap-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Recruitment Preferences</CardTitle>
            <CardDescription>Automate and adjust your hiring workflow</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Auto-shortlist top candidates</p>
                <p className="text-xs text-muted-foreground">Use AI to pre-select strong matches</p>
              </div>
              <Switch checked={autoShortlist} onCheckedChange={setAutoShortlist} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Email on new applications</p>
                <p className="text-xs text-muted-foreground">Immediate notification when candidates apply</p>
              </div>
              <Switch checked={notifyNewApplications} onCheckedChange={setNotifyNewApplications} />
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
