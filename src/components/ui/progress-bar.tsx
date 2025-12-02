import React from 'react'
import { cn } from '@/lib/utils'

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  labelPosition?: 'inside' | 'outside'
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ 
    className, 
    value, 
    max = 100, 
    variant = 'default', 
    size = 'md', 
    showLabel = false,
    labelPosition = 'inside',
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
    
    const variantClasses = {
      default: 'bg-gray-600',
      primary: 'bg-blue-600',
      success: 'bg-green-600',
      warning: 'bg-yellow-600',
      danger: 'bg-red-600'
    }
    
    const sizeClasses = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3'
    }
    
    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        <div
          className={cn(
            'w-full bg-gray-200 rounded-full overflow-hidden',
            sizeClasses[size]
          )}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={`Progreso: ${percentage}%`}
        >
          <div
            className={cn(
              'h-full rounded-full transition-all duration-300 ease-out',
              variantClasses[variant],
              showLabel && labelPosition === 'inside' && 'relative'
            )}
            style={{ width: `${percentage}%` }}
          >
            {showLabel && labelPosition === 'inside' && (
              <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
                {`${Math.round(percentage)}%`}
              </span>
            )}
          </div>
        </div>
        {showLabel && labelPosition === 'outside' && (
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-600">Progreso</span>
            <span className="text-xs font-medium text-gray-900">{`${Math.round(percentage)}%`}</span>
          </div>
        )}
      </div>
    )
  }
)

ProgressBar.displayName = 'ProgressBar'