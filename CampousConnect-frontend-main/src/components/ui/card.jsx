import React from 'react'
import { cn } from '../../lib/utils'

// Enhanced card system for Campus Placement Portal
// Job listings, student profiles, application cards, etc.
export function Card({
  className,
  elevation = 'base',
  interactive = false,
  variant = 'default',
  ...props
}) {
  const elevationClasses = {
    none: 'shadow-none',
    sm: 'shadow-sm hover:shadow-md',
    base: 'shadow-sm hover:shadow-lg',
    md: 'shadow-md hover:shadow-lg',
    lg: 'shadow-lg hover:shadow-xl',
    xl: 'shadow-xl hover:shadow-2xl'
  }

  const variantClasses = {
    default: 'bg-[var(--card)] border-[color:var(--border)] text-[color:var(--card-foreground)]',
    highlighted: 'bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-200 dark:from-teal-900/40 dark:to-emerald-900/40',
    urgent: 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 dark:from-amber-900/40 dark:to-orange-900/40',
    success: 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 dark:from-emerald-900/40 dark:to-green-900/40',
    muted: 'bg-[var(--muted)] border-[color:var(--border)]',
    soft: 'bg-[var(--card)]/70 backdrop-blur-sm border-[color:var(--border)] supports-[backdrop-filter]:bg-[var(--card)]/55'
  }

  return (
    <div
      className={cn(
        // Base card styling optimized for placement portal
        'rounded-xl border transition-all duration-300 ease-out',
        // Elevation and shadows
        elevationClasses[elevation] || elevationClasses.base,
        // Variant styling
        variantClasses[variant] || variantClasses.default,
        // Interactive behavior
        interactive && 'cursor-pointer hover:scale-[1.02] hover:border-teal-300 active:scale-[0.99]',
        // Focus states for accessibility
        interactive && 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2',
        className
      )}
      {...props}
    />
  )
}

// Enhanced card sub-components for better placement portal UX
export function CardContent({ className, padding = 'default', ...props }) {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4 pt-0',
    default: 'p-6 pt-0',
    lg: 'p-8 pt-0'
  }

  return (
    <div
      className={cn(
        paddingClasses[padding] || paddingClasses.default,
        className
      )}
      {...props}
    />
  )
}

export const CardHeader = ({ className, padding = 'default', ...props }) => {
  const paddingClasses = {
    none: 'p-0 pb-0',
    sm: 'p-4 pb-2',
    default: 'p-6 pb-4',
    lg: 'p-8 pb-4'
  }

  return (
    <div
      className={cn(
        'flex flex-col space-y-1.5',
        paddingClasses[padding] || paddingClasses.default,
        className
      )}
      {...props}
    />
  )
}

export const CardTitle = ({ className, size = 'default', ...props }) => {
  const sizeClasses = {
    sm: 'text-base font-semibold',
    default: 'text-lg font-semibold',
    lg: 'text-xl font-bold'
  }
  return (
    <h3
      className={cn(
        'leading-none tracking-tight',
        sizeClasses[size] || sizeClasses.default,
        className
      )}
      {...props}
    />
  )
}

export const CardDescription = ({ className, ...props }) => (
  <p
    className={cn(
      'text-sm text-muted-foreground leading-relaxed',
      className
    )}
    {...props}
  />
)

export const CardFooter = ({ className, padding = 'default', ...props }) => {
  const paddingClasses = {
    none: 'p-0 pt-0',
    sm: 'p-4 pt-2',
    default: 'p-6 pt-4',
    lg: 'p-8 pt-4'
  }

  return (
    <div
      className={cn(
        'flex items-center justify-between',
        paddingClasses[padding] || paddingClasses.default,
        className
      )}
      {...props}
    />
  )
}

// New: Quick action area for buttons, badges, etc.
export const CardActions = ({ className, align = 'right', ...props }) => {
  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between'
  }

  return (
    <div
      className={cn(
        'flex items-center gap-2',
        alignClasses[align] || alignClasses.right,
        className
      )}
      {...props}
    />
  )
}
