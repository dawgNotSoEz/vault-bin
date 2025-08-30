import React, { forwardRef } from 'react';
import { cn } from '../lib/utils';

const Button = forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  loading = false,
  children, 
  ...props 
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg hover:from-indigo-400 hover:to-violet-500 hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]',
    secondary: 'bg-zinc-800 border border-zinc-700 text-zinc-100 hover:bg-zinc-700 hover:border-zinc-600',
    ghost: 'text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/50',
    outline: 'border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 hover:border-zinc-600',
    destructive: 'bg-red-600 text-white hover:bg-red-500 shadow-lg'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  return (
    <button
      ref={ref}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;