import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  User, 
  Settings, 
  Shield, 
  ChevronDown, 
  Menu,
  X,
  LogOut,
  UserCircle,
  Bell
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { cn } from '@/lib/utils';

const Navbar = ({ onOpenAuth }) => {
  const location = useLocation();
  const { user, isAuthenticated, signOut } = useAuth();
  const { success } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', isActive: location.pathname === '/dashboard' || location.pathname === '/' },
    { name: 'Create', href: '/create', isActive: location.pathname === '/create' },
    { name: 'View Demo', href: '/view-demo', isActive: location.pathname === '/view-demo' },
    { name: 'Collaborate', href: '/collaborate/demo', isActive: location.pathname.includes('/collaborate') },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // TODO: connect backend here - implement search functionality
  };

  const handleLogout = async () => {
    await signOut();
    success('You have been signed out successfully');
    setIsUserMenuOpen(false);
  };

  return (
    <>
      {/* Main Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-900/80 backdrop-blur-xl border-b border-neutral-700/30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Left Section - Logo */}
            <div className="flex items-center">
              <Link 
                to="/dashboard" 
                className="flex items-center space-x-3 group transition-all duration-300 hover:scale-105"
              >
                <div className="relative">
                  <Shield className="h-8 w-8 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
                  <div className="absolute -inset-1 bg-purple-400/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent group-hover:from-purple-200 group-hover:to-white transition-all duration-300">
                  VaultBin
                </span>
              </Link>
            </div>

            {/* Center Section - Navigation (Desktop) */}
            <nav className="hidden lg:flex items-center space-x-1 bg-neutral-800/50 rounded-full p-1 border border-neutral-700/50">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 group',
                    item.isActive
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-600/25'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-700/60'
                  )}
                >
                  <span className="relative z-10">{item.name}</span>
                  {item.isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full blur-sm opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                  )}
                  {!item.isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-purple-700/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Section - Actions */}
            <div className="flex items-center space-x-3">
              
              {/* Search Bar (Desktop) */}
              <form onSubmit={handleSearch} className="hidden md:block">
                <div className="relative group">
                  <Search className={cn(
                    "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors duration-300",
                    isSearchFocused ? "text-purple-400" : "text-neutral-500"
                  )} />
                  <input 
                    type="text" 
                    placeholder="Search your vaults..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className={cn(
                      "bg-neutral-800/60 border rounded-full pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 transition-all duration-300 w-64",
                      isSearchFocused 
                        ? "border-purple-500/50 ring-2 ring-purple-500/20 bg-neutral-800/80" 
                        : "border-neutral-600/50 hover:border-neutral-500/50"
                    )}
                  />
                  <div className={cn(
                    "absolute inset-0 rounded-full transition-opacity duration-300 pointer-events-none",
                    isSearchFocused ? "bg-purple-500/5 opacity-100" : "opacity-0"
                  )} />
                </div>
              </form>

              {/* Theme Toggle */}
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>

              {/* Settings */}
              <Link 
                to="/settings" 
                className="p-2.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800/60 transition-all duration-300 hover:scale-105 group"
              >
                <Settings className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
              </Link>

              {/* Notifications */}
              <button className="relative p-2.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800/60 transition-all duration-300 hover:scale-105">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full"></span>
              </button>

              {/* User Menu or Auth Buttons */}
              {isAuthenticated ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-neutral-800/60 transition-all duration-300 group"
                  >
                    <img
                      src={user.avatarUrl || `https://api.dicebear.com/7.x/notionists/svg?seed=${user.name}`}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border-2 border-transparent group-hover:border-purple-400/50 transition-all duration-300"
                    />
                    <ChevronDown className={cn(
                      "h-4 w-4 text-neutral-400 transition-transform duration-300",
                      isUserMenuOpen ? "rotate-180" : ""
                    )} />
                  </button>

                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-neutral-800/95 backdrop-blur-xl border border-neutral-700/50 rounded-2xl shadow-2xl py-2 animate-fade-in">
                      <div className="px-4 py-3 border-b border-neutral-700/50">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={user.avatarUrl || `https://api.dicebear.com/7.x/notionists/svg?seed=${user.name}`} 
                            alt={user.name} 
                            className="w-10 h-10 rounded-full" 
                          />
                          <div>
                            <p className="text-sm font-medium text-white">{user.name}</p>
                            <p className="text-xs text-neutral-400">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="py-1">
                        <Link 
                          to="/settings" 
                          className="flex items-center px-4 py-2 text-sm text-neutral-300 hover:text-white hover:bg-neutral-700/50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <UserCircle className="h-4 w-4 mr-3" />
                          Profile
                        </Link>
                        <Link 
                          to="/settings" 
                          className="flex items-center px-4 py-2 text-sm text-neutral-300 hover:text-white hover:bg-neutral-700/50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="h-4 w-4 mr-3" />
                          Settings
                        </Link>
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onOpenAuth('signin')}
                    className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => onOpenAuth('signup')}
                    className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white text-sm font-medium rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-600/25"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800/60 transition-all duration-300"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="fixed top-16 left-0 right-0 z-40 lg:hidden bg-neutral-900/95 backdrop-blur-xl border-b border-neutral-700/50 animate-slide-in-from-top"
        >
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
            
            {/* Mobile Search */}
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500" />
                <input 
                  type="text" 
                  placeholder="Search your vaults..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-neutral-800/60 border border-neutral-600/50 rounded-full pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>
            </form>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300',
                    item.isActive
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Auth/User Section */}
            {!isAuthenticated && (
              <div className="flex space-x-3 pt-4 border-t border-neutral-700/50">
                <button
                  onClick={() => {
                    onOpenAuth('signin');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex-1 px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white border border-neutral-600 rounded-lg hover:bg-neutral-800/60 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    onOpenAuth('signup');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-300"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile Theme Toggle */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-700/50">
              <span className="text-sm font-medium text-neutral-300">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
