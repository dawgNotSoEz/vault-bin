// src/lib/validation.js
/**
 * Form validation utilities
 */

export const validation = {
  /**
   * Validate paste title
   */
  title(value) {
    if (!value || value.trim().length === 0) {
      return 'Title is required';
    }
    if (value.length > 200) {
      return 'Title must be less than 200 characters';
    }
    return null;
  },

  /**
   * Validate paste content
   */
  content(value) {
    if (!value || value.trim().length === 0) {
      return 'Content is required';
    }
    if (value.length > 1000000) { // 1MB text limit
      return 'Content is too large (max 1MB)';
    }
    return null;
  },

  /**
   * Validate password
   */
  password(value, isRequired = false) {
    if (isRequired && (!value || value.length === 0)) {
      return 'Password is required for private pastes';
    }
    if (value && (value.length < 8 || value.length > 64)) {
      return 'Password must be 8-64 characters';
    }
    return null;
  },

  /**
   * Validate email
   */
  email(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      return 'Email is required';
    }
    if (!emailRegex.test(value)) {
      return 'Invalid email format';
    }
    return null;
  },

  /**
   * Validate tags
   */
  tags(tags) {
    if (tags.length > 6) {
      return 'Maximum 6 tags allowed';
    }
    
    for (const tag of tags) {
      if (!/^[a-zA-Z0-9-_]+$/.test(tag)) {
        return 'Tags can only contain letters, numbers, hyphens, and underscores';
      }
      if (tag.length > 20) {
        return 'Tags must be less than 20 characters';
      }
    }
    
    return null;
  },

  /**
   * Validate file upload
   */
  file(file) {
    const maxSize = 50 * 1024 * 1024; // 50MB
    
    if (file.size > maxSize) {
      return 'File size exceeds 50MB limit';
    }
    
    // Check for potentially dangerous files
    const dangerousExtensions = ['.exe', '.bat', '.cmd', '.scr', '.pif'];
    const extension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    
    if (dangerousExtensions.includes(extension)) {
      return 'This file type is not allowed';
    }
    
    return null;
  },

  /**
   * Validate expiration date
   */
  expiration(value) {
    if (!value) return null;
    
    const date = new Date(value);
    const now = new Date();
    
    if (isNaN(date.getTime())) {
      return 'Invalid date format';
    }
    
    if (date <= now) {
      return 'Expiration date must be in the future';
    }
    
    // Max 1 year in the future
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    
    if (date > maxDate) {
      return 'Expiration date cannot be more than 1 year in the future';
    }
    
    return null;
  }
};