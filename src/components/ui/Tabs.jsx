import React, { useState } from 'react';
import { cn } from '../../lib/utils';

const Tabs = ({ 
  defaultValue, 
  value: controlledValue, 
  onValueChange, 
  className,
  children,
  ...props 
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  
  const handleValueChange = (newValue) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };
  
  return (
    <div className={cn('space-y-4', className)} {...props}>
      {React.Children.map(children, child => 
        React.cloneElement(child, { value, onValueChange: handleValueChange })
      )}
    </div>
  );
};

const TabsList = ({ 
  className, 
  value, 
  onValueChange,
  children, 
  ...props 
}) => {
  return (
    <div
      className={cn(
        'inline-flex h-10 items-center justify-center rounded-lg bg-zinc-900/60 p-1 border border-zinc-800',
        className
      )}
      role="tablist"
      {...props}
    >
      {React.Children.map(children, child => 
        React.cloneElement(child, { value, onValueChange })
      )}
    </div>
  );
};

const TabsTrigger = ({ 
  value: tabValue, 
  value: currentValue, 
  onValueChange,
  className,
  children,
  ...props 
}) => {
  const isSelected = currentValue === tabValue;
  
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      onClick={() => onValueChange(tabValue)}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-950',
        isSelected
          ? 'bg-zinc-950 text-zinc-100 shadow-sm'
          : 'text-zinc-400 hover:text-zinc-300',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ 
  value: tabValue, 
  value: currentValue,
  className,
  children,
  ...props 
}) => {
  if (currentValue !== tabValue) return null;
  
  return (
    <div
      className={cn('mt-4', className)}
      role="tabpanel"
      {...props}
    >
      {children}
    </div>
  );
};

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;

export default Tabs;
