import React from 'react'
import { FileText, Plus } from 'lucide-react'

function EmptyState({ 
  icon: Icon = FileText,
  title = "No items found",
  description = "Create your first item to get started",
  actionLabel = "Create New",
  onAction
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-700 flex items-center justify-center mb-6 shadow-lg">
        <Icon className="w-10 h-10 text-zinc-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-3">
        {title}
      </h3>
      
      <p className="text-zinc-400 mb-8 max-w-md leading-relaxed">
        {description}
      </p>
      
      {onAction && (
        <button
          onClick={onAction}
          className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-black group"
        >
          <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export default EmptyState