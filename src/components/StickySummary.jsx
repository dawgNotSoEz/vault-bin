import React from 'react';
import { cn } from '../../lib/utils';
import Box from './Box';

const StickySummary = ({
  title,
  children,
  className,
  ...props
}) => {
  return (
    <Box
      className={cn(
        'sticky top-0 z-10 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800/50',
        'py-4 px-6 rounded-b-none',
        className
      )}
      {...props}
    >
      <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
      <div>{children}</div>
    </Box>
  );
};

export default StickySummary;
