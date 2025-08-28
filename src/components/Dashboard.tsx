import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Search,
  Plus,
  Filter,
  Grid3X3,
  List,
  Clock,
  Lock,
  Globe,
  MoreHorizontal,
  FolderPlus,
  Folder,
  FileText,
  Eye,
  Copy,
  Edit,
  Trash2,
  Users
} from 'lucide-react';
import { toast } from 'sonner';

interface PasteItem {
  id: string;
  title: string;
  snippet: string;
  createdAt: Date;
  expiresAt?: Date;
  isPasswordProtected: boolean;
  isPublic: boolean;
  collaborators: number;
  folder?: string;
  format: string;
}

interface DashboardProps {
  onCreatePaste: () => void;
  onViewPaste: (id: string) => void;
  onEditPaste: (id: string) => void;
}

export function Dashboard({ onCreatePaste, onViewPaste, onEditPaste }: DashboardProps) {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [pastes, setPastes] = useState<PasteItem[]>([]);
  const [folders, setFolders] = useState<string[]>(['Work', 'Personal', 'Projects']);

  // Mock data - in real app this would come from Supabase
  useEffect(() => {
    const mockPastes: PasteItem[] = [
      {
        id: '1',
        title: 'API Configuration',
        snippet: 'const apiConfig = { baseURL: "https://api.example.com", timeout: 5000 };',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000), // 22 hours from now
        isPasswordProtected: true,
        isPublic: false,
        collaborators: 0,
        folder: 'Work',
        format: 'javascript'
      },
      {
        id: '2',
        title: 'Meeting Notes - Q4 Planning',
        snippet: '# Q4 Planning Meeting\n\n## Attendees\n- John Smith\n- Sarah Connor\n- Mike Johnson',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        isPasswordProtected: false,
        isPublic: true,
        collaborators: 3,
        folder: 'Work',
        format: 'markdown'
      },
      {
        id: '3',
        title: 'Personal Todo List',
        snippet: '- [ ] Buy groceries\n- [ ] Call dentist\n- [x] Complete project proposal',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        expiresAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
        isPasswordProtected: false,
        isPublic: false,
        collaborators: 0,
        folder: 'Personal',
        format: 'markdown'
      },
      {
        id: '4',
        title: 'SQL Query Optimization',
        snippet: 'SELECT u.name, COUNT(o.id) as order_count FROM users u LEFT JOIN orders o ON...',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
        isPasswordProtected: true,
        isPublic: false,
        collaborators: 1,
        folder: 'Projects',
        format: 'sql'
      }
    ];
    setPastes(mockPastes);
  }, []);

  const filteredPastes = pastes.filter(paste => {
    const matchesSearch = paste.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         paste.snippet.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFolder = !selectedFolder || paste.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  const getExpirationStatus = (expiresAt?: Date) => {
    if (!expiresAt) return { status: 'permanent', text: 'Permanent', variant: 'secondary' as const };
    
    const now = new Date();
    const diff = expiresAt.getTime() - now.getTime();
    
    if (diff < 0) return { status: 'expired', text: 'Expired', variant: 'destructive' as const };
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return { status: 'active', text: `${days}d remaining`, variant: 'default' as const };
    } else {
      return { status: 'active', text: `${hours}h remaining`, variant: 'default' as const };
    }
  };

  const handlePasteAction = (action: string, pasteId: string) => {
    switch (action) {
      case 'view':
        onViewPaste(pasteId);
        break;
      case 'edit':
        onEditPaste(pasteId);
        break;
      case 'copy-link':
        navigator.clipboard.writeText(`${window.location.origin}/paste/${pasteId}`);
        toast.success('Link copied to clipboard');
        break;
      case 'delete':
        setPastes(prev => prev.filter(p => p.id !== pasteId));
        toast.success('Paste deleted');
        break;
      default:
        toast.info(`Action: ${action}`);
    }
  };

  const PasteCard = ({ paste }: { paste: PasteItem }) => {
    const expiration = getExpirationStatus(paste.expiresAt);
    
    return (
      <Card className="p-4 hover:bg-accent/50 transition-colors">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <h3 className="font-medium truncate">{paste.title}</h3>
              <div className="flex items-center gap-1 flex-shrink-0">
                {paste.isPasswordProtected && <Lock className="w-3 h-3 text-muted-foreground" />}
                {paste.isPublic ? <Globe className="w-3 h-3 text-muted-foreground" /> : <Lock className="w-3 h-3 text-muted-foreground" />}
                {paste.collaborators > 0 && (
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{paste.collaborators}</span>
                  </div>
                )}
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2 font-mono mb-3">
              {paste.snippet}
            </p>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{paste.createdAt.toLocaleDateString()}</span>
              <Separator orientation="vertical" className="h-3" />
              <Badge variant={expiration.variant} className="text-xs">
                {expiration.text}
              </Badge>
              {paste.folder && (
                <>
                  <Separator orientation="vertical" className="h-3" />
                  <span>{paste.folder}</span>
                </>
              )}
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handlePasteAction('view', paste.id)}>
                <Eye className="w-4 h-4 mr-2" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handlePasteAction('edit', paste.id)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handlePasteAction('copy-link', paste.id)}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Link
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => handlePasteAction('delete', paste.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="mb-2">My Secure Pastes</h1>
          <p className="text-muted-foreground">
            Manage your encrypted pastes and collaborations
          </p>
        </div>
        <Button onClick={onCreatePaste} className="gap-2">
          <Plus className="w-4 h-4" />
          New Paste
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full lg:w-64 space-y-4">
          <Card className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search pastes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Folders</h3>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <FolderPlus className="w-3 h-3" />
              </Button>
            </div>
            <div className="space-y-1">
              <Button
                variant={selectedFolder === null ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedFolder(null)}
                className="w-full justify-start"
              >
                <FileText className="w-4 h-4 mr-2" />
                All Pastes
                <Badge variant="outline" className="ml-auto text-xs">
                  {pastes.length}
                </Badge>
              </Button>
              {folders.map(folder => (
                <Button
                  key={folder}
                  variant={selectedFolder === folder ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedFolder(folder)}
                  className="w-full justify-start"
                >
                  <Folder className="w-4 h-4 mr-2" />
                  {folder}
                  <Badge variant="outline" className="ml-auto text-xs">
                    {pastes.filter(p => p.folder === folder).length}
                  </Badge>
                </Button>
              ))}
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <ScrollArea className="h-[600px]">
            {filteredPastes.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="mb-2">No pastes found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? 'Try adjusting your search terms' : 'Create your first secure paste'}
                </p>
                <Button onClick={onCreatePaste}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Paste
                </Button>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-3'}>
                {filteredPastes.map(paste => (
                  <PasteCard key={paste.id} paste={paste} />
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}