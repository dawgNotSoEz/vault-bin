import React from 'react';
import { cn } from '../lib/utils';

const Card = ({ 
  className, 
  variant = 'default',
  children, 
  ...props 
}) => {
  const variants = {
    default: 'rounded-2xl border border-zinc-800/70 bg-zinc-950/60 shadow-[0_1px_0_0_rgba(255,255,255,0.02)_inset,0_8px_24px_-12px_rgba(0,0,0,0.8)] hover:border-zinc-700/70 transition-colors duration-200',
    glass: 'rounded-2xl border border-zinc-800/50 bg-zinc-950/30 backdrop-blur-xl shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_8px_32px_-12px_rgba(0,0,0,0.6)]',
    elevated: 'rounded-2xl border border-zinc-800/70 bg-zinc-950/80 shadow-[0_4px_16px_-8px_rgba(0,0,0,0.8),0_1px_0_0_rgba(255,255,255,0.03)_inset]'
  };
  
  return (
    <div
      className={cn(variants[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ className, children, ...props }) => (
  <div className={cn('p-6 pb-4', className)} {...props}>
    {children}
  </div>
);

const CardTitle = ({ className, children, ...props }) => (
  <h3 className={cn('text-lg font-semibold text-zinc-100', className)} {...props}>
    {children}
  </h3>
);

const CardDescription = ({ className, children, ...props }) => (
  <p className={cn('text-sm text-zinc-400 mt-1', className)} {...props}>
    {children}
  </p>
);

const CardContent = ({ className, children, ...props }) => (
  <div className={cn('p-6 pt-0', className)} {...props}>
    {children}
  </div>
);

const CardFooter = ({ className, children, ...props }) => (
  <div className={cn('p-6 pt-0', className)} {...props}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;