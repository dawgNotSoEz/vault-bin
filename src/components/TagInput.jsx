import React, { useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

const TagInput = ({
  label,
  tags = [],
  onTagsChange,
  placeholder = 'Add tags...',
  className,
  ...props
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (newTag && !tags.includes(newTag)) {
        onTagsChange([...tags, newTag]);
        setInputValue('');
      }
    }
  };

  const removeTag = (tagToRemove) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className={cn('space-y-2', className)} {...props}>
      {label && (
        <label className="block text-sm font-medium text-zinc-300 mb-2">{label}</label>
      )}
      <div className="flex flex-wrap gap-2 p-2 bg-zinc-900/60 border border-zinc-800 rounded-xl">
        {tags.map(tag => (
          <span key={tag} className="flex items-center bg-purple-600/20 text-purple-300 px-2 py-1 rounded-full text-sm">
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-1 text-purple-300 hover:text-white focus:outline-none"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-zinc-100 placeholder:text-zinc-500 min-w-[100px]"
        />
      </div>
    </div>
  );
};

export default TagInput;
