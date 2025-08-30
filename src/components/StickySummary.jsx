import React from 'react';
import { Clock, Folder, Tag, Paperclip, Users, Eye, Lock } from 'lucide-react';
import Card from './Card';
import Badge from './Badge';
import Button from './Button';
import { formatBytes, estimateSize } from '../lib/utils';
import { cn } from '../lib/utils';

const StickySummary = ({ 
  formData,
  onSaveDraft,
  onCreatePaste,
  draftStatus,
  isCreating = false,
  isSaving = false,
  className,
  ...props 
}) => {
  const {
    title,
    content,
    visibility,
    expires,
    folder,
    tags,
    attachments,
    collaborators
  } = formData;
  
  const totalSize = estimateSize(content || '', attachments || []);
  
  return (
    <div className={cn('lg:sticky lg:top-20', className)} {...props}>
      <Card className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-100 mb-2">
            Summary
          </h3>
          <p className="text-sm text-zinc-400">
            Review your paste details before creating
          </p>
        </div>
        
        <div className="space-y-4">
          {/* Title */}
          <div>
            <h4 className="text-sm font-medium text-zinc-300 mb-1">Title</h4>
            <p className="text-sm text-zinc-100 truncate">
              {title || 'Untitled paste'}
            </p>
          </div>
          
          {/* Visibility */}
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-zinc-300">Visibility</h4>
            <Badge 
              variant={visibility === 'private' ? 'danger' : 'success'}
              className="flex items-center gap-1"
            >
              {visibility === 'private' ? (
                <>
                  <Lock className="h-3 w-3" />
                  Private
                </>
              ) : (
                <>
                  <Eye className="h-3 w-3" />
                  Public
                </>
              )}
            </Badge>
          </div>
          
          {/* Expiration */}
          {expires && (
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-zinc-300">Expiration</h4>
              <Badge variant="warning" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {expires.type === 'permanent' 
                  ? 'Never' 
                  : expires.type === 'custom'
                    ? 'Custom'
                    : expires.type
                }
              </Badge>
            </div>
          )}
          
          {/* Folder */}
          {folder && folder !== 'all' && (
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-zinc-300">Folder</h4>
              <Badge className="flex items-center gap-1 capitalize">
                <Folder className="h-3 w-3" />
                {folder}
              </Badge>
            </div>
          )}
          
          {/* Tags */}
          {tags && tags.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-zinc-300 mb-2">Tags</h4>
              <div className="flex flex-wrap gap-1">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="primary" className="flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* Attachments */}
          {attachments && attachments.length > 0 && (
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-zinc-300">Attachments</h4>
              <Badge className="flex items-center gap-1">
                <Paperclip className="h-3 w-3" />
                {attachments.length} file{attachments.length !== 1 ? 's' : ''}
              </Badge>
            </div>
          )}
          
          {/* Collaborators */}
          {collaborators && collaborators.length > 0 && (
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-zinc-300">Collaborators</h4>
              <Badge className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {collaborators.length} user{collaborators.length !== 1 ? 's' : ''}
              </Badge>
            </div>
          )}
          
          {/* Size estimate */}
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-zinc-300">Size</h4>
            <span className="text-sm text-zinc-400">
              ~{formatBytes(totalSize)}
            </span>
          </div>
        </div>
        
        {/* Draft status */}
        {draftStatus && (
          <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-sm text-green-300 font-medium">
              ✓ {draftStatus}
            </p>
          </div>
        )}
        
        {/* Actions */}
        <div className="space-y-3 pt-4 border-t border-zinc-800">
          <Button
            variant="ghost"
            onClick={onSaveDraft}
            disabled={isSaving || !content?.trim()}
            loading={isSaving}
            className="w-full"
          >
            {isSaving ? 'Saving...' : 'Save Draft'}
          </Button>
          
          <Button
            variant="primary"
            onClick={onCreatePaste}
            disabled={isCreating || !title?.trim() || !content?.trim()}
            loading={isCreating}
            className="w-full"
          >
            {isCreating ? 'Creating...' : 'Create Paste'}
          </Button>
        </div>
        
        {/* Keyboard shortcut hint */}
        <div className="text-xs text-zinc-500 text-center">
          <p>Press Ctrl+S to save draft</p>
        </div>
      </Card>
    </div>
  );
};

export default StickySummary;