import React, { useState, createContext, useContext } from 'react'
import { cn } from '../../lib/utils'

const TabsContext = createContext()

export function Tabs({ className, defaultValue, value, onValueChange, children, ...props }) {
  const [activeTab, setActiveTab] = useState(value || defaultValue)

  const handleTabChange = (newValue) => {
    if (onValueChange) {
      onValueChange(newValue)
    }
    if (!value) { // Only update internal state if not controlled
      setActiveTab(newValue)
    }
  }

  const contextValue = {
    activeTab: value || activeTab,
    onTabChange: handleTabChange
  }

  return (
    <TabsContext.Provider value={contextValue}>
      <div data-slot="tabs" className={cn('flex flex-col gap-2', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export function TabsList({ className, children, ...props }) {
  return (
    <div
      data-slot="tabs-list"
      role="tablist"
      className={cn('bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function TabsTrigger({ className, value, children, ...props }) {
  const { activeTab, onTabChange } = useContext(TabsContext)
  const isActive = activeTab === value

  return (
    <button
      data-slot="tabs-trigger"
      role="tab"
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      className={cn(
        'inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        isActive
          ? 'bg-background text-foreground shadow-sm dark:bg-input/30 dark:border-input'
          : 'text-muted-foreground hover:text-foreground',
        className
      )}
      onClick={() => onTabChange(value)}
      {...props}
    >
      {children}
    </button>
  )
}

export function TabsContent({ className, value, children, ...props }) {
  const { activeTab } = useContext(TabsContext)
  const isActive = activeTab === value

  if (!isActive) return null

  return (
    <div
      data-slot="tabs-content"
      role="tabpanel"
      className={cn('flex-1 outline-none', className)}
      {...props}
    >
      {children}
    </div>
  )
}
