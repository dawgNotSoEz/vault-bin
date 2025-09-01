import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '@/components/Icon';
import StatCard from '@/components/StatCard';

const StatsPanel = ({ pastes, isVisible }) => {
  if (!isVisible) return null;

  const totalPastes = pastes.length;
  const publicPastes = pastes.filter(p => p.visibility === 'public').length;
  const privatePastes = pastes.filter(p => p.visibility === 'private').length;
  const totalViews = pastes.reduce((sum, p) => sum + p.views, 0);

  const expirationCounts = {
    '1d': pastes.filter(p => p.expires === '1d').length,
    '7d': pastes.filter(p => p.expires === '7d').length,
    '30d': pastes.filter(p => p.expires === '30d').length,
    'permanent': pastes.filter(p => p.expires === 'permanent').length,
  };

  // Mock 7-day view data for the chart
  const chartData = [
    { day: 'Mon', views: 12 },
    { day: 'Tue', views: 18 },
    { day: 'Wed', views: 15 },
    { day: 'Thu', views: 22 },
    { day: 'Fri', views: 28 },
    { day: 'Sat', views: 25 },
    { day: 'Sun', views: 31 },
  ];

  return (
    <div className="animate-in slide-in-from-top duration-300 mb-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Pastes"
          value={totalPastes}
          icon="file-text"
          trend="+2"
          trendDirection="up"
        />
        <StatCard
          title="Public"
          value={publicPastes}
          icon="globe"
          color="emerald"
        />
        <StatCard
          title="Private"
          value={privatePastes}
          icon="lock"
          color="red"
        />
        <StatCard
          title="Total Views"
          value={totalViews}
          icon="eye"
          trend="+15%"
          trendDirection="up"
        />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views Trend */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-200">Views Last 7 Days</h3>
            <Icon name="trending-up" size={16} className="text-emerald-400" />
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151', 
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#8B5CF6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expiration Breakdown */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-200">Expiration Breakdown</h3>
            <Icon name="clock" size={16} className="text-gray-400" />
          </div>
          <div className="space-y-3">
            {Object.entries(expirationCounts).map(([expiry, count]) => (
              <div key={expiry} className="flex items-center justify-between">
                <span className="text-sm text-gray-300 capitalize">
                  {expiry === 'permanent' ? 'Permanent' : expiry}
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"
                      style={{ width: `${(count / totalPastes) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-white min-w-6 text-right">
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
