import React from 'react'
import { Badge } from './badge'
import { cn } from '../../lib/utils'

// Specialized status badge for Campus Placement Portal
// Application status, job status, student status, etc.
const STATUS_CONFIGS = {
  // Application Status
  'application-draft': { variant: 'default', label: 'Draft', icon: '📝' },
  'application-submitted': { variant: 'pending', label: 'Submitted', icon: '📋' },
  'application-under-review': { variant: 'pending', label: 'Under Review', icon: '👀' },
  'application-shortlisted': { variant: 'shortlisted', label: 'Shortlisted', icon: '⭐' },
  'application-selected': { variant: 'approved', label: 'Selected', icon: '✅' },
  'application-rejected': { variant: 'rejected', label: 'Rejected', icon: '❌' },
  'application-on-hold': { variant: 'medium', label: 'On Hold', icon: '⏸️' },

  // Job/Opportunity Status
  'job-active': { variant: 'approved', label: 'Active', icon: '🟢' },
  'job-inactive': { variant: 'default', label: 'Inactive', icon: '⚪' },
  'job-expired': { variant: 'rejected', label: 'Expired', icon: '🔴' },
  'job-draft': { variant: 'default', label: 'Draft', icon: '📝' },
  'job-filled': { variant: 'success', label: 'Filled', icon: '✅' },

  // Student Status
  'student-eligible': { variant: 'approved', label: 'Eligible', icon: '✅' },
  'student-not-eligible': { variant: 'rejected', label: 'Not Eligible', icon: '❌' },
  'student-pending-approval': { variant: 'pending', label: 'Pending Approval', icon: '⏳' },
  'student-active': { variant: 'approved', label: 'Active', icon: '🟢' },

  // Company/Employer Status
  'company-verified': { variant: 'approved', label: 'Verified', icon: '✅' },
  'company-pending': { variant: 'pending', label: 'Pending Verification', icon: '⏳' },
  'company-suspended': { variant: 'rejected', label: 'Suspended', icon: '⛔' },

  // Priority/Urgency
  'priority-high': { variant: 'high', label: 'High Priority', icon: '🔴' },
  'priority-medium': { variant: 'medium', label: 'Medium Priority', icon: '🟡' },
  'priority-low': { variant: 'low', label: 'Low Priority', icon: '🟢' },

  // Job Types
  'type-internship': { variant: 'internship', label: 'Internship', icon: '🎓' },
  'type-fulltime': { variant: 'fulltime', label: 'Full Time', icon: '💼' },
  'type-parttime': { variant: 'medium', label: 'Part Time', icon: '⏰' },
  'type-remote': { variant: 'remote', label: 'Remote', icon: '🏠' },
  'type-onsite': { variant: 'onsite', label: 'On-site', icon: '🏢' },
  'type-hybrid': { variant: 'skill', label: 'Hybrid', icon: '🔄' }
}

export function StatusBadge({
  status,
  showIcon = true,
  customLabel = null,
  className,
  size = 'default',
  ...props
}) {
  const config = STATUS_CONFIGS[status]

  if (!config) {
    console.warn(`Unknown status: ${status}`)
    return (
      <Badge variant="default" size={size} className={className} {...props}>
        {customLabel || status}
      </Badge>
    )
  }

  const { variant, label, icon } = config
  const displayLabel = customLabel || label

  return (
    <Badge
      variant={variant}
      size={size}
      className={cn('gap-1.5 font-medium', className)}
      {...props}
    >
      {showIcon && <span className="text-xs" aria-hidden="true">{icon}</span>}
      <span>{displayLabel}</span>
    </Badge>
  )
}

// Helper function to get all available statuses
export const getAvailableStatuses = () => Object.keys(STATUS_CONFIGS)

// Helper function to get status by category
export const getStatusesByCategory = (category) => {
  return Object.keys(STATUS_CONFIGS).filter(status => status.startsWith(category))
}