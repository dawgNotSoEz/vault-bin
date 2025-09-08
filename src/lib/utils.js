import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  const months = Math.round(days / 30.4);
  const years = Math.round(days / 365);

  if (seconds < 60) return `${seconds}s ago`;
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 30) return `${days}d ago`;
  if (months < 12) return `${months}mo ago`;
  return `${years}y ago`;
};

// Generate a fake secure link payload for frontend demo purposes
export const generateSecureLink = (paste, options = {}) => {
  const id = paste.id || `p_${Date.now()}`;
  const token = Math.random().toString(36).slice(2, 10);
  const fullLink = `${window.location.origin}/p/${id}#${token}`;
  const readOnlyLink = `${window.location.origin}/p/${id}?readonly=true#${token}`;
  return {
    id,
    token,
    fullLink,
    readOnlyLink,
    encrypted: !!options.password,
    protection: options.password ? 'Password Protected' : 'Link Access'
  };
};

export const getPasswordStrength = (password) => {
  let score = 0;
  if (!password) return { level: 'Empty', color: 'text-zinc-400', score: 0, width: 'w-0' };
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  const levels = ['Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['text-red-500', 'text-yellow-500', 'text-blue-500', 'text-green-500'];
  const widths = ['w-1/4', 'w-2/4', 'w-3/4', 'w-full'];
  const index = Math.min(Math.max(score - 1, 0), 3);
  return { level: levels[index], color: colors[index], score, width: widths[index] };
};

export const validateFileSize = (sizeInBytes, maxBytes) => {
  return sizeInBytes <= maxBytes;
};