import React from 'react';
import { Lock, Globe } from 'lucide-react';
import { cn } from '../../lib/utils';

const VisibilityControl = ({ 
  value, 
  onChange, 
  className,
  ...props 
}) => {
  const options = [
    {
      value: 'public',
      label: 'Public',
      icon: Globe,
      description: 'Anyone with the link can view'
    },
    {
      value: 'private',
      label: 'Private',
      icon: Lock,
      description: 'Password required to view'
    }
  ];
  
  return (
    <div className={cn('space-y-3', className)} {...props}>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => {
          const Icon = option.icon;
          const isSelected = value === option.value;
          
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={cn(
                'flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-950',
                isSelected
                  ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300'
                  : 'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/80'
              )}
              aria-pressed={isSelected}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <div>
                <div className="font-medium">{option.label}</div>
                <div className="text-xs text-zinc-500 mt-0.5">
                  {option.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default VisibilityControl;
