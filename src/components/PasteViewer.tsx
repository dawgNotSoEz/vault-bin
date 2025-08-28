import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Separator } from './ui/separator';
import { RichFilePreview } from './RichFilePreview';
import { 
  Lock, 
  Unlock, 
  Copy, 
  Download, 
  GitFork, 
  Clock, 
  Shield, 
  Eye, 
  AlertTriangle,
  FileText,
  Check
} from 'lucide-react';
import { toast } from 'sonner';

interface PasteViewerProps {
  pasteId: string;
  isPasswordProtected: boolean;
  onClone?: () => void;
}

interface FileAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  previewUrl?: string;
}

interface PasteData {
  content: string;
  format: string;
  expiration: string;
  burnAfterReading: boolean;
  files: FileAttachment[];
  createdAt: string;
  views: number;
}

export function PasteViewer({ pasteId, isPasswordProtected, onClone }: PasteViewerProps) {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(!isPasswordProtected);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [pasteData, setPasteData] = useState<PasteData | null>(null);

  // Mock paste data - in real app, this would come from API
  const mockPasteData: PasteData = {
    content: `import React from 'react';
import { Button } from './ui/button';

function SecureComponent() {
  const handleClick = () => {
    console.log('Secure action executed');
  };

  return (
    <div className="p-4">
      <h1>VaultBin Example</h1>
      <p>This is a secure, encrypted paste.</p>
      <Button onClick={handleClick}>
        Execute Action
      </Button>
    </div>
  );
}

export default SecureComponent;`,
    format: 'typescript',
    expiration: '1d',
    burnAfterReading: false,
    files: [
      { 
        id: '1',
        name: 'config.json', 
        size: 1024, 
        type: 'application/json',
        url: '#',
        previewUrl: '#'
      },
      { 
        id: '2',
        name: 'README.md', 
        size: 2048, 
        type: 'text/markdown',
        url: '#',
        previewUrl: '#'
      },
      { 
        id: '3',
        name: 'screenshot.png', 
        size: 524288, 
        type: 'image/png',
        url: '#',
        previewUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop'
      }
    ],
    createdAt: new Date().toISOString(),
    views: 42
  };

  useEffect(() => {
    if (isUnlocked) {
      setPasteData(mockPasteData);
    }
  }, [isUnlocked]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (password === 'demo123') {
        setIsUnlocked(true);
        toast.success('Paste unlocked successfully');
      } else {
        setError('Invalid password. Please try again.');
      }
      setIsLoading(false);
    }, 1000);
  };

  const copyContent = async () => {
    if (!pasteData) return;
    
    try {
      await navigator.clipboard.writeText(pasteData.content);
      setCopied(true);
      toast.success('Content copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy content');
    }
  };

  const getLanguageDisplayName = (format: string) => {
    const formatMap: Record<string, string> = {
      'typescript': 'TypeScript',
      'javascript': 'JavaScript',
      'python': 'Python',
      'rust': 'Rust',
      'go': 'Go',
      'java': 'Java',
      'cpp': 'C++',
      'plaintext': 'Plain Text',
      'markdown': 'Markdown',
      'json': 'JSON',
      'yaml': 'YAML',
      'sql': 'SQL',
      'bash': 'Bash'
    };
    return formatMap[format] || format;
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const created = new Date(dateString);
    const diff = now.getTime() - created.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Less than an hour ago';
    if (hours === 1) return '1 hour ago';
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
  };

  if (!isUnlocked) {
    return (
      <div className="w-full max-w-md mx-auto px-4 py-16">
        <Card className="p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary" />
            </div>
          </div>
          
          <div>
            <h1 className="text-2xl font-bold mb-2">Password Protected</h1>
            <p className="text-muted-foreground">
              This paste is encrypted and requires a password to view.
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-center"
              disabled={isLoading}
            />
            
            {error && (
              <Alert className="border-destructive/20 bg-destructive/10">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <AlertDescription className="text-destructive">{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={!password.trim() || isLoading}
            >
              <Unlock className="w-4 h-4 mr-2" />
              {isLoading ? 'Decrypting...' : 'Unlock Paste'}
            </Button>
          </form>

          <div className="text-xs text-muted-foreground space-y-1">
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-3 h-3" />
              <span>End-to-end encrypted</span>
            </div>
            <p>Paste ID: {pasteId}</p>
          </div>
        </Card>
      </div>
    );
  }

  if (!pasteData) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="space-y-4">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground">Loading paste...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Secure Paste</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>ID: {pasteId}</span>
            <span>•</span>
            <span>{formatTimeAgo(pasteData.createdAt)}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{pasteData.views} views</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={copyContent}>
            {copied ? (
              <Check className="w-4 h-4 mr-2 text-green-500" />
            ) : (
              <Copy className="w-4 h-4 mr-2" />
            )}
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          {onClone && (
            <Button variant="outline" size="sm" onClick={onClone}>
              <GitFork className="w-4 h-4 mr-2" />
              Clone & Edit
            </Button>
          )}
        </div>
      </div>

      {/* Metadata */}
      <div className="flex items-center gap-4 flex-wrap">
        <Badge variant="secondary" className="flex items-center gap-1">
          <FileText className="w-3 h-3" />
          {getLanguageDisplayName(pasteData.format)}
        </Badge>
        
        {pasteData.burnAfterReading ? (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            Burns after reading
          </Badge>
        ) : (
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Expires in {pasteData.expiration === '1d' ? '1 day' : pasteData.expiration}
          </Badge>
        )}
        
        <Badge variant="outline" className="flex items-center gap-1">
          <Shield className="w-3 h-3" />
          End-to-end encrypted
        </Badge>
      </div>

      {/* Content */}
      <Card className="overflow-hidden">
        <div className="bg-muted px-4 py-2 border-b flex items-center justify-between">
          <span className="text-sm font-medium">Content</span>
          <span className="text-xs text-muted-foreground">
            {pasteData.content.split('\n').length} lines, {pasteData.content.length} characters
          </span>
        </div>
        <div className="p-0">
          <pre className="p-6 text-sm overflow-x-auto bg-card text-foreground whitespace-pre-wrap">
            <code 
              className="font-mono"
              style={{ fontFamily: 'JetBrains Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace' }}
            >
              {pasteData.content}
            </code>
          </pre>
        </div>
      </Card>

      {/* Attached Files with Rich Previews */}
      {pasteData.files.length > 0 && (
        <Card className="p-6">
          <RichFilePreview attachments={pasteData.files} />
        </Card>
      )}

      {/* Security Notice */}
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          This paste is secured with zero-knowledge encryption. VaultBin cannot access the content of your pastes.
        </AlertDescription>
      </Alert>
    </div>
  );
}