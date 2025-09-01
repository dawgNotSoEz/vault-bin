import React from 'react';
import { cn } from '../../lib/utils';

const Badge = ({ 
  className, 
  variant = 'default',
  children, 
  ...props 
}) => {
  const variants = {
    default: 'bg-zinc-900/70 text-zinc-300 ring-1 ring-inset ring-zinc-700',
    primary: 'bg-indigo-500/20 text-indigo-300 ring-1 ring-inset ring-indigo-500/30',
    success: 'bg-green-500/20 text-green-300 ring-1 ring-inset ring-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-300 ring-1 ring-inset ring-yellow-500/30',
    danger: 'bg-red-500/20 text-red-300 ring-1 ring-inset ring-red-500/30',
    secondary: 'bg-zinc-800/70 text-zinc-400 ring-1 ring-inset ring-zinc-600'
  };
  
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
