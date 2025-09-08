import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Shell from './layout/Shell';
import Dashboard from '@/pages/Dashboard';
import Create from '@/pages/Create';
import ViewDemo from '@/pages/ViewDemo';
import Collaborate from '@/pages/Collaborate';
import Settings from '@/pages/Settings';
import SignIn from '@/pages/auth/SignIn';
import SignUp from '@/pages/auth/SignUp';
import NotFound from '@/pages/NotFound';
import ViewPaste from '@/pages/ViewPaste';
import Folders from '@/pages/Folders';
import LoadingDemo from '@/pages/LoadingDemo';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Shell />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="create" element={<Create />} />
  <Route path="loading-demo" element={<LoadingDemo />} />
        <Route path="view-demo" element={<ViewDemo />} />
        <Route path="collaborate/:id" element={<Collaborate />} />
        <Route path="p/:id" element={<ViewPaste />} />
        <Route path="folders/:slug" element={<Folders />} />
        <Route path="settings" element={<Settings />} />
        <Route path="login" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="auth/login" element={<SignIn />} />
        <Route path="auth/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
