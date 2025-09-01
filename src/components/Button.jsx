import React from 'react';
import { cn } from '@/lib/utils';

export default function Button({
  children,
  className = '',
  'data-testid': dataTestId,
  variant = 'default',
  size = 'md',
  disabled = false,
  isLoading = false,
  ...props
}) {
  const baseClasses = 'rounded-xl font-medium transition-all duration-200 flex items-center justify-center';

  const variantClasses = {
    default: 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-500/20 focus:ring-purple-500/50',
    secondary: 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500/50',
    outline: 'bg-transparent border border-gray-700 text-gray-300 hover:bg-gray-800 focus:ring-gray-500/50',
    ghost: 'bg-transparent text-gray-300 hover:bg-gray-800 focus:ring-gray-500/50',
    link: 'bg-transparent text-purple-400 hover:text-purple-300 focus:ring-purple-500/50',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-500/20 focus:ring-red-500/50',
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-5 py-3 text-lg',
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && 'opacity-50 cursor-not-allowed',
        isLoading && 'cursor-wait',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900',
        className
      )}
      data-testid={dataTestId}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        children
      )}
    </button>
  );
}
