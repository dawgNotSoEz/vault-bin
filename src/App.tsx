import React, { useState, useEffect } from 'react';
import { Editor } from './components/Editor';
import { LinkShareModal } from './components/LinkShareModal';
import { PasteViewer } from './components/PasteViewer';
import { CollaborationView } from './components/CollaborationView';
import { CommandPalette } from './components/CommandPalette';
import { Dashboard } from './components/Dashboard';
import { InviteCollaborateModal } from './components/InviteCollaborateModal';
import { VersionHistoryView } from './components/VersionHistoryView';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Toaster } from './components/ui/sonner';
import { 
  Shield, 
  Moon, 
  Sun, 
  Command,
  Github,
  Twitter,
  Heart
} from 'lucide-react';
import { toast } from 'sonner';

type ViewMode = 'dashboard' | 'create' | 'view' | 'collaborate';

interface PasteOptions {
  expiration: string;
  password?: string;
  format: string;
  burnAfterReading: boolean;
}

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [currentPasteId, setCurrentPasteId] = useState<string>('');
  const [currentPasteOptions, setCurrentPasteOptions] = useState<PasteOptions | null>(null);
  const [currentPasteContent, setCurrentPasteContent] = useState<string>('');

  // Set dark mode by default and apply to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Command palette keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const generatePasteId = (): string => {
    return Math.random().toString(36).substring(2, 15);
  };

  const handleCreatePaste = (content: string, options: PasteOptions) => {
    const pasteId = generatePasteId();
    setCurrentPasteId(pasteId);
    setCurrentPasteOptions(options);
    setShowLinkModal(true);
    
    toast.success('Secure paste created successfully!');
    
    // Simulate encryption time
    setTimeout(() => {
      toast.success('Content encrypted and ready to share');
    }, 500);
  };

  const handleCommandAction = (action: string, data?: any) => {
    switch (action) {
      case 'go-dashboard':
        setViewMode('dashboard');
        toast.success('Opening dashboard');
        break;
      case 'new-paste':
        setViewMode('create');
        toast.success('Creating new paste');
        break;
      case 'toggle-theme':
        setIsDarkMode(!isDarkMode);
        toast.success(`Switched to ${!isDarkMode ? 'dark' : 'light'} mode`);
        break;
      case 'new-collaboration':
        setViewMode('collaborate');
        setCurrentPasteId(generatePasteId());
        toast.success('Starting collaborative session');
        break;
      case 'search-pastes':
        setViewMode('dashboard');
        toast.success('Opening search in dashboard');
        break;
      case 'recent-pastes':
        setViewMode('dashboard');
        toast.success('Showing recent pastes');
        break;
      case 'invite-collaborators':
        setShowInviteModal(true);
        break;
      case 'view-version-history':
        setShowVersionHistory(true);
        break;
      case 'share-paste':
        setShowLinkModal(true);
        break;
      case 'create-folder':
        toast.info('Create folder functionality coming soon');
        break;
      case 'move-to-folder':
        toast.info('Move to folder functionality coming soon');
        break;
      case 'preferences':
        toast.info('Preferences panel coming soon');
        break;
      default:
        toast.info(`Action: ${action}`);
    }
  };

  const handleViewDemo = () => {
    setCurrentPasteId('demo-paste-123');
    setViewMode('view');
  };

  const handleCollabDemo = () => {
    setCurrentPasteId('collab-demo-456');
    setViewMode('collaborate');
  };

  const renderContent = () => {
    switch (viewMode) {
      case 'dashboard':
        return (
          <Dashboard
            onCreatePaste={() => setViewMode('create')}
            onViewPaste={(id) => {
              setCurrentPasteId(id);
              setViewMode('view');
            }}
            onEditPaste={(id) => {
              setCurrentPasteId(id);
              setViewMode('create');
              toast.success('Opening paste for editing');
            }}
          />
        );
      case 'view':
        return (
          <PasteViewer 
            pasteId={currentPasteId}
            isPasswordProtected={true}
            onClone={() => {
              setViewMode('create');
              toast.success('Paste cloned for editing');
            }}
          />
        );
      case 'collaborate':
        return (
          <CollaborationView 
            pasteId={currentPasteId}
            isOwner={true}
            onInvite={() => setShowInviteModal(true)}
          />
        );
      default:
        return <Editor onCreatePaste={handleCreatePaste} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
  <header style={{backgroundColor: 'var(--background)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 40}}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => setViewMode('dashboard')}
            className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity"
            style={{color: 'var(--foreground)'}}
          >
            <Shield className="w-6 h-6" style={{color: 'var(--primary)'}} />
            VaultBin
          </button>
          
          <div className="flex items-center gap-3">
            {/* Navigation */}
            <div className="hidden md:flex items-center gap-2">
              <Button 
                variant={viewMode === 'dashboard' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setViewMode('dashboard')}
              >
                Dashboard
              </Button>
              <Button 
                variant={viewMode === 'create' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setViewMode('create')}
              >
                Create
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleViewDemo}
              >
                View Demo
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleCollabDemo}
              >
                Collaborate
              </Button>
            </div>
            
            {/* Command Palette Trigger */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCommandPalette(true)}
              className="hidden sm:flex items-center gap-2"
            >
              <Command className="w-3 h-3" />
              <span className="hidden md:inline">Search</span>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                ⌘K
              </kbd>
            </Button>
            
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsDarkMode(!isDarkMode);
                toast.success(`Switched to ${!isDarkMode ? 'dark' : 'light'} mode`);
              }}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="font-bold">VaultBin</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Zero-knowledge, privacy-first secure sharing for the modern web.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  End-to-end encrypted
                </Badge>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Secure text sharing</li>
                <li>File attachments</li>
                <li>Real-time collaboration</li>
                <li>Auto-expiration</li>
                <li>Password protection</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Security</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Zero-knowledge encryption</li>
                <li>Client-side processing</li>
                <li>No server access to content</li>
                <li>Automatic destruction</li>
                <li>Open source</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Connect</h3>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon">
                  <Github className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Twitter className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Made with <Heart className="w-3 h-3 inline text-red-500" /> for privacy
              </p>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 flex items-center justify-between text-xs text-muted-foreground">
            <p>&copy; 2024 VaultBin. Privacy-first by design.</p>
            <div className="flex items-center gap-4">
              <button className="hover:text-foreground">Privacy Policy</button>
              <button className="hover:text-foreground">Terms of Service</button>
              <button className="hover:text-foreground">Security</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LinkShareModal
        isOpen={showLinkModal}
        onClose={() => setShowLinkModal(false)}
        pasteId={currentPasteId}
        hasPassword={!!currentPasteOptions?.password}
        expiration={currentPasteOptions?.expiration || '1d'}
        burnAfterReading={currentPasteOptions?.burnAfterReading || false}
      />

      <CommandPalette
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        onAction={handleCommandAction}
      />

      <InviteCollaborateModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        pasteId={currentPasteId}
        currentUser="You"
      />

      <VersionHistoryView
        isOpen={showVersionHistory}
        onClose={() => setShowVersionHistory(false)}
        pasteId={currentPasteId}
        currentContent={currentPasteContent}
        onRestoreVersion={(versionId, content) => {
          setCurrentPasteContent(content);
          toast.success('Version restored successfully');
        }}
      />

      {/* Toast Notifications */}
      <Toaster 
        position="bottom-right"
        closeButton
        richColors
        theme={isDarkMode ? 'dark' : 'light'}
      />
    </div>
  );
}