import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { expirationOptions } from '../lib/data';
import { cn } from '../lib/utils';

const ExpirationPicker = ({ 
  value, 
  onChange, 
  className,
  ...props 
}) => {
  const [customDate, setCustomDate] = useState('');
  
  const handleOptionChange = (optionValue) => {
    if (optionValue === 'custom') {
      onChange({ type: 'custom', at: customDate });
    } else {
      const option = expirationOptions.find(opt => opt.value === optionValue);
      const expiresAt = option.duration 
        ? new Date(Date.now() + option.duration).toISOString()
        : null;
      onChange({ type: optionValue, at: expiresAt });
    }
  };
  
  const handleCustomDateChange = (e) => {
    const dateValue = e.target.value;
    setCustomDate(dateValue);
    if (value?.type === 'custom') {
      onChange({ type: 'custom', at: new Date(dateValue).toISOString() });
    }
  };
  
  return (
    <div className={cn('space-y-4', className)} {...props}>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {expirationOptions.map((option) => {
          const isSelected = value?.type === option.value;
          
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleOptionChange(option.value)}
              className={cn(
                'px-3 py-2 text-sm rounded-lg border transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-950',
                isSelected
                  ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                  : 'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/80'
              )}
              aria-pressed={isSelected}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      
      {value?.type === 'custom' && (
        <div className="flex items-center gap-2 p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl">
          <Calendar className="h-4 w-4 text-zinc-400" />
          <input
            type="datetime-local"
            value={customDate}
            onChange={handleCustomDateChange}
            min={new Date().toISOString().slice(0, 16)}
            className="flex-1 bg-transparent text-sm text-zinc-100 focus:outline-none"
            aria-label="Custom expiration date"
          />
        </div>
      )}
    </div>
  );
};

export default ExpirationPicker;