import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useTheme } from '@/context/ThemeContext';

const Layout = () => {
  const { theme } = useTheme();
  
  return (
    <div 
      className={`${theme} min-h-screen transition-colors duration-200`}
      style={{ backgroundColor: '#0f1117', color: '#ffffff', minHeight: '100vh' }}
    >
      <div 
        className="flex h-screen bg-neutral-900 text-white"
        style={{ backgroundColor: '#0f1117', color: '#ffffff', height: '100vh' }}
      >
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main 
            className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-900 p-6"
            style={{ backgroundColor: '#0f1117', padding: '1.5rem' }}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;