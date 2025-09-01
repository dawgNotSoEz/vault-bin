import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/navigation/Navbar';
import Sidebar from '@/components/navigation/Sidebar';
import { useTheme } from '@/context/ThemeContext';

const Shell = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`${theme} flex h-screen bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 text-white`}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-zinc-900/50 via-zinc-900/80 to-zinc-800/50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Shell;
