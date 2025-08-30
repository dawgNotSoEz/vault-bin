import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  })
}

export const visibilityConfig = {
  public: {
    label: 'Public',
    icon: 'Globe',
    className: 'text-green-400'
  },
  private: {
    label: 'Private',
    icon: 'Lock',
    className: 'text-zinc-400'
  },
  unlisted: {
    label: 'Unlisted',
    icon: 'EyeOff',
    className: 'text-yellow-400'
  }
}