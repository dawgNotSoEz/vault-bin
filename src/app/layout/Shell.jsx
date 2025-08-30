import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar.jsx'
import Sidebar from '../../components/Sidebar.jsx'
import Footer from '../../components/Footer.jsx'

function Shell() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-950 text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent"></div>
      
      <Navbar />
      <div className="flex relative">
        <Sidebar />
        <main className="flex-1 ml-16 mt-16 min-h-[calc(100vh-4rem)]">
          <div className="max-w-screen-2xl mx-auto px-6 py-8">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  )
}

export default Shell