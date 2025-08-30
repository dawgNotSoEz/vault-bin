import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Plus, List, Grid, Filter, Lock, Globe, EyeOff, MessageCircle, MoreVertical } from 'lucide-react'
import { motion } from 'framer-motion'
import { folders, pastes } from '../lib/data.js'
import { formatDate, cn } from '../lib/utils'
import Card from '../components/Card.jsx'
import Badge from '../components/Badge.jsx'
import SearchBar from '../components/SearchBar.jsx'
import EmptyState from '../components/EmptyState.jsx'

function Dashboard() {
  const [selectedFolder, setSelectedFolder] = useState('all')
  const [viewMode, setViewMode] = useState('list') // 'list' or 'grid'
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPastes = useMemo(() => {
    let filtered = pastes

    // Filter by folder
    if (selectedFolder !== 'all') {
      filtered = filtered.filter(paste => paste.folder === selectedFolder)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(paste => 
        paste.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paste.snippet.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return filtered
  }, [selectedFolder, searchQuery])

  const visibilityConfig = {
    private: { icon: 'Lock', className: 'text-red-400' },
    public: { icon: 'Globe', className: 'text-green-400' },
    hidden: { icon: 'EyeOff', className: 'text-yellow-400' }
  }

  const getVisibilityIcon = (visibility) => {
    const config = visibilityConfig[visibility]
    const IconComponent = {
      Globe,
      Lock,
      EyeOff
    }[config.icon]
    return IconComponent
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            My Secure Pastes
          </h1>
          <p className="text-zinc-400">
            Manage your encrypted pastes and collaborations
          </p>
        </div>
        
        <Link
          to="/create"
          className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-black group"
        >
          <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
          New Paste
        </Link>
      </div>

      {/* Controls */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="w-full sm:max-w-sm">
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search pastes..."
            />
          </div>
          
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-zinc-900/60 border border-zinc-800 rounded-xl shadow-lg overflow-hidden">
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-950",
                  viewMode === 'list'
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                )}
                aria-pressed={viewMode === 'list'}
              >
                <List className="w-4 h-4" />
                List
              </button>
              <div className="w-px h-6 bg-zinc-800"></div>
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-950",
                  viewMode === 'grid'
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                )}
                aria-pressed={viewMode === 'grid'}
              >
                <Grid className="w-4 h-4" />
                Grid
              </button>
            </div>

            {/* Filter Button */}
            <button className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900/60 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white hover:border-zinc-700 transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-950">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>
      </Card>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Folders Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <Card>
            <Card.Header>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <Card.Title>Folders</Card.Title>
              </div>
            </Card.Header>
            <Card.Content>
              <div className="space-y-1">
                {folders.map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => setSelectedFolder(folder.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-200 group",
                      "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-950",
                      selectedFolder === folder.id
                        ? "bg-gradient-to-r from-indigo-600/20 to-violet-600/20 text-white border border-indigo-500/30 shadow-lg"
                        : "text-zinc-300 hover:bg-zinc-800/50 hover:text-white border border-transparent"
                    )}
                    aria-pressed={selectedFolder === folder.id}
                  >
                    <span className="text-sm font-medium">{folder.name}</span>
                    <Badge 
                      variant={selectedFolder === folder.id ? "primary" : "secondary"}
                    >
                      {folder.count}
                    </Badge>
                  </button>
                ))}
              </div>
            </Card.Content>
          </Card>
        </div>

        {/* Pastes Content */}
        <div className="flex-1">
          {filteredPastes.length === 0 ? (
            <Card>
              <Card.Content className="py-12">
                <EmptyState
                  title="No pastes found"
                  description={selectedFolder === 'all' 
                    ? "Create your first secure paste to get started"
                    : `No pastes in ${folders.find(f => f.id === selectedFolder)?.name || 'this folder'}`
                  }
                  actionLabel="New Paste"
                  onAction={() => window.location.href = '/create'}
                />
              </Card.Content>
            </Card>
          ) : (
            <div className={cn(
              "grid gap-4",
              viewMode === 'grid' 
                ? "grid-cols-1 xl:grid-cols-2" 
                : "grid-cols-1"
            )}>
              {filteredPastes.map((paste) => {
                const VisibilityIcon = getVisibilityIcon(paste.visibility)
                
                return (
                  <Card
                    key={paste.id}
                    className="group cursor-pointer hover:border-zinc-700/70 transition-all duration-200"
                  >
                    <Card.Content>
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <h3 className="font-semibold text-white truncate text-lg">
                            {paste.title}
                          </h3>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <VisibilityIcon className={cn("w-4 h-4", visibilityConfig[paste.visibility].className)} />
                            {paste.comments > 0 && (
                              <div className="flex items-center gap-1 text-zinc-400">
                                <MessageCircle className="w-4 h-4" />
                                <span className="text-sm">{paste.comments}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <button className="text-zinc-400 hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-950 rounded-lg p-1 hover:bg-zinc-800/50">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Snippet */}
                      <div className="mb-4">
                        <div className="relative group/code">
                          <code className="block text-sm text-zinc-300 bg-zinc-900/60 border border-zinc-800 px-4 py-3 rounded-lg font-mono line-clamp-2 group-hover/code:border-zinc-700 transition-colors">
                            {paste.snippet}
                          </code>
                          <div className="absolute top-2 right-2 opacity-0 group-hover/code:opacity-100 transition-opacity">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          </div>
                        </div>
                      </div>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3">
                          <span className="text-zinc-400">{formatDate(paste.date)}</span>
                          <Badge 
                            variant={paste.expiresIn === 'Permanent' ? 'primary' : 'warning'}
                          >
                            {paste.expiresIn}
                          </Badge>
                          <Badge variant="secondary">
                            {folders.find(f => f.id === paste.folder)?.name}
                          </Badge>
                        </div>
                      </div>
                    </Card.Content>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Dashboard