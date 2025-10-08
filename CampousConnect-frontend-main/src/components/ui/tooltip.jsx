import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'

/**
 * Tooltip component for Campus Placement Portal
 * Provides contextual information without cluttering the interface
 */
export function Tooltip({
  children,
  content,
  side = 'top',
  align = 'center',
  delayDuration = 300,
  sideOffset = 5,
  className,
  disabled = false,
  ...props
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const triggerRef = useRef(null)
  const timeoutRef = useRef(null)

  const sideOffsets = {
    top: { x: 0, y: -sideOffset },
    bottom: { x: 0, y: sideOffset },
    left: { x: -sideOffset, y: 0 },
    right: { x: sideOffset, y: 0 }
  }

  const animations = {
    initial: {
      opacity: 0,
      scale: 0.96,
      ...sideOffsets[side]
    },
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      ...sideOffsets[side]
    }
  }

  const updatePosition = () => {
    if (!triggerRef.current) return

    const rect = triggerRef.current.getBoundingClientRect()
    let x = rect.left + rect.width / 2
    let y = rect.top

    switch (side) {
      case 'top':
        y = rect.top
        break
      case 'bottom':
        y = rect.bottom
        break
      case 'left':
        x = rect.left
        y = rect.top + rect.height / 2
        break
      case 'right':
        x = rect.right
        y = rect.top + rect.height / 2
        break
    }

    setPosition({ x, y })
  }

  const handleMouseEnter = () => {
    if (disabled) return

    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      updatePosition()
      setIsVisible(true)
    }, delayDuration)
  }

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current)
    setIsVisible(false)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  if (!content) return children

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        className="inline-block"
        {...props}
      >
        {children}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            {...animations}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
              mass: 0.8
            }}
            className={cn(
              'fixed z-50 px-2 py-1 text-xs font-medium text-white bg-slate-900 rounded-md shadow-lg',
              'pointer-events-none select-none whitespace-nowrap max-w-xs',
              side === 'top' && 'origin-bottom',
              side === 'bottom' && 'origin-top',
              side === 'left' && 'origin-right',
              side === 'right' && 'origin-left',
              className
            )}
            style={{
              left: side === 'left' ? position.x - 8 : side === 'right' ? position.x + 8 : position.x,
              top: side === 'top' ? position.y - 32 : side === 'bottom' ? position.y + 8 : position.y - 12,
              transform: side === 'top' || side === 'bottom' ? 'translateX(-50%)' : 'none'
            }}
          >
            {content}

            {/* Arrow */}
            <div
              className={cn(
                'absolute w-2 h-2 bg-slate-900 rotate-45',
                side === 'top' && 'bottom-[-4px] left-1/2 -translate-x-1/2',
                side === 'bottom' && 'top-[-4px] left-1/2 -translate-x-1/2',
                side === 'left' && 'right-[-4px] top-1/2 -translate-y-1/2',
                side === 'right' && 'left-[-4px] top-1/2 -translate-y-1/2'
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/**
 * TooltipProvider - Context provider for tooltip configuration
 * Use this to set global tooltip behavior across the app
 */
export function TooltipProvider({ children, delayDuration = 300, skipDelayDuration = 150 }) {
  // For now, just pass through children
  // In a more complex implementation, this would provide context
  return children
}