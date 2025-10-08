import React from 'react'
import { cn } from '../../lib/utils'

export function FilterBar({ children, className }) {
  return (
    <div className={cn('flex flex-wrap items-center gap-4 rounded-md border bg-card/50 px-4 py-3 text-xs', className)}>
      {children}
    </div>
  )
}
