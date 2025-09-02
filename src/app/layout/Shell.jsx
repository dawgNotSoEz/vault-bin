import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/navigation/Navbar';
import Sidebar from '@/components/navigation/Sidebar';
import { useTheme } from '@/context/ThemeContext';

const Shell = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`${theme} min-h-screen bg-gradient-to-br from-neutral-900 via-gray-900 to-zinc-900 text-white`}>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-neutral-900/50 via-gray-900/80 to-zinc-800/50 p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Shell;
