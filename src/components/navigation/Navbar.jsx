import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, Settings } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Create', href: '/create' },
    { name: 'View Demo', href: '/view-demo' },
    { name: 'Collaborate', href: '/collaborate/demo' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="bg-neutral-800/90 backdrop-blur-sm border-b border-neutral-700/50 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href || 
                             (item.href === '/dashboard' && location.pathname === '/');
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                      : 'text-neutral-300 hover:bg-neutral-700/60 hover:text-white'
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input 
                  type="text" 
                  placeholder="Search pastes..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-neutral-700/60 border border-neutral-600/50 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 w-64 transition-all"
                />
              </div>
            </form>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Settings */}
            <Link to="/settings" className="p-2 rounded-xl text-neutral-400 hover:bg-neutral-700/60 hover:text-white transition-all">
              <Settings className="h-5 w-5" />
            </Link>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-white">Demo User</p>
                <p className="text-xs text-neutral-400">demo@vaultbin.dev</p>
              </div>
            </div>

            {/* Auth Links */}
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="px-3 py-1.5 text-sm text-neutral-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white text-sm font-medium rounded-xl transition-all duration-200 hover:scale-105"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
