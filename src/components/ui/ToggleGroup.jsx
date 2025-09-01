import React from 'react';
import { cn } from '../../lib/utils';

const ToggleGroup = ({ 
  value, 
  onValueChange, 
  className,
  children,
  ...props 
}) => {
  return (
    <div
      className={cn('flex', className)}
      role="group"
      {...props}
    >
      {children}
    </div>
  );
};

const ToggleGroupItem = ({ 
  value, 
  children, 
  className,
  pressed,
  onPressedChange,
  ...props 
}) => {
  return (
    <button
      type="button"
      className={cn(
        'px-3 py-2 text-sm font-medium transition-colors duration-200',
        'border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-950',
        'first:rounded-l-lg last:rounded-r-lg -ml-px first:ml-0',
        pressed
          ? 'bg-indigo-600 text-white border-indigo-600 z-10'
          : 'bg-zinc-900/60 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100',
        className
      )}
      aria-pressed={pressed}
      onClick={() => onPressedChange(!pressed)}
      {...props}
    >
      {children}
    </button>
  );
};

ToggleGroup.Item = ToggleGroupItem;

export default ToggleGroup;
