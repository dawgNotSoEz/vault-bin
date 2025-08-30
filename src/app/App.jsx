import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Shell from './layout/Shell.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import Create from '../pages/Create.jsx'
import AboutFeatures from '../pages/AboutFeatures.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Shell />}>
        <Route index element={<Dashboard />} />
        <Route path="create" element={<Create />} />
        <Route path="about" element={<AboutFeatures />} />
      </Route>
    </Routes>
  )
}

export default App