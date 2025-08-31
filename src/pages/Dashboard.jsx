import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, List, Grid, Filter, Lock, Globe, EyeOff } from 'lucide-react'

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
      views: 25
    },
    {
      id: '3',
      title: 'Meeting Notes',
      snippet: '## Project Kickoff Meeting\n- Discussed project scope\n- Set timeline...',
      visibility: 'private',
      createdAt: '2025-08-28T09:15:00Z',
      folder: 'work',
      views: 3
    }
  ]

  const filteredPastes = pastes.filter(paste => 
    selectedFolder === 'all' || paste.folder === selectedFolder
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-zinc-400 mt-2">Manage your secure pastes</p>
        </div>
        <Link 
          to="/create"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-500 hover:to-purple-500 transition-all duration-200 flex items-center gap-2"
        >
          <Plus size={20} />
          Create Paste
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-900/60 rounded-2xl p-6 border border-zinc-800">
            <h3 className="text-lg font-semibold text-white mb-4">Folders</h3>
            <div className="space-y-2">
              {folders.map(folder => (
                <button
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                    selectedFolder === folder.id 
                      ? 'bg-blue-600 text-white' 
                      : 'text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  <span>{folder.name}</span>
                  <span className="text-xs">{folder.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button className="text-zinc-400 hover:text-white transition-colors">
                <Filter size={20} />
              </button>
              <div className="flex items-center bg-zinc-900/60 rounded-lg p-1 border border-zinc-800">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list' ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <List size={16} />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid' ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Grid size={16} />
                </button>
              </div>
            </div>
            <div className="text-sm text-zinc-400">
              {filteredPastes.length} pastes
            </div>
          </div>

          {/* Pastes List */}
          <div className={`space-y-4 ${viewMode === 'grid' ? 'grid grid-cols-2 gap-4 space-y-0' : ''}`}>
            {filteredPastes.map(paste => (
              <div key={paste.id} className="bg-zinc-900/60 rounded-2xl p-6 border border-zinc-800 hover:border-zinc-700 transition-all duration-200 cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">{paste.title}</h3>
                  <div className="flex items-center gap-2">
                    {paste.visibility === 'private' ? (
                      <Lock size={16} className="text-yellow-500" />
                    ) : (
                      <Globe size={16} className="text-green-500" />
                    )}
                    <span className="text-xs text-zinc-400">{paste.views} views</span>
                  </div>
                </div>
                <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{paste.snippet}</p>
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>{new Date(paste.createdAt).toLocaleDateString()}</span>
                  <span className="bg-zinc-800 px-2 py-1 rounded-full">{paste.folder}</span>
                </div>
              </div>
            ))}
          </div>

          {filteredPastes.length === 0 && (
            <div className="text-center py-12">
              <div className="text-zinc-500 mb-4">No pastes found</div>
              <Link 
                to="/create"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Create your first paste
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard