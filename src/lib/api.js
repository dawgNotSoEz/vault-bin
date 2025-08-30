// Mock API for demo purposes

/**
 * Create a new paste
 */
export async function createPaste(payload) {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const paste = {
    id: crypto.randomUUID(),
    ...payload,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    views: 0,
    url: `https://vaultbin.dev/${crypto.randomUUID().split('-')[0]}`,
    status: 'active'
  };
  
  // Simulate success/error based on content
  if (payload.content.includes('ERROR_TEST')) {
    throw new Error('Failed to create paste. Please try again.');
  }
  
  return paste;
}

/**
 * Save draft
 */
export async function saveDraft(payload) {
  // Simulate shorter latency for drafts
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const draft = {
    id: payload.id ?? crypto.randomUUID(),
    ...payload,
    draft: true,
    savedAt: new Date().toISOString(),
    status: 'draft'
  };
  
  return draft;
}

/**
 * Get user's pastes
 */
export async function getUserPastes(filters = {}) {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Return mock data - would normally fetch from API
  return {
    pastes: [],
    total: 0,
    page: 1,
    hasMore: false
  };
}

/**
 * Get paste by ID
 */
export async function getPaste(id) {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // Mock paste data
  return {
    id,
    title: 'Sample Paste',
    content: '// Sample content\nconsole.log("Hello, World!");',
    language: 'javascript',
    visibility: 'public',
    createdAt: new Date().toISOString(),
    views: 42,
    folder: 'personal'
  };
}

/**
 * Delete paste
 */
export async function deletePaste(id) {
  await new Promise(resolve => setTimeout(resolve, 300));
  return { success: true };
}

/**
 * Search pastes
 */
export async function searchPastes(query, filters = {}) {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return {
    results: [],
    total: 0,
    query
  };
}