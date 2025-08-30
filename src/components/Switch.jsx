import React from 'react';
import { cn } from '../lib/utils';

const Switch = ({ 
  checked, 
  onCheckedChange, 
  className,
  disabled = false,
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...props 
}) => {
  const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <button
      id={switchId}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-950',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        checked
          ? 'bg-indigo-600'
          : 'bg-zinc-700',
        className
      )}
      {...props}
    >
      <span
        className={cn(
          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200',
          checked ? 'translate-x-6' : 'translate-x-1'
        )}
      />
    </button>
  );
};

export default Switch;