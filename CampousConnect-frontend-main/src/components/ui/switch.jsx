import React from 'react'
import { cn } from '../../lib/utils'

// Accessible animated switch using design tokens
export function Switch({ className, checked, onCheckedChange, disabled, ...props }) {
  const handleToggle = () => {
    if (!disabled && onCheckedChange) onCheckedChange(!checked)
  }

  const handleKeyDown = (e) => {
    if ((e.key === ' ' || e.key === 'Enter') && !disabled) {
      e.preventDefault()
      handleToggle()
    }
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled || undefined}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        checked ? 'bg-[var(--primary)] shadow-inner' : 'bg-[var(--secondary)]/80 dark:bg-[var(--secondary)]/60',
        className
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none inline-block h-5 w-5 translate-x-1 rounded-full bg-[var(--background)] shadow ring-0 transition-transform duration-300 ease-out will-change-transform',
          checked && 'translate-x-[1.35rem]'
        )}
      />
    </button>
  )
}
