import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '@/components/Icon';
import Tooltip from '@/components/Tooltip';

const Sidebar = () => {
  return (
    <aside className="bg-zinc-900/90 border-r border-zinc-700/30 flex flex-col items-center justify-between w-20 py-6 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-1">
        {/* App Shield Logo */}
        <div className="p-3 mb-4">
          <Icon name="shield" className="h-8 w-8 text-zinc-400" strokeWidth={1.5} />
        </div>
        
        {/* Navigation Icons */}
        <Tooltip text="Dashboard">
          <NavLink to="/" className={({ isActive }) => `p-3 rounded-xl transition-all ${isActive ? 'bg-brand-600 text-white shadow-glow' : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-white'}`}>
            <Icon name="home" className="h-6 w-6" strokeWidth={1.5} />
          </NavLink>
        </Tooltip>
        
        <Tooltip text="View Demo">
          <NavLink to="/view-demo" className={({ isActive }) => `p-3 rounded-xl transition-all ${isActive ? 'bg-brand-600 text-white shadow-glow' : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-white'}`}>
            <Icon name="globe" className="h-6 w-6" strokeWidth={1.5} />
          </NavLink>
        </Tooltip>
        
        <Tooltip text="Collaborate">
          <NavLink to="/collaborate/p_meeting_q4" className={({ isActive }) => `p-3 rounded-xl transition-all ${isActive ? 'bg-brand-600 text-white shadow-glow' : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-white'}`}>
            <Icon name="users" className="h-6 w-6" strokeWidth={1.5} />
          </NavLink>
        </Tooltip>
        
        <Tooltip text="Search">
          <button className="p-3 rounded-xl text-zinc-400 hover:bg-zinc-800/60 hover:text-white transition-all" onClick={() => document.querySelector('input[placeholder*="Search"]')?.focus()}>
            <Icon name="search" className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </Tooltip>
        
        <Tooltip text="Settings">
          <NavLink to="/settings" className={({ isActive }) => `p-3 rounded-xl transition-all ${isActive ? 'bg-brand-600 text-white shadow-glow' : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-white'}`}>
            <Icon name="settings" className="h-6 w-6" strokeWidth={1.5} />
          </NavLink>
        </Tooltip>
      </div>
      
      {/* Floating FAB for New Paste */}
      <div className="flex flex-col items-center">
        <Tooltip text="New Paste">
          <NavLink to="/create" className="p-4 rounded-full bg-brand-600 text-white hover:bg-brand-700 shadow-glow hover:shadow-glow-hover transition-all duration-200 transform hover:scale-105">
            <Icon name="plus" className="h-6 w-6" strokeWidth={2} />
          </NavLink>
        </Tooltip>
      </div>
    </aside>
  );
};

export default Sidebar;
