import React, { useState } from 'react';
import { Plus, Grid, List, BarChart3, Clock, Folder, Globe, Lock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';
import PasteCard from '@/components/PasteCard';

// Dummy data
const pastesData = [
  { id: 1, title: 'Project Plan', lang: 'markdown', expires: '2d', folder: 'Work', visibility: 'private', views: 24, created: '2h ago' },
  { id: 2, title: 'API Example', lang: 'python', expires: '1w', folder: 'Dev', visibility: 'public', views: 156, created: '5h ago' },
  { id: 3, title: 'SQL Query', lang: 'sql', expires: '12h', folder: 'Snippets', visibility: 'unlisted', views: 8, created: '1d ago' },
  { id: 4, title: 'React Component', lang: 'javascript', expires: '3d', folder: 'Frontend', visibility: 'public', views: 89, created: '2d ago' },
  { id: 5, title: 'Docker Config', lang: 'yaml', expires: '1w', folder: 'DevOps', visibility: 'private', views: 12, created: '3d ago' },
  { id: 6, title: 'Bash Script', lang: 'bash', expires: 'never', folder: 'Scripts', visibility: 'public', views: 234, created: '1w ago' },
];

const statsData = [
  { name: 'Mon', views: 120, pastes: 12 },
  { name: 'Tue', views: 150, pastes: 18 },
  { name: 'Wed', views: 180, pastes: 15 },
  { name: 'Thu', views: 220, pastes: 22 },
  { name: 'Fri', views: 190, pastes: 16 },
  { name: 'Sat', views: 160, pastes: 14 },
  { name: 'Sun', views: 140, pastes: 10 },
];

const Dashboard = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [showStats, setShowStats] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-neutral-400 mt-1">Manage your pastes and view analytics</p>
        </div>
        
        <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-2xl transition-all duration-200 hover:scale-[1.02] shadow-lg">
          <Plus className="h-4 w-4" />
          New Paste
        </button>
      </div>

      {/* Stats Panel */}
      {showStats && (
        <div className="bg-neutral-800 rounded-2xl p-6 shadow-lg border border-neutral-700">
          <h3 className="text-lg font-semibold text-white mb-4">7-Day Analytics</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={statsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '12px',
                    color: '#fff'
                  }} 
                />
                <Line type="monotone" dataKey="views" stroke="#8b5cf6" strokeWidth={2} />
                <Line type="monotone" dataKey="pastes" stroke="#06b6d4" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-between bg-neutral-800 rounded-2xl p-4 shadow-lg border border-neutral-700">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200',
              viewMode === 'grid' 
                ? 'bg-purple-600 text-white shadow-lg' 
                : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
            )}
          >
            <Grid className="h-4 w-4" />
            Grid
          </button>
          
          <button
            onClick={() => setViewMode('list')}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200',
              viewMode === 'list' 
                ? 'bg-purple-600 text-white shadow-lg' 
                : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
            )}
          >
            <List className="h-4 w-4" />
            List
          </button>
        </div>

        <button
          onClick={() => setShowStats(!showStats)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 hover:scale-[1.02]',
            showStats 
              ? 'bg-purple-600 text-white shadow-lg' 
              : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
          )}
        >
          <BarChart3 className="h-4 w-4" />
          {showStats ? 'Hide Stats' : 'Enable Stats'}
        </button>
      </div>

      {/* Pastes Grid/List */}
      <div className={cn(
        'transition-all duration-300',
        viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
          : 'space-y-4'
      )}>
        {pastesData.map((paste) => (
          <PasteCard key={paste.id} paste={paste} viewMode={viewMode} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;