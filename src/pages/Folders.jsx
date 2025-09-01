import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FolderOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { demoPastes, demoFolders, getPastes } from '@/lib/demoData';

import FolderList from '@/components/FolderList';
import PasteListItem from '@/components/PasteListItem';
import Icon from '@/components/Icon';
import Toolbar from '@/components/Toolbar';

const Folders = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState(localStorage.getItem('dashboardViewMode') || 'list');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showStats] = useState(false); // Stats disabled in folder view

  useEffect(() => {
    localStorage.setItem('dashboardViewMode', viewMode);
  }, [viewMode]);

  const currentFolder = demoFolders.find(folder => folder.slug === slug);
  const folders = demoFolders;

  const filteredPastes = getPastes({
    folderId: slug,
    searchQuery: searchQuery,
  });

  if (!currentFolder) {
    navigate('/');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-white mb-2">{currentFolder.name}</h1>
          <p className="text-zinc-400 text-lg">
            {filteredPastes.length} paste{filteredPastes.length !== 1 ? 's' : ''} in this folder
          </p>
        </div>
        <div className="flex items-center space-x-4 ml-8">
          <Toolbar
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            showFilters={showFilters}
            onToggleFilters={() => setShowFilters(!showFilters)}
            showStats={showStats}
            onToggleStats={() => {}} // Disabled in folder view
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Folders Panel */}
        <div className="lg:col-span-1">
          <FolderList
            folders={folders}
            activeFolder={slug}
            onFolderSelect={(folderId) => {
              if (folderId === 'all') {
                navigate('/');
              } else {
                navigate(`/folders/${folderId}`);
              }
            }}
          />
        </div>

        {/* Paste List/Grid */}
        <div className="lg:col-span-3">
          {filteredPastes.length > 0 ? (
            <div className={cn(
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
                : 'space-y-4'
            )}>
              {filteredPastes.map(paste => (
                <PasteListItem 
                  key={paste.id} 
                  paste={paste} 
                  mode={viewMode} 
                  onOpen={(p) => window.location.href = `/p/${p.id}`} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-zinc-900/80 border border-zinc-700/50 rounded-2xl backdrop-blur-sm">
              <FolderOpen className="w-16 h-16 text-zinc-500 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-white mb-2">No pastes in this folder</h3>
              <p className="text-zinc-400 mb-6">
                {searchQuery ? `No pastes match "${searchQuery}"` : 'This folder is empty'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Folders;