import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const STORAGE_KEY = 'vaultbin_demo_banner_dismissed'

const DemoBanner = ({ className = '' }) => {
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    try {
      const val = localStorage.getItem(STORAGE_KEY)
      if (val === '1') setDismissed(true)
    } catch (err) {
      // ignore
    }
  }, [])

  const close = () => {
    try { localStorage.setItem(STORAGE_KEY, '1') } catch (e) {}
    setDismissed(true)
  }

  if (dismissed) return null

  return (
    <div className={`w-full bg-amber-500/10 border border-amber-500/20 text-amber-200 rounded-xl p-3 flex items-center justify-between ${className}`}>
      <div>
        <strong className="mr-2">Demo:</strong>
        This is a demo build and under active development — some features are simulated and data is not persisted to a backend.
      </div>
      <button onClick={close} className="p-1 rounded hover:bg-amber-500/20">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

export default DemoBanner
