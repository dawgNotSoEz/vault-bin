import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { cn } from '../../lib/utils';

const PasswordField = forwardRef(({
  className,
  label,
  error,
  required = false,
  id,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || props.name || `password-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-zinc-300">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
        <input
          id={inputId}
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          className={cn(
            'w-full pl-10 pr-10 py-2 bg-zinc-900/60 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder:text-zinc-500',
            'focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600/50 focus:outline-none',
            'disabled:opacity-60 disabled:cursor-not-allowed',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/50',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-300 transition-colors"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
      {error && (
        <p id={`${inputId}-error`} className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

PasswordField.displayName = 'PasswordField';

export default PasswordField;
