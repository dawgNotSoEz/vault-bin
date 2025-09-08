import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Copy, ExternalLink, X, Eye, EyeOff } from 'lucide-react';
import { cn, generateSecureLink, getPasswordStrength, validateFileSize } from '@/lib/utils';
import { addPaste } from '@/lib/demoData';
import { useToast } from '@/context/ToastContext';

import Editor from '@/components/ui/Editor';
import SyntaxHighlighter from '@/components/ui/SyntaxHighlighter';
import MarkdownViewer from '@/components/MarkdownViewer';
import AttachmentDropzone from '@/components/AttachmentDropzone';
import Select from '@/components/Select';

const MAX_ATTACHMENT_SIZE = 50 * 1024 * 1024; // 50MB

const Create = () => {
  const navigate = useNavigate();
  const { success, error, toast } = useToast();

  const [content, setContent] = useState('');
  const [mode, setMode] = useState('code'); // plain | markdown | code
  const [language, setLanguage] = useState('plaintext');
  const [expires, setExpires] = useState('1d');
  const [burnAfterReading, setBurnAfterReading] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [showSecureLinkModal, setShowSecureLinkModal] = useState(false);
  const [generatedMeta, setGeneratedMeta] = useState(null);

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
    { value: '7d', label: '1 week' },
    { value: '30d', label: '30 days' },
    { value: 'permanent', label: 'Permanent' },
  ];

  // Attachments handler (via dropzone)
  const handleFilesChange = (files) => {
    const validated = [];
    for (const f of files) {
      if (!validateFileSize(f.size, MAX_ATTACHMENT_SIZE)) {
        error(`File ${f.name} exceeds 50MB limit and was skipped`);
        continue;
      }
      validated.push({
        id: `${Date.now()}_${Math.random()}`,
        filename: f.name,
        sizeKB: Math.round(f.size / 1024),
        file: f
      });
    }
    setAttachments(prev => [...prev, ...validated]);
  };

  const removeAttachment = (id) => setAttachments(prev => prev.filter(a => a.id !== id));

  // Keyboard shortcut: Ctrl/Cmd+S to create paste (frontend-only)
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleCreatePaste();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [content, language, password, expires, attachments, burnAfterReading]);

  const handleCreatePaste = useCallback(() => {
    if (!content || content.trim().length < 1) {
      toast('Paste content is empty', { type: 'error' });
      return;
    }

    const id = `p_${Date.now()}`;
    const newPaste = {
      id,
      title: content.split('\n')[0].slice(0, 80) || 'Untitled Paste',
      content,
      language,
      tags: [],
      visibility: password ? 'private' : 'public',
      passwordProtected: !!password,
      expires,
      burnAfterReading,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      commentsCount: 0,
      reactionsCount: 0,
      snippetPreview: content.substring(0, 160) + (content.length > 160 ? '...' : ''),
      folderId: null,
      ownerId: 'demo-user',
      attachments: attachments.map(a => ({ id: a.id, filename: a.filename, sizeKB: a.sizeKB }))
    };

    // Add to demo data (frontend-only)
    addPaste(newPaste);

    // Generate secure link (placeholder)
    const meta = generateSecureLink(newPaste, { password });
    setGeneratedMeta(meta);
    setShowSecureLinkModal(true);
    success('Secure link created (frontend-only)');
  }, [content, language, password, expires, attachments, burnAfterReading, success, toast]);

  const handleModalClose = () => {
    setShowSecureLinkModal(false);
    if (generatedMeta?.id) {
      navigate(`/p/${generatedMeta.id}`);
    }
  };

  const copyToClipboard = async (text, label = 'Copied') => {
    try {
      await navigator.clipboard.writeText(text);
      success(label);
    } catch (err) {
      error('Copy failed');
    }
  };

  const passwordStrength = getPasswordStrength(password || '');

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left - Editor + Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn('inline-flex items-center rounded-xl p-1 bg-zinc-800/60 border border-zinc-700/50')}>
                <button onClick={() => setMode('plain')} className={cn('px-3 py-2 text-sm rounded-lg', mode === 'plain' ? 'bg-brand-600/20 text-brand-300' : 'text-zinc-400')}>Plain</button>
                <button onClick={() => setMode('markdown')} className={cn('px-3 py-2 text-sm rounded-lg', mode === 'markdown' ? 'bg-brand-600/20 text-brand-300' : 'text-zinc-400')}>Markdown</button>
                <button onClick={() => setMode('code')} className={cn('px-3 py-2 text-sm rounded-lg', mode === 'code' ? 'bg-brand-600/20 text-brand-300' : 'text-zinc-400')}>Code</button>
              </div>

              <Select
                value={language}
                onChange={(v) => setLanguage(v)}
                options={languageOptions}
                placeholder="Language"
                className="w-56"
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="text-sm text-zinc-400">{content.length} chars</div>
            </div>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-700/50 rounded-2xl p-4 backdrop-blur-sm">
            {mode === 'plain' ? (
              <div>
                <Editor value={content} onChange={(e) => setContent(e.target.value)} language={language} />
              </div>
            ) : (
              <div className="space-y-4">
                {/* Editor */}
                <div>
                  <Editor value={content} onChange={(e) => setContent(e.target.value)} language={language} />
                </div>

                {/* Preview (only when user has typed something) */}
                {content && content.trim().length > 0 && (
                  <div className="p-2">
                    <div className="text-sm text-zinc-400 mb-2">Live Preview</div>
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 max-h-[520px] overflow-auto">
                      {mode === 'markdown' ? (
                        <MarkdownViewer content={content} />
                      ) : (
                        <SyntaxHighlighter code={content} language={language} showLineNumbers />
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Attachment Dropzone */}
          <AttachmentDropzone onFilesChange={handleFilesChange} maxSize={MAX_ATTACHMENT_SIZE} maxFiles={10} />

          {/* Uploaded Files */}
          {attachments.length > 0 && (
            <div className="space-y-2">
              {attachments.map(att => (
                <div key={att.id} className="flex items-center justify-between bg-zinc-800/60 border border-zinc-700/50 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-zinc-300 font-medium">{att.filename}</span>
                    <span className="text-zinc-400 text-sm">{att.sizeKB} KB</span>
                  </div>
                  <button onClick={() => removeAttachment(att.id)} className="p-1 rounded-lg hover:bg-zinc-700/50 text-zinc-400 hover:text-white transition-all">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right - Options */}
        <div className="space-y-6">
          <div className="bg-zinc-900/80 border border-zinc-700/50 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white mb-4">Expiration</h3>
            <select value={expires} onChange={(e) => setExpires(e.target.value)} className="w-full bg-zinc-800/60 border border-zinc-700/50 rounded-xl px-4 py-3 text-white">
              {expirationOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>

            <div className="flex items-center justify-between mt-4">
              <label className="text-sm font-medium text-zinc-300">Burn after reading</label>
              <button onClick={() => setBurnAfterReading(!burnAfterReading)} className={cn('relative inline-flex h-6 w-11 items-center rounded-full transition-colors', burnAfterReading ? 'bg-brand-600' : 'bg-zinc-600')}>
                <span className={cn('inline-block h-4 w-4 transform rounded-full bg-white transition-transform', burnAfterReading ? 'translate-x-6' : 'translate-x-1')} />
              </button>
            </div>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-700/50 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white mb-4">Password Protection</h3>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Optional password" className="w-full bg-zinc-800/60 border border-zinc-700/50 rounded-xl px-4 py-3 text-white placeholder-zinc-500" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {password && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">Strength</span>
                  <span className={`font-medium ${passwordStrength.color}`}>{passwordStrength.level}</span>
                </div>
                <div className="w-full bg-zinc-700 rounded-full h-1.5 mt-2">
                  <div className={`h-1.5 rounded-full transition-all ${passwordStrength.width || 'w-1/4'} ${passwordStrength.color.replace('text-', 'bg-') || 'bg-red-500'}`} />
                </div>
              </div>
            )}
          </div>

          <div className="bg-zinc-900/80 border border-zinc-700/50 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white mb-4">Format</h3>
            <Select value={language} onChange={(v) => setLanguage(v)} options={languageOptions} />
          </div>

          <div className="flex justify-center">
            <button onClick={handleCreatePaste} className="px-6 py-3 bg-brand-600 text-white font-semibold rounded-2xl hover:bg-brand-700 transition-all">Create Secure Link</button>
          </div>
        </div>
      </div>

      {/* Secure Link Modal */}
      {showSecureLinkModal && generatedMeta && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-zinc-900 border border-zinc-700/50 rounded-2xl p-8 max-w-2xl w-full shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-white">Secure Link Created</h2>
              <button onClick={handleModalClose} className="p-2 rounded-lg hover:bg-zinc-800/60 text-zinc-400 hover:text-white transition-all"><X className="h-5 w-5" /></button>
            </div>

            <div className="bg-amber-500/20 border border-amber-500/30 rounded-xl p-4 mb-6 flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-amber-300 font-semibold">Important</h3>
                <p className="text-amber-200 text-sm">Zero-knowledge encryption is simulated in this demo. Keep the link safe.</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-zinc-400">Status</span>
                  <p className="text-green-400 font-medium">{generatedMeta.encrypted ? 'Encrypted & Ready' : 'Ready'}</p>
                </div>
                <div>
                  <span className="text-zinc-400">Protection</span>
                  <p className="text-white font-medium">{generatedMeta.protection}</p>
                </div>
                <div>
                  <span className="text-zinc-400">Expiration</span>
                  <p className="text-white font-medium">{expirationOptions.find(opt => opt.value === expires)?.label}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Full Access Link</label>
                <div className="flex items-center space-x-2">
                  <input type="text" value={generatedMeta.fullLink} readOnly className="flex-1 bg-zinc-800/60 border border-zinc-700/50 rounded-xl px-4 py-3 text-white text-sm" />
                  <button onClick={() => copyToClipboard(generatedMeta.fullLink)} className="px-4 py-3 bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-all"><Copy className="h-4 w-4" /></button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Read-Only Link</label>
                <div className="flex items-center space-x-2">
                  <input type="text" value={generatedMeta.readOnlyLink} readOnly className="flex-1 bg-zinc-800/60 border border-zinc-700/50 rounded-xl px-4 py-3 text-white text-sm" />
                  <button onClick={() => copyToClipboard(generatedMeta.readOnlyLink)} className="px-4 py-3 bg-zinc-600 text-white rounded-xl hover:bg-zinc-700 transition-all"><Copy className="h-4 w-4" /></button>
                  <button onClick={() => window.open(generatedMeta.readOnlyLink, '_blank')} className="px-4 py-3 bg-zinc-600 text-white rounded-xl hover:bg-zinc-700 transition-all"><ExternalLink className="h-4 w-4" /></button>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button onClick={handleModalClose} className="px-6 py-3 bg-zinc-700 text-white font-medium rounded-xl hover:bg-zinc-600 transition-all">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Create;
