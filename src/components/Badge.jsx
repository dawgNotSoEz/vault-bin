import React from 'react';
import { cn } from '@/lib/utils';

const Badge = ({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}) => {
  const variants = {
    default: 'bg-zinc-900/70 text-zinc-300 ring-1 ring-inset ring-zinc-700',
    primary: 'bg-indigo-500/20 text-indigo-300 ring-1 ring-inset ring-indigo-500/30',
    success: 'bg-emerald-500/20 text-emerald-300 ring-1 ring-inset ring-emerald-500/30',
    warning: 'bg-amber-500/20 text-amber-300 ring-1 ring-inset ring-amber-500/30',
    danger: 'bg-red-500/20 text-red-300 ring-1 ring-inset ring-red-500/30',
    secondary: 'bg-zinc-800/70 text-zinc-400 ring-1 ring-inset ring-zinc-600',
    outline: 'bg-transparent text-zinc-400 ring-1 ring-inset ring-zinc-700/50',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
    xs: 'px-1.5 py-0.5 text-xs',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
