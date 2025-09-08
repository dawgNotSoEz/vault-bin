import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Shell from '@/app/layout/Shell';
import Dashboard from '@/pages/Dashboard';
import Create from '@/pages/Create';
import CreatePaste from '@/pages/CreatePaste';
import ViewPaste from '@/pages/ViewPaste';
import ViewDemo from '@/pages/ViewDemo';
import Collaborate from '@/pages/Collaborate';
import Folders from '@/pages/Folders';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Shell />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="create" element={<Create />} />
        <Route path="create-paste" element={<CreatePaste />} />
        <Route path="paste/:id" element={<ViewPaste />} />
        <Route path="view/:id" element={<ViewPaste />} />
        <Route path="view-demo" element={<ViewDemo />} />
        <Route path="collaborate/:id" element={<Collaborate />} />
        <Route path="folders" element={<Folders />} />
        <Route path="folders/:folderId" element={<Folders />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;