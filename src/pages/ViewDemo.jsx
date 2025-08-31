// src/pages/ViewDemo.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Lock, Unlock, Copy, Download, Share2, Eye, Calendar, 
  User, MessageSquare, FileText, Tag, Clock, ExternalLink,
  ChevronDown, ChevronUp, Reply, Heart, AlertTriangle,
  GitBranch, Users, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiClient } from '../lib/apiClient';
import { demoData } from '../lib/demoData';
import { tokenUtils } from '../lib/tokens';
import { validation } from '../lib/validation';
import PrismHighlighter from '../components/PrismHighlighter';
import Button from '../components/Button';
import Input from '../components/Input';
import PasswordField from '../components/PasswordField';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import Tooltip from '../components/Tooltip';

function ViewDemo() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Core state
  const [paste, setPaste] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requiresPassword, setRequiresPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // View state
  const [viewMode, setViewMode] = useState('formatted'); // formatted, raw, wrapped
  const [showMetadata, setShowMetadata] = useState(true);
  const [showComments, setShowComments] = useState(true);
  const [showVersions, setShowVersions] = useState(false);
  
  // Interaction state
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrls, setShareUrls] = useState(null);
  const [showRawModal, setShowRawModal] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  
  // Parse token from URL
  const token = tokenUtils.parseTokenFromPath(window.location.pathname);
  const hasWriteAccess = token?.mode === 'write';

  useEffect(() => {
    loadPaste();
  }, [id, token]);

  const loadPaste = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get paste data - try demo data first, then API
      let pasteData = demoData.pastes.find(p => p.id === id);
      
      if (!pasteData) {
        pasteData = await apiClient.getPaste(id, token?.token);
      }
      
      if (!pasteData) {
        setError('Paste not found');
        return;
      }
      
      // Check if password protected and we don't have access
      if (pasteData.isPrivate && !pasteData.content) {
        setRequiresPassword(true);
        setPaste(pasteData);
        return;
      }
      
      setPaste(pasteData);
      
      // Generate share URLs
      const urls = tokenUtils.generateUrls(pasteData.readToken, pasteData.writeToken);
      setShareUrls(urls);
      
      // Update view count
      await apiClient.incrementViews(id);
      
    } catch (err) {
      console.error('Error loading paste:', err);
      setError(err.message || 'Failed to load paste');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validation.password(password);
    if (validationError) {
      setPasswordError(validationError);
      return;
    }
    
    try {
      setPasswordError('');
      const result = await apiClient.verifyPassword(id, password);
      
      if (result.success) {
        // Reload paste with password
        await loadPaste();
        setRequiresPassword(false);
      } else {
        setPasswordError('Incorrect password');
      }
    } catch (err) {
      setPasswordError('Failed to verify password');
    }
  };



  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // Show toast notification (implement toast system)
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };



  const handleAddComment = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim() || !commentAuthor.trim()) return;
    
    try {
      setIsSubmittingComment(true);
      
      const comment = {
        id: Date.now(),
        author: commentAuthor,
        content: newComment,
        timestamp: new Date().toISOString()
      };
      
      await apiClient.addComment(paste.id, comment);
      
      // Update local state
      setPaste(prev => ({
        ...prev,
        comments: [...(prev.comments || []), comment]
      }));
      
      setNewComment('');
      
    } catch (err) {
      console.error('Failed to add comment:', err);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const downloadPaste = () => {
    if (!paste) return;
    
    const blob = new Blob([paste.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${paste.title || 'paste'}.${paste.language || 'txt'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const renderPasswordPrompt = () => (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-6">
          <Lock className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Protected Paste</h1>
          <p className="text-zinc-400">This paste is password protected. Enter the password to view it.</p>
        </div>
        
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <PasswordField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            error={passwordError}
            autoFocus
          />
          
          <Button type="submit" className="w-full">
            Unlock Paste
          </Button>
        </form>
        
        {paste && (
          <div className="mt-6 pt-6 border-t border-zinc-800 text-center">
            <p className="text-sm text-zinc-400 mb-2">Paste Info</p>
            <div className="space-y-1 text-xs text-zinc-500">
              <p>Created: {formatTimestamp(paste.createdAt)}</p>
              {paste.expiresAt && (
                <p>Expires: {formatTimestamp(paste.expiresAt)}</p>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );

  const renderShareModal = () => (
    <Modal
      open={showShareModal}
      onClose={() => setShowShareModal(false)}
    >
      <Modal.Header onClose={() => setShowShareModal(false)}>
        <h2 className="text-lg font-semibold text-white">Share Paste</h2>
      </Modal.Header>
      <Modal.Content>
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                View-only Link
              </label>
              <div className="flex gap-2">
                <Input
                  value={shareUrls?.readUrl || ''}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(shareUrls?.readUrl || '')}
                >
                  <Copy size={16} />
                </Button>
              </div>
              <p className="text-xs text-zinc-500 mt-1">
                Others can view but not edit this paste
              </p>
            </div>
            
            {hasWriteAccess && shareUrls?.writeUrl && (
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Edit Link
                </label>
                <div className="flex gap-2">
                  <Input
                    value={shareUrls.writeUrl}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(shareUrls.writeUrl)}
                  >
                    <Copy size={16} />
                  </Button>
                </div>
                <p className="text-xs text-zinc-500 mt-1">
                  Others can view and collaborate on this paste
                </p>
              </div>
            )}
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowShareModal(false)}
              className="flex-1"
            >
              Close
            </Button>
            <Button
              onClick={() => copyToClipboard(shareUrls?.readUrl || '')}
              className="flex-1"
            >
              Copy View Link
            </Button>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );

  const renderRawModal = () => (
    <Modal
      open={showRawModal}
      onClose={() => setShowRawModal(false)}
      className="max-w-4xl"
    >
      <Modal.Header onClose={() => setShowRawModal(false)}>
        <h2 className="text-lg font-semibold text-white">Raw Content</h2>
      </Modal.Header>
      <Modal.Content>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-400">
              {paste?.content?.length || 0} characters, {paste?.content?.split('\n').length || 0} lines
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(paste?.content || '')}
              >
                <Copy size={16} className="mr-2" />
                Copy All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadPaste}
              >
                <Download size={16} className="mr-2" />
                Download
              </Button>
            </div>
          </div>
          
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 max-h-96 overflow-auto">
            <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">
              {paste?.content}
            </pre>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-zinc-400">Loading paste...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Paste Not Found</h1>
          <p className="text-zinc-400 mb-6">{error}</p>
          <Button onClick={() => navigate('/')}>
            Return Home
          </Button>
        </motion.div>
      </div>
    );
  }

  if (requiresPassword) {
    return renderPasswordPrompt();
  }

  if (!paste) return null;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-900/50 sticky top-0 z-40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <div className="min-w-0 flex-1">
                <h1 className="text-xl font-bold text-white truncate">
                  {paste.title || 'Untitled Paste'}
                </h1>
                <div className="flex items-center gap-4 mt-1 text-sm text-zinc-400">
                  <span className="flex items-center gap-1">
                    <User size={14} />
                    {paste.author || 'Anonymous'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {formatTimestamp(paste.createdAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye size={14} />
                    {paste.views || 0} views
                  </span>
                  {paste.isPrivate && (
                    <Badge variant="outline" className="text-xs">
                      <Lock size={12} className="mr-1" />
                      Private
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 ml-4">
              <Tooltip content="Share paste">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowShareModal(true)}
                >
                  <Share2 size={16} />
                </Button>
              </Tooltip>
              
              <Tooltip content="Download paste">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadPaste}
                >
                  <Download size={16} />
                </Button>
              </Tooltip>
              
              <Tooltip content="View raw content">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowRawModal(true)}
                >
                  <FileText size={16} />
                </Button>
              </Tooltip>
              
              {hasWriteAccess && (
                <Tooltip content="Collaborate">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/collaborate/${paste.id}${token ? `?token=${token.token}` : ''}`)}
                  >
                    <Users size={16} />
                  </Button>
                </Tooltip>
              )}
              
              <Tooltip content="Copy view link">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(shareUrls?.readUrl || window.location.href)}
                >
                  <Copy size={16} />
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Content Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {paste.language || 'Plain Text'}
                  </Badge>
                  {paste.tags?.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      <Tag size={12} className="mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
                

              </div>
              
              <div className="flex items-center gap-2">
                <select
                  value={viewMode}
                  onChange={(e) => setViewMode(e.target.value)}
                  className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1 text-sm"
                >
                  <option value="formatted">Formatted</option>
                  <option value="raw">Raw</option>
                  <option value="wrapped">Wrapped</option>
                </select>
              </div>
            </div>

            {/* Code Content */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
              <PrismHighlighter
                code={paste.content}
                language={paste.language}
                showLineNumbers={true}
                showCopyButton={true}
              />
            </div>

            {/* Comments Section */}
            {showComments && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <MessageSquare size={20} />
                    Comments ({paste.comments?.length || 0})
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowComments(!showComments)}
                  >
                    {showComments ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </Button>
                </div>

                {/* Add Comment Form */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
                  <form onSubmit={handleAddComment} className="space-y-4">
                    <Input
                      placeholder="Your name"
                      value={commentAuthor}
                      onChange={(e) => setCommentAuthor(e.target.value)}
                      required
                    />
                    
                    <textarea
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white placeholder-zinc-500 resize-none"
                      rows={3}
                      required
                    />
                    
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-zinc-500">
                        Add your thoughts about this paste.
                      </p>
                      <Button
                        type="submit"
                        size="sm"
                        disabled={isSubmittingComment || !newComment.trim() || !commentAuthor.trim()}
                      >
                        {isSubmittingComment ? 'Adding...' : 'Add Comment'}
                      </Button>
                    </div>
                  </form>
                </div>

                {/* Comments List */}
                <div className="space-y-3">
                  {paste.comments?.map((comment) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-zinc-900 border border-zinc-800 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-zinc-300">{comment.author}</span>
                          {comment.lineNumber && (
                            <Badge variant="outline" className="text-xs">
                              Line {comment.lineNumber}
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-zinc-500">
                          {formatTimestamp(comment.timestamp)}
                        </span>
                      </div>
                      <p className="text-zinc-300 whitespace-pre-wrap">{comment.content}</p>
                    </motion.div>
                  ))}
                  
                  {(!paste.comments || paste.comments.length === 0) && (
                    <div className="text-center py-8 text-zinc-500">
                      <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No comments yet. Be the first to comment!</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Metadata */}
            {showMetadata && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Paste Info</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowMetadata(!showMetadata)}
                  >
                    {showMetadata ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </Button>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Language:</span>
                    <span>{paste.language || 'Plain Text'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Size:</span>
                    <span>{paste.content?.length || 0} chars</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Lines:</span>
                    <span>{paste.content?.split('\n').length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Created:</span>
                    <span>{formatTimestamp(paste.createdAt)}</span>
                  </div>
                  {paste.expiresAt && (
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Expires:</span>
                      <span className="text-red-400">
                        {formatTimestamp(paste.expiresAt)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Views:</span>
                    <span>{paste.views || 0}</span>
                  </div>
                  {paste.attachments?.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Attachments:</span>
                      <span>{paste.attachments.length}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Collaborators */}
            {paste.collaborators?.length > 0 && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Users size={16} />
                  Collaborators
                </h3>
                <div className="space-y-2">
                  {paste.collaborators.map((collaborator) => (
                    <div key={collaborator.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold">
                          {collaborator.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm">{collaborator.name}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {collaborator.role}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activity */}
            {paste.activity?.length > 0 && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Activity size={16} />
                  Recent Activity
                </h3>
                <div className="space-y-2">
                  {paste.activity.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="text-sm">
                      <div className="flex items-center gap-2 text-zinc-300">
                        <span className="font-medium">{activity.user}</span>
                        <span className="text-zinc-500">{activity.action}</span>
                      </div>
                      <div className="text-xs text-zinc-500 mt-1">
                        {formatTimestamp(activity.timestamp)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {renderShareModal()}
      {renderRawModal()}
    </div>
  );
}

export default ViewDemo;