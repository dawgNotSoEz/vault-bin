import React, { useState, useEffect } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './ui/dialog';
import { 
  Plus, 
  Search, 
  FileText, 
  Shield, 
  Settings, 
  History, 
  Download, 
  Upload, 
  Copy, 
  Moon, 
  Sun, 
  GitFork,
  Trash2,
  Lock,
  Key,
  Clock,
  LayoutDashboard,
  Users,
  FolderPlus,
  GitBranch,
  Share2,
  Archive
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: string, data?: any) => void;
}

interface Command {
  id: string;
  label: string;
  icon: React.ReactNode;
  shortcut?: string;
  group: string;
  action: string;
}

export function CommandPalette({ isOpen, onClose, onAction }: CommandPaletteProps) {
  const [searchValue, setSearchValue] = useState('');

  const commands: Command[] = [
    // Navigation
    { 
      id: 'go-dashboard', 
      label: 'Go to Dashboard', 
      icon: <LayoutDashboard className="w-4 h-4" />, 
      shortcut: 'Ctrl+D',
      group: 'Navigate',
      action: 'go-dashboard'
    },
    { 
      id: 'search-pastes', 
      label: 'Search Pastes', 
      icon: <Search className="w-4 h-4" />, 
      shortcut: 'Ctrl+F',
      group: 'Navigate',
      action: 'search-pastes'
    },
    { 
      id: 'recent-pastes', 
      label: 'Recent Pastes', 
      icon: <History className="w-4 h-4" />, 
      shortcut: 'Ctrl+R',
      group: 'Navigate',
      action: 'recent-pastes'
    },

    // Creation
    { 
      id: 'new-paste', 
      label: 'New Paste', 
      icon: <Plus className="w-4 h-4" />, 
      shortcut: 'Ctrl+N',
      group: 'Create',
      action: 'new-paste'
    },
    { 
      id: 'upload-file', 
      label: 'Upload File', 
      icon: <Upload className="w-4 h-4" />, 
      shortcut: 'Ctrl+U',
      group: 'Create',
      action: 'upload-file'
    },
    { 
      id: 'new-collab', 
      label: 'New Collaboration', 
      icon: <Users className="w-4 h-4" />, 
      group: 'Create',
      action: 'new-collaboration'
    },
    { 
      id: 'create-folder', 
      label: 'Create Folder', 
      icon: <FolderPlus className="w-4 h-4" />, 
      group: 'Create',
      action: 'create-folder'
    },

    // Actions
    { 
      id: 'copy-content', 
      label: 'Copy Content', 
      icon: <Copy className="w-4 h-4" />, 
      shortcut: 'Ctrl+C',
      group: 'Actions',
      action: 'copy-content'
    },
    { 
      id: 'download-paste', 
      label: 'Download Paste', 
      icon: <Download className="w-4 h-4" />, 
      shortcut: 'Ctrl+S',
      group: 'Actions',
      action: 'download-paste'
    },
    { 
      id: 'clone-paste', 
      label: 'Clone & Edit', 
      icon: <GitFork className="w-4 h-4" />, 
      group: 'Actions',
      action: 'clone-paste'
    },
    { 
      id: 'share-paste', 
      label: 'Share Paste', 
      icon: <Share2 className="w-4 h-4" />, 
      shortcut: 'Ctrl+Shift+S',
      group: 'Actions',
      action: 'share-paste'
    },
    { 
      id: 'invite-collaborators', 
      label: 'Invite Collaborators', 
      icon: <Users className="w-4 h-4" />, 
      shortcut: 'Ctrl+I',
      group: 'Actions',
      action: 'invite-collaborators'
    },
    { 
      id: 'view-version-history', 
      label: 'View Version History', 
      icon: <GitBranch className="w-4 h-4" />, 
      shortcut: 'Ctrl+H',
      group: 'Actions',
      action: 'view-version-history'
    },

    // Security
    { 
      id: 'add-password', 
      label: 'Add Password Protection', 
      icon: <Lock className="w-4 h-4" />, 
      group: 'Security',
      action: 'add-password'
    },
    { 
      id: 'change-password', 
      label: 'Change Password', 
      icon: <Key className="w-4 h-4" />, 
      group: 'Security',
      action: 'change-password'
    },
    { 
      id: 'set-expiration', 
      label: 'Set Expiration', 
      icon: <Clock className="w-4 h-4" />, 
      group: 'Security',
      action: 'set-expiration'
    },

    // Organization
    { 
      id: 'move-to-folder', 
      label: 'Move to Folder', 
      icon: <Archive className="w-4 h-4" />, 
      group: 'Organize',
      action: 'move-to-folder'
    },

    // Settings
    { 
      id: 'toggle-theme', 
      label: 'Toggle Theme', 
      icon: <Moon className="w-4 h-4" />, 
      shortcut: 'Ctrl+Shift+T',
      group: 'Settings',
      action: 'toggle-theme'
    },
    { 
      id: 'preferences', 
      label: 'Preferences', 
      icon: <Settings className="w-4 h-4" />, 
      shortcut: 'Ctrl+,',
      group: 'Settings',
      action: 'preferences'
    },

    // Destructive
    { 
      id: 'delete-paste', 
      label: 'Delete Paste', 
      icon: <Trash2 className="w-4 h-4" />, 
      group: 'Dangerous',
      action: 'delete-paste'
    },
  ];

  const filteredCommands = commands.filter(command =>
    command.label.toLowerCase().includes(searchValue.toLowerCase()) ||
    command.group.toLowerCase().includes(searchValue.toLowerCase())
  );

  const groupedCommands = filteredCommands.reduce((groups, command) => {
    const group = command.group;
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(command);
    return groups;
  }, {} as Record<string, Command[]>);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (!isOpen) {
          // Open command palette
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCommandSelect = (command: Command) => {
    onAction(command.action, command);
    onClose();
    setSearchValue('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 max-w-2xl">
        <DialogTitle className="sr-only">Command Palette</DialogTitle>
        <DialogDescription className="sr-only">
          Search and execute commands quickly using the command palette
        </DialogDescription>
        <Command className="rounded-lg border shadow-md">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput 
              placeholder="Search commands..." 
              value={searchValue}
              onValueChange={setSearchValue}
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
            <div className="ml-auto flex items-center space-x-2">
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                ⌘K
              </kbd>
            </div>
          </div>
          <CommandList className="max-h-[400px] overflow-y-auto">
            <CommandEmpty>No commands found.</CommandEmpty>
            
            {Object.entries(groupedCommands).map(([groupName, commands]) => (
              <CommandGroup key={groupName} heading={groupName}>
                {commands.map((command) => (
                  <CommandItem
                    key={command.id}
                    onSelect={() => handleCommandSelect(command)}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      {command.icon}
                      <span>{command.label}</span>
                    </div>
                    {command.shortcut && (
                      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        {command.shortcut.replace('Ctrl', '⌘')}
                      </kbd>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}