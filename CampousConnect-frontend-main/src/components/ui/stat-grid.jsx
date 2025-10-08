import React from 'react'
import { cn } from '../../lib/utils'

export function StatGrid({ children, className }) {
  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-4 gap-4', className)}>
      {children}
    </div>
  )
}
