import React from 'react';
import { cn } from '@/lib/utils';

const ToggleGroup = ({
  children,
  type = 'single', // 'single' or 'multiple'
  value,
  onValueChange,
  className,
  ...props
}) => {
  const handleValueChange = (itemValue) => {
    if (type === 'single') {
      onValueChange(value === itemValue ? undefined : itemValue);
    } else {
      const newValue = new Set(value);
      if (newValue.has(itemValue)) {
        newValue.delete(itemValue);
      } else {
        newValue.add(itemValue);
      }
      onValueChange(Array.from(newValue));
    }
  };

  return (
    <div className={cn('flex bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-1', className)} {...props}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          isActive: type === 'single' ? value === child.props.value : value.includes(child.props.value),
          onClick: () => handleValueChange(child.props.value),
        })
      )}
    </div>
  );
};

const ToggleGroupItem = ({
  children,
  value,
  isActive,
  onClick,
  className,
  ...props
}) => {
  return (
    <button
      type="button"
      className={cn(
        'flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
        isActive ? 'bg-purple-600 text-white' : 'text-zinc-300 hover:bg-zinc-700/50',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

ToggleGroup.Item = ToggleGroupItem;

export default ToggleGroup;
