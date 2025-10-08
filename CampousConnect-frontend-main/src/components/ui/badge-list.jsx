import React from 'react'
import { Badge } from './badge'

export function BadgeList({ items, onRemove, removable }) {
  if (!items || items.length === 0) return null
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(item => (
        <Badge key={item} variant="secondary" className="text-xs py-1 px-2 flex items-center gap-1">
          {item}
          {removable && (
            <button
              type="button"
              onClick={() => onRemove?.(item)}
              className="ml-1 inline-flex items-center rounded hover:text-destructive focus:outline-none"
              aria-label={`Remove ${item}`}
            >
              ×
            </button>
          )}
        </Badge>
      ))}
    </div>
  )
}
