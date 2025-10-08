import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Bell, BellDot, CheckCircle2, AlertCircle, Info, MessageSquare, Trash2 } from 'lucide-react'
import { cn } from '../../lib/utils'

/* Notification shape:
 * { id: string, title: string, description?: string, date: string|number, read: boolean, type: 'info'|'success'|'alert'|'message' }
 */

const seedByRole = role => {
  const now = Date.now()
  const base = (offsetMins, data) => ({
    id: `${role}-${offsetMins}`,
    date: new Date(now - offsetMins * 60000).toISOString(),
    read: false,
    ...data
  })
  switch (role) {
    case 'student':
      return [
        base(2, { title: 'New Opportunity', description: 'Google SDE Intern - Applications open now! Deadline: Oct 15', type: 'success' }),
        base(5, { title: 'Interview Scheduled', description: 'Technical interview with Infosys Digital on 5 Oct, 2:00 PM', type: 'success' }),
        base(12, { title: 'Application Shortlisted', description: 'Congratulations! You are shortlisted for Microsoft Intern position', type: 'success' }),
        base(25, { title: 'Interview Reminder', description: 'HR interview with TCS tomorrow at 10:30 AM', type: 'alert' }),
        base(45, { title: 'Document Required', description: 'Upload updated resume for Amazon internship application', type: 'alert' }),
        base(60, { title: 'Application Viewed', description: 'Your application for Data Analyst Intern at Wipro was viewed', type: 'info' }),
        base(90, { title: 'Placement Drive Alert', description: 'Accenture campus drive on Oct 20. Register by Oct 18', type: 'info' }),
        base(120, { title: 'Application Status Update', description: 'Your IBM internship application is under review', type: 'info' }),
        base(150, { title: 'Skills Assessment', description: 'Complete coding assessment for Capgemini before Oct 12', type: 'message' }),
        base(180, { title: 'Profile Tip', description: 'Add more projects to improve visibility to 80+ companies', type: 'message' }),
        base(240, { title: 'New Job Alert', description: '15 new internship opportunities match your profile', type: 'info' }),
        base(300, { title: 'Interview Feedback', description: 'Technical interview feedback available for Cognizant position', type: 'message' }),
        base(360, { title: 'Application Deadline', description: 'Only 2 days left to apply for Deloitte Summer Internship', type: 'alert' }),
        base(420, { title: 'Profile Views', description: '3 companies viewed your profile this week', type: 'success' })
      ]
    case 'faculty':
      return [
        base(8, { title: 'New Approval Request', description: 'Recommendation needed for Aarav Sharma', type: 'alert' }),
        base(90, { title: 'Report Ready', description: 'Weekly mentee progress report generated', type: 'success' })
      ]
    case 'placement-cell':
      return [
        base(3, { title: 'New Job Posted', description: 'Employer added “Frontend Intern” role', type: 'info' }),
        base(40, { title: 'High Application Traffic', description: 'Applications spiked 35% today', type: 'success' })
      ]
    case 'employer':
      return [
        base(2, { title: 'New Candidate Applied', description: 'Aarav Sharma applied to Software Intern', type: 'info' }),
        base(120, { title: 'Interview Reminder', description: 'Data Science Intern interview tomorrow', type: 'alert' })
      ]
    default:
      return []
  }
}

const typeMeta = {
  success: { icon: CheckCircle2, color: 'text-emerald-600', accent: 'before:bg-emerald-500' },
  alert: { icon: AlertCircle, color: 'text-amber-600', accent: 'before:bg-amber-500' },
  info: { icon: Info, color: 'text-sky-600', accent: 'before:bg-sky-500' },
  message: { icon: MessageSquare, color: 'text-indigo-600', accent: 'before:bg-indigo-500' }
}

export function NotificationsBell({ role }) {
  const storageKey = `notifications_${role}`
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState([])
  const panelRef = useRef(null)

  // Load / seed
  useEffect(() => {
    const raw = localStorage.getItem(storageKey)
    // Force refresh notifications for development - remove in production
    const forceRefresh = true
    if (raw && !forceRefresh) {
      try { setItems(JSON.parse(raw)) } catch { /* ignore */ }
    } else {
      const seeded = seedByRole(role)
      setItems(seeded)
      localStorage.setItem(storageKey, JSON.stringify(seeded))
    }
  }, [role, storageKey])

  // Persist
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items))
  }, [items, storageKey])

  // External event API: window.dispatchEvent(new CustomEvent('notify', { detail: { role, notification } }))
  useEffect(() => {
    const handler = e => {
      const { role: targetRole, notification } = e.detail || {}
      if (!notification) return
      if (targetRole && targetRole !== role) return
      setItems(prev => [{ ...notification, id: notification.id || `${Date.now()}` }, ...prev])
    }
    window.addEventListener('notify', handler)
    return () => window.removeEventListener('notify', handler)
  }, [role])

  const unread = items.filter(i => !i.read).length

  const toggle = () => setOpen(o => !o)
  const markAllRead = () => setItems(prev => prev.map(i => ({ ...i, read: true })))
  const markRead = id => setItems(prev => prev.map(i => i.id === id ? { ...i, read: true } : i))
  const clearAll = () => setItems([])

  // Close on outside click / escape
  useEffect(() => {
    if (!open) return
    const onClick = e => { if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false) }
    const onKey = e => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('mousedown', onClick)
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('mousedown', onClick); window.removeEventListener('keydown', onKey) }
  }, [open])

  return (
    <div className="relative" aria-haspopup="dialog" aria-expanded={open}>
      <button
        onClick={toggle}
        className={cn('relative inline-flex items-center justify-center h-10 w-10 rounded-full border bg-[var(--card)] text-foreground hover:bg-[var(--card)]/80 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary')}
        aria-label={unread ? `${unread} unread notifications` : 'Notifications'}
      >
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full shadow">{unread}</span>
        )}
        {unread > 0 ? <BellDot className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
      </button>
      {open && (
        <div
          ref={panelRef}
          className="absolute right-0 mt-3 w-96 max-w-[90vw] z-50 bg-[var(--card)] border rounded-xl shadow-lg overflow-hidden flex flex-col animate-in fade-in zoom-in-95"
          role="dialog"
          aria-label="Notifications panel"
        >
          <div className="px-4 py-3 border-b flex items-center justify-between bg-muted/40">
            <div>
              <h3 className="font-semibold text-sm">Notifications</h3>
              <p className="text-[11px] text-muted-foreground">{unread} unread</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={markAllRead} className="text-xs px-2 py-1 rounded bg-primary/10 hover:bg-primary/20 text-primary font-medium">Mark all read</button>
              <button onClick={clearAll} className="text-xs px-2 py-1 rounded bg-destructive/10 hover:bg-destructive/20 text-destructive font-medium" title="Clear all"><Trash2 className="h-3.5 w-3.5" /></button>
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto">{
            items.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground">No notifications</div>
            ) : (
              <ul className="divide-y">
                {items.map(item => {
                  const meta = typeMeta[item.type] || typeMeta.info
                  const Icon = meta.icon
                  return (
                    <li key={item.id} className={cn('relative group pl-4 pr-3 py-3 flex gap-3 text-sm before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1', meta.accent, !item.read && 'bg-primary/5')}>
                      <div className="mt-0.5">
                        <Icon className={cn('h-4 w-4', meta.color)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium leading-snug flex items-center gap-2">
                          {item.title}
                          {!item.read && <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" aria-label="unread" />}
                        </p>
                        {item.description && <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-3">{item.description}</p>}
                        <p className="text-[10px] mt-1 uppercase tracking-wide text-muted-foreground">{new Date(item.date).toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })}</p>
                      </div>
                      {!item.read && (
                        <button
                          onClick={() => markRead(item.id)}
                          className="self-start text-[10px] uppercase tracking-wide font-medium text-primary hover:underline"
                        >Mark</button>
                      )}
                    </li>
                  )
                })}
              </ul>
            )
          }</div>
        </div>
      )}
    </div>
  )
}
