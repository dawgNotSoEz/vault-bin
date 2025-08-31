// src/pages/Collaborate.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Users, MessageSquare, Edit3, Save, Share2, Copy, Download, 
  Eye, EyeOff, Lock, Unlock, Settings, UserPlus, Crown, Shield,
  Clock, Activity, GitBranch, FileText, Code, Palette, Play,
  ChevronDown, ChevronUp, MoreVertical, Trash2, Ban, AlertTriangle,
  Mic, MicOff, Video, VideoOff, Phone, PhoneOff, Screen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiClient } from '../lib/apiClient';
import { demoData } from '../lib/demoData';
import { tokenUtils } from '../lib/tokens';
import { validation } from '../lib/validation';
import PrismHighlighter from '../components/PrismHighlighter';
import Button from '../components/Button';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import Tooltip from '../components/Tooltip';
import Select from '../components/Select';
import Switch from '../components/Switch';

function Collaborate() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Core state
  const [paste, setPaste] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasWriteAccess, setHasWriteAccess] = useState(false);
  
  // Editor state
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isEditing, setIsEditing] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  
  // Collaboration state
  const [collaborators, setCollaborators] = useState([]);
  const [presenceData, setPresenceData] = useState({});
  const [currentUser, setCurrentUser] = useState({ 
    id: 'user-' + Date.now(), 
    name: 'You', 
    color: '#6366f1' 
  });
  const [otherCursors, setOtherCursors] = useState([]);
  
  // Chat state
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isTyping, setIsTyping] = useState({});
  
  // UI state
  const [showSettings, setShowSettings] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showPresence, setShowPresence] = useState(true);
  const [splitView, setSplitView] = useState(false);
  const [rightPanelTab, setRightPanelTab] = useState('chat'); // chat, collaborators, history, settings
  
  // Voice/Video state (mock for demo)
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [screenShare, setScreenShare] = useState(false);
  const [activeCall, setActiveCall] = useState(false);
  
  // Refs
  const editorRef = useRef(null);
  const messagesEndRef = useRef(null);
  const autoSaveRef = useRef(null);

  // Parse token from URL
  const token = tokenUtils.parseTokenFromPath(window.location.pathname);

  useEffect(() => {
    loadPaste();
    connectToCollaboration();
    
    // Auto-save every 5 seconds when dirty
    autoSaveRef.current = setInterval(() => {
      if (isDirty && hasWriteAccess) {
        saveChanges(false); // Silent save
      }
    }, 5000);
    
    return () => {
      if (autoSaveRef.current) {
        clearInterval(autoSaveRef.current);
      }
      disconnectFromCollaboration();
    };
  }, [id, token]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const loadPaste = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get paste data - try demo data first, then API
      let pasteData = demoData.pastes.find(p => p.id === id);
      
      if (!pasteData) {
        pasteData = await apiClient.getPaste(id, token?.value);
      }
      
      if (!pasteData) {
        setError('Paste not found');
        return;
      }
      
      // Check write access
      const writeAccess = token?.mode === 'write' || pasteData.writeToken === token?.token;
      setHasWriteAccess(writeAccess);
      
      if (!writeAccess) {
        setError('You need write access to collaborate on this paste');
        return;
      }
      
      setPaste(pasteData);
      setContent(pasteData.content || '');
      setTitle(pasteData.title || '');
      setLanguage(pasteData.language || 'javascript');
      setCollaborators(pasteData.collaborators || []);
      setMessages(pasteData.messages || []);
      
    } catch (err) {
      console.error('Error loading paste:', err);
      setError(err.message || 'Failed to load paste');
    } finally {
      setLoading(false);
    }
  };

  const connectToCollaboration = () => {
    // Mock WebSocket connection for real-time collaboration
    console.log('Connecting to collaboration server...');
    
    // Simulate receiving presence updates
    const mockPresence = {
      'user-alice': { 
        name: 'Alice Chen', 
        color: '#ef4444', 
        cursor: { line: 5, ch: 12 }, 
        lastSeen: Date.now() 
      },
      'user-bob': { 
        name: 'Bob Smith', 
        color: '#10b981', 
        cursor: { line: 15, ch: 8 }, 
        lastSeen: Date.now() - 30000 
      }
    };
    
    setPresenceData(mockPresence);
    
    // Simulate real-time messages
    setTimeout(() => {
      addMessage('Alice Chen', 'Hey! I\'m working on the authentication logic. What do you think about using JWT tokens?', 'received');
    }, 2000);
    
    setTimeout(() => {
      addMessage('Bob Smith', 'That sounds good! I\'m updating the database schema to support the new user roles.', 'received');
    }, 5000);
  };

  const disconnectFromCollaboration = () => {
    console.log('Disconnecting from collaboration server...');
  };

  const saveChanges = async (showNotification = true) => {
    if (!isDirty || !hasWriteAccess) return;
    
    try {
      setIsSaving(true);
      
      const updateData = {
        title,
        content,
        language,
        lastModified: new Date().toISOString(),
        modifiedBy: currentUser.name
      };
      
      await apiClient.updatePaste(paste.id, updateData, token?.token);
      
      setIsDirty(false);
      setLastSaved(new Date());
      
      if (showNotification) {
        // Show toast notification
        console.log('Changes saved successfully');
      }
      
      // Add to activity log
      addActivity('updated the paste');
      
    } catch (err) {
      console.error('Failed to save changes:', err);
      // Show error notification
    } finally {
      setIsSaving(false);
    }
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
    setIsDirty(true);
    
    // Broadcast cursor position and changes to other users
    broadcastChange('content', newContent);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setIsDirty(true);
    broadcastChange('title', e.target.value);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setIsDirty(true);
    broadcastChange('language', newLanguage);
  };

  const broadcastChange = (type, value) => {
    // Mock broadcasting changes to other collaborators
    console.log('Broadcasting change:', type, value);
  };

  const addMessage = (author, content, type = 'sent') => {
    const message = {
      id: Date.now() + Math.random(),
      author,
      content,
      timestamp: new Date().toISOString(),
      type
    };
    
    setMessages(prev => [...prev, message]);
    
    if (type === 'received' && !showChat) {
      setUnreadCount(prev => prev + 1);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    addMessage(currentUser.name, newMessage, 'sent');
    setNewMessage('');
    
    // Mock sending to other users
    apiClient.sendMessage(paste.id, {
      author: currentUser.name,
      content: newMessage,
      timestamp: new Date().toISOString()
    });
  };

  const addActivity = (action) => {
    const activity = {
      id: Date.now(),
      user: currentUser.name,
      action,
      timestamp: new Date().toISOString()
    };
    
    setPaste(prev => ({
      ...prev,
      activity: [activity, ...(prev.activity || [])].slice(0, 50) // Keep latest 50
    }));
  };

  const inviteCollaborator = async (email, role = 'editor') => {
    try {
      const invitation = await apiClient.inviteCollaborator(paste.id, { email, role }, token?.token);
      
      addActivity(`invited ${email} as ${role}`);
      addMessage('System', `${email} has been invited to collaborate`, 'system');
      
    } catch (err) {
      console.error('Failed to invite collaborator:', err);
    }
  };

  const toggleVoiceChat = () => {
    setVoiceEnabled(!voiceEnabled);
    addActivity(voiceEnabled ? 'left voice chat' : 'joined voice chat');
  };

  const toggleVideoChat = () => {
    setVideoEnabled(!videoEnabled);
    addActivity(videoEnabled ? 'turned off video' : 'turned on video');
  };

  const toggleScreenShare = () => {
    setScreenShare(!screenShare);
    addActivity(screenShare ? 'stopped screen sharing' : 'started screen sharing');
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  const getPresenceStatus = (userId) => {
    const presence = presenceData[userId];
    if (!presence) return 'offline';
    
    const lastSeen = Date.now() - presence.lastSeen;
    if (lastSeen < 30000) return 'active';
    if (lastSeen < 300000) return 'idle';
    return 'away';
  };

  const renderInviteModal = () => (
    <Modal
      open={showInviteModal}
      onClose={() => setShowInviteModal(false)}
    >
      <Modal.Header onClose={() => setShowInviteModal(false)}>
        <h2 className="text-lg font-semibold text-white">Invite Collaborators</h2>
      </Modal.Header>
      <Modal.Content>
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="colleague@example.com"
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Role
              </label>
              <Select
                options={[
                  { value: 'viewer', label: 'Viewer - Can view and comment' },
                  { value: 'editor', label: 'Editor - Can edit and collaborate' },
                  { value: 'admin', label: 'Admin - Full access and management' }
                ]}
                defaultValue="editor"
              />
            </div>
            
            <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-3">
              <p className="text-sm text-zinc-400 mb-2">Share Link</p>
              <div className="flex gap-2">
                <Input
                  value={`${window.location.origin}/collaborate/${paste?.id}?token=${token?.token}`}
                  readOnly
                  className="font-mono text-xs"
                />
                <Button variant="outline" size="sm">
                  <Copy size={16} />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowInviteModal(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={() => setShowInviteModal(false)} className="flex-1">
              Send Invitation
            </Button>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );

  const renderRightPanel = () => {
    const tabs = [
      { id: 'chat', label: 'Chat', icon: MessageSquare, count: unreadCount },
      { id: 'collaborators', label: 'People', icon: Users, count: collaborators.length },
      { id: 'history', label: 'History', icon: Clock },
      { id: 'settings', label: 'Settings', icon: Settings }
    ];

    return (
      <div className="w-80 bg-zinc-900 border-l border-zinc-800 flex flex-col">
        {/* Tab Headers */}
        <div className="border-b border-zinc-800">
          <div className="flex">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setRightPanelTab(tab.id);
                  if (tab.id === 'chat') {
                    setUnreadCount(0);
                  }
                }}
                className={`flex-1 px-3 py-3 text-sm font-medium border-b-2 transition-colors relative ${
                  rightPanelTab === tab.id
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-zinc-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-center gap-1">
                  <tab.icon size={16} />
                  <span className="hidden sm:inline">{tab.label}</span>
                  {tab.count > 0 && (
                    <Badge variant="outline" className="text-xs ml-1">
                      {tab.count}
                    </Badge>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden">
          {rightPanelTab === 'chat' && (
            <div className="h-full flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map(message => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${
                      message.type === 'sent' 
                        ? 'ml-8' 
                        : message.type === 'system'
                        ? 'text-center'
                        : 'mr-8'
                    }`}
                  >
                    {message.type === 'system' ? (
                      <div className="text-xs text-zinc-500 bg-zinc-800 rounded-lg px-3 py-1 inline-block">
                        {message.content}
                      </div>
                    ) : (
                      <div className={`rounded-lg p-3 ${
                        message.type === 'sent'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-zinc-800 text-zinc-300'
                      }`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium">{message.author}</span>
                          <span className="text-xs opacity-70">
                            {formatTimestamp(message.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="border-t border-zinc-800 p-4">
                <form onSubmit={sendMessage} className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1"
                  />
                  <Button type="submit" size="sm" disabled={!newMessage.trim()}>
                    Send
                  </Button>
                </form>
              </div>
            </div>
          )}

          {rightPanelTab === 'collaborators' && (
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Active Collaborators</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowInviteModal(true)}
                >
                  <UserPlus size={16} className="mr-1" />
                  Invite
                </Button>
              </div>

              <div className="space-y-3">
                {/* Current User */}
                <div className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ backgroundColor: currentUser.color }}
                  >
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{currentUser.name}</span>
                      <Badge variant="outline" className="text-xs">You</Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-zinc-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Active
                    </div>
                  </div>
                  <Crown size={16} className="text-yellow-500" />
                </div>

                {/* Other Collaborators */}
                {Object.entries(presenceData).map(([userId, user]) => (
                  <div key={userId} className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ backgroundColor: user.color }}
                    >
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{user.name}</span>
                        <Badge variant="outline" className="text-xs">Editor</Badge>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-zinc-500">
                        <div className={`w-2 h-2 rounded-full ${
                          getPresenceStatus(userId) === 'active' ? 'bg-green-500' :
                          getPresenceStatus(userId) === 'idle' ? 'bg-yellow-500' :
                          'bg-zinc-500'
                        }`}></div>
                        {getPresenceStatus(userId)}
                      </div>
                    </div>
                    <button className="text-zinc-500 hover:text-white">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Voice/Video Controls */}
              <div className="border-t border-zinc-700 pt-4">
                <h4 className="font-medium mb-3">Communication</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={voiceEnabled ? "default" : "outline"}
                    size="sm"
                    onClick={toggleVoiceChat}
                    className="flex items-center gap-2"
                  >
                    {voiceEnabled ? <Mic size={16} /> : <MicOff size={16} />}
                    Voice
                  </Button>
                  <Button
                    variant={videoEnabled ? "default" : "outline"}
                    size="sm"
                    onClick={toggleVideoChat}
                    className="flex items-center gap-2"
                  >
                    {videoEnabled ? <Video size={16} /> : <VideoOff size={16} />}
                    Video
                  </Button>
                </div>
                <Button
                  variant={screenShare ? "default" : "outline"}
                  size="sm"
                  onClick={toggleScreenShare}
                  className="w-full mt-2 flex items-center gap-2"
                >
                  <Screen size={16} />
                  {screenShare ? 'Stop Sharing' : 'Share Screen'}
                </Button>
              </div>
            </div>
          )}

          {rightPanelTab === 'history' && (
            <div className="p-4 space-y-4">
              <h3 className="font-medium">Version History</h3>
              <div className="space-y-3">
                {paste?.activity?.slice(0, 10).map(activity => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 bg-zinc-800 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold text-white">
                      {activity.user.charAt(0)}
                    </div>
                    <div className="flex-1 text-sm">
                      <p className="text-zinc-300">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-zinc-500 mt-1">
                        {formatTimestamp(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {rightPanelTab === 'settings' && (
            <div className="p-4 space-y-6">
              <div>
                <h3 className="font-medium mb-4">Collaboration Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Show Presence</p>
                      <p className="text-xs text-zinc-500">Display other users' cursors</p>
                    </div>
                    <Switch
                      checked={showPresence}
                      onChange={setShowPresence}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Auto-save</p>
                      <p className="text-xs text-zinc-500">Save changes automatically</p>
                    </div>
                    <Switch checked={true} disabled />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Split View</p>
                      <p className="text-xs text-zinc-500">Edit and preview side by side</p>
                    </div>
                    <Switch
                      checked={splitView}
                      onChange={setSplitView}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-4">Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Chat Messages</p>
                    </div>
                    <Switch checked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">User Joins/Leaves</p>
                    </div>
                    <Switch checked={true} />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-700">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/view/${paste?.id}${token ? `?token=${token.token}` : ''}`)}
                  className="w-full"
                >
                  <Eye size={16} className="mr-2" />
                  Switch to View Mode
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-zinc-400">Loading collaboration space...</p>
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
          <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-zinc-400 mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => navigate('/')}>
              Return Home
            </Button>
            <Button onClick={() => navigate(`/view/${id}`)}>
              View Only
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!paste) return null;

  return (
    <div className="h-screen bg-zinc-950 text-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <Input
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Untitled Paste"
                    className="text-lg font-bold bg-transparent border-none p-0 focus:ring-0"
                  />
                  {isDirty && (
                    <Badge variant="outline" className="text-xs">
                      Unsaved
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-1">
                  <Select
                    value={language}
                    onChange={handleLanguageChange}
                    options={[
                      { value: 'javascript', label: 'JavaScript' },
                      { value: 'typescript', label: 'TypeScript' },
                      { value: 'python', label: 'Python' },
                      { value: 'java', label: 'Java' },
                      { value: 'cpp', label: 'C++' },
                      { value: 'rust', label: 'Rust' },
                      { value: 'go', label: 'Go' },
                      { value: 'html', label: 'HTML' },
                      { value: 'css', label: 'CSS' },
                      { value: 'json', label: 'JSON' },
                      { value: 'yaml', label: 'YAML' },
                      { value: 'sql', label: 'SQL' },
                      { value: 'bash', label: 'Bash' },
                      { value: 'ruby', label: 'Ruby' },
                      { value: 'plaintext', label: 'Plain Text' }
                    ]}
                    className="text-sm"
                  />
                  {lastSaved && (
                    <span className="text-xs text-zinc-500">
                      Saved {formatTimestamp(lastSaved)}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 ml-4">
              {/* Presence Indicators */}
              <div className="flex items-center gap-1 mr-2">
                {Object.entries(presenceData).map(([userId, user]) => (
                  <Tooltip key={userId} content={`${user.name} - ${getPresenceStatus(userId)}`}>
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-zinc-700"
                      style={{ backgroundColor: user.color }}
                    >
                      {user.name.charAt(0)}
                    </div>
                  </Tooltip>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => saveChanges(true)}
                disabled={!isDirty || isSaving}
              >
                {isSaving ? (
                  <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                ) : (
                  <Save size={16} />
                )}
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/view/${paste.id}${token ? `?token=${token.value}` : ''}`)}
              >
                <Eye size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {splitView ? (
            <div className="flex-1 grid grid-cols-2 gap-1">
              <div className="bg-zinc-900 border border-zinc-800 overflow-hidden">
                <div className="border-b border-zinc-800 px-3 py-2 bg-zinc-800">
                  <span className="text-sm font-medium">Editor</span>
                </div>
                <div className="h-full">
                  <Textarea
                    ref={editorRef}
                    value={content}
                    onChange={(e) => handleContentChange(e.target.value)}
                    placeholder="Start typing your code..."
                    className="w-full h-full resize-none font-mono text-sm bg-zinc-900 border-none focus:ring-0"
                    style={{ minHeight: '600px' }}
                  />
                </div>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 overflow-hidden">
                <div className="border-b border-zinc-800 px-3 py-2 bg-zinc-800">
                  <span className="text-sm font-medium">Preview</span>
                </div>
                <div className="h-full overflow-auto">
                  <PrismHighlighter
                    code={content}
                    language={language}
                    showLineNumbers={true}
                    showCopyButton={false}
                    className="h-full"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 bg-zinc-900 border border-zinc-800 overflow-hidden">
              <div className="h-full">
                <Textarea
                  value={content}
                  onChange={(e) => handleContentChange(e.target.value)}
                  placeholder="Start typing your code..."
                  className="w-full h-full resize-none font-mono text-sm bg-zinc-900 border-none focus:ring-0"
                  style={{ minHeight: '600px' }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Panel */}
        {renderRightPanel()}
      </div>

      {/* Modals */}
      {renderInviteModal()}
    </div>
  );
}

export default Collaborate;