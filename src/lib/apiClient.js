// src/lib/apiClient.js
/**
 * API Client with mocked endpoints for frontend demo
 * Future Python backend will replace these with real network calls
 */

import { demoData } from './demoData.js';

// Generate random tokens for demo
const generateToken = (type) => {
  const prefix = type === 'read' ? 'rtkn_' : 'wtkn_';
  const random = crypto.getRandomValues(new Uint8Array(16));
  return prefix + Array.from(random, b => b.toString(16).padStart(2, '0')).join('');
};

// In-memory storage for demo
let pastesStore = new Map();
let draftsStore = new Map();

// Initialize with demo data
demoData.pastes.forEach(paste => {
  pastesStore.set(paste.id, paste);
});

/**
 * Future Python Endpoints (documented for backend implementation):
 * 
 * POST   /api/paste/create
 *        Body: { title, content, format, language?, visibility, password?, expiresAt?, tags?, attachments?, collaborators? }
 *        Returns: { id, readToken, writeToken, ...paste }
 * 
 * POST   /api/paste/draft  
 *        Body: { title, content, ...fields }
 *        Returns: { draftId, savedAt }
 * 
 * GET    /api/paste/info/:id
 *        Returns: { id, title, folder, visibility, passwordRequired, expiresAt, ... }
 * 
 * POST   /api/paste/verify-password
 *        Body: { pasteId|token, password }
 *        Returns: { success, paste? }
 * 
 * GET    /api/paste/by-token/:mode/:token
 *        Mode: "read" | "write"
 *        Returns: { paste, permissions }
 * 
 * POST   /api/paste/invite
 *        Body: { pasteId, emails[], role }
 *        Returns: { success, invites[] }
 * 
 * POST   /api/paste/comment
 *        Body: { pasteId, line?, text }
 *        Returns: { comment }
 * 
 * POST   /api/paste/presence
 *        Body: { pasteId, user, cursor }
 *        Returns: { success }
 * 
 * POST   /api/upload
 *        Multipart file upload, 50MB limit
 *        Returns: { id, name, type, size, url }
 */

export const apiClient = {
  /**
   * Create a new paste
   */
  async createPaste(payload) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const pasteId = 'paste_' + Date.now();
    const readToken = generateToken('read');
    const writeToken = generateToken('write');
    
    const paste = {
      id: pasteId,
      title: payload.title,
      content: payload.content,
      format: payload.format || 'plain',
      language: payload.language || null,
      folder: payload.folder || 'All Pastes',
      visibility: payload.visibility || 'public',
      passwordRequired: payload.visibility === 'private' && !!payload.password,
      expiresAt: payload.expiresAt || null,
      tags: payload.tags || [],
      attachments: payload.attachments || [],
      collaborators: payload.collaborators || [],
      comments: [],
      readToken,
      writeToken,
      createdAt: new Date().toISOString(),
      views: 0
    };
    
    pastesStore.set(pasteId, paste);
    pastesStore.set(readToken, paste);
    pastesStore.set(writeToken, paste);
    
    return {
      ...paste,
      readUrl: `/r/${readToken}`,
      writeUrl: `/w/${writeToken}`
    };
  },

  /**
   * Save draft
   */
  async saveDraft(payload) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const draftId = 'draft_' + Date.now();
    const draft = {
      id: draftId,
      ...payload,
      savedAt: new Date().toISOString()
    };
    
    draftsStore.set(draftId, draft);
    return draft;
  },

  /**
   * Get paste by token
   */
  async getByToken(mode, token) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const paste = pastesStore.get(token);
    if (!paste) {
      throw new Error('Paste not found');
    }
    
    const permissions = {
      canRead: true,
      canWrite: mode === 'write' && (token === paste.writeToken || paste.visibility === 'public'),
      canComment: mode === 'write',
      canInvite: mode === 'write'
    };
    
    return { paste, permissions };
  },

  /**
   * Verify password for protected paste
   */
  async verifyPassword({ token, pasteId, password }) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const paste = pastesStore.get(token || pasteId);
    if (!paste) {
      throw new Error('Paste not found');
    }
    
    // Demo password is "hunter2"
    const isCorrect = password === 'hunter2';
    
    if (isCorrect) {
      return { success: true, paste };
    } else {
      return { success: false, error: 'Incorrect password' };
    }
  },

  /**
   * Invite collaborators
   */
  async invite(pasteId, emails, role = 'viewer') {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const paste = pastesStore.get(pasteId);
    if (!paste) {
      throw new Error('Paste not found');
    }
    
    const newCollaborators = emails.map(email => ({
      id: 'u_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email,
      role,
      avatar: null,
      online: Math.random() > 0.5,
      color: ['#A78BFA', '#34D399', '#F87171', '#60A5FA', '#FBBF24'][Math.floor(Math.random() * 5)]
    }));
    
    paste.collaborators.push(...newCollaborators);
    
    return { success: true, invites: newCollaborators };
  },

  /**
   * Add comment
   */
  async addComment(pasteId, text, line = null) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const paste = pastesStore.get(pasteId);
    if (!paste) {
      throw new Error('Paste not found');
    }
    
    const comment = {
      id: 'c_' + Date.now(),
      authorId: 'u_current_user',
      line,
      text,
      timestamp: Date.now(),
      resolved: false
    };
    
    paste.comments.push(comment);
    
    return comment;
  },

  /**
   * Upload file
   */
  async upload(file) {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Validate file size (50MB limit)
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error('File size exceeds 50MB limit');
    }
    
    // Create fake URL for demo
    const fileId = 'file_' + Date.now();
    const fakeUrl = URL.createObjectURL(file);
    
    return {
      id: fileId,
      name: file.name,
      type: file.type,
      size: file.size,
      url: fakeUrl
    };
  },

  /**
   * Get user's pastes for dashboard
   */
  async getUserPastes(filters = {}) {
    await new Promise(resolve => setTimeout(resolve, 250));
    
    let pastes = Array.from(pastesStore.values()).filter(p => p.id && p.id.startsWith('paste_'));
    
    if (filters.folder && filters.folder !== 'all') {
      pastes = pastes.filter(p => p.folder === filters.folder);
    }
    
    if (filters.search) {
      const query = filters.search.toLowerCase();
      pastes = pastes.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.content.toLowerCase().includes(query)
      );
    }
    
    return {
      pastes: pastes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      total: pastes.length
    };
  },

  /**
   * Update presence (for collaboration)
   */
  async updatePresence(pasteId, presence) {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // In real implementation, this would update live cursors/awareness
    return { success: true };
  }
};