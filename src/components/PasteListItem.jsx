import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, Eye, MessageCircle, MoreVertical, Lock, Globe, Shield, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import Icon from '@/components/Icon';

const PasteListItem = ({ paste, mode = 'list', onOpen }) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatExpiration = (expires, createdAt) => {
    if (expires === 'permanent') return 'Permanent';
    
    const created = new Date(createdAt);
    const now = new Date();
    const diffMs = now - created;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (expires === '1d') {
      const remaining = 24 - diffHours;
      return remaining > 0 ? `${remaining}h remaining` : 'Expired';
    }
    if (expires === '7d') {
      const remainingDays = 7 - Math.floor(diffHours / 24);
      return remainingDays > 0 ? `${remainingDays}d remaining` : 'Expired';
    }
    if (expires === '30d') {
      const remainingDays = 30 - Math.floor(diffHours / 24);
      return remainingDays > 0 ? `${remainingDays}d remaining` : 'Expired';
    }
    
    return expires;
  };

  const handleMenuAction = (action) => {
    setShowMenu(false);
    console.log(`${action} paste:`, paste.id);
    // Simulate actions
    switch (action) {
      case 'view':
        navigate(`/p/${paste.id}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(`${window.location.origin}/p/${paste.id}`);
        break;
      case 'duplicate':
        console.log('Duplicating paste...');
        break;
      case 'move':
        console.log('Moving to folder...');
        break;
      case 'password':
        console.log('Setting password...');
        break;
      case 'expiration':
        console.log('Changing expiration...');
        break;
      case 'delete':
        if (confirm('Are you sure you want to delete this paste?')) {
          console.log('Deleting paste...');
        }
        break;
      default:
        break;
    }
  };

  const handleCardClick = () => {
    navigate(`/p/${paste.id}`);
  };

  if (mode === 'grid') {
    return (
      <div 
        onClick={handleCardClick}
        className="bg-zinc-900/80 border border-zinc-700/50 rounded-2xl p-6 backdrop-blur-sm hover:bg-zinc-900/90 hover:border-zinc-600/50 hover:shadow-soft transition-all duration-200 cursor-pointer group"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <Icon name="file-text" className="h-5 w-5 text-zinc-400 flex-shrink-0" strokeWidth={1.5} />
            <h3 className="font-semibold text-white truncate group-hover:text-brand-200 transition-colors">
              {paste.title}
            </h3>
            <div className="flex items-center space-x-2">
              {paste.visibility === 'private' ? (
                <Lock className="h-4 w-4 text-red-400" />
              ) : (
                <Globe className="h-4 w-4 text-green-400" />
              )}
              {paste.passwordProtected && (
                <Shield className="h-4 w-4 text-amber-400" />
              )}
            </div>
          </div>
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="p-2 rounded-lg hover:bg-zinc-800/60 text-zinc-400 hover:text-white transition-all opacity-0 group-hover:opacity-100"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-zinc-800 border border-zinc-700/50 rounded-xl shadow-soft py-2 z-50">
                <button onClick={() => handleMenuAction('view')} className="block w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700/50 hover:text-white transition-all">View</button>
                <button onClick={() => handleMenuAction('copy')} className="block w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700/50 hover:text-white transition-all">Copy Link</button>
                <button onClick={() => handleMenuAction('duplicate')} className="block w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700/50 hover:text-white transition-all">Duplicate</button>
                <button onClick={() => handleMenuAction('move')} className="block w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700/50 hover:text-white transition-all">Move to Folder</button>
                <hr className="border-zinc-700/50 my-2" />
                <button onClick={() => handleMenuAction('password')} className="block w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700/50 hover:text-white transition-all">
                  {paste.passwordProtected ? 'Remove Password' : 'Set Password'}
                </button>
                <button onClick={() => handleMenuAction('expiration')} className="block w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700/50 hover:text-white transition-all">Change Expiration</button>
                <hr className="border-zinc-700/50 my-2" />
                <button onClick={() => handleMenuAction('delete')} className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all">Delete</button>
              </div>
            )}
          </div>
        </div>

        {/* Code Preview */}
        <div className="bg-zinc-800/50 border border-zinc-700/30 rounded-xl p-4 mb-4 font-mono text-sm">
          <div className="text-zinc-300 line-clamp-3">
            {paste.snippetPreview}
          </div>
        </div>

        {/* Meta Row */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-400">{formatDate(paste.createdAt)}</span>
          <div className="flex items-center space-x-3">
            <div className={cn(
              'px-3 py-1 rounded-full text-xs font-medium',
              formatExpiration(paste.expires, paste.createdAt).includes('remaining')
                ? 'bg-amber-500/20 text-amber-300'
                : 'bg-green-500/20 text-green-300'
            )}>
              {formatExpiration(paste.expires, paste.createdAt)}
            </div>
            {paste.tags.length > 0 && (
              <div className="px-3 py-1 bg-brand-500/20 text-brand-300 rounded-full text-xs font-medium">
                {paste.tags[0]}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // List mode - matches the reference screenshot exactly
  return (
    <div 
      onClick={handleCardClick}
      className="bg-zinc-900/80 border border-zinc-700/50 rounded-2xl p-6 backdrop-blur-sm hover:bg-zinc-900/90 hover:border-zinc-600/50 hover:shadow-soft transition-all duration-200 cursor-pointer group"
    >
      {/* Title Row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <Icon name="file-text" className="h-5 w-5 text-zinc-400" strokeWidth={1.5} />
          <h3 className="font-semibold text-white truncate group-hover:text-brand-200 transition-colors">
            {paste.title}
          </h3>
          <div className="flex items-center space-x-2">
            {paste.visibility === 'private' ? (
              <Lock className="h-4 w-4 text-red-400" />
            ) : (
              <Globe className="h-4 w-4 text-green-400" />
            )}
            {paste.passwordProtected && (
              <Shield className="h-4 w-4 text-amber-400" />
            )}
          </div>
        </div>
        
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className="p-2 rounded-lg hover:bg-zinc-800/60 text-zinc-400 hover:text-white transition-all opacity-0 group-hover:opacity-100"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-zinc-800 border border-zinc-700/50 rounded-xl shadow-soft py-2 z-50">
              <button onClick={() => handleMenuAction('view')} className="block w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700/50 hover:text-white transition-all">View</button>
              <button onClick={() => handleMenuAction('copy')} className="block w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700/50 hover:text-white transition-all">Copy Link</button>
              <button onClick={() => handleMenuAction('duplicate')} className="block w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700/50 hover:text-white transition-all">Duplicate</button>
              <button onClick={() => handleMenuAction('move')} className="block w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700/50 hover:text-white transition-all">Move to Folder</button>
              <hr className="border-zinc-700/50 my-2" />
              <button onClick={() => handleMenuAction('password')} className="block w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700/50 hover:text-white transition-all">
                {paste.passwordProtected ? 'Remove Password' : 'Set Password'}
              </button>
              <button onClick={() => handleMenuAction('expiration')} className="block w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700/50 hover:text-white transition-all">Change Expiration</button>
              <hr className="border-zinc-700/50 my-2" />
              <button onClick={() => handleMenuAction('delete')} className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all">Delete</button>
            </div>
          )}
        </div>
      </div>

      {/* Code Preview Strip */}
      <div className="bg-zinc-800/50 border border-zinc-700/30 rounded-xl p-4 mb-4 font-mono text-sm">
        <div className="text-zinc-300">
          {paste.snippetPreview}
        </div>
      </div>

      {/* Meta Row */}
      <div className="flex items-center justify-between">
        <span className="text-zinc-400 text-sm">{formatDate(paste.createdAt)}</span>
        <div className="flex items-center space-x-3">
          <div className={cn(
            'px-3 py-1 rounded-full text-xs font-medium',
            formatExpiration(paste.expires, paste.createdAt).includes('remaining')
              ? 'bg-amber-500/20 text-amber-300'
              : 'bg-green-500/20 text-green-300'
          )}>
            {formatExpiration(paste.expires, paste.createdAt)}
          </div>
          {paste.tags.length > 0 && (
            <div className="px-3 py-1 bg-brand-500/20 text-brand-300 rounded-full text-xs font-medium">
              {paste.tags[0]}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasteListItem;
