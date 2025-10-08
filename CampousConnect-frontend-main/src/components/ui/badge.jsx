import React from 'react'
import { cn } from '../../lib/utils'

// Enhanced badge system for Campus Placement Portal
// Status indicators, application states, skill tags, etc.
const VARIANTS = {
  // Default/neutral states
  default: 'bg-slate-100 text-slate-800 border-slate-200',

  // Application/Process Status
  pending: 'bg-amber-100 text-amber-800 border-amber-200',
  approved: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  rejected: 'bg-red-100 text-red-800 border-red-200',
  shortlisted: 'bg-blue-100 text-blue-800 border-blue-200',

  // Priority/Importance
  high: 'bg-red-100 text-red-700 border-red-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  low: 'bg-slate-100 text-slate-600 border-slate-200',

  // Company/Role Types
  internship: 'bg-purple-100 text-purple-800 border-purple-200',
  fulltime: 'bg-teal-100 text-teal-800 border-teal-200',
  remote: 'bg-green-100 text-green-800 border-green-200',
  onsite: 'bg-blue-100 text-blue-800 border-blue-200',

  // Skills/Technologies
  skill: 'bg-indigo-100 text-indigo-800 border-indigo-200',

  // Outline variants for subtlety
  outline: 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50',
  'outline-primary': 'bg-white text-teal-700 border-teal-300 hover:bg-teal-50'
}

const SIZES = {
  sm: 'px-2 py-0.5 text-xs',
  default: 'px-2.5 py-0.5 text-sm',
  lg: 'px-3 py-1 text-sm font-medium'
}

export function Badge({
  className,
  variant = 'default',
  size = 'default',
  interactive = false,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? 'span' : 'span'

  return (
    <Comp
      data-slot="badge"
      className={cn(
        // Base styles optimized for readability and campus portal context
        'inline-flex items-center rounded-full border font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2',
        // Interactive badges (clickable tags, filters)
        interactive && 'cursor-pointer hover:shadow-sm',
        // Apply variant and size
        VARIANTS[variant] || VARIANTS.default,
        SIZES[size] || SIZES.default,
        className
      )}
      {...props}
    />
  )
}
