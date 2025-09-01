import React from 'react';
import Card from './Card';
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
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-zinc-100">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-zinc-400">
            {description}
          </p>
        )}
      </div>
      <Card className="p-6 sm:p-7">
        {children}
      </Card>
    </div>
  );
};

export default FormSection;
