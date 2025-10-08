import React, { useState, useRef, useEffect } from 'react'
import { ChevronDownIcon, CheckIcon } from 'lucide-react'
import { cn } from '../../lib/utils'

export function Select({ value, onValueChange, defaultValue, children, ...props }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value || defaultValue)
  const selectRef = useRef(null)

  const currentValue = value ?? selectedValue

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleValueChange = (newValue) => {
    if (onValueChange) {
      onValueChange(newValue)
    }
    if (!value) {
      setSelectedValue(newValue)
    }
    setIsOpen(false)
  }

  return (
    <div ref={selectRef} className="relative" data-slot="select" {...props}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...child.props,
            isOpen,
            onOpenChange: setIsOpen,
            selectedValue: currentValue,
            onValueChange: handleValueChange
          })
        }
        return child
      })}
    </div>
  )
}

export function SelectTrigger({ className, size = 'default', children, isOpen, onOpenChange, selectedValue, ...props }) {
  return (
    <button
      type="button"
      data-slot="select-trigger"
      data-size={size}
      aria-expanded={isOpen}
      className={cn(
        'flex w-full items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        size === 'sm' ? 'h-8' : 'h-9',
        className
      )}
      onClick={() => onOpenChange?.(!isOpen)}
      {...props}
    >
      <div className="flex items-center gap-2">
        {React.Children.map(children, child => {
          if (React.isValidElement(child) && child.type === SelectValue) {
            return React.cloneElement(child, { selectedValue })
          }
          return child
        })}
      </div>
      <ChevronDownIcon className={cn('size-4 opacity-50 transition-transform', isOpen && 'rotate-180')} />
    </button>
  )
}

export function SelectValue({ placeholder, selectedValue, children, labels }) {
  let content = null
  if (selectedValue) {
    if (children) {
      content = children
    } else if (labels && labels[selectedValue]) {
      content = labels[selectedValue]
    } else if (placeholder) {
      // Fallback: title-case the value when no explicit label mapping provided
      content = String(selectedValue)
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())
    } else {
      content = selectedValue
    }
  } else {
    content = placeholder
  }
  return (
    <span data-slot="select-value" className={cn(!selectedValue && 'text-muted-foreground')}>
      {content}
    </span>
  )
}

export function SelectContent({ className, children, isOpen, selectedValue, onValueChange, ...props }) {
  if (!isOpen) return null

  return (
    <div
      data-slot="select-content"
      className={cn(
        // Solid background (no glass / blur)
        'absolute top-full z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-slate-200 bg-white text-slate-700 shadow-sm animate-in fade-in-0 zoom-in-95 dark:bg-slate-900 dark:text-slate-100',
        className
      )}
      {...props}
    >
      <div className="p-1">
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              ...child.props,
              selectedValue,
              onValueChange
            })
          }
          return child
        })}
      </div>
    </div>
  )
}

export function SelectItem({ className, children, value, selectedValue, onValueChange, ...props }) {
  const isSelected = selectedValue === value

  return (
    <button
      type="button"
      data-slot="select-item"
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        isSelected && 'bg-accent text-accent-foreground',
        className
      )}
      onClick={() => onValueChange?.(value)}
      {...props}
    >
      {isSelected && (
        <CheckIcon className="absolute left-2 size-4" />
      )}
      {children}
    </button>
  )
}

export function SelectLabel({ className, ...props }) {
  return (
    <div
      data-slot="select-label"
      className={cn('px-2 py-1.5 text-xs font-semibold text-muted-foreground', className)}
      {...props}
    />
  )
}