import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { ChevronDown } from 'lucide-react';

const Select = forwardRef(({
  className,
  options = [],
  placeholder = 'Select an option',
  value,
  onChange,
  ...props
}, ref) => {
  return (
    <div className="relative">
      <select
        ref={ref}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          'w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-100 appearance-none pr-8',
          'focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600/50 focus:outline-none',
          'disabled:opacity-60 disabled:cursor-not-allowed',
          !value && 'text-zinc-500',
          className
        )}
        {...props}
      >
        <option value="" disabled hidden>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
