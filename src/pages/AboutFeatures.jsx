import React from 'react'
import { Shield, GitHub, Twitter } from 'lucide-react'
import { motion } from 'framer-motion'
import { features, security } from '../lib/data.js'
import Card from '../components/Card.jsx'
import Badge from '../components/Badge.jsx'

function AboutFeatures() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-16"
    >
      {/* Hero Section */}
      <div className="text-center space-y-8 relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-3xl blur-3xl"></div>
        
        <div className="relative">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-2xl shadow-blue-500/25">
              <Shield className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-gradient">
              VaultBin
            </h1>
          </div>
          
          <p className="text-xl sm:text-2xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            Zero-knowledge, privacy-first secure sharing for text, code, and files
          </p>
          
          <div className="inline-flex items-center gap-3 px-4 py-2 glass-dark backdrop-blur-xl rounded-full shadow-lg border border-zinc-700/50">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-zinc-300 font-medium">End-to-end encrypted</span>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Features Column */}
        <Card 
          variant="glass"
          header={
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <h2 className="text-xl font-semibold text-white">Features</h2>
            </div>
          }
        >
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="group p-4 rounded-xl bg-white/5 border border-zinc-700/30 hover:border-zinc-600/50 transition-all duration-200 hover:bg-white/10">
                <h3 className="font-medium text-white mb-2 group-hover:text-blue-300 transition-colors">{feature.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Security Column */}
        <Card 
          variant="glass"
          header={
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <h2 className="text-xl font-semibold text-white">Security</h2>
            </div>
          }
        >
          <div className="space-y-6">
            {security.map((item, index) => (
              <div key={index} className="group p-4 rounded-xl bg-white/5 border border-zinc-700/30 hover:border-zinc-600/50 transition-all duration-200 hover:bg-white/10">
                <h3 className="font-medium text-white mb-2 group-hover:text-green-300 transition-colors">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Additional Info Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="text-center group hover:scale-105 transition-all duration-300" variant="glass">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">Privacy First</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Your data is encrypted before it leaves your device. We can't read it, even if we wanted to.
              </p>
            </div>
          </div>
        </Card>

        <Card className="text-center group hover:scale-105 transition-all duration-300" variant="glass">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-green-500/25 transition-all duration-300">
              <div className="w-8 h-8 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3 group-hover:text-green-300 transition-colors">Always Available</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Reliable service with 99.9% uptime. Your pastes are always accessible when you need them.
              </p>
            </div>
          </div>
        </Card>

        <Card className="text-center group hover:scale-105 transition-all duration-300" variant="glass">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
              <GitHub className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors">Open Source</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Our code is open for security audits and community contributions on GitHub.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="text-center space-y-8 py-16 relative">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-3xl blur-3xl"></div>
        
        <div className="relative">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to secure your data?
          </h2>
          <p className="text-lg text-zinc-400 max-w-lg mx-auto mb-8">
            Join thousands of users who trust VaultBin for their secure sharing needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-black font-semibold text-lg">
              Get Started
            </button>
            <button className="px-8 py-4 glass-dark backdrop-blur-xl text-white rounded-xl hover:bg-white/10 transition-all duration-200 shadow-lg border border-zinc-700/50 hover:border-zinc-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-black font-semibold text-lg">
              View Demo
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AboutFeatures
