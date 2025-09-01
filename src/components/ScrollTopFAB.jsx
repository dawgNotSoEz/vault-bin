import React from 'react';
import { ChevronUp } from 'lucide-react';
import { cn } from '../../lib/utils';

const ScrollTopFAB = ({
  className,
  onClick,
  ...props
}) => {
  return (
    <button
      className={cn(
        'p-3 rounded-full bg-purple-600 text-white shadow-lg transition-all duration-200',
        'hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900',
        className
      )}
      onClick={onClick}
      aria-label="Scroll to top"
      {...props}
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  );
};

export default ScrollTopFAB;
