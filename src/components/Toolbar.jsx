import React from 'react';
import { List, LayoutGrid, Filter, Search, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Icon from '@/components/Icon';

const Toolbar = ({
  viewMode = 'list',
  onViewModeChange,
  showFilters = false,
  onToggleFilters,
  showStats = false,
  onToggleStats,
  searchQuery = '',
  onSearchChange,
  className,
  ...props
}) => {
  return (
    <div className={cn('flex items-center space-x-4', className)} {...props}>
      {/* Search */}
      <div className="relative">
        <Icon name="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" strokeWidth={1.5} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder="Search pastes…"
          className="bg-zinc-800/60 border border-zinc-700/50 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 w-80 transition-all"
        />
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center bg-zinc-800/60 border border-zinc-700/50 rounded-xl p-1">
        <button
          onClick={() => onViewModeChange?.('list')}
          className={cn(
            'p-2 rounded-lg transition-all',
            viewMode === 'list'
              ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30'
              : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-700/50'
          )}
          aria-label="List view"
        >
          <List className="w-4 h-4" strokeWidth={1.5} />
        </button>
        <button
          onClick={() => onViewModeChange?.('grid')}
          className={cn(
            'p-2 rounded-lg transition-all',
            viewMode === 'grid'
              ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30'
              : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-700/50'
          )}
          aria-label="Grid view"
        >
          <LayoutGrid className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>

      {/* Filter Button */}
      <button
        onClick={onToggleFilters}
        className={cn(
          'flex items-center space-x-2 px-4 py-3 rounded-xl transition-all',
          showFilters
            ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30'
            : 'bg-zinc-800/60 text-zinc-400 border border-zinc-700/50 hover:bg-zinc-700/50 hover:text-zinc-300'
        )}
        aria-label="Toggle filters"
      >
        <Filter className="w-4 h-4" strokeWidth={1.5} />
        <span className="text-sm font-medium">Filter</span>
      </button>

      {/* Show Stats Toggle */}
      <button
        onClick={onToggleStats}
        className={cn(
          'flex items-center space-x-2 px-4 py-3 rounded-xl transition-all',
          showStats
            ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30'
            : 'bg-zinc-800/60 text-zinc-400 border border-zinc-700/50 hover:bg-zinc-700/50 hover:text-zinc-300'
        )}
        aria-label="Toggle stats"
      >
        <BarChart3 className="w-4 h-4" strokeWidth={1.5} />
        <span className="text-sm font-medium">Show Stats</span>
      </button>
    </div>
  );
};

export default Toolbar;
