import React from 'react'
import { cn } from '@/lib/utils'

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  striped?: boolean
  hover?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, striped = false, hover = false, size = 'md', ...props }, ref) => {
    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-sm',
      lg: 'text-base'
    }
    
    return (
      <div className="overflow-x-auto">
        <table
          ref={ref}
          className={cn(
            'min-w-full divide-y divide-gray-200',
            sizeClasses[size],
            className
          )}
          {...props}
        />
      </div>
    )
  }
)

Table.displayName = 'Table'

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => {
    return <thead ref={ref} className={cn('bg-gray-50', className)} {...props} />
  }
)

TableHeader.displayName = 'TableHeader'

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => {
    return (
      <tbody
        ref={ref}
        className={cn('bg-white divide-y divide-gray-200', className)}
        {...props}
      />
    )
  }
)

TableBody.displayName = 'TableBody'

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  hover?: boolean
}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, hover = false, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={cn(
          hover && 'hover:bg-gray-50',
          className
        )}
        {...props}
      />
    )
  }
)

TableRow.displayName = 'TableRow'

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableDataCellElement> {}

export const TableCell = React.forwardRef<HTMLTableDataCellElement, TableCellProps>(
  ({ className, ...props }, ref) => {
    return (
      <td
        ref={ref}
        className={cn('px-6 py-4 whitespace-nowrap text-sm text-gray-900', className)}
        {...props}
      />
    )
  }
)

TableCell.displayName = 'TableCell'

export interface TableHeaderCellProps extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {}

export const TableHeaderCell = React.forwardRef<HTMLTableHeaderCellElement, TableHeaderCellProps>(
  ({ className, ...props }, ref) => {
    return (
      <th
        ref={ref}
        className={cn(
          'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
          className
        )}
        {...props}
      />
    )
  }
)

TableHeaderCell.displayName = 'TableHeaderCell'