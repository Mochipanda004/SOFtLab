import React from 'react'
import { cn } from '@/lib/utils'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  icon?: React.ReactNode
  dismissible?: boolean
  onDismiss?: () => void
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ 
    className, 
    variant = 'default', 
    icon, 
    dismissible = false, 
    onDismiss,
    children, 
    ...props 
  }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true)
    
    const variantClasses = {
      default: 'bg-gray-50 border-gray-200 text-gray-800',
      primary: 'bg-blue-50 border-blue-200 text-blue-800',
      success: 'bg-green-50 border-green-200 text-green-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      danger: 'bg-red-50 border-red-200 text-red-800'
    }
    
    const handleDismiss = () => {
      setIsVisible(false)
      onDismiss?.()
    }
    
    if (!isVisible) return null
    
    return (
      <div
        ref={ref}
        className={cn(
          'relative border rounded-lg p-4',
          variantClasses[variant],
          className
        )}
        role="alert"
        {...props}
      >
        <div className="flex items-start">
          {icon && (
            <div className="flex-shrink-0 mr-3">
              {icon}
            </div>
          )}
          <div className="flex-1">
            {children}
          </div>
          {dismissible && (
            <button
              type="button"
              className="ml-3 inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={handleDismiss}
              aria-label="Cerrar alerta"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>
    )
  }
)

Alert.displayName = 'Alert'

export interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const AlertTitle = React.forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ className, as: Component = 'h5', children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn('text-sm font-medium mb-1', className)}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

AlertTitle.displayName = 'AlertTitle'

export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const AlertDescription = React.forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p ref={ref} className={cn('text-sm', className)} {...props}>
        {children}
      </p>
    )
  }
)

AlertDescription.displayName = 'AlertDescription'