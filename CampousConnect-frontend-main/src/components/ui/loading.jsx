import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

/**
 * Loading Spinner component for Campus Placement Portal
 * Various sizes and styles for different loading states
 */
export function Spinner({
  size = 'default',
  variant = 'default',
  className,
  ...props
}) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    default: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  }

  const variantClasses = {
    default: 'text-teal-600',
    muted: 'text-slate-400',
    white: 'text-white',
    success: 'text-emerald-600',
    warning: 'text-amber-500',
    danger: 'text-red-600'
  }

  return (
    <motion.svg
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={cn(
        'animate-spin',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
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
    </motion.svg>
  )
}

/**
 * Pulsing dots loader - Good for subtle loading states
 */
export function DotsLoader({ size = 'default', variant = 'default', className, ...props }) {
  const sizeClasses = {
    sm: 'h-1 w-1',
    default: 'h-2 w-2',
    lg: 'h-3 w-3'
  }

  const variantClasses = {
    default: 'bg-teal-600',
    muted: 'bg-slate-400',
    white: 'bg-white',
    success: 'bg-emerald-600',
    warning: 'bg-amber-500',
    danger: 'bg-red-600'
  }

  return (
    <div className={cn('flex items-center gap-1', className)} {...props}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'easeInOut'
          }}
          className={cn(
            'rounded-full',
            sizeClasses[size],
            variantClasses[variant]
          )}
        />
      ))}
    </div>
  )
}

/**
 * Loading overlay - For full-screen or container loading states
 */
export function LoadingOverlay({
  children,
  loading = false,
  spinnerSize = 'lg',
  spinnerVariant = 'default',
  blur = true,
  className,
  ...props
}) {
  return (
    <div className={cn('relative', className)} {...props}>
      {children}

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            'absolute inset-0 z-50 flex items-center justify-center',
            'bg-white/80 backdrop-blur-sm',
            blur && 'backdrop-blur-sm',
            className
          )}
        >
          <div className="flex flex-col items-center gap-3">
            <Spinner size={spinnerSize} variant={spinnerVariant} />
            <p className="text-sm text-slate-600 font-medium">Loading...</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}

/**
 * Skeleton loader - For content placeholders
 */
export function Skeleton({ className, ...props }) {
  return (
    <motion.div
      animate={{
        opacity: [0.4, 0.8, 0.4]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      className={cn(
        'bg-slate-200 rounded animate-pulse',
        className
      )}
      {...props}
    />
  )
}

/**
 * Skeleton text lines - For text content placeholders
 */
export function SkeletonText({ lines = 3, className, ...props }) {
  return (
    <div className={cn('space-y-2', className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            'h-4',
            i === lines - 1 ? 'w-3/4' : 'w-full'
          )}
        />
      ))}
    </div>
  )
}

/**
 * Loading button state - Replaces button content while loading
 */
export function LoadingButton({
  loading = false,
  children,
  loadingText = 'Loading...',
  spinnerSize = 'sm',
  ...props
}) {
  return (
    <button disabled={loading} {...props}>
      {loading ? (
        <div className="flex items-center gap-2">
          <Spinner size={spinnerSize} variant="white" />
          <span>{loadingText}</span>
        </div>
      ) : (
        children
      )}
    </button>
  )
}