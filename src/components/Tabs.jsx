import React from 'react';
import { cn } from '../../lib/utils';

const Tabs = ({
  tabs = [],
  activeTab,
  onTabChange,
  className,
  ...props
}) => {
  return (
    <div className={cn('flex space-x-4 border-b border-zinc-700', className)} {...props}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'py-2 px-4 font-medium transition-colors',
            activeTab === tab.id
              ? 'border-b-2 border-purple-400 text-white'
              : 'text-zinc-400 hover:text-white'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
