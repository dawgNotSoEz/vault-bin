import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/navigation/Navbar';
import Sidebar from '@/components/navigation/Sidebar';
import AuthModal from '@/components/AuthModal';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import DemoBanner from '@/components/DemoBanner';

const Shell = () => {
  const { theme } = useTheme();
  const { loading } = useAuth();
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'signin' });

  const openAuthModal = (mode) => {
    setAuthModal({ isOpen: true, mode });
  };

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, mode: 'signin' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white">
        <div className="text-xl">Loading VaultBin...</div>
      </div>
    );
  }
  
  return (
    <div className={`${theme} min-h-screen bg-gradient-to-br from-neutral-900 via-gray-900 to-zinc-900 text-white`}>
      <Navbar onOpenAuth={openAuthModal} />
      <div className="max-w-7xl mx-auto px-6 mt-4">
        <DemoBanner />
      </div>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-neutral-900/50 via-gray-900/80 to-zinc-800/50 p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      
      {authModal.isOpen && (
        <AuthModal
          mode={authModal.mode}
          onClose={closeAuthModal}
          onSwitchMode={(mode) => setAuthModal(prev => ({ ...prev, mode }))}
        />
      )}
    </div>
  );
};

export default Shell;
