import React, { forwardRef } from 'react';
import { cn } from '../lib/utils';

const Input = forwardRef(({ 
  className, 
  type = 'text',
  label,
  error,
  required = false,
  id,
  ...props 
}, ref) => {
  const inputId = id || props.name || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-zinc-300">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <input
        id={inputId}
        ref={ref}
        type={type}
        className={cn(
          'w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500',
          'focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600/50 focus:outline-none',
          'disabled:opacity-60 disabled:cursor-not-allowed',
          'transition-colors duration-200',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/50',
          className
        )}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;