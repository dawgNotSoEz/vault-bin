import React, { useState } from 'react';
import { Plus, Grid, List, BarChart3, Clock, Folder, Globe, Lock, Eye, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { demoPastes, getStats } from '@/lib/demoData';
import SimpleSyntaxHighlighter from '@/components/SimpleSyntaxHighlighter';

// Paste Card Component
const PasteCard = ({ paste, viewMode }) => {
  const getVisibilityIcon = (visibility) => {
    switch (visibility) {
      case 'public':
        return <Globe className="h-4 w-4 text-green-400" />;
      case 'private':
        return <Lock className="h-4 w-4 text-red-400" />;
      default:
        return <Globe className="h-4 w-4 text-yellow-400" />;
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
      jsx: 'bg-cyan-500',
      default: 'bg-indigo-500'
    };
    return colors[lang] || colors.default;
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-gradient-to-r from-neutral-800/80 to-neutral-700/60 border border-neutral-600/50 rounded-2xl p-4 hover:scale-[1.02] hover:shadow-lg transition-all duration-200 backdrop-blur-sm">
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
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {paste.views || 0}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {getVisibilityIcon(paste.visibility)}
            <span className="text-sm text-neutral-400 bg-neutral-700/60 px-3 py-1 rounded-lg border border-neutral-600/50">
              {paste.language}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-neutral-800/80 to-neutral-700/60 border border-neutral-600/50 rounded-2xl p-6 hover:scale-[1.02] hover:shadow-xl transition-all duration-200 backdrop-blur-sm">
      <div className="flex items-start justify-between mb-4">
        <div className={cn('w-4 h-4 rounded-full', getLanguageColor(paste.language))} />
        <div className="flex items-center gap-2">
          {getVisibilityIcon(paste.visibility)}
          <Heart className="h-4 w-4 text-neutral-400 hover:text-red-400 cursor-pointer transition-colors" />
        </div>
      </div>

      <h3 className="text-white font-semibold text-lg mb-3">{paste.title}</h3>
      
      {/* Code Preview */}
      <div className="mb-4 rounded-xl overflow-hidden">
        <div className="bg-neutral-900/60 p-3 text-xs font-mono text-neutral-300 leading-relaxed max-h-24 overflow-hidden">
          {paste.content.split('\n').slice(0, 4).join('\n')}
          {paste.content.split('\n').length > 4 && '...'}
        </div>
      </div>
      
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
          <Eye className="h-3 w-3" />
          <span>{paste.views || 0} views</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-neutral-600/50 flex items-center justify-between">
        <span className="text-sm text-neutral-400 bg-neutral-700/60 px-3 py-1 rounded-lg border border-neutral-600/50">
          {paste.language}
        </span>
        <span className="text-xs text-neutral-500 capitalize">
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
  const stats = getStats() || {};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-neutral-400 mt-1">Manage your pastes and view analytics</p>
        </div>
        
        <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-2xl transition-all duration-200 hover:scale-105 shadow-lg">
          <Plus className="h-5 w-5" />
          New Paste
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-purple-600/20 to-purple-700/20 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-purple-300 mb-2">Total Pastes</h3>
          <p className="text-3xl font-bold text-white">{stats.totalPastes || 0}</p>
          <p className="text-sm text-purple-400 mt-1">+{stats.weeklyGrowth || 0} this week</p>
        </div>
        <div className="bg-gradient-to-br from-green-600/20 to-green-700/20 border border-green-500/30 rounded-2xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-green-300 mb-2">Total Views</h3>
          <p className="text-3xl font-bold text-white">{stats.totalViews || 0}</p>
          <p className="text-sm text-green-400 mt-1">+{stats.monthlyGrowth || 0} this month</p>
        </div>
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-700/20 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-blue-300 mb-2">Folders</h3>
          <p className="text-3xl font-bold text-white">{stats.totalFolders || 0}</p>
          <p className="text-sm text-blue-400 mt-1">Organized</p>
        </div>
        <div className="bg-gradient-to-br from-orange-600/20 to-orange-700/20 border border-orange-500/30 rounded-2xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-orange-300 mb-2">Likes</h3>
          <p className="text-3xl font-bold text-white">{stats.totalLikes || 0}</p>
          <p className="text-sm text-orange-400 mt-1">Received</p>
        </div>
      </div>

      {/* Stats Panel (Toggleable) */}
      {showStats && (
        <div className="bg-gradient-to-br from-neutral-800/80 to-neutral-700/60 border border-neutral-600/50 rounded-2xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {stats.recentActivity?.slice(0, 5).map((activity, index) => (
              <div key={activity.id || index} className="flex items-center gap-4 p-3 bg-neutral-700/40 rounded-xl border border-neutral-600/30">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-white">
                    {activity.user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">
                    <span className="font-medium">{activity.user?.name}</span> {activity.type.replace('_', ' ')} "{activity.title}"
                  </p>
                  <p className="text-xs text-neutral-400">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-between bg-gradient-to-r from-neutral-800/80 to-neutral-700/60 border border-neutral-600/50 rounded-2xl p-4 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200',
              viewMode === 'grid' 
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg' 
                : 'text-neutral-400 hover:text-white hover:bg-neutral-700/60'
            )}
          >
            <Grid className="h-4 w-4" />
            Grid
          </button>
          
          <button
            onClick={() => setViewMode('list')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200',
              viewMode === 'list' 
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg' 
                : 'text-neutral-400 hover:text-white hover:bg-neutral-700/60'
            )}
          >
            <List className="h-4 w-4" />
            List
          </button>
        </div>

        <button
          onClick={() => setShowStats(!showStats)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105',
            showStats 
              ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg' 
              : 'text-neutral-400 hover:text-white hover:bg-neutral-700/60 border border-neutral-600/50'
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
            <div className="bg-gradient-to-br from-neutral-800/60 to-neutral-700/40 border border-neutral-600/50 rounded-2xl p-12 backdrop-blur-sm">
              <p className="text-neutral-400 text-lg mb-4">No pastes found</p>
              <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-2xl transition-all duration-200 hover:scale-105">
                Create your first paste
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;