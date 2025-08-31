// src/lib/tokens.js
/**
 * Token utilities for read/write access
 */

export const tokenUtils = {
  /**
   * Extract mode and token from URL path
   */
  parseTokenFromPath(pathname) {
    const readMatch = pathname.match(/^\/r\/(.+)$/);
    const writeMatch = pathname.match(/^\/w\/(.+)$/);
    
    if (readMatch) {
      return { mode: 'read', token: readMatch[1] };
    }
    
    if (writeMatch) {
      return { mode: 'write', token: writeMatch[1] };
    }
    
    return null;
  },

  /**
   * Generate shareable URLs
   */
  generateUrls(readToken, writeToken, baseUrl = window.location.origin) {
    return {
      readUrl: `${baseUrl}/r/${readToken}`,
      writeUrl: `${baseUrl}/w/${writeToken}`
    };
  },

  /**
   * Validate token format
   */
  isValidToken(token) {
    return /^(rtkn_|wtkn_)[a-f0-9]{32}$/.test(token);
  },

  /**
   * Get token type from token string
   */
  getTokenType(token) {
    if (token.startsWith('rtkn_')) return 'read';
    if (token.startsWith('wtkn_')) return 'write';
    return null;
  }
};