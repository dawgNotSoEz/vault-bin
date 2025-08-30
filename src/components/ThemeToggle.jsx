import React, { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import { cn } from '../lib/utils'

function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const root = window.document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [isDark])

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className={cn(
        "flex items-center justify-center w-9 h-9 rounded-lg transition-colors",
        "text-zinc-400 hover:text-white hover:bg-zinc-800",
        "focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-black"
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  )
}

export default ThemeToggle