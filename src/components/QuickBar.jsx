import React from 'react';
import { cn } from '../../lib/utils';
import Button from './Button';
import Icon from './Icon';

const QuickBar = ({
  className,
  onNewPaste,
  onSearch,
  onSettings,
  ...props
}) => {
  return (
    <div className={cn('flex items-center space-x-2', className)} {...props}>
      <Button onClick={onNewPaste} size="sm" className="flex-1">
        <Icon name="plus" className="w-4 h-4" />
        <span>New Paste</span>
      </Button>
      <Button onClick={onSearch} size="sm" variant="secondary">
        <Icon name="search" className="w-4 h-4" />
      </Button>
      <Button onClick={onSettings} size="sm" variant="secondary">
        <Icon name="settings" className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default QuickBar;
