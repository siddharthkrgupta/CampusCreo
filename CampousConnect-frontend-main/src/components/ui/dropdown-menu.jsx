import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '../../lib/utils'

/**
 * DropdownMenu - Flexible dropdown menu system for Campus Placement Portal
 * Supports keyboard navigation and proper accessibility
 */
export function DropdownMenu({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  return (
    <div ref={menuRef} className="relative inline-block text-left">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            isOpen,
            onOpenChange: setIsOpen
          })
        }
        return child
      })}
    </div>
  )
}

export function DropdownMenuTrigger({
  children,
  isOpen,
  onOpenChange,
  asChild = false,
  className,
  ...props
}) {
  const Comp = asChild ? 'div' : 'button'

  return (
    <Comp
      type={asChild ? undefined : 'button'}
      onClick={() => onOpenChange?.(!isOpen)}
      className={cn(
        !asChild && 'inline-flex items-center justify-center gap-2',
        !asChild && 'px-4 py-2 text-sm font-medium text-slate-700',
        !asChild && 'bg-white border border-slate-300 rounded-lg',
        !asChild && 'hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500',
        !asChild && 'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      aria-expanded={isOpen}
      aria-haspopup="menu"
      {...props}
    >
      {children}
      {!asChild && <ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />}
    </Comp>
  )
}

export function DropdownMenuContent({
  children,
  isOpen,
  className,
  align = 'start',
  sideOffset = 4,
  ...props
}) {
  const alignClasses = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
            mass: 0.8
          }}
          className={cn(
            'absolute z-50 min-w-[8rem] overflow-hidden rounded-lg border border-slate-200',
            // Simplified solid background (removed glassy backdrop blur & translucency)
            'bg-white p-1 shadow-lg dark:bg-slate-900',
            alignClasses[align],
            className
          )}
          style={{ top: `calc(100% + ${sideOffset}px)` }}
          role="menu"
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function DropdownMenuItem({
  children,
  onClick,
  disabled = false,
  className,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? 'div' : 'button'

  return (
    <Comp
      type={asChild ? undefined : 'button'}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative flex w-full cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm',
        'outline-none transition-colors',
        'hover:bg-slate-100 focus:bg-slate-100',
        'disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      role="menuitem"
      {...props}
    >
      {children}
    </Comp>
  )
}

export function DropdownMenuSeparator({ className, ...props }) {
  return (
    <div
      className={cn('mx-1 my-1 h-px bg-slate-200', className)}
      role="separator"
      {...props}
    />
  )
}

export function DropdownMenuLabel({ children, className, ...props }) {
  return (
    <div
      className={cn('px-2 py-1.5 text-xs font-semibold text-slate-500', className)}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * DropdownMenuCheckboxItem - For multi-select dropdowns
 */
export function DropdownMenuCheckboxItem({
  children,
  checked = false,
  onCheckedChange,
  className,
  ...props
}) {
  return (
    <DropdownMenuItem
      onClick={() => onCheckedChange?.(!checked)}
      className={cn('pr-8', className)}
      {...props}
    >
      {children}
      {checked && (
        <Check className="absolute right-2 h-4 w-4 text-teal-600" />
      )}
    </DropdownMenuItem>
  )
}

/**
 * DropdownMenuRadioItem - For single-select dropdowns  
 */
export function DropdownMenuRadioItem({
  children,
  value,
  selectedValue,
  onValueChange,
  className,
  ...props
}) {
  const isSelected = value === selectedValue

  return (
    <DropdownMenuItem
      onClick={() => onValueChange?.(value)}
      className={cn('pr-8', className)}
      {...props}
    >
      {children}
      {isSelected && (
        <Check className="absolute right-2 h-4 w-4 text-teal-600" />
      )}
    </DropdownMenuItem>
  )
}