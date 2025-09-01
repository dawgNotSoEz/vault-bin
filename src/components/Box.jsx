import React from 'react';
import { cn } from '@/lib/utils';

const Box = ({
  variant = 'glass',
  interactive = false,
  as: Component = 'div',
  padding = 'md',
  tone = 'default',
  className,
  children,
  ...props
}) => {
  const baseClasses = 'rounded-2xl relative';

  const variantClasses = {
    solid: 'bg-zinc-900/80 border border-zinc-800/50',
    glass: 'bg-zinc-900/60 backdrop-blur-xl border border-white/10',
    subtle: 'bg-zinc-950/40 border border-zinc-800/30',
    outline: 'bg-transparent border border-zinc-700/50'
  };

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const toneClasses = {
    default: '',
    success: 'border-emerald-500/20 bg-emerald-500/5',
    warning: 'border-amber-500/20 bg-amber-500/5',
    danger: 'border-red-500/20 bg-red-500/5',
    info: 'border-blue-500/20 bg-blue-500/5'
  };

  const interactiveClasses = interactive
    ? 'transition-all duration-200 hover:scale-[1.01] cursor-pointer hover:bg-zinc-800/60 hover:border-zinc-700/50'
    : '';

  const shadowClasses = 'shadow-[0_1px_0_#ffffff0d_inset,0_1px_3px_#00000066,0_8px_24px_#0000004d]';

  const boxClasses = cn(
    baseClasses,
    variantClasses[variant],
    paddingClasses[padding],
    toneClasses[tone],
    interactiveClasses,
    shadowClasses,
    className
  );

  return (
    <Component className={boxClasses} {...props}>
      {variant === 'glass' && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-t-2xl" />
      )}
      {children}
    </Component>
  );
};

const BoxHeader = ({ className, children, ...props }) => (
  <div className={cn('flex items-center justify-between mb-6', className)} {...props}>
    {children}
  </div>
);

const BoxBody = ({ className, children, ...props }) => (
  <div className={cn('space-y-4', className)} {...props}>
    {children}
  </div>
);

const BoxFooter = ({ className, children, ...props }) => (
  <div className={cn('flex items-center justify-between mt-6 pt-6 border-t border-zinc-800/50', className)} {...props}>
    {children}
  </div>
);

Box.Header = BoxHeader;
Box.Body = BoxBody;
Box.Footer = BoxFooter;

export { Box };
export default Box;
