import React, { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { AlertCircle, Check, Eye, EyeOff } from 'lucide-react'

export const Input = forwardRef(({
  className,
  type = 'text',
  size = 'default',
  variant = 'default',
  error = false,
  success = false,
  helperText,
  label,
  required = false,
  leftIcon,
  rightIcon,
  showPasswordToggle = false,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = React.useState(false)
  const [inputType, setInputType] = React.useState(type)

  React.useEffect(() => {
    if (showPasswordToggle && type === 'password') {
      setInputType(showPassword ? 'text' : 'password')
    } else {
      setInputType(type)
    }
  }, [showPassword, type, showPasswordToggle])

  const sizeClasses = {
    sm: 'h-8 px-2.5 py-1 text-sm',
    default: 'h-10 px-3 py-2 text-sm',
    lg: 'h-11 px-4 py-2.5 text-base'
  }

  const variantClasses = {
    default: 'border-slate-300 bg-white focus:border-teal-500 focus:ring-teal-500/20',
    filled: 'border-slate-200 bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-teal-500/20',
    ghost: 'border-transparent bg-slate-50 hover:bg-slate-100 focus:bg-white focus:border-teal-500 focus:ring-teal-500/20'
  }

  const inputElement = (
    <div className="relative">
      {leftIcon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {leftIcon}
        </div>
      )}

      <input
        ref={ref}
        type={inputType}
        className={cn(
          // Base styles optimized for campus placement portal
          'flex w-full rounded-lg border font-medium transition-all duration-200',
          'placeholder:text-slate-400 placeholder:font-normal',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
          'disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-slate-50',
          // File input styling
          'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-700',
          // Apply size and variant
          sizeClasses[size] || sizeClasses.default,
          variantClasses[variant] || variantClasses.default,
          // Icon spacing
          leftIcon && 'pl-10',
          (rightIcon || showPasswordToggle || error || success) && 'pr-10',
          // State-based styling
          error && 'border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50',
          success && 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500/20 bg-emerald-50/50',
          className
        )}
        {...props}
      />

      {/* Right side icons */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
        {success && !error && (
          <Check className="h-4 w-4 text-emerald-600" />
        )}
        {error && (
          <AlertCircle className="h-4 w-4 text-red-600" />
        )}
        {showPasswordToggle && type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-slate-400 hover:text-slate-600 transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
        {rightIcon && !showPasswordToggle && !error && !success && (
          <div className="text-slate-400">
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  )

  if (label || helperText) {
    return (
      <div className="space-y-1">
        {label && (
          <label className="text-sm font-medium text-slate-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        {inputElement}
        {helperText && (
          <p className={cn(
            'text-xs',
            error ? 'text-red-600' : success ? 'text-emerald-600' : 'text-slate-500'
          )}>
            {helperText}
          </p>
        )}
      </div>
    )
  }

  return inputElement
})

Input.displayName = 'Input'

/**
 * SearchInput - Specialized input for search functionality
 */
export const SearchInput = forwardRef(({ placeholder = 'Search...', ...props }, ref) => {
  return (
    <Input
      ref={ref}
      type="search"
      placeholder={placeholder}
      leftIcon={<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>}
      {...props}
    />
  )
})

SearchInput.displayName = 'SearchInput'
