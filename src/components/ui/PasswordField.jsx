import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Input from './Input';
import { cn } from '../../lib/utils';

const PasswordField = ({ 
  value, 
  onChange, 
  error, 
  className,
  placeholder = "Enter password",
  ...props 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Simple password strength calculation
  const getPasswordStrength = (password) => {
    if (!password) return null;
    if (password.length < 6) return 'weak';
    if (password.length < 12) return 'ok';
    return 'strong';
  };
  
  const strength = getPasswordStrength(value);
  
  const strengthColors = {
    weak: 'text-red-400',
    ok: 'text-yellow-400',
    strong: 'text-green-400'
  };
  
  const strengthLabels = {
    weak: 'Weak',
    ok: 'OK',
    strong: 'Strong'
  };
  
  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          type={isVisible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          error={error}
          placeholder={placeholder}
          className={cn('pr-10', className)}
          {...props}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-zinc-300"
          onClick={() => setIsVisible(!isVisible)}
          aria-label={isVisible ? 'Hide password' : 'Show password'}
        >
          {isVisible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      {value && strength && (
        <p className={cn('text-xs', strengthColors[strength])}>
          Password strength: {strengthLabels[strength]}
        </p>
      )}
    </div>
  );
};

export default PasswordField;
