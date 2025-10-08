import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './card'

export function SectionCard({ title, description, children, actions, footer, padded = true }) {
  return (
    <Card>
      {(title || description || actions) && (
        <CardHeader className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {title && <CardTitle className="text-base font-semibold">{title}</CardTitle>}
            {description && <CardDescription className="text-xs">{description}</CardDescription>}
          </div>
          {actions && <div className="flex gap-2">{actions}</div>}
        </CardHeader>
      )}
      <CardContent className={padded ? 'space-y-4' : ''}>
        {children}
        {footer}
      </CardContent>
    </Card>
  )
}
