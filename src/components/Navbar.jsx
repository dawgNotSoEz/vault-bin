import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Shield, Search } from 'lucide-react'
import { cn } from '../lib/utils'
import ThemeToggle from './ThemeToggle.jsx'
import SearchBar from './SearchBar.jsx'

function Navbar() {
  const location = useLocation()
  const [showSearch, setShowSearch] = useState(false)

  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/create', label: 'Create' },
    { path: '/demo', label: 'View Demo' },
    { path: '/collaborate', label: 'Collaborate' },
  ]

  return (
    <header className="fixed top-0 inset-x-0 z-50 glass-dark backdrop-blur-xl border-b border-zinc-800/50 shadow-lg">
      <div className="container mx-auto max-w-screen-2xl px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 text-white hover:text-zinc-300 transition-all duration-200 group">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg group-hover:shadow-blue-500/25 transition-all duration-200">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              VaultBin
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg",
                  "hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-black",
                  location.pathname === item.path
                    ? "text-white bg-white/10 shadow-lg after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-blue-400 after:rounded-full"
                    : "text-zinc-400"
                )}
                aria-current={location.pathname === item.path ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg",
                "hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-black",
                showSearch ? "text-white bg-white/10 shadow-lg" : "text-zinc-400"
              )}
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>

        {/* Search bar dropdown */}
        {showSearch && (
          <div className="pb-4">
            <SearchBar onClose={() => setShowSearch(false)} />
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar