import React from 'react';
import { List, Grid, Filter, Search } from 'lucide-react';
import { cn } from '../../lib/utils';
import Button from './Button';
import Icon from './Icon';

const FiltersBar = ({
  viewMode = 'list',
  onViewModeChange,
  showFilters = false,
  onToggleFilters,
  searchQuery = '',
  onSearchChange,
  className,
  ...props
}) => {
  return (
    <div className={cn('flex items-center justify-between gap-4', className)} {...props}>
      {/* Search Bar */}
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search pastes..."
            className="w-full pl-10 pr-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-sm text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/60 focus:border-transparent transition-colors"
          />
        </div>
      </div>

      {/* Right side - Controls */}
      <div className="flex items-center space-x-3">
        {/* Filter toggle */}
        <Button
          variant={showFilters ? 'default' : 'secondary'}
          size="sm"
          onClick={onToggleFilters}
          className={cn(
            'p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500/60 focus:ring-offset-2 focus:ring-offset-black',
            showFilters
              ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
              : 'bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 hover:bg-zinc-700/50 hover:text-zinc-300'
          )}
          aria-label="Toggle filters"
        >
          <Filter className="w-4 h-4" />
        </Button>

        {/* View mode toggle */}
        <div className="flex items-center bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-1">
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange?.('list')}
            className={cn(
              'p-1.5 rounded transition-colors focus:outline-none',
              viewMode === 'list'
                ? 'bg-violet-500/20 text-violet-300'
                : 'text-zinc-400 hover:text-zinc-300'
            )}
            aria-label="List view"
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange?.('grid')}
            className={cn(
              'p-1.5 rounded transition-colors focus:outline-none',
              viewMode === 'grid'
                ? 'bg-violet-500/20 text-violet-300'
                : 'text-zinc-400 hover:text-zinc-300'
            )}
            aria-label="Grid view"
          >
            <Grid className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FiltersBar;
