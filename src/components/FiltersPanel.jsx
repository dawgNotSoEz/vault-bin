import React, { useState } from 'react';
import { Filter, Calendar, User, FileText, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import Box from '../Box';
import Switch from '../Switch';
import Select from '../Select';

const FiltersPanel = ({
  filters = {},
  onFiltersChange,
  className,
  ...props
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const updateFilter = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearFilter = (key) => {
    const newFilters = { ...localFilters };
    delete newFilters[key];
    setLocalFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearAllFilters = () => {
    setLocalFilters({});
    onFiltersChange?.({});
  };

  const hasActiveFilters = Object.keys(localFilters).length > 0;

  const visibilityOptions = [
    { value: 'public', label: 'Public' },
    { value: 'private', label: 'Private' },
    { value: 'unlisted', label: 'Unlisted' }
  ];

  const languageOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'markdown', label: 'Markdown' },
    { value: 'json', label: 'JSON' }
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ];

  return (
    <Box className={cn('h-fit', className)} {...props}>
      <Box.Header>
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-zinc-400" />
          <h3 className="text-lg font-semibold text-white">Filters</h3>
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
          >
            Clear All
          </button>
        )}
      </Box.Header>

      <Box.Body>
        <div className="space-y-6">
          {/* Visibility Filter */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-3">
              Visibility
            </label>
            <div className="space-y-2">
              {visibilityOptions.map((option) => (
                <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localFilters.visibility?.includes(option.value) || false}
                    onChange={(e) => {
                      const current = localFilters.visibility || [];
                      const updated = e.target.checked
                        ? [...current, option.value]
                        : current.filter(v => v !== option.value);
                      updateFilter('visibility', updated.length > 0 ? updated : undefined);
                    }}
                    className="rounded border-zinc-600 bg-zinc-800 text-violet-500 focus:ring-violet-500/60"
                  />
                  <span className="text-sm text-zinc-300">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-3">
              <Calendar className="w-4 h-4 inline mr-2" />
              Date Range
            </label>
            <Select
              options={dateRangeOptions}
              value={localFilters.dateRange || ''}
              onChange={(value) => updateFilter('dateRange', value || undefined)}
              placeholder="Select date range"
            />
            {localFilters.dateRange && (
              <button
                onClick={() => clearFilter('dateRange')}
                className="mt-2 text-xs text-zinc-400 hover:text-zinc-300 flex items-center space-x-1"
              >
                <X className="w-3 h-3" />
                <span>Clear</span>
              </button>
            )}
          </div>

          {/* Language Filter */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-3">
              <FileText className="w-4 h-4 inline mr-2" />
              Language
            </label>
            <Select
              options={languageOptions}
              value={localFilters.language || ''}
              onChange={(value) => updateFilter('language', value || undefined)}
              placeholder="Select language"
            />
            {localFilters.language && (
              <button
                onClick={() => clearFilter('language')}
                className="mt-2 text-xs text-zinc-400 hover:text-zinc-300 flex items-center space-x-1"
              >
                <X className="w-3 h-3" />
                <span>Clear</span>
              </button>
            )}
          </div>

          {/* Has Comments Filter */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-300">
              Has Comments
            </label>
            <Switch
              checked={localFilters.hasComments || false}
              onCheckedChange={(checked) => updateFilter('hasComments', checked || undefined)}
            />
          </div>

          {/* Has Attachments Filter */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-300">
              Has Attachments
            </label>
            <Switch
              checked={localFilters.hasAttachments || false}
              onCheckedChange={(checked) => updateFilter('hasAttachments', checked || undefined)}
            />
          </div>

          {/* Collaborator Filter */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-3">
              <User className="w-4 h-4 inline mr-2" />
              Collaborator
            </label>
            <input
              type="text"
              value={localFilters.collaborator || ''}
              onChange={(e) => updateFilter('collaborator', e.target.value || undefined)}
              placeholder="Filter by collaborator email"
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/60 focus:border-transparent"
            />
            {localFilters.collaborator && (
              <button
                onClick={() => clearFilter('collaborator')}
                className="mt-2 text-xs text-zinc-400 hover:text-zinc-300 flex items-center space-x-1"
              >
                <X className="w-3 h-3" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>
      </Box.Body>
    </Box>
  );
};

export default FiltersPanel;
