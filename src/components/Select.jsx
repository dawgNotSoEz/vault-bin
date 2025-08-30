import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

const Select = forwardRef(({ 
  className, 
  label,
  error,
  id,
  children,
  ...props 
}, ref) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-zinc-300">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          ref={ref}
          className={cn(
            'w-full appearance-none bg-zinc-900/60 border border-zinc-800 rounded-xl px-3 py-2 pr-8 text-sm text-zinc-100',
            'focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600/50 focus:outline-none',
            'transition-colors duration-200 cursor-pointer',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/50',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
      </div>
      {error && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;