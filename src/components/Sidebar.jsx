import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Home, Plus, Eye, Users, Settings, LogIn, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Create Paste', href: '/create', icon: Plus },
    { name: 'View Demo', href: '/view-demo', icon: Eye },
    { name: 'Collaborate', href: '/collaborate/demo', icon: Users },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const authLinks = [
    { name: 'Login', href: '/login', icon: LogIn },
    { name: 'Sign Up', href: '/signup', icon: UserPlus },
  ];

  return (
    <div className="w-64 bg-neutral-800 border-r border-neutral-700 flex flex-col">
      <div className="p-6">
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <div className="p-2 bg-transparent rounded-2xl group-hover:scale-105 transition-transform">
            <Shield className="h-8 w-8 text-purple-400" />
          </div>
          <span className="text-xl font-bold text-white">VaultBin</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 pb-4">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || 
                           (item.href === '/dashboard' && location.pathname === '/');
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 hover:scale-[1.02]',
                  isActive
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-neutral-300 hover:bg-neutral-700 hover:text-white'
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-700">
          <div className="space-y-1">
            {authLinks.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 hover:scale-[1.02]',
                  location.pathname === item.href
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-neutral-300 hover:bg-neutral-700 hover:text-white'
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
