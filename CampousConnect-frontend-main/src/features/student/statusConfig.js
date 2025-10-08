// Central status configuration for student application lifecycle
import { Clock, AlertCircle, Calendar, CheckCircle } from 'lucide-react'

export const statusConfig = {
  applied: { color: 'bg-blue-500', label: 'Applied', icon: Clock },
  'under-review': { color: 'bg-yellow-500', label: 'Under Review', icon: AlertCircle },
  interview: { color: 'bg-purple-500', label: 'Interview', icon: Calendar },
  offer: { color: 'bg-green-500', label: 'Offer Received', icon: CheckCircle },
  rejected: { color: 'bg-red-500', label: 'Rejected', icon: AlertCircle }
}

export function getStatusInfo(status) {
  return statusConfig[status] || { color: 'bg-gray-400', label: status, icon: Clock }
}
