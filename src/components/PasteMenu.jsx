import React, { useState, useRef, useEffect } from 'react';
import { Icon } from './Icon';
import { useToast } from '../context/ToastContext';

export const PasteMenu = ({ paste, onEdit, onDelete, onDuplicate, onMove, onToggleVisibility, onSetPassword, onChangeExpiration, onCopyLink }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { success, error } = useToast();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleAction = (action, label) => {
    setIsOpen(false);
    action();
    success(`${label} completed`);
  };

  const menuItems = [
    {
      label: 'View',
      icon: 'eye',
      action: () => window.location.href = `/p/${paste.id}`
    },
    {
      label: 'Copy Link',
      icon: 'link',
      action: () => handleAction(() => {
        navigator.clipboard.writeText(`${window.location.origin}/p/${paste.id}`);
      }, 'Link copied')
    },
    {
      label: 'Duplicate',
      icon: 'copy',
      action: () => handleAction(onDuplicate, 'Paste duplicated')
    },
    {
      label: 'Move to Folder',
      icon: 'folder-plus',
      action: () => handleAction(onMove, 'Moved to folder')
    },
    {
      label: paste.passwordProtected ? 'Remove Password' : 'Set Password',
      icon: paste.passwordProtected ? 'unlock' : 'lock',
      action: () => handleAction(onSetPassword, paste.passwordProtected ? 'Password removed' : 'Password set')
    },
    {
      label: 'Change Expiration',
      icon: 'clock',
      action: () => handleAction(onChangeExpiration, 'Expiration updated')
    },
    {
      label: 'Delete',
      icon: 'trash-2',
      action: () => {
        if (window.confirm('Are you sure you want to delete this paste?')) {
          handleAction(onDelete, 'Paste deleted');
        }
      },
      danger: true
    }
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-2 rounded-lg hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
        aria-label="More options"
      >
        <Icon name="more-horizontal" size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-xl py-2 z-50">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className={`w-full px-4 py-2 text-left text-sm flex items-center gap-3 hover:bg-white/10 transition-colors ${
                item.danger ? 'text-red-400 hover:text-red-300' : 'text-gray-300 hover:text-white'
              }`}
            >
              <Icon name={item.icon} size={16} />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PasteMenu;
