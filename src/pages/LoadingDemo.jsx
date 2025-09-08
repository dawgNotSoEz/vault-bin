import React from 'react'
import { Sparkles, Loader } from 'lucide-react'

const LoadingDemo = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-950 p-6">
      <div className="max-w-xl w-full text-center space-y-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-8 backdrop-blur-md">
        <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-rose-500 flex items-center justify-center animate-pulse">
          <Sparkles className="w-10 h-10 text-white" />
        </div>

        <h1 className="text-2xl font-bold text-white">This is a demo version</h1>
        <p className="text-zinc-400">VaultBin is under active development. Features are simulated and some functionality is frontend-only for demo purposes.</p>

        <div className="flex items-center justify-center space-x-3">
          <div className="animate-spin-slow">
            <Loader className="w-6 h-6 text-zinc-300" />
          </div>
          <span className="text-sm text-zinc-400">Loading demo environment...</span>
        </div>

        <div className="text-xs text-zinc-500">You can continue to explore the app. Some actions will show mock behavior only.</div>
      </div>
    </div>
  )
}

export default LoadingDemo
