import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { Button } from './button'

/**
 * AnimatedButton - Enhanced button with micro-interactions
 * Suitable for campus placement portal primary actions
 */
export function AnimatedButton({
  children,
  className,
  variant = 'default',
  size = 'default',
  animated = true,
  pressAnimation = true,
  hoverScale = true,
  pulseOnHover = false,
  disabled = false,
  loading = false,
  ...props
}) {
  const animations = {
    whileHover: animated && !disabled && !loading ? {
      scale: hoverScale ? 1.02 : 1,
      transition: { duration: 0.2, ease: 'easeOut' }
    } : {},
    whileTap: animated && pressAnimation && !disabled && !loading ? {
      scale: 0.98,
      transition: { duration: 0.1, ease: 'easeInOut' }
    } : {},
    animate: pulseOnHover ? {
      scale: [1, 1.02, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut'
      }
    } : {}
  }

  return (
    <motion.div
      className="inline-block"
      {...animations}
      style={{ willChange: 'transform' }}
    >
      <Button
        variant={variant}
        size={size}
        disabled={disabled}
        loading={loading}
        className={cn(
          // Enhanced focus and active states for better feedback
          'relative overflow-hidden',
          'before:absolute before:inset-0 before:bg-white/20 before:translate-y-full before:transition-transform before:duration-300',
          'hover:before:translate-y-0',
          className
        )}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  )
}

/**
 * PulseButton - Button with continuous pulse animation
 * Good for urgent CTAs like "Apply Now" or "Submit Application"
 */
export function PulseButton({ children, ...props }) {
  return (
    <AnimatedButton
      {...props}
      pulseOnHover={true}
      className={cn(
        'shadow-lg',
        props.className
      )}
    >
      {children}
    </AnimatedButton>
  )
}

/**
 * FloatingActionButton - Circular button with enhanced animations
 * Suitable for primary actions like "Add Application" or "Create Job"
 */
export function FloatingActionButton({
  children,
  className,
  size = 'icon',
  ...props
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <Button
        size={size}
        className={cn(
          'rounded-full shadow-lg hover:shadow-xl',
          'bg-teal-600 hover:bg-teal-700 text-white',
          className
        )}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  )
}