import React from 'react'
import { cn } from '../../lib/utils'

export function EmptyState({ icon: Icon, title, message, action, className }) {
  return (
    <div className={cn('rounded-lg border border-dashed border-border p-12 text-center space-y-4', className)}>
      {Icon && <Icon className="mx-auto h-8 w-8 text-muted-foreground" />}
      <div className="space-y-1">
        <h3 className="font-semibold text-sm">{title}</h3>
        {message && <p className="text-xs text-muted-foreground max-w-sm mx-auto">{message}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
