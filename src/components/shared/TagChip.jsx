import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

const TagChip = ({ 
  children, 
  variant = 'default',
  size = 'md',
  onRemove,
  className,
  ...props 
}) => {
  const variantClasses = {
    default: 'bg-zinc-800/50 text-zinc-300 border-zinc-700/50',
    primary: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
    secondary: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    success: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    danger: 'bg-red-500/10 text-red-300 border-red-500/20'
  };
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };
  
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full border transition-colors',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1.5 hover:bg-white/10 rounded-full p-0.5 transition-colors focus:outline-none focus:ring-1 focus:ring-current"
          aria-label="Remove tag"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
};

export default TagChip;
