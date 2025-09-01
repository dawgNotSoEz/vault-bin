import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Icon from '@/components/Icon';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setSearchQuery('');
      e.target.blur();
    }
  };

  return (
    <header className="bg-zinc-900/90 backdrop-blur-sm border-b border-zinc-700/30 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand and Navigation */}
          <div className="flex items-center space-x-8">
            <NavLink to="/" className="flex items-center space-x-3">
              <Icon name="shield" className="h-8 w-8 text-brand-400" strokeWidth={1.5} />
              <span className="text-xl font-bold text-white">VaultBin</span>
            </NavLink>
            
            <nav className="hidden md:flex items-center space-x-1">
              <NavLink to="/" className={({ isActive }) => 
                `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30' 
                    : 'text-zinc-300 hover:bg-zinc-800/60 hover:text-white'
                }`
              }>
                Dashboard
              </NavLink>
              <NavLink to="/create" className={({ isActive }) => 
                `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30' 
                    : 'text-zinc-300 hover:bg-zinc-800/60 hover:text-white'
                }`
              }>
                Create
              </NavLink>
              <NavLink to="/demo/demo-paste-123" className={({ isActive }) => 
                `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30' 
                    : 'text-zinc-300 hover:bg-zinc-800/60 hover:text-white'
                }`
              }>
                View Demo
              </NavLink>
              <NavLink to="/collab/p_meeting_q4" className={({ isActive }) => 
                `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30' 
                    : 'text-zinc-300 hover:bg-zinc-800/60 hover:text-white'
                }`
              }>
                Collaborate
              </NavLink>
            </nav>
          </div>

          {/* Search and User Actions */}
          <div className="flex items-center space-x-4">
            {/* Global Search */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className="relative">
                <Icon name="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" strokeWidth={1.5} />
                <input 
                  type="text" 
                  placeholder="Search pastes…" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-zinc-800/60 border border-zinc-700/50 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 w-64 transition-all"
                />
              </div>
            </form>

            {/* Settings */}
            <NavLink to="/settings" className="p-2 rounded-lg text-zinc-400 hover:bg-zinc-800/60 hover:text-white transition-all">
              <Icon name="settings" className="h-5 w-5" strokeWidth={1.5} />
            </NavLink>

            {/* User Menu or Sign In */}
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-zinc-800/60 transition-all"
                >
                  <img 
                    src={user.avatarUrl} 
                    alt={user.name}
                    className="h-8 w-8 rounded-full border-2 border-zinc-700"
                  />
                  <Icon name="chevron-down" className={`h-4 w-4 text-zinc-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} strokeWidth={1.5} />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-zinc-800 border border-zinc-700/50 rounded-xl shadow-soft py-2 z-50">
                    <div className="px-4 py-2 border-b border-zinc-700/50">
                      <p className="text-sm font-medium text-white">{user.name}</p>
                      <p className="text-xs text-zinc-400">{user.email}</p>
                    </div>
                    <NavLink to="/settings" className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700/50 hover:text-white transition-all">
                      Profile
                    </NavLink>
                    <NavLink to="/settings" className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700/50 hover:text-white transition-all">
                      Settings
                    </NavLink>
                    <button 
                      onClick={() => { signOut(); setShowUserMenu(false); }}
                      className="block w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700/50 hover:text-white transition-all"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink to="/auth/login" className="px-4 py-2 rounded-lg bg-brand-600 text-white font-medium hover:bg-brand-700 transition-all">
                Sign In
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
