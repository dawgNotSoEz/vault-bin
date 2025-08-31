import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, List, Grid, Filter, Lock, Globe, EyeOff, Calendar, User } from 'lucide-react'

function Dashboard() {
  const [viewMode, setViewMode] = useState('list')
  const [selectedFolder, setSelectedFolder] = useState('all')

  // Mock data
  const folders = [
    { id: 'all', name: 'All Pastes', count: 12 },
    { id: 'work', name: 'Work', count: 5 },
    { id: 'personal', name: 'Personal', count: 4 },
    { id: 'projects', name: 'Projects', count: 3 }
  ]

  const pastes = [
    {
      id: '1',
      title: 'API Documentation',
      snippet: 'Complete REST API documentation for the new project...',
      visibility: 'private',
      createdAt: '2025-08-30T10:30:00Z',
      folder: 'work',
      views: 12
    },
    {
      id: '2', 
      title: 'React Component Code',
      snippet: 'function MyComponent() { return <div>Hello World</div>; }',
      visibility: 'public',
      createdAt: '2025-08-29T15:45:00Z',
      folder: 'projects',
      views: 45
    },
    {
      id: '3',
      title: 'Shopping List',
      snippet: '- Milk\n- Bread\n- Eggs\n- Coffee',
      visibility: 'private',
      createdAt: '2025-08-28T09:15:00Z',
      folder: 'personal',
      views: 3
    }
  ]

  const filteredPastes = selectedFolder === 'all' 
    ? pastes 
    : pastes.filter(paste => paste.folder === selectedFolder)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-zinc-400 mt-1">Manage your pastes and collaborate with others</p>
        </div>
        <Link
          to="/create"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-4 h-4" />
          New Paste
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400">Total Pastes</p>
              <p className="text-2xl font-bold text-white">{pastes.length}</p>
            </div>
            <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
              <List className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400">Public</p>
              <p className="text-2xl font-bold text-white">
                {pastes.filter(p => p.visibility === 'public').length}
              </p>
            </div>
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400">Private</p>
              <p className="text-2xl font-bold text-white">
                {pastes.filter(p => p.visibility === 'private').length}
              </p>
            </div>
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400">Total Views</p>
              <p className="text-2xl font-bold text-white">
                {pastes.reduce((sum, paste) => sum + paste.views, 0)}
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <EyeOff className="w-5 h-5 text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-2 overflow-x-auto">
          {folders.map(folder => (
            <button
              key={folder.id}
              onClick={() => setSelectedFolder(folder.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedFolder === folder.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              {folder.name} ({folder.count})
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list'
                ? 'bg-zinc-700 text-white'
                : 'bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid'
                ? 'bg-zinc-700 text-white'
                : 'bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Pastes List */}
      <div className="space-y-4">
        {filteredPastes.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <List className="w-8 h-8 text-zinc-600" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No pastes found</h3>
            <p className="text-zinc-400 mb-4">
              {selectedFolder === 'all' 
                ? "You haven't created any pastes yet."
                : `No pastes in the ${folders.find(f => f.id === selectedFolder)?.name} folder.`
              }
            </p>
            <Link
              to="/create"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Your First Paste
            </Link>
          </div>
        ) : (
          filteredPastes.map(paste => (
            <div
              key={paste.id}
              className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-medium text-white">{paste.title}</h3>
                    <div className="flex items-center gap-2">
                      {paste.visibility === 'private' ? (
                        <div className="flex items-center gap-1 text-xs text-red-400 bg-red-500/20 px-2 py-1 rounded-full">
                          <Lock className="w-3 h-3" />
                          Private
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded-full">
                          <Globe className="w-3 h-3" />
                          Public
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm mb-3 line-clamp-2">{paste.snippet}</p>
                  <div className="flex items-center gap-4 text-xs text-zinc-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(paste.createdAt)}
                    </div>
                    <div className="flex items-center gap-1">
                      <EyeOff className="w-3 h-3" />
                      {paste.views} views
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/view/${paste.id}`}
                    className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Dashboard