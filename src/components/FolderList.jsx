import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/Icon';
import { cn } from '@/lib/utils';

const FolderList = ({ folders, activeFolder, onFolderSelect }) => {
  const [hoveredFolder, setHoveredFolder] = useState(null);
  const [showMenu, setShowMenu] = useState(null);
  const navigate = useNavigate();

  const handleFolderClick = (folderId) => {
    onFolderSelect(folderId);
    if (folderId !== 'all') {
      navigate(`/folders/${folderId}`);
    } else {
      navigate('/');
    }
  };

  const getFolderIcon = (folderId) => {
    switch (folderId) {
      case 'all':
        return 'folder-open';
      case 'work':
        return 'briefcase';
      case 'personal':
        return 'user';
      case 'projects':
        return 'folder';
      default:
        return 'folder';
    }
  };

  return (
    <div className="bg-zinc-900/80 border border-zinc-700/50 rounded-2xl p-6 backdrop-blur-sm h-fit">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">Folders</h3>
        <button 
          onClick={() => setShowMenu(showMenu === 'settings' ? null : 'settings')}
          className="p-2 rounded-lg hover:bg-zinc-800/60 text-zinc-400 hover:text-white transition-all"
        >
          <Icon name="settings" className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>

      {showMenu === 'settings' && (
        <div className="absolute right-6 mt-2 w-48 bg-zinc-800 border border-zinc-700/50 rounded-xl shadow-soft py-2 z-50">
          <button className="block w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700/50 hover:text-white transition-all">
            Create folder
          </button>
          <button className="block w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700/50 hover:text-white transition-all">
            Rename
          </button>
          <button className="block w-full text-left px-4 py-2 text-sm text-zinc-400 cursor-not-allowed">
            Delete
          </button>
          <hr className="border-zinc-700/50 my-2" />
          <button 
            onClick={() => navigate('/settings')}
            className="block w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700/50 hover:text-white transition-all"
          >
            Manage folders
          </button>
        </div>
      )}

      <div className="space-y-2">
        {folders.map(folder => (
          <button
            key={folder.id}
            onClick={() => handleFolderClick(folder.id)}
            onMouseEnter={() => setHoveredFolder(folder.id)}
            onMouseLeave={() => setHoveredFolder(null)}
            className={cn(
              'w-full flex items-center justify-between p-3 rounded-xl text-left transition-all group',
              activeFolder === folder.id
                ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30 shadow-glow'
                : 'text-zinc-300 hover:bg-zinc-800/60 hover:text-white'
            )}
          >
            <div className="flex items-center space-x-3">
              <Icon 
                name={getFolderIcon(folder.id)} 
                className={cn(
                  'h-5 w-5 transition-colors',
                  activeFolder === folder.id 
                    ? 'text-brand-400' 
                    : 'text-zinc-400 group-hover:text-zinc-300'
                )} 
                strokeWidth={1.5}
              />
              <span className="font-medium">{folder.name}</span>
            </div>
            <div className={cn(
              'px-3 py-1 rounded-full text-xs font-semibold transition-colors',
              activeFolder === folder.id
                ? 'bg-brand-500/30 text-brand-200'
                : 'bg-zinc-700/60 text-zinc-400 group-hover:bg-zinc-600/60 group-hover:text-zinc-300'
            )}>
              {folder.count}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FolderList;
