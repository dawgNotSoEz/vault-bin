import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Home, Plus, Eye, Users, Settings, Folder, Globe, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { demoFolders, getStats } from '@/lib/demoData';

const Sidebar = () => {
  const location = useLocation();
  const stats = getStats() || {};

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Create Paste', href: '/create', icon: Plus },
    { name: 'View Demo', href: '/view-demo', icon: Eye },
    { name: 'Collaborate', href: '/collaborate/demo', icon: Users },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const folders = demoFolders.slice(0, 6); // Show first 6 folders

  return (
    <aside className="w-64 bg-neutral-800/90 backdrop-blur-sm border-r border-neutral-700/50 flex flex-col min-h-screen pt-4">
      {/* Navigation */}
      <nav className="flex-1 px-4 py-2">
        <div className="space-y-1 mb-8">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || 
                           (item.href === '/dashboard' && location.pathname === '/');
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:scale-[1.02]',
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                    : 'text-neutral-300 hover:bg-neutral-700/60 hover:text-white'
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Folders Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">Folders</h3>
            <span className="text-xs text-neutral-500 bg-neutral-700 px-2 py-1 rounded-lg">
              {stats.totalFolders || 0}
            </span>
          </div>
          
          <div className="space-y-1">
            {folders.map((folder) => (
              <Link
                key={folder.id}
                to={`/folder/${folder.slug}`}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl text-neutral-300 hover:bg-neutral-700/60 hover:text-white transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: folder.color || '#6366F1' }}
                  />
                  <span className="text-sm font-medium">{folder.name}</span>
                </div>
                <span className="text-xs text-neutral-500 bg-neutral-700 px-2 py-1 rounded-lg group-hover:bg-neutral-600 transition-colors">
                  {folder.count || 0}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="mt-8 p-4 bg-gradient-to-br from-neutral-800 to-neutral-700 rounded-xl border border-neutral-600/50">
          <h4 className="text-sm font-semibold text-white mb-3">Quick Stats</h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">Total Pastes</span>
              <span className="text-white font-medium">{stats.totalPastes || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">Total Views</span>
              <span className="text-white font-medium">{stats.totalViews || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">This Week</span>
              <span className="text-green-400 font-medium">+{stats.weeklyGrowth || 0}</span>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
