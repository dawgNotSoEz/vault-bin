import { clsx } from 'clsx';

/**
 * Utility function to merge class names conditionally
 */
export function cn(...inputs) {
  return clsx(inputs);
}

/**
 * Format bytes to human readable string
 */
export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Format date to relative time or specific format
 */
export function formatDate(date, options = {}) {
  const now = new Date();
  const target = new Date(date);
  const diffInMs = now - target;
  const diffInHours = diffInMs / (1000 * 60 * 60);
  
  if (options.relative !== false && diffInHours < 24) {
    if (diffInHours < 1) {
      const minutes = Math.floor(diffInMs / (1000 * 60));
      return `${minutes}m ago`;
    }
    return `${Math.floor(diffInHours)}h ago`;
  }
  
  return target.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: target.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  });
}

/**
 * Debounce function execution
 */
export function debounce(func, wait, immediate = false) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}

/**
 * Generate a random ID
 */
export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Validate email format
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate tag format (alphanum + dash only)
 */
export function isValidTag(tag) {
  const tagRegex = /^[a-zA-Z0-9-]+$/;
  return tagRegex.test(tag) && tag.length >= 1 && tag.length <= 24;
}

/**
 * Calculate estimated content size
 */
export function estimateSize(content, attachments = []) {
  const contentSize = new Blob([content]).size;
  const attachmentSize = attachments.reduce((total, file) => total + file.size, 0);
  return contentSize + attachmentSize;
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
}