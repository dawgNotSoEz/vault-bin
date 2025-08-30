import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Home, Github, Folder, Settings, Plus } from 'lucide-react'
import { cn } from '../lib/utils'

function Sidebar() {
  const [hoveredItem, setHoveredItem] = useState(null)

  const sidebarItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Github, label: 'GitHub', href: 'https://github.com', external: true },
    { icon: Folder, label: 'Folders', href: '/#folders' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ]

  return (
    <aside className="fixed left-0 top-16 w-16 h-[calc(100vh-4rem)] glass-dark backdrop-blur-xl border-r border-zinc-800/50 z-40 shadow-xl">
      <div className="flex flex-col items-center py-6 space-y-3">
        {sidebarItems.map((item, index) => (
          <div key={index} className="relative">
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200 group",
                  "text-zinc-400 hover:text-white hover:bg-white/10 hover:scale-110 hover:shadow-lg",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-black",
                  "backdrop-blur-sm border border-transparent hover:border-zinc-700/50"
                )}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                aria-label={item.label}
                aria-describedby={`tooltip-${index}`}
              >
                <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
              </a>
            ) : (
              <Link
                to={item.href}
                className={cn(
                  "flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200 group",
                  "text-zinc-400 hover:text-white hover:bg-white/10 hover:scale-110 hover:shadow-lg",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-black",
                  "backdrop-blur-sm border border-transparent hover:border-zinc-700/50"
                )}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                aria-label={item.label}
                aria-describedby={`tooltip-${index}`}
              >
                <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
              </Link>
            )}
            
            {/* Tooltip */}
            {hoveredItem === index && (
              <div
                id={`tooltip-${index}`}
                className="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-2 glass-dark backdrop-blur-xl text-white text-sm rounded-lg shadow-xl border border-zinc-700/50 whitespace-nowrap z-50"
                role="tooltip"
              >
                {item.label}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-zinc-800 border-l border-t border-zinc-700/50 rotate-45 rounded-sm"></div>
              </div>
            )}
          </div>
        ))}

        {/* Separator */}
        <div className="w-8 h-px bg-zinc-700/50 my-2"></div>

        {/* New Paste Button */}
        <div className="relative">
          <button
            className={cn(
              "flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200 group",
              "bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg",
              "hover:shadow-blue-500/25 hover:scale-110 hover:from-blue-500 hover:to-purple-500",
              "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-black"
            )}
            onMouseEnter={() => setHoveredItem('new')}
            onMouseLeave={() => setHoveredItem(null)}
            aria-label="New Paste"
            aria-describedby="tooltip-new"
          >
            <Plus className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:rotate-90" />
          </button>
          
          {hoveredItem === 'new' && (
            <div
              id="tooltip-new"
              className="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-2 glass-dark backdrop-blur-xl text-white text-sm rounded-lg shadow-xl border border-zinc-700/50 whitespace-nowrap z-50"
              role="tooltip"
            >
              New Paste
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-zinc-800 border-l border-t border-zinc-700/50 rotate-45 rounded-sm"></div>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar