Clean UI component inventory for Campus Placement Portal
=========================================================

CUSTOM-BUILT COMPONENTS (No External Dependencies):
Core Components:
- button.jsx (enhanced with campus-specific variants)
- badge.jsx (with placement status variants) 
- input.jsx (forms with error states)

Card System:
- card.jsx (with interactive variants)
- animated-card.jsx (for landing page transitions)

Form Components:
- select.jsx (custom dropdown with keyboard support)
- switch.jsx (custom toggle with focus states)
- tabs.jsx (custom tabbed interface with context)
- textarea.jsx (multi-line text input)

Display Components:
- avatar.jsx (user profile images with fallback)
- progress.jsx (animated progress bars)

Specialized Components:
- stat-card.jsx (dashboard metrics)
- status-badge.jsx (placement-specific statuses)

ALL COMPONENTS ARE LIGHTWEIGHT CUSTOM IMPLEMENTATIONS
- No Radix UI dependencies (removed 47 packages!)
- Reduced bundle size significantly
- Full control over styling and behavior
- Better performance and faster loading
- textarea.jsx (long text input)
- switch.jsx (toggle controls)

Layout & Navigation:
- tabs.jsx (profile sections)

Animation:
- animated-button.jsx (landing page)

Utility:
- avatar.jsx (user profiles)

Feedback:
- toast.jsx (notifications)

REMOVED (UNUSED):
- checkbox.jsx - No usage found in codebase
- radio-group.jsx - No usage found in codebase
- slider.jsx - No usage found in codebase
- separator.jsx - No usage found in codebase  
- table.jsx - No usage found in codebase
- tooltip.jsx - No usage found in codebase

COMPONENT COUNT: 15 active components (down from 21)
Bundle size optimized by removing 6 unused components.

Guidelines:
- Add new components only when needed for specific features
- Prefer extending existing components before creating new ones
- All components optimized for campus placement portal use cases
- Consistent teal-600/emerald color scheme throughout