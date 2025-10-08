import React from 'react'
import { cn } from '../../lib/utils'

// Enhanced button system for Campus Placement Portal
// Focused on professional, accessible design with campus branding
const VARIANTS = {
  default: 'bg-[var(--role-primary)] text-[var(--role-on-primary)] hover:bg-[var(--role-primary-hover)] shadow-md hover:shadow-lg focus-visible:ring-[var(--role-focus)]',
  success: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg focus-visible:ring-emerald-500',
  warning: 'bg-amber-500 text-white hover:bg-amber-600 shadow-md hover:shadow-lg focus-visible:ring-amber-500',
  destructive: 'bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg focus-visible:ring-red-500',
  secondary: 'bg-[var(--role-surface-alt)] text-[var(--role-text-strong)] hover:bg-[var(--role-surface-alt-hover)] border border-[var(--role-border)] hover:border-[var(--role-border-strong)] focus-visible:ring-[var(--role-focus)]',
  outline: 'border-2 border-[var(--role-primary)] text-[var(--role-primary)] bg-transparent hover:bg-[var(--role-primary-soft)] hover:border-[var(--role-primary-hover)] focus-visible:ring-[var(--role-focus)]',
  ghost: 'text-[var(--role-primary)] hover:bg-[var(--role-primary-soft)] hover:text-[var(--role-primary-hover)] focus-visible:ring-[var(--role-focus)]',
  link: 'text-[var(--role-primary)] hover:text-[var(--role-primary-hover)] underline-offset-4 hover:underline focus-visible:ring-[var(--role-focus)]'
}

const SIZES = {
  // Compact for tables, inline actions
  xs: 'h-7 px-2 text-xs',
  // Small for secondary actions, mobile
  sm: 'h-8 px-3 text-sm',
  // Default for most actions
  default: 'h-10 px-4 py-2 text-sm',
  // Large for primary CTAs, hero actions
  lg: 'h-11 px-6 text-base font-semibold',
  // Extra large for landing page CTAs
  xl: 'h-12 px-8 text-lg font-semibold',
  // Square buttons for icons
  icon: 'h-10 w-10 p-0',
  // Small icon buttons
  'icon-sm': 'h-8 w-8 p-0'
}

export function Button({
  className,
  variant = 'default',
  size = 'default',
  loading = false,
  disabled = false,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? 'span' : 'button'

  return (
    <Comp
      data-slot="button"
      disabled={disabled || loading}
      className={cn(
        // Base styles optimized for campus placement portal
        'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-60 disabled:shadow-none',
        'active:scale-[0.98] transform',
        // Apply variant and size
        VARIANTS[variant] || VARIANTS.default,
        SIZES[size] || SIZES.default,
        // Loading state
        loading && 'cursor-wait opacity-80',
        className
      )}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {props.children}
    </Comp>
  )
}
