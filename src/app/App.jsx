import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Shell from './layout/Shell.jsx'
import Dashboard from '../pages/Dashboard.working.jsx'
import Create from '../pages/Create.jsx'
import ViewDemo from '../pages/ViewDemo.jsx'
import Collaborate from '../pages/Collaborate.jsx'
import AboutFeatures from '../pages/AboutFeatures.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Shell />}>
        <Route index element={<Dashboard />} />
        <Route path="create" element={<Create />} />
        <Route path="view/:id" element={<ViewDemo />} />
        <Route path="collaborate/:id" element={<Collaborate />} />
        <Route path="about" element={<AboutFeatures />} />
      </Route>
    </Routes>
  )
}

export default App