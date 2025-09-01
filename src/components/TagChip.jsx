import React from 'react';
import { cn } from '../../lib/utils';

const TagChip = ({
  tag,
  size = 'md',
  className,
  ...props
}) => {
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
    xs: 'px-1.5 py-0.5 text-xs',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium bg-zinc-800/70 text-zinc-400 ring-1 ring-inset ring-zinc-700/50',
        sizes[size],
        className
      )}
      {...props}
    >
      {tag}
    </span>
  );
};

export default TagChip;
