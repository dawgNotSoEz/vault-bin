import React from 'react';
import { Clock, Eye, Globe, Lock, EyeOff, Folder } from 'lucide-react';
import { cn } from '@/lib/utils';

const PasteCard = ({ paste, viewMode }) => {
  const getVisibilityIcon = (visibility) => {
    switch (visibility) {
      case 'public':
        return Globe;
      case 'private':
        return Lock;
      case 'unlisted':
        return EyeOff;
      default:
        return Globe;
    }
  };

  const getLanguageColor = (lang) => {
    const colors = {
      javascript: 'bg-yellow-500',
      python: 'bg-blue-500',
      markdown: 'bg-gray-500',
      sql: 'bg-orange-500',
      yaml: 'bg-red-500',
      bash: 'bg-green-500',
      default: 'bg-purple-500'
    };
    return colors[lang] || colors.default;
  };

  const VisibilityIcon = getVisibilityIcon(paste.visibility);

  if (viewMode === 'list') {
    return (
      <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-4 hover:scale-[1.02] transition-all duration-200 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className={cn('w-3 h-3 rounded-full', getLanguageColor(paste.lang))} />
            <div className="flex-1">
              <h3 className="text-white font-semibold">{paste.title}</h3>
              <div className="flex items-center gap-4 text-sm text-neutral-400 mt-1">
                <span className="flex items-center gap-1">
                  <Folder className="h-3 w-3" />
                  {paste.folder}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {paste.created}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {paste.views} views
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <VisibilityIcon className="h-4 w-4 text-neutral-400" />
            <span className="text-sm text-neutral-400 bg-neutral-700 px-2 py-1 rounded-lg">
              {paste.lang}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-200 shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className={cn('w-4 h-4 rounded-full', getLanguageColor(paste.lang))} />
        <VisibilityIcon className="h-4 w-4 text-neutral-400" />
      </div>

      <h3 className="text-white font-semibold text-lg mb-2">{paste.title}</h3>
      
      <div className="space-y-2 text-sm text-neutral-400">
        <div className="flex items-center gap-2">
          <Folder className="h-3 w-3" />
          <span>{paste.folder}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock className="h-3 w-3" />
          <span>Created {paste.created}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Eye className="h-3 w-3" />
          <span>{paste.views} views</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-neutral-700 flex items-center justify-between">
        <span className="text-sm text-neutral-400 bg-neutral-700 px-2 py-1 rounded-lg">
          {paste.lang}
        </span>
        <span className="text-xs text-neutral-500">
          Expires in {paste.expires}
        </span>
      </div>
    </div>
  );
};

export default PasteCard;