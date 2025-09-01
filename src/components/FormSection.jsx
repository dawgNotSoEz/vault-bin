import React from 'react';
import { cn } from '../../lib/utils';

const FormSection = ({
  title,
  description,
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('space-y-4', className)} {...props}>
      {title && (
        <h2 className="text-xl font-bold text-white">{title}</h2>
      )}
      {description && (
        <p className="text-zinc-400 text-sm">{description}</p>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default FormSection;
