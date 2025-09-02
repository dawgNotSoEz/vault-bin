import React, { useState } from 'react';
import { Plus, Grid, List, BarChart3, Clock, Folder, Globe, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { demoPastes, demoStats } from '@/lib/demoData';

// Simple PasteCard component to avoid import issues
const PasteCard = ({ paste, viewMode }) => {
  const getVisibilityIcon = (visibility) => {
    switch (visibility) {
      case 'public':
        return Globe;
      case 'private':
        return Lock;
      default:
        return Globe;
    }
  };

  const getLanguageColor = (lang) => {
    const colors = {
      javascript: 'bg-yellow-500',
      typescript: 'bg-blue-500',
      python: 'bg-green-500',
      markdown: 'bg-gray-500',
      sql: 'bg-orange-500',
      yaml: 'bg-red-500',
      bash: 'bg-green-600',
      json: 'bg-purple-500',
      css: 'bg-pink-500',
      default: 'bg-indigo-500'
    };
    return colors[lang] || colors.default;
  };

  const VisibilityIcon = getVisibilityIcon(paste.visibility);

  if (viewMode === 'list') {
    return (
      <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-4 hover:scale-[1.02] transition-all duration-200 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className={cn('w-3 h-3 rounded-full', getLanguageColor(paste.language))} />
            <div className="flex-1">
              <h3 className="text-white font-semibold">{paste.title}</h3>
              <div className="flex items-center gap-4 text-sm text-neutral-400 mt-1">
                <span className="flex items-center gap-1">
                  <Folder className="h-3 w-3" />
                  {paste.folder || 'Uncategorized'}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(paste.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <VisibilityIcon className="h-4 w-4 text-neutral-400" />
            <span className="text-sm text-neutral-400 bg-neutral-700 px-2 py-1 rounded-lg">
              {paste.language}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-200 shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className={cn('w-4 h-4 rounded-full', getLanguageColor(paste.language))} />
        <VisibilityIcon className="h-4 w-4 text-neutral-400" />
      </div>

      <h3 className="text-white font-semibold text-lg mb-2">{paste.title}</h3>
      
      <div className="space-y-2 text-sm text-neutral-400">
        <div className="flex items-center gap-2">
          <Folder className="h-3 w-3" />
          <span>{paste.folder || 'Uncategorized'}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock className="h-3 w-3" />
          <span>Created {new Date(paste.createdAt).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span>{paste.views || 0} views</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-neutral-700 flex items-center justify-between">
        <span className="text-sm text-neutral-400 bg-neutral-700 px-2 py-1 rounded-lg">
          {paste.language}
        </span>
        <span className="text-xs text-neutral-500">
          {paste.visibility}
        </span>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [showStats, setShowStats] = useState(false);

  // Use demo data
  const pastes = demoPastes.slice(0, 6); // Show first 6 pastes
  const stats = demoStats || {};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-neutral-400 mt-1">Manage your pastes and view analytics</p>
        </div>
        
        <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-2xl transition-all duration-200 hover:scale-[1.02] shadow-lg">
          <Plus className="h-4 w-4" />
          New Paste
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Total Pastes</h3>
          <p className="text-3xl font-bold text-purple-400">{stats.totalPastes || 0}</p>
        </div>
        <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Total Views</h3>
          <p className="text-3xl font-bold text-green-400">{stats.totalViews || 0}</p>
        </div>
        <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Total Folders</h3>
          <p className="text-3xl font-bold text-blue-400">{stats.totalFolders || 0}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between bg-neutral-800 rounded-2xl p-4 shadow-lg border border-neutral-700">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200',
              viewMode === 'grid' 
                ? 'bg-purple-600 text-white shadow-lg' 
                : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
            )}
          >
            <Grid className="h-4 w-4" />
            Grid
          </button>
          
          <button
            onClick={() => setViewMode('list')}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200',
              viewMode === 'list' 
                ? 'bg-purple-600 text-white shadow-lg' 
                : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
            )}
          >
            <List className="h-4 w-4" />
            List
          </button>
        </div>

        <button
          onClick={() => setShowStats(!showStats)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 hover:scale-[1.02]',
            showStats 
              ? 'bg-purple-600 text-white shadow-lg' 
              : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
          )}
        >
          <BarChart3 className="h-4 w-4" />
          {showStats ? 'Hide Stats' : 'Show Stats'}
        </button>
      </div>

      {/* Pastes Grid/List */}
      <div className={cn(
        'transition-all duration-300',
        viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
          : 'space-y-4'
      )}>
        {pastes.length > 0 ? (
          pastes.map((paste) => (
            <PasteCard key={paste.id} paste={paste} viewMode={viewMode} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-neutral-400 text-lg">No pastes found</p>
            <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-2xl transition-colors">
              Create your first paste
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;