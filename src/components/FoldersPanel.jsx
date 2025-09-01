import React from 'react';
import { Plus, Folder, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import Box from '../Box';

const FoldersPanel = ({
  folders = [],
  selectedFolder,
  onFolderSelect,
  onNewFolder,
  className,
  ...props
}) => {
  return (
    <Box className={cn('h-fit', className)} {...props}>
      <Box.Header>
        <h3 className="text-lg font-semibold text-white">Folders</h3>
        <button
          onClick={onNewFolder}
          className="p-2 hover:bg-zinc-700/50 rounded-lg transition-colors"
          aria-label="New folder"
        >
          <Plus className="w-4 h-4 text-zinc-400" />
        </button>
      </Box.Header>

      <Box.Body>
        <div className="space-y-1">
          {folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => onFolderSelect(folder.id)}
              className={cn(
                'w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200',
                'hover:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-violet-500/60 focus:ring-offset-2 focus:ring-offset-black',
                selectedFolder === folder.id
                  ? 'bg-violet-500/10 border border-violet-500/20 text-violet-300'
                  : 'text-zinc-300'
              )}
            >
              <div className="flex items-center space-x-3">
                <Folder className={cn(
                  'w-4 h-4',
                  selectedFolder === folder.id ? 'text-violet-400' : 'text-zinc-400'
                )} />
                <span className="font-medium">{folder.name}</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className={cn(
                  'text-xs px-2 py-1 rounded-full',
                  selectedFolder === folder.id
                    ? 'bg-violet-500/20 text-violet-300'
                    : 'bg-zinc-700/50 text-zinc-400'
                )}>
                  {folder.count}
                </span>

                {folder.hasSubfolders && (
                  <ChevronDown className="w-3 h-3 text-zinc-500" />
                )}
              </div>
            </button>
          ))}
        </div>
      </Box.Body>
    </Box>
  );
};

export default FoldersPanel;
