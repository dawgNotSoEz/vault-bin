import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import CreatePaste from '@/pages/CreatePaste';
import ViewDemo from '@/pages/ViewDemo';
import Collaborate from '@/pages/Collaborate';
import Settings from '@/pages/Settings';
import SignIn from '@/pages/auth/SignIn';
import SignUp from '@/pages/auth/SignUp';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="create" element={<CreatePaste />} />
        <Route path="view-demo" element={<ViewDemo />} />
        <Route path="collaborate/:id" element={<Collaborate />} />
        <Route path="settings" element={<Settings />} />
        <Route path="login" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;