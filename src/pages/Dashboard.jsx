import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Grid, List, BarChart3, Clock, Folder, Globe, Lock, Eye, Heart, Search, Filter } from 'lucide-react';
import { cn, formatTimeAgo } from '@/lib/utils';
import { demoPastes, demoFolders, getStats, getPastes, updateFolderCounts } from '@/lib/demoData';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import StatsPanel from '@/components/StatsPanel';
import SimpleSyntaxHighlighter from '@/components/SimpleSyntaxHighlighter';

// Paste Card Component
const PasteCard = ({ paste, viewMode, onOpen, onLike }) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  
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

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked(!liked);
    onLike?.(paste.id, !liked);
  };

  const handleClick = () => {
    onOpen?.(paste);
    navigate(`/paste/${paste.id}`);
  };

  const folderName = demoFolders.find(f => f.id === paste.folderId)?.name || 'Uncategorized';

  if (viewMode === 'list') {
    return (
      <div 
        onClick={handleClick}
        className="bg-gradient-to-r from-neutral-800/80 to-neutral-700/60 border border-neutral-600/50 rounded-2xl p-4 hover:scale-[1.02] hover:shadow-lg transition-all duration-200 backdrop-blur-sm cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className={cn('w-3 h-3 rounded-full', getLanguageColor(paste.language))} />
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold truncate group-hover:text-purple-300 transition-colors">{paste.title}</h3>
              <div className="flex items-center gap-4 text-sm text-neutral-400 mt-1">
                <span className="flex items-center gap-1">
                  <Folder className="h-3 w-3" />
                  {folderName}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatTimeAgo(paste.createdAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {paste.views || 0}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              className={cn(
                'flex items-center gap-1 px-2 py-1 rounded-lg transition-colors',
                liked ? 'text-red-400 bg-red-500/20' : 'text-neutral-400 hover:text-red-400'
              )}
            >
              <Heart className={cn('h-3 w-3', liked && 'fill-current')} />
              <span className="text-xs">{(paste.reactionsCount || 0) + (liked ? 1 : 0)}</span>
            </button>
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
    <div 
      onClick={handleClick}
      className="bg-gradient-to-br from-neutral-800/80 to-neutral-700/60 border border-neutral-600/50 rounded-2xl p-6 hover:scale-[1.02] hover:shadow-xl transition-all duration-200 backdrop-blur-sm cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn('w-4 h-4 rounded-full', getLanguageColor(paste.language))} />
        <div className="flex items-center gap-2">
          {getVisibilityIcon(paste.visibility)}
          <button
            onClick={handleLike}
            className={cn(
              'transition-colors',
              liked ? 'text-red-400' : 'text-neutral-400 hover:text-red-400'
            )}
          >
            <Heart className={cn('h-4 w-4', liked && 'fill-current')} />
          </button>
        </div>
      </div>

      <h3 className="text-white font-semibold text-lg mb-3 group-hover:text-purple-300 transition-colors truncate">{paste.title}</h3>
      
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
          <span>{folderName}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock className="h-3 w-3" />
          <span>Created {formatTimeAgo(paste.createdAt)}</span>
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
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <Heart className="h-3 w-3" />
          <span>{(paste.reactionsCount || 0) + (liked ? 1 : 0)}</span>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { success, error } = useToast();
  
  const [viewMode, setViewMode] = useState(() => 
    localStorage.getItem('dashboard_view_mode') || 'grid'
  );
  const [showStats, setShowStats] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Update folder counts on component mount
  useEffect(() => {
    updateFolderCounts();
  }, []);

  // Save view mode preference
  useEffect(() => {
    localStorage.setItem('dashboard_view_mode', viewMode);
  }, [viewMode]);

  // Filter pastes based on search and folder
  const filteredPastes = getPastes({
    folderId: selectedFolder === 'all' ? null : selectedFolder,
    searchQuery: searchQuery.trim()
  });

  const stats = getStats();

  const handleCreatePaste = () => {
    if (!isAuthenticated) {
      error('Please sign in to create pastes');
      return;
    }
    navigate('/create');
  };

  const handleLikePaste = (pasteId, liked) => {
    // TODO: connect backend here
    success(liked ? 'Paste liked!' : 'Like removed');
  };

  const handleOpenPaste = (paste) => {
    // TODO: connect backend here - increment view count
    console.log('Opening paste:', paste.id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-neutral-400 mt-1">
            {isAuthenticated ? `Welcome back, ${user?.name || 'User'}` : 'Manage your pastes and view analytics'}
          </p>
        </div>
        
        <button 
          onClick={handleCreatePaste}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-2xl transition-all duration-200 hover:scale-105 shadow-lg"
        >
          <Plus className="h-5 w-5" />
          New Paste
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Stats Panel (Expandable) */}
      <StatsPanel pastes={filteredPastes} isVisible={showStats} />

      {/* Filters and Controls */}
      <div className="bg-gradient-to-r from-neutral-800/80 to-neutral-700/60 border border-neutral-600/50 rounded-2xl p-4 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search pastes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-neutral-700 border border-neutral-600 rounded-xl text-white placeholder-neutral-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
            />
          </div>

          {/* Folder Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-neutral-400" />
            <select
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
              className="bg-neutral-700 border border-neutral-600 rounded-xl px-3 py-2 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
            >
              <option value="all">All Folders</option>
              {demoFolders.filter(f => f.id !== 'all').map(folder => (
                <option key={folder.id} value={folder.id}>
                  {folder.name} ({folder.count})
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-neutral-700 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all duration-200',
                viewMode === 'grid' 
                  ? 'bg-purple-600 text-white shadow-lg' 
                  : 'text-neutral-400 hover:text-white'
              )}
            >
              <Grid className="h-4 w-4" />
              Grid
            </button>
            
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all duration-200',
                viewMode === 'list' 
                  ? 'bg-purple-600 text-white shadow-lg' 
                  : 'text-neutral-400 hover:text-white'
              )}
            >
              <List className="h-4 w-4" />
              List
            </button>
          </div>

          {/* Stats Toggle */}
          <button
            onClick={() => setShowStats(!showStats)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105',
              showStats 
                ? 'bg-purple-600 text-white shadow-lg' 
                : 'text-neutral-400 hover:text-white hover:bg-neutral-700 border border-neutral-600'
            )}
          >
            <BarChart3 className="h-4 w-4" />
            {showStats ? 'Hide Stats' : 'Show Stats'}
          </button>
        </div>
      </div>

      {/* Results Summary */}
      {(searchQuery || selectedFolder !== 'all') && (
        <div className="text-sm text-neutral-400">
          Found {filteredPastes.length} paste{filteredPastes.length !== 1 ? 's' : ''}
          {searchQuery && ` matching "${searchQuery}"`}
          {selectedFolder !== 'all' && ` in ${demoFolders.find(f => f.id === selectedFolder)?.name}`}
        </div>
      )}

      {/* Pastes Grid/List */}
      <div className={cn(
        'transition-all duration-300',
        viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
          : 'space-y-4'
      )}>
        {filteredPastes.length > 0 ? (
          filteredPastes.map((paste) => (
            <PasteCard 
              key={paste.id} 
              paste={paste} 
              viewMode={viewMode} 
              onOpen={handleOpenPaste}
              onLike={handleLikePaste}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="bg-gradient-to-br from-neutral-800/60 to-neutral-700/40 border border-neutral-600/50 rounded-2xl p-12 backdrop-blur-sm">
              {searchQuery || selectedFolder !== 'all' ? (
                <>
                  <p className="text-neutral-400 text-lg mb-4">No pastes found</p>
                  <p className="text-neutral-500 mb-4">Try adjusting your search or filter criteria</p>
                  <div className="flex gap-3 justify-center">
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="px-4 py-2 bg-neutral-600 text-white rounded-lg hover:bg-neutral-500 transition-colors"
                    >
                      Clear Search
                    </button>
                    <button 
                      onClick={() => setSelectedFolder('all')}
                      className="px-4 py-2 bg-neutral-600 text-white rounded-lg hover:bg-neutral-500 transition-colors"
                    >
                      Show All Folders
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-neutral-400 text-lg mb-4">No pastes found</p>
                  <p className="text-neutral-500 mb-6">Get started by creating your first paste</p>
                  <button 
                    onClick={handleCreatePaste}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-2xl transition-all duration-200 hover:scale-105"
                  >
                    Create your first paste
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;