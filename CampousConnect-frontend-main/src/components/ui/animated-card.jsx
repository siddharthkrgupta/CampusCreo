import React from 'react'
import { motion } from 'framer-motion'
import { Card } from './card'
import { cn } from '../../lib/utils'

export function AnimatedCard({
  children,
  className,
  delay = 0,
  direction = 'up',
  hover = true,
  stagger = false,
  index = 0,
  ...props
}) {
  const directionVariants = {
    up: { y: 20, opacity: 0 },
    down: { y: -20, opacity: 0 },
    left: { x: 20, opacity: 0 },
    right: { x: -20, opacity: 0 },
    scale: { scale: 0.95, opacity: 0 }
  }

  const hoverVariants = {
    default: { y: -4, scale: 1.02 },
    scale: { scale: 1.05 },
    glow: { y: -2, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' },
    none: {}
  }

  const actualDelay = stagger ? delay + (index * 0.1) : delay

  return (
    <motion.div
      initial={directionVariants[direction]}
      animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
      transition={{
        duration: 0.6,
        delay: actualDelay,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: 'spring',
        stiffness: 100,
        damping: 15
      }}
      whileHover={hover ? hoverVariants[hover === true ? 'default' : hover] : undefined}
      className="h-full"
      style={{ willChange: 'transform' }}
    >
      <Card
        className={cn(
          'transition-all duration-300 border border-slate-200',
          'hover:border-teal-200 hover:shadow-lg',
          className
        )}
        {...props}
      >
        {children}
      </Card>
    </motion.div>
  )
}

/**
 * AnimatedCardGrid - Container for staggered card animations
 */
export function AnimatedCardGrid({ children, stagger = 0.1, className, ...props }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger
          }
        }
      }}
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && child.type === AnimatedCard) {
          return React.cloneElement(child, {
            ...child.props,
            stagger: true,
            index
          })
        }
        return child
      })}
    </motion.div>
  )
}
