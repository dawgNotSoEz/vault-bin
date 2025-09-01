import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Eye, MessageCircle, MoreVertical, Lock, Globe, EyeOff } from 'lucide-react';
import { cn, formatTimeAgo } from '../../lib/utils';
import Box from '../Box';
import Badge from '../Badge';

const PasteCard = ({ 
  mode = 'list', 
  data, 
  onOpen, 
  onMenu,
  className,
  ...props 
}) => {
  const visibilityConfig = {
    public: { icon: Globe, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    private: { icon: Lock, color: 'text-red-400', bg: 'bg-red-500/10' },
    unlisted: { icon: EyeOff, color: 'text-amber-400', bg: 'bg-amber-500/10' }
  };
  
  const config = visibilityConfig[data.visibility] || visibilityConfig.public;
  const VisibilityIcon = config.icon;
  
  if (mode === 'grid') {
    return (
      <Box 
        interactive
        className={cn('p-5 h-full', className)}
        onClick={() => onOpen?.(data)}
        {...props}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-semibold text-white truncate flex-1 mr-2">
              {data.title}
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMenu?.(data);
              }}
              className="p-1 hover:bg-zinc-700/50 rounded transition-colors"
            >
              <MoreVertical className="w-4 h-4 text-zinc-400" />
            </button>
          </div>
          
          <div className="flex items-center space-x-2 mb-3">
            <div className={cn('p-1.5 rounded-md', config.bg)}>
              <VisibilityIcon className={cn('w-3 h-3', config.color)} />
            </div>
            <span className="text-xs text-zinc-400">
              {formatTimeAgo(data.createdAt)}
            </span>
          </div>
          
          <div className="flex-1">
            <div className="text-sm text-zinc-300 line-clamp-3 mb-3 font-mono bg-zinc-800/30 p-2 rounded-lg">
              {data.snippet}
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{data.views}</span>
              </div>
              {data.comments > 0 && (
                <div className="flex items-center space-x-1">
                  <MessageCircle className="w-3 h-3" />
                  <span>{data.comments}</span>
                </div>
              )}
            </div>
            
            {data.folder && (
              <Badge variant="outline" size="sm">
                {data.folder}
              </Badge>
            )}
          </div>
          
          {data.tags && data.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {data.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" size="sm">
                  {tag}
                </Badge>
              ))}
              {data.tags.length > 3 && (
                <Badge variant="outline" size="sm">
                  +{data.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
      </Box>
    );
  }
  
  // List mode - dense layout like the screenshot
  return (
    <Box 
      interactive
      className={cn('p-4', className)}
      onClick={() => onOpen?.(data)}
      {...props}
    >
      <div className="flex items-center space-x-4">
        {/* Title and snippet */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="font-semibold text-white truncate">
              {data.title}
            </h3>
            
            <div className={cn('p-1 rounded', config.bg)}>
              <VisibilityIcon className={cn('w-3 h-3', config.color)} />
            </div>
            
            {data.folder && (
              <Badge variant="outline" size="sm" className="shrink-0">
                {data.folder}
              </Badge>
            )}
          </div>
          
          <div className="text-sm text-zinc-400 font-mono bg-zinc-800/30 px-2 py-1 rounded mb-2 truncate">
            {data.snippet}
          </div>
          
          {data.tags && data.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {data.tags.slice(0, 4).map((tag, index) => (
                <Badge key={index} variant="secondary" size="sm">
                  {tag}
                </Badge>
              ))}
              {data.tags.length > 4 && (
                <Badge variant="outline" size="sm">
                  +{data.tags.length - 4}
                </Badge>
              )}
            </div>
          )}
        </div>
        
        {/* Metadata */}
        <div className="flex items-center space-x-6 text-sm text-zinc-400 shrink-0">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{formatTimeAgo(data.createdAt)}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>{data.views}</span>
          </div>
          
          {data.comments > 0 && (
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>{data.comments}</span>
            </div>
          )}
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMenu?.(data);
            }}
            className="p-1 hover:bg-zinc-700/50 rounded transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Box>
  );
};

export default PasteCard;
