import React, { useState, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '../../lib/utils'

function SearchBar({ onClose, className, value, onChange, placeholder = "Search pastes..." }) {
  const [internalQuery, setInternalQuery] = useState('')
  const inputRef = useRef(null)

  // Use controlled or uncontrolled mode
  const query = value !== undefined ? value : internalQuery
  const setQuery = onChange !== undefined ? onChange : setInternalQuery

  useEffect(() => {
    if (inputRef.current && onClose) {
      inputRef.current.focus()
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      // Handle search logic here
      console.log('Searching for:', query)
    }
  }

  return (
    <div className={cn("relative", className)} role="search">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-blue-400 transition-colors" />
          <input
            ref={inputRef}
            type="search"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={cn(
              "w-full pl-12 pr-10 py-3 glass-dark backdrop-blur-xl border border-zinc-700/50 rounded-xl",
              "text-white placeholder-zinc-400 shadow-lg",
              "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30",
              "transition-all duration-200"
            )}
            aria-label="Search pastes"
          />
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors rounded-lg p-1 hover:bg-white/10"
              aria-label="Close search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default SearchBar
