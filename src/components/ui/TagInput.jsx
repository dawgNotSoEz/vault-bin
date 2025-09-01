import React, { useState, useRef } from 'react';
import { X, Plus } from 'lucide-react';
import { maxTags } from '../lib/data';
import { cn, isValidTag } from '../../lib/utils';

const TagInput = ({ 
  value = [], 
  onChange, 
  error,
  className,
  placeholder = "Add tags...",
  ...props 
}) => {
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const inputRef = useRef();
  
  const addTag = (tagText) => {
    const trimmed = tagText.trim().toLowerCase();
    
    if (!trimmed) return;
    
    if (value.length >= maxTags) {
      setInputError(`Maximum ${maxTags} tags allowed`);
      return;
    }
    
    if (value.includes(trimmed)) {
      setInputError('Tag already exists');
      return;
    }
    
    if (!isValidTag(trimmed)) {
      setInputError('Tags can only contain letters, numbers, and dashes');
      return;
    }
    
    onChange([...value, trimmed]);
    setInputValue('');
    setInputError('');
  };
  
  const removeTag = (tagToRemove) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setInputError('');
  };
  
  return (
    <div className={cn('space-y-2', className)} {...props}>
      <div className="flex flex-wrap items-center gap-2 p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl focus-within:border-zinc-600 focus-within:ring-2 focus-within:ring-zinc-600/50 transition-colors duration-200">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded-lg text-xs border border-indigo-500/30"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
              aria-label={`Remove tag ${tag}`}
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        
        <div className="flex items-center gap-2 flex-1 min-w-32">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={value.length === 0 ? placeholder : ''}
            className="flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
            disabled={value.length >= maxTags}
          />
          {inputValue && (
            <button
              type="button"
              onClick={() => addTag(inputValue)}
              className="text-zinc-400 hover:text-zinc-300 transition-colors"
              aria-label="Add tag"
            >
              <Plus className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      
      <div className="flex justify-between text-xs">
        <div>
          {inputError && (
            <span className="text-red-400">{inputError}</span>
          )}
          {error && (
            <span className="text-red-400">{error}</span>
          )}
        </div>
        <span className="text-zinc-500">
          {value.length}/{maxTags}
        </span>
      </div>
      
      {value.length === 0 && (
        <p className="text-xs text-zinc-500">
          Press Enter or comma to add tags. Use letters, numbers, and dashes only.
        </p>
      )}
    </div>
  );
};

export default TagInput;
