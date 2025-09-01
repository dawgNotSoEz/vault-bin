import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, AlertTriangle, Copy, ExternalLink, X } from 'lucide-react';
import Icon from '@/components/Icon';
import { addPaste } from '@/lib/demoData';
import { cn } from '@/lib/utils';

const Create = () => {
  const navigate = useNavigate();
  
  const [content, setContent] = useState('');
  const [contentMode, setContentMode] = useState('plain'); // plain, markdown, code
  const [language, setLanguage] = useState('plaintext');
  const [expires, setExpires] = useState('1d');
  const [burnAfterReading, setBurnAfterReading] = useState(false);
  const [password, setPassword] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [showSecureLinkModal, setShowSecureLinkModal] = useState(false);
  const [generatedPaste, setGeneratedPaste] = useState(null);

  const languageOptions = [
    { value: 'plaintext', label: 'Plain Text' },
    { value: 'markdown', label: 'Markdown' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'rust', label: 'Rust' },
    { value: 'go', label: 'Go' },
    { value: 'json', label: 'JSON' },
    { value: 'yaml', label: 'YAML' },
    { value: 'sql', label: 'SQL' },
    { value: 'bash', label: 'Bash' },
  ];

  const expirationOptions = [
    { value: '1d', label: '1 day' },
    { value: '7d', label: '7 days' },
    { value: '30d', label: '30 days' },
    { value: 'permanent', label: 'Permanent' },
  ];

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => ({
      id: Date.now() + Math.random(),
      filename: file.name,
      sizeKB: Math.round(file.size / 1024),
      file: file
    }));
    setAttachments([...attachments, ...newAttachments]);
  };

  const removeAttachment = (id) => {
    setAttachments(attachments.filter(att => att.id !== id));
  };

  const handleCreatePaste = () => {
    const newPaste = {
      id: `p_${Date.now()}`,
      title: content.split('\n')[0].substring(0, 50) || 'Untitled Paste',
      content: content || '',
      language: language,
      tags: [],
      visibility: password ? 'private' : 'public',
      passwordProtected: !!password,
      expires: expires,
      burnAfterReading: burnAfterReading,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      commentsCount: 0,
      reactionsCount: 0,
      snippetPreview: content.substring(0, 160) + (content.length > 160 ? '...' : ''),
      folderId: null,
      ownerId: 'user-1',
      attachments: attachments.map(att => ({
        id: att.id,
        filename: att.filename,
        sizeKB: att.sizeKB
      })),
    };

    addPaste(newPaste);
    setGeneratedPaste(newPaste);
    setShowSecureLinkModal(true);
  };

  const handleModalClose = () => {
    setShowSecureLinkModal(false);
    if (generatedPaste) {
      navigate(`/p/${generatedPaste.id}`);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const fullAccessLink = generatedPaste ? `${window.location.origin}/p/${generatedPaste.id}` : '';
  const readOnlyLink = generatedPaste ? `${window.location.origin}/p/${generatedPaste.id}?readonly=true` : '';

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Content Mode Selector */}
          <div className="flex items-center space-x-1 bg-zinc-800/60 border border-zinc-700/50 rounded-xl p-1 w-fit">
            <button
              onClick={() => setContentMode('plain')}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                contentMode === 'plain'
                  ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30'
                  : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-700/50'
              )}
            >
              Plain Text
            </button>
            <button
              onClick={() => setContentMode('markdown')}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                contentMode === 'markdown'
                  ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30'
                  : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-700/50'
              )}
            >
              Markdown
            </button>
            <button
              onClick={() => setContentMode('code')}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                contentMode === 'code'
                  ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30'
                  : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-700/50'
              )}
            >
              Code
            </button>
          </div>

          {/* Editor */}
          <div className="bg-zinc-900/80 border border-zinc-700/50 rounded-2xl p-6 backdrop-blur-sm">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your text, code, or start typing…"
              className="w-full h-96 bg-transparent text-white font-mono text-sm resize-none focus:outline-none placeholder-zinc-500"
            />
          </div>

          {/* File Upload Dropzone */}
          <div className="border-2 border-dashed border-zinc-700/50 rounded-2xl p-8 text-center bg-zinc-900/40 hover:border-zinc-600/50 hover:bg-zinc-900/60 transition-all">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
              <p className="text-zinc-300 font-medium mb-2">Drop files here or browse to upload</p>
              <p className="text-zinc-500 text-sm">Maximum 10MB per file</p>
            </label>
          </div>

          {/* Uploaded Files */}
          {attachments.length > 0 && (
            <div className="space-y-2">
              {attachments.map(att => (
                <div key={att.id} className="flex items-center justify-between bg-zinc-800/60 border border-zinc-700/50 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <Icon name="file-text" className="h-5 w-5 text-zinc-400" />
                    <span className="text-white font-medium">{att.filename}</span>
                    <span className="text-zinc-400 text-sm">{att.sizeKB} KB</span>
                  </div>
                  <button
                    onClick={() => removeAttachment(att.id)}
                    className="p-1 rounded-lg hover:bg-zinc-700/50 text-zinc-400 hover:text-white transition-all"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Sidebar */}
        <div className="space-y-6">
          {/* Expiration */}
          <div className="bg-zinc-900/80 border border-zinc-700/50 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white mb-4">Expiration</h3>
            <select
              value={expires}
              onChange={(e) => setExpires(e.target.value)}
              className="w-full bg-zinc-800/60 border border-zinc-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50"
            >
              {expirationOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            
            <div className="flex items-center justify-between mt-4">
              <label className="text-sm font-medium text-zinc-300">Burn after reading</label>
              <button
                onClick={() => setBurnAfterReading(!burnAfterReading)}
                className={cn(
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                  burnAfterReading ? 'bg-brand-600' : 'bg-zinc-600'
                )}
              >
                <span
                  className={cn(
                    'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                    burnAfterReading ? 'translate-x-6' : 'translate-x-1'
                  )}
                />
              </button>
            </div>
          </div>

          {/* Password Protection */}
          <div className="bg-zinc-900/80 border border-zinc-700/50 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white mb-4">Password Protection</h3>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Optional password"
              className="w-full bg-zinc-800/60 border border-zinc-700/50 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50"
            />
          </div>

          {/* Format */}
          <div className="bg-zinc-900/80 border border-zinc-700/50 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white mb-4">Format</h3>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-zinc-800/60 border border-zinc-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50"
            >
              {languageOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleCreatePaste}
          className="px-8 py-4 bg-brand-600 text-white font-semibold rounded-2xl shadow-glow hover:bg-brand-700 hover:shadow-glow-hover transition-all duration-200 transform hover:scale-105"
        >
          Create Secure Link
        </button>
      </div>

      {/* Secure Link Modal */}
      {showSecureLinkModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-zinc-900 border border-zinc-700/50 rounded-2xl p-8 max-w-2xl w-full shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-white">Secure Link Created</h2>
              <button
                onClick={handleModalClose}
                className="p-2 rounded-lg hover:bg-zinc-800/60 text-zinc-400 hover:text-white transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Important Notice */}
            <div className="bg-amber-500/20 border border-amber-500/30 rounded-xl p-4 mb-6 flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-amber-300 font-semibold">Important</h3>
                <p className="text-amber-200 text-sm">
                  Zero-knowledge encryption ensures your content remains private. Keep these links secure.
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-zinc-400">Status</span>
                  <p className="text-green-400 font-medium">Encrypted & Ready</p>
                </div>
                <div>
                  <span className="text-zinc-400">Protection</span>
                  <p className="text-white font-medium">Link Access</p>
                </div>
                <div>
                  <span className="text-zinc-400">Expiration</span>
                  <p className="text-white font-medium">{expirationOptions.find(opt => opt.value === expires)?.label}</p>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Full Access Link</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={fullAccessLink}
                    readOnly
                    className="flex-1 bg-zinc-800/60 border border-zinc-700/50 rounded-xl px-4 py-3 text-white text-sm"
                  />
                  <button
                    onClick={() => copyToClipboard(fullAccessLink)}
                    className="px-4 py-3 bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-all"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Read-Only Link</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={readOnlyLink}
                    readOnly
                    className="flex-1 bg-zinc-800/60 border border-zinc-700/50 rounded-xl px-4 py-3 text-white text-sm"
                  />
                  <button
                    onClick={() => copyToClipboard(readOnlyLink)}
                    className="px-4 py-3 bg-zinc-600 text-white rounded-xl hover:bg-zinc-700 transition-all"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => window.open(readOnlyLink, '_blank')}
                    className="px-4 py-3 bg-zinc-600 text-white rounded-xl hover:bg-zinc-700 transition-all"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="flex justify-center">
              <button
                onClick={handleModalClose}
                className="px-6 py-3 bg-zinc-700 text-white font-medium rounded-xl hover:bg-zinc-600 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Create;
