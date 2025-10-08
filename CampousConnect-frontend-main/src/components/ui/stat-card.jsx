import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './card'
import { cn } from '../../lib/utils'

/**
 * Enhanced StatCard for Campus Placement Portal
 * Metrics, KPIs, application counts, etc.
 */
export function StatCard({
  icon: Icon,
  title,
  value,
  change = null,
  changeType = 'percentage', // 'percentage', 'absolute', 'none'
  trend = 'neutral', // 'up', 'down', 'neutral'
  subtitle = null,
  variant = 'default',
  size = 'default',
  delay = 0,
  className,
  interactive = false,
  onClick = null
}) {
  // Determine trend styling
  const getTrendStyles = () => {
    switch (trend) {
      case 'up':
        return {
          color: 'text-emerald-600',
          bg: 'bg-emerald-50',
          icon: '↗'
        }
      case 'down':
        return {
          color: 'text-red-600',
          bg: 'bg-red-50',
          icon: '↘'
        }
      default:
        return {
          color: 'text-slate-600',
          bg: 'bg-slate-50',
          icon: '→'
        }
    }
  }

  const trendStyles = getTrendStyles()

  const variantClasses = {
    default: 'border-slate-200 bg-white',
    success: 'border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50',
    warning: 'border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50',
    info: 'border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50',
    primary: 'border-teal-200 bg-gradient-to-br from-teal-50 to-emerald-50'
  }

  const sizeClasses = {
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8'
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={interactive ? { y: -2, scale: 1.02 } : { y: -1 }}
      className="w-full"
    >
      <Card
        className={cn(
          'relative group transition-all duration-300 shadow-sm hover:shadow-md',
          variantClasses[variant] || variantClasses.default,
          interactive && 'cursor-pointer',
          className
        )}
        onClick={onClick}
        interactive={interactive}
      >
        <div className={cn(sizeClasses[size] || sizeClasses.default)}>
          {/* Header with icon */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">
              {title}
            </p>
            {Icon && (
              <div className={cn(
                'flex items-center justify-center h-10 w-10 rounded-lg transition-colors',
                'bg-teal-100 text-teal-600 group-hover:bg-teal-200'
              )}>
                <Icon className="h-5 w-5" />
              </div>
            )}
          </div>

          {/* Main value */}
          <div className="space-y-2">
            <div className="text-3xl font-bold text-slate-900 tracking-tight">
              {value}
            </div>

            {/* Change indicator and subtitle */}
            <div className="flex items-center justify-between">
              {change !== null && (
                <div className="flex items-center gap-1">
                  <span className={cn(
                    'inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full',
                    trendStyles.color,
                    trendStyles.bg
                  )}>
                    <span>{trendStyles.icon}</span>
                    {changeType === 'percentage' ? `${change}%` : change}
                  </span>
                </div>
              )}

              {subtitle && (
                <p className="text-xs text-slate-500 font-medium">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
