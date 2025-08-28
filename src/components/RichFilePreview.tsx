import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import {
  FileText,
  Image as ImageIcon,
  FileCode,
  File,
  Download,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  X,
  Paperclip
} from 'lucide-react';

interface FileAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  previewUrl?: string;
}

interface RichFilePreviewProps {
  attachments: FileAttachment[];
}

export function RichFilePreview({ attachments }: RichFilePreviewProps) {
  const [selectedFile, setSelectedFile] = useState<FileAttachment | null>(null);
  const [expandedPreview, setExpandedPreview] = useState<string | null>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon className="w-4 h-4" />;
    if (type.includes('pdf')) return <FileText className="w-4 h-4" />;
    if (type.includes('text') || type.includes('json') || type.includes('javascript') || type.includes('typescript')) {
      return <FileCode className="w-4 h-4" />;
    }
    return <File className="w-4 h-4" />;
  };

  const getFileTypeColor = (type: string) => {
    if (type.startsWith('image/')) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    if (type.includes('pdf')) return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    if (type.includes('text') || type.includes('json') || type.includes('javascript') || type.includes('typescript')) {
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
    return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  };

  const canPreview = (type: string) => {
    return type.startsWith('image/') || 
           type.includes('pdf') || 
           type.includes('text') || 
           type.includes('markdown') ||
           type.includes('json') ||
           type.includes('javascript') ||
           type.includes('typescript');
  };

  const renderPreview = (file: FileAttachment) => {
    if (!canPreview(file.type)) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
          {getFileIcon(file.type)}
          <p className="mt-2">Preview not available</p>
          <Button variant="outline" size="sm" className="mt-2">
            <Download className="w-3 h-3 mr-2" />
            Download to view
          </Button>
        </div>
      );
    }

    // Image preview
    if (file.type.startsWith('image/')) {
      return (
        <div className="relative">
          <img
            src={file.previewUrl || file.url}
            alt={file.name}
            className="max-w-full h-auto rounded-lg"
            style={{ maxHeight: expandedPreview === file.id ? 'none' : '400px' }}
          />
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => setExpandedPreview(expandedPreview === file.id ? null : file.id)}
          >
            {expandedPreview === file.id ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>
      );
    }

    // PDF preview (placeholder)
    if (file.type.includes('pdf')) {
      return (
        <div className="border rounded-lg p-6 bg-muted/20">
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <div className="text-center">
              <FileText className="w-12 h-12 mx-auto mb-4" />
              <p className="mb-2">PDF Document</p>
              <p className="text-sm mb-4">{file.name}</p>
              <Button variant="outline" size="sm">
                <Eye className="w-3 h-3 mr-2" />
                View PDF
              </Button>
            </div>
          </div>
        </div>
      );
    }

    // Text/Code preview
    if (file.type.includes('text') || file.type.includes('json') || 
        file.type.includes('javascript') || file.type.includes('typescript') ||
        file.type.includes('markdown')) {
      
      // Mock content - in real app this would fetch the actual file content
      const mockContent = `// ${file.name}
function example() {
  console.log("This is a preview of the file content");
  return {
    message: "File preview",
    size: "${formatFileSize(file.size)}"
  };
}

export default example;`;

      return (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted/50 px-4 py-2 border-b">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm">{file.name}</span>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {file.type.split('/')[1]?.toUpperCase() || 'TEXT'}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setExpandedPreview(expandedPreview === file.id ? null : file.id)}
                >
                  {expandedPreview === file.id ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                </Button>
              </div>
            </div>
          </div>
          <ScrollArea className={expandedPreview === file.id ? 'h-96' : 'h-48'}>
            <pre className="p-4 font-mono text-sm whitespace-pre-wrap">
              {mockContent}
            </pre>
          </ScrollArea>
        </div>
      );
    }

    return null;
  };

  const renderMarkdown = (content: string) => {
    // Simple markdown rendering for demo - in real app use a proper markdown parser
    return (
      <div className="prose dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ 
          __html: content
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            .replace(/\n/gim, '<br>')
        }} />
      </div>
    );
  };

  if (!attachments || attachments.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Paperclip className="w-4 h-4 text-muted-foreground" />
        <span className="font-medium">Attachments</span>
        <Badge variant="outline" className="text-xs">
          {attachments.length}
        </Badge>
      </div>

      {/* File List */}
      <div className="grid gap-3">
        {attachments.map((file) => (
          <Card key={file.id} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {getFileIcon(file.type)}
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{file.name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge className={getFileTypeColor(file.type)} variant="secondary">
                      {file.type.split('/')[1]?.toUpperCase() || 'FILE'}
                    </Badge>
                    <span>{formatFileSize(file.size)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {canPreview(file.type) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedFile(selectedFile?.id === file.id ? null : file)}
                  >
                    <Eye className="w-3 h-3 mr-2" />
                    {selectedFile?.id === file.id ? 'Hide' : 'Preview'}
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  <Download className="w-3 h-3 mr-2" />
                  Download
                </Button>
              </div>
            </div>

            {/* Preview Content */}
            {selectedFile?.id === file.id && (
              <>
                <Separator className="mb-4" />
                {renderPreview(file)}
              </>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}