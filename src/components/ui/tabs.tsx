import React from 'react'
import { cn } from '@/lib/utils'

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, defaultValue, value, onValueChange, children, ...props }, ref) => {
    const [activeTab, setActiveTab] = React.useState(defaultValue || '')
    
    const handleTabChange = (newValue: string) => {
      setActiveTab(newValue)
      onValueChange?.(newValue)
    }
    
    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        <TabsContext.Provider value={{ activeTab, onTabChange: handleTabChange }}>
          {children}
        </TabsContext.Provider>
      </div>
    )
  }
)

Tabs.displayName = 'Tabs'

const TabsContext = React.createContext<{
  activeTab: string
  onTabChange: (value: string) => void
}>({ activeTab: '', onTabChange: () => {} })

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex h-10 items-center justify-center rounded-lg bg-gray-100 p-1',
          className
        )}
        role="tablist"
        {...props}
      >
        {children}
      </div>
    )
  }
)

TabsList.displayName = 'TabsList'

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, children, onClick, ...props }, ref) => {
    const { activeTab, onTabChange } = React.useContext(TabsContext)
    const isActive = activeTab === value
    
    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isActive}
        aria-controls={`tab-content-${value}`}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          isActive
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:text-gray-700',
          className
        )}
        onClick={(e) => {
          onTabChange(value)
          onClick?.(e)
        }}
        {...props}
      >
        {children}
      </button>
    )
  }
)

TabsTrigger.displayName = 'TabsTrigger'

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const { activeTab } = React.useContext(TabsContext)
    const isActive = activeTab === value
    
    if (!isActive) return null
    
    return (
      <div
        ref={ref}
        id={`tab-content-${value}`}
        role="tabpanel"
        aria-labelledby={`tab-trigger-${value}`}
        className={cn('mt-4', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

TabsContent.displayName = 'TabsContent'