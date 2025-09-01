import React from 'react';
import { cn } from '../../lib/utils';
import ToggleGroup from './ToggleGroup';

const VisibilityControl = ({
  value,
  onChange,
  className,
  ...props
}) => {
  return (
    <ToggleGroup type="single" value={value} onValueChange={onChange} className={className} {...props}>
      <ToggleGroup.Item value="public">Public</ToggleGroup.Item>
      <ToggleGroup.Item value="private">Private</ToggleGroup.Item>
      <ToggleGroup.Item value="unlisted">Unlisted</ToggleGroup.Item>
    </ToggleGroup>
  );
};

export default VisibilityControl;
