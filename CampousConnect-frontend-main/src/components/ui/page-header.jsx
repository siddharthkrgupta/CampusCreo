import React from 'react'
import { cn } from '../../lib/utils'

export function PageHeader({ title, description, actions, className }) {
  return (
    <div className={cn('mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between', className)}>
      <div className="space-y-1.5">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">{description}</p>}
      </div>
      {actions && <div className="flex gap-2 flex-wrap">{actions}</div>}
    </div>
  )
}
