import React from 'react'
import { cn } from '../../lib/utils'
import Box from './Box'

const Stat = ({ 
  label, 
  value, 
  icon: Icon, 
  tone = 'default',
  trend,
  className,
  ...props 
}) => {
  const toneClasses = {
    default: 'text-white',
    success: 'text-emerald-400',
    warning: 'text-amber-400', 
    danger: 'text-red-400',
    info: 'text-blue-400'
  }
  
  const iconBgClasses = {
    default: 'bg-zinc-800/50',
    success: 'bg-emerald-500/10',
    warning: 'bg-amber-500/10',
    danger: 'bg-red-500/10', 
    info: 'bg-blue-500/10'
  }
  
  return (
    <Box 
      variant="glass" 
      padding="md" 
      tone={tone}
      className={cn('text-center', className)} 
      {...props}
    >
      <div className="flex flex-col items-center space-y-3">
        {Icon && (
          <div className={cn(
            'p-3 rounded-xl',
            iconBgClasses[tone]
          )}>
            <Icon className={cn('w-6 h-6', toneClasses[tone])} />
          </div>
        )}
        
        <div className="space-y-1">
          <div className={cn('text-2xl font-bold', toneClasses[tone])}>
            {value}
          </div>
          <div className="text-sm text-zinc-400">
            {label}
          </div>
        </div>
        
        {trend && (
          <div className="flex items-center space-x-1 text-xs">
            <div className={cn(
              'flex items-center space-x-1',
              trend.dir === 'up' ? 'text-emerald-400' : 'text-red-400'
            )}>
              <span>{trend.dir === 'up' ? '↗' : '↘'}</span>
              <span>{trend.value}</span>
            </div>
          </div>
        )}
      </div>
    </Box>
  )
}

export default Stat
