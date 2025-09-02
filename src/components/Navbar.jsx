import React from 'react';
import { Link } from 'react-router-dom';
import { Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/ThemeToggle';

const Navbar = () => {
  return (
    <header 
      className="bg-neutral-800 border-b border-neutral-700 px-6 py-4"
      style={{ backgroundColor: '#1f2937', borderBottom: '1px solid #374151', padding: '1rem 1.5rem' }}
    >
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search pastes..."
              className={cn(
                'w-full pl-10 pr-4 py-2 bg-neutral-700 border border-neutral-600 rounded-2xl',
                'text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent',
                'transition-all duration-200'
              )}
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm text-neutral-300 hidden sm:block">Demo User</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
