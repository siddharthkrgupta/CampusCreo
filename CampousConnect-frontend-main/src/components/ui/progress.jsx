import React from 'react'
import { cn } from '../../lib/utils'

export function Progress({
  className,
  value = 0,
  size = 'default',
  variant = 'default',
  showLabel = false,
  label = null,
  animated = true,
  ...props
}) {
  const sizeClasses = {
    sm: 'h-1.5',
    default: 'h-2',
    lg: 'h-3',
    xl: 'h-4'
  }

  const variantClasses = {
    default: {
      bg: 'bg-teal-100',
      indicator: 'bg-teal-600'
    },
    success: {
      bg: 'bg-emerald-100',
      indicator: 'bg-emerald-600'
    },
    warning: {
      bg: 'bg-amber-100',
      indicator: 'bg-amber-500'
    },
    danger: {
      bg: 'bg-red-100',
      indicator: 'bg-red-600'
    },
    muted: {
      bg: 'bg-slate-200',
      indicator: 'bg-slate-600'
    }
  }

  const variantConfig = variantClasses[variant] || variantClasses.default
  const displayLabel = label || `${Math.round(value)}%`

  return (
    <div className="w-full space-y-1">
      {showLabel && (
        <div className="flex justify-between items-center text-sm font-medium text-slate-700">
          <span>{displayLabel}</span>
          <span>{Math.round(value)}%</span>
        </div>
      )}
      <div
        data-slot="progress"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn(
          'relative w-full overflow-hidden rounded-full',
          variantConfig.bg,
          sizeClasses[size] || sizeClasses.default,
          className
        )}
        {...props}
      >
        <div
          data-slot="progress-indicator"
          className={cn(
            'h-full rounded-full',
            variantConfig.indicator,
            animated ? 'transition-all duration-500 ease-out' : ''
          )}
          style={{
            width: `${Math.min(100, Math.max(0, value || 0))}%`
          }}
        />
      </div>
    </div>
  )
}
