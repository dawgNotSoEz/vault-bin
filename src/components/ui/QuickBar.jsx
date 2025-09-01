import React from 'react';
import { cn } from '../../lib/utils';

const QuickBar = ({ 
  leftContent, 
  rightContent, 
  className 
}) => {
  return (
    <div
      className={cn(
        'fixed bottom-4 left-1/2 -translate-x-1/2 max-w-screen-lg w-[92%] z-30',
        'rounded-2xl border border-zinc-800/70 bg-zinc-950/80 backdrop-blur shadow-2xl',
        'px-4 py-3',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {leftContent}
        </div>
        <div className="flex items-center gap-3">
          {rightContent}
        </div>
      </div>
    </div>
  );
};

export default QuickBar;
