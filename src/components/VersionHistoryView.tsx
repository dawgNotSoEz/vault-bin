import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import {
  Clock,
  User,
  RotateCcw,
  GitBranch,
  FileText,
  Plus,
  Minus,
  ArrowLeft
} from 'lucide-react';
import { toast } from 'sonner';

interface VersionHistoryItem {
  id: string;
  timestamp: Date;
  author: string;
  authorAvatar?: string;
  summary: string;
  additions: number;
  deletions: number;
  content: string;
  isCurrent?: boolean;
}

interface DiffLine {
  type: 'unchanged' | 'added' | 'deleted';
  content: string;
  lineNumber?: number;
}

interface VersionHistoryViewProps {
  isOpen: boolean;
  onClose: () => void;
  pasteId: string;
  currentContent: string;
  onRestoreVersion: (versionId: string, content: string) => void;
}

export function VersionHistoryView({
  isOpen,
  onClose,
  pasteId,
  currentContent,
  onRestoreVersion
}: VersionHistoryViewProps) {
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'diff'>('list');

  // Mock version history data
  const versions: VersionHistoryItem[] = [
    {
      id: 'v4',
      timestamp: new Date(),
      author: 'You',
      summary: 'Updated API endpoints and error handling',
      additions: 12,
      deletions: 3,
      content: currentContent,
      isCurrent: true
    },
    {
      id: 'v3',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      author: 'Sarah Connor',
      summary: 'Added authentication middleware',
      additions: 25,
      deletions: 8,
      content: `const apiConfig = {
  baseURL: "https://api.example.com",
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
};

// Authentication middleware
function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}`
    },
    {
      id: 'v2',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      author: 'Mike Johnson',
      summary: 'Fixed timeout configuration',
      additions: 3,
      deletions: 1,
      content: `const apiConfig = {
  baseURL: "https://api.example.com",
  timeout: 5000
};`
    },
    {
      id: 'v1',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      author: 'You',
      summary: 'Initial version',
      additions: 5,
      deletions: 0,
      content: `const apiConfig = {
  baseURL: "https://api.example.com",
  timeout: 10000
};`
    }
  ];

  const generateDiff = (oldContent: string, newContent: string): DiffLine[] => {
    const oldLines = oldContent.split('\n');
    const newLines = newContent.split('\n');
    const diff: DiffLine[] = [];
    
    // Simple diff algorithm for demonstration
    // In a real app, you'd use a proper diff library like 'diff' or 'node-diff3'
    
    let oldIndex = 0;
    let newIndex = 0;
    let lineNumber = 1;
    
    while (oldIndex < oldLines.length || newIndex < newLines.length) {
      if (oldIndex >= oldLines.length) {
        // Only new lines remaining
        diff.push({
          type: 'added',
          content: newLines[newIndex],
          lineNumber: lineNumber++
        });
        newIndex++;
      } else if (newIndex >= newLines.length) {
        // Only old lines remaining
        diff.push({
          type: 'deleted',
          content: oldLines[oldIndex]
        });
        oldIndex++;
      } else if (oldLines[oldIndex] === newLines[newIndex]) {
        // Lines are the same
        diff.push({
          type: 'unchanged',
          content: oldLines[oldIndex],
          lineNumber: lineNumber++
        });
        oldIndex++;
        newIndex++;
      } else {
        // Lines are different - for simplicity, treat as deletion + addition
        diff.push({
          type: 'deleted',
          content: oldLines[oldIndex]
        });
        diff.push({
          type: 'added',
          content: newLines[newIndex],
          lineNumber: lineNumber++
        });
        oldIndex++;
        newIndex++;
      }
    }
    
    return diff;
  };

  const selectedVersionData = selectedVersion ? versions.find(v => v.id === selectedVersion) : null;
  const currentVersionData = versions.find(v => v.isCurrent);
  
  const diffData = selectedVersionData && currentVersionData && selectedVersionData.id !== currentVersionData.id
    ? generateDiff(selectedVersionData.content, currentVersionData.content)
    : [];

  const handleRestoreVersion = (version: VersionHistoryItem) => {
    onRestoreVersion(version.id, version.content);
    toast.success(`Restored to version from ${version.timestamp.toLocaleString()}`);
    onClose();
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-2xl">
        <SheetHeader className="pb-4">
          <div className="flex items-center gap-2">
            {viewMode === 'diff' && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode('list')}
                className="h-8 w-8"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <div className="flex-1">
              <SheetTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Version History
              </SheetTitle>
              <SheetDescription>
                View and restore previous versions of this paste
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        {viewMode === 'list' ? (
          <ScrollArea className="h-full pr-4">
            <div className="space-y-3">
              {versions.map((version, index) => (
                <div
                  key={version.id}
                  className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                    selectedVersion === version.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-accent/50'
                  }`}
                  onClick={() => {
                    setSelectedVersion(version.id);
                    if (!version.isCurrent) {
                      setViewMode('diff');
                    }
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8 bg-muted">
                        {version.author[0]?.toUpperCase()}
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{version.author}</span>
                          {version.isCurrent && (
                            <Badge variant="default" className="text-xs">
                              Current
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatTimestamp(version.timestamp)}
                        </div>
                      </div>
                    </div>
                    {!version.isCurrent && (
                        <Button
                        variant="outline"
                        size="sm"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation();
                          handleRestoreVersion(version);
                        }}
                        >
                        <RotateCcw className="w-3 h-3 mr-2" />
                        Restore
                        </Button>
                    )}
                  </div>

                  <p className="text-sm mb-3">{version.summary}</p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <GitBranch className="w-3 h-3" />
                      {version.id}
                    </div>
                    {version.additions > 0 && (
                      <div className="flex items-center gap-1 text-green-600">
                        <Plus className="w-3 h-3" />
                        {version.additions}
                      </div>
                    )}
                    {version.deletions > 0 && (
                      <div className="flex items-center gap-1 text-red-600">
                        <Minus className="w-3 h-3" />
                        {version.deletions}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="h-full flex flex-col">
            <div className="mb-4 p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Comparing versions</span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {selectedVersionData?.id}
                  </Badge>
                  <span className="text-muted-foreground">→</span>
                  <Badge variant="default" className="text-xs">
                    Current
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Changes from {selectedVersionData?.timestamp.toLocaleString()}
              </p>
            </div>

            <ScrollArea className="flex-1">
              <div className="font-mono text-sm">
                {diffData.map((line, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 px-3 py-1 ${
                      line.type === 'added'
                        ? 'bg-green-50 dark:bg-green-950/20 text-green-800 dark:text-green-400'
                        : line.type === 'deleted'
                        ? 'bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-400'
                        : ''
                    }`}
                  >
                    <div className="w-8 text-right text-muted-foreground text-xs pt-0.5">
                      {line.lineNumber}
                    </div>
                    <div className="w-4 flex-shrink-0 pt-0.5">
                      {line.type === 'added' && (
                        <Plus className="w-3 h-3 text-green-600" />
                      )}
                      {line.type === 'deleted' && (
                        <Minus className="w-3 h-3 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1 whitespace-pre-wrap break-all">
                      {line.content}
                    </div>
                  </div>
                ))}
                
                {diffData.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No changes to display</p>
                  </div>
                )}
              </div>
            </ScrollArea>

            {selectedVersionData && !selectedVersionData.isCurrent && (
              <div className="pt-4 border-t">
                <Button
                  onClick={() => handleRestoreVersion(selectedVersionData)}
                  className="w-full"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Restore This Version
                </Button>
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}