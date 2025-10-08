import React, { useState } from 'react'
import { DashboardLayout } from '../../layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card'
import { Switch } from '../../components/ui/switch'
import { Button } from '../../components/ui/button'
import { useTheme } from '../../components/theme/ThemeProvider'

export default function PlacementCellSettingsPage() {
  const [autoArchive, setAutoArchive] = useState(true)
  const [dailyDigest, setDailyDigest] = useState(false)
  const { resolvedTheme, toggleTheme } = useTheme()

  return (
    <DashboardLayout role="placement-cell">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="grid gap-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Operational Preferences</CardTitle>
            <CardDescription>Control automation & visibility for job postings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Auto-archive filled roles</p>
                <p className="text-xs text-muted-foreground">Automatically hide jobs once an offer is accepted</p>
              </div>
              <Switch checked={autoArchive} onCheckedChange={setAutoArchive} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Daily summary digest</p>
                <p className="text-xs text-muted-foreground">Email performance summary every morning</p>
              </div>
              <Switch checked={dailyDigest} onCheckedChange={setDailyDigest} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Dark Mode</p>
                <p className="text-xs text-muted-foreground">Current: {resolvedTheme === 'dark' ? 'Dark' : 'Light'}</p>
              </div>
              <Switch checked={resolvedTheme === 'dark'} onCheckedChange={toggleTheme} />
            </div>
            <div className="flex justify-end pt-2">
              <Button
                onClick={() => {
                  setTimeout(() => {
                    alert('Settings saved!')
                  }, 300)
                }}
                className="transition-colors duration-150"
              >
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
