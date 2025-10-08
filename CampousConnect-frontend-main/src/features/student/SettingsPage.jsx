import React, { useState } from 'react'
import { DashboardLayout } from '../../layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Switch } from '../../components/ui/switch'
import { useTheme } from '../../components/theme/ThemeProvider'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true)
  const [isSaved, setIsSaved] = useState(false)
  const { resolvedTheme, toggleTheme } = useTheme()
  const darkMode = resolvedTheme === 'dark'
  const handleSave = () => {
    setIsSaved(true)
    // Auto-hide success message after 2 seconds
    setTimeout(() => setIsSaved(false), 2000)
  }
  return (
    <DashboardLayout role="student">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="grid gap-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Manage your notification and display settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Email Notifications</p>
                <p className="text-xs text-muted-foreground">Get updates about applications and events</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Dark Mode</p>
                <p className="text-xs text-muted-foreground">Toggle appearance (also available in sidebar)</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={toggleTheme} />
            </div>
            {isSaved && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md">
                <p className="text-sm font-medium">✓ Settings saved successfully!</p>
              </div>
            )}
            <div className="flex justify-end pt-2">
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
