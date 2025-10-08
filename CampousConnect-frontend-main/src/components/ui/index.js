// Enhanced UI Components for Campus Placement Portal
// Optimized for professional, accessible design with teal/green branding

// Core Components
export { Button } from './button'
export { AnimatedButton, PulseButton, FloatingActionButton } from './animated-button'
export { Badge } from './badge'
export { Input, SearchInput } from './input'

// Card System
export {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardActions
} from './card'

export { AnimatedCard, AnimatedCardGrid } from './animated-card'

// Data Display
export { StatCard } from './stat-card'
export { Progress } from './progress'

// Specialized Components for Campus Placement
export { StatusBadge, getAvailableStatuses, getStatusesByCategory } from './status-badge'

// Form Components  
export { Select } from './select'
export { Textarea } from './textarea'
export { Switch } from './switch'

// Layout & Navigation
export { Tabs } from './tabs'

// Interactive Components
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem
} from './dropdown-menu'

export { Tooltip, TooltipProvider } from './tooltip'

// Loading & Feedback
export {
  Spinner,
  DotsLoader,
  LoadingOverlay,
  Skeleton,
  SkeletonText,
  LoadingButton
} from './loading'

export { ToastProvider, useToast } from './toast-provider'

// Utility
export { Avatar } from './avatar'

/*
CAMPUS PLACEMENT PORTAL DESIGN TOKENS:

Colors:
- Primary: teal-600 (actions, CTAs)
- Success: emerald-600 (approvals, completed)
- Warning: amber-500 (pending, attention)
- Danger: red-600 (rejections, errors)
- Muted: slate-600 (secondary info)

Button Variants:
- default: Primary teal, for main actions
- success: Green, for positive confirmations
- warning: Amber, for attention-requiring actions
- destructive: Red, for dangerous actions
- secondary: Gray, for secondary actions
- outline: Teal border, for alternative actions
- ghost: Transparent, for subtle actions
- link: Text link style

Badge Variants:
Application Status: pending, approved, rejected, shortlisted
Job Types: internship, fulltime, remote, onsite, hybrid
Priority: high, medium, low
Company Status: verified, pending, suspended

Card Variants:
- default: Standard white background
- highlighted: Teal gradient background
- urgent: Amber gradient background
- success: Green gradient background
- muted: Gray background

Progress Variants:
- default: Teal progress bar
- success: Green progress bar
- warning: Amber progress bar
- danger: Red progress bar
- muted: Gray progress bar

USAGE EXAMPLES:

// Application status
<StatusBadge status="application-shortlisted" />

// Metrics dashboard
<StatCard 
  icon={GraduationCap}
  title="Total Applications"
  value="1,247"
  change={12.5}
  trend="up"
  variant="success"
/>

// Job posting card with actions
<Card variant="highlighted" interactive>
  <CardHeader>
    <CardTitle>Software Engineer Intern</CardTitle>
    <CardDescription>Google • Remote • 6 months</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Looking for passionate interns...</p>
  </CardContent>
  <CardFooter>
    <CardActions>
      <AnimatedButton size="sm">Apply Now</AnimatedButton>
      <Button variant="outline" size="sm">View Details</Button>
    </CardActions>
  </CardFooter>
</Card>

// Enhanced form with validation
<Input
  label="Email Address"
  type="email"
  required
  error={!!errors.email}
  success={isValid && !errors.email}
  helperText={errors.email || "We'll never share your email"}
  leftIcon={<Mail className="h-4 w-4" />}
/>

// Loading states
<LoadingOverlay loading={isSubmitting}>
  <form onSubmit={handleSubmit}>
    <Input placeholder="Enter your details..." />
    <LoadingButton loading={isSubmitting} loadingText="Submitting...">
      Submit Application
    </LoadingButton>
  </form>
</LoadingOverlay>

// Interactive dropdowns
<DropdownMenu>
  <DropdownMenuTrigger>Filter Applications</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Status</DropdownMenuLabel>
    <DropdownMenuCheckboxItem 
      checked={filters.pending}
      onCheckedChange={(checked) => setFilters({...filters, pending: checked})}
    >
      Pending
    </DropdownMenuCheckboxItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={() => clearFilters()}>
      Clear All
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

// Enhanced tooltips
<Tooltip content="This action requires admin privileges" side="top">
  <Button disabled>Delete Application</Button>
</Tooltip>
*/