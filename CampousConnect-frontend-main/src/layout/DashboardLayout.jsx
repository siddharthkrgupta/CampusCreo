import React from 'react'
import { Sidebar } from './Sidebar'
import { cn } from '../lib/utils'

/* Role → background class mapping. Each class will be defined in index.css */
const roleBgClass = {
  student: 'student-simple-gradient',
  'placement-cell': 'placement-gradient',
  faculty: 'faculty-gradient',
  employer: 'employer-gradient'
}

export function DashboardLayout({ children, role }) {
  const bgClass = roleBgClass[role]
  return (
    <div className={cn('min-h-screen bg-background', bgClass)} data-role={role}>
      <Sidebar role={role} />
      <div className="md:pl-64">
        <div className={cn(bgClass && 'relative')}>
          <main className={cn('p-6 relative', bgClass && 'z-10')}>{children}</main>
        </div>
      </div>
    </div>
  )
}
