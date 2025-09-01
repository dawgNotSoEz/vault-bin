import React from 'react';
import { cn } from '@/lib/utils';
import Box from '@/components/Box';

const StatCard = ({
  title,
  value,
  className,
  ...props
}) => {
  return (
    <Box
      variant="glass"
      padding="md"
      className={cn('text-center', className)}
      {...props}
    >
      <div className="flex flex-col items-center space-y-2">
        <div className="text-2xl font-bold text-white">
          {value}
        </div>
        <div className="text-sm text-zinc-400">
          {title}
        </div>
      </div>
    </Box>
  );
};

export default StatCard;
