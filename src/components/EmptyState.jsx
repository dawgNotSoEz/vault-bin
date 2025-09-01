import React from 'react';
import { cn } from '../../lib/utils';
import Box from './Box';
import Button from './Button';

const EmptyState = ({
  icon: IconComponent,
  title,
  description,
  buttonText,
  onButtonClick,
  className,
  ...props
}) => {
  return (
    <Box className={cn('text-center py-12', className)} {...props}>
      {IconComponent && (
        <IconComponent className="w-16 h-16 text-zinc-500 mx-auto mb-4" />
      )}
      <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
      <p className="text-zinc-400 mb-6">{description}</p>
      {buttonText && onButtonClick && (
        <Button onClick={onButtonClick}>{buttonText}</Button>
      )}
    </Box>
  );
};

export default EmptyState;
