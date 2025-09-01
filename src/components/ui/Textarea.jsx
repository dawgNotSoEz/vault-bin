import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const Textarea = forwardRef(({ 
  className, 
  label,
  error,
  id,
  rows = 4,
  ...props 
}, ref) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-zinc-300">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        ref={ref}
        rows={rows}
        className={cn(
          'w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500',
          'focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600/50 focus:outline-none',
          'transition-colors duration-200 resize-y',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/50',
          className
        )}
        aria-invalid={error ? 'true' : 'false'}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
