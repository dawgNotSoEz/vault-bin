import React, { useState, useEffect } from 'react';
import { Settings, Save, Upload, Share2, Eye, EyeOff, Clock, Trash2, CheckCircle, AlertTriangle, Copy, ExternalLink, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPaste, saveDraft } from '../lib/api';
import { copyToClipboard, shortId, cn } from '../lib/utils';

// Simple components inline for this demo
const Button = ({ children, variant = 'primary', size = 'md', loading, disabled, className, ...props }) => {
  const variants = {
    primary: 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white hover:from-indigo-400 hover:to-violet-500',
    secondary: 'bg-zinc-800 border border-zinc-700 text-zinc-100 hover:bg-zinc-700',
    ghost: 'bg-transparent text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-300',
    outline: 'border border-zinc-700 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-900/60'
  };
  const sizes = { sm: 'h-8 px-3 text-xs', md: 'h-9 px-4 text-sm', lg: 'h-10 px-6 text-sm' };
  
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-950',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        variants[variant], sizes[size], className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
      {children}
    </button>
  );
};

const Input = ({ label, error, required, className, ...props }) => {
  const id = props.id || props.name;
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-zinc-300">
          {label}{required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <input
        id={id}
        className={cn(
          'w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-100',
          'placeholder:text-zinc-500 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600/50 focus:outline-none',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/50',
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
};

const Textarea = ({ label, error, required, className, ...props }) => {
  const id = props.id || props.name;
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-zinc-300">
          {label}{required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={id}
        className={cn(
          'w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-100',
          'placeholder:text-zinc-500 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600/50 focus:outline-none resize-y',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/50',
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
};

const Select = ({ label, error, children, className, ...props }) => {
  const id = props.id || props.name;
  return (
    <div className="space-y-2">
      {label && <label htmlFor={id} className="block text-sm font-medium text-zinc-300">{label}</label>}
      <div className="relative">
        <select
          id={id}
          className={cn(
            'w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-3 py-2 pr-8 text-sm text-zinc-100',
            'focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600/50 focus:outline-none appearance-none',
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
};

const Switch = ({ checked, onCheckedChange, disabled, className }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    className={cn(
      'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent',
      'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-950',
      checked ? 'bg-indigo-600' : 'bg-zinc-700',
      className
    )}
    onClick={() => !disabled && onCheckedChange(!checked)}
  >
    <span
      className={cn(
        'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200',
        checked ? 'translate-x-4' : 'translate-x-0'
      )}
    />
  </button>
);

const Badge = ({ children, className }) => (
  <span className={cn('inline-flex items-center px-2 py-1 rounded-full text-xs ring-1 ring-inset ring-zinc-700 bg-zinc-900/70', className)}>
    {children}
  </span>
);

const Create = () => {
  const [activeTab, setActiveTab] = useState('editor');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState({});
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    visibility: 'public',
    password: '',
    folder: 'all',
    expires: { type: 'permanent' },
    format: 'plain',
    options: { disableCopy: false, selfDestruct: false, requireEmail: false }
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [createdPaste, setCreatedPaste] = useState(null);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeydown = (e) => {
      if ((e.ctrlKey || e.metaKey)) {
        if (e.key === 's') {
          e.preventDefault();
          handleSaveDraft();
        } else if (e.key === '.') {
          e.preventDefault();
          setDrawerOpen(!drawerOpen);
        }
      }
      if (e.key === 'Escape') {
        setDrawerOpen(false);
        setShareModalOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [drawerOpen]);

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim() || formData.title.length < 3) newErrors.title = 'Title must be at least 3 characters';
    if (!formData.content.trim() || formData.content.length < 5) newErrors.content = 'Content must be at least 5 characters';
    if (formData.visibility === 'private' && !formData.password.trim()) newErrors.password = 'Password required for private pastes';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveDraft = async () => {
    try {
      setLoading(true);
      await saveDraft(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error('Failed to save draft:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!validateForm()) return;
    try {
      setLoading(true);
      const result = await createPaste(formData);
      setCreatedPaste(result);
      setShareModalOpen(true);
    } catch (error) {
      console.error('Failed to create paste:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderPreview = () => {
    if (!formData.content) return <div className="text-zinc-500 italic">Nothing to preview yet...</div>;
    if (formData.format === 'markdown') {
      return (
        <div className="prose prose-zinc prose-invert max-w-none">
          {formData.content.split('\n').map((line, i) => {
            if (line.startsWith('# ')) return <h1 key={i}>{line.slice(2)}</h1>;
            if (line.startsWith('## ')) return <h2 key={i}>{line.slice(3)}</h2>;
            return <p key={i}>{line || <br />}</p>;
          })}
        </div>
      );
    }
    return <pre className="whitespace-pre-wrap font-mono text-sm text-zinc-300">{formData.content}</pre>;
  };

  const toggleAccordion = (key) => {
    setAccordionOpen(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const wordCount = formData.content.split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="min-h-screen bg-zinc-950 pb-24">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/95 backdrop-blur sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-semibold text-zinc-100">Create Paste</h1>
              <p className="text-sm text-zinc-400 hidden sm:block">Compose securely without the scroll.</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => setDrawerOpen(true)} className="gap-2">
                <Settings size={16} />
                <span className="hidden sm:inline">Details</span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-xs bg-zinc-800 rounded">⌘.</kbd>
              </Button>
              <Button variant="secondary" onClick={handleSaveDraft} loading={loading && !createdPaste}>
                <Save size={16} />
                Save Draft
              </Button>
              <Button onClick={handleCreate} loading={loading && !saved} disabled={!formData.title || !formData.content}>
                Create Paste
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Title & Visibility Card */}
          <div className="rounded-2xl border border-zinc-800/70 bg-zinc-950/60 shadow-[0_1px_0_0_rgba(255,255,255,0.02)_inset,0_10px_30px_-15px_rgba(0,0,0,0.9)] p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Input
                  label="Title"
                  value={formData.title}
                  onChange={(e) => updateFormData('title', e.target.value)}
                  placeholder="Give your paste a descriptive title..."
                  error={errors.title}
                  required
                />
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-medium text-zinc-300">Visibility</label>
                <div className="inline-flex bg-zinc-900/60 border border-zinc-800 rounded-xl p-1 gap-1 w-full">
                  {['public', 'private'].map(vis => (
                    <button
                      key={vis}
                      type="button"
                      onClick={() => updateFormData('visibility', vis)}
                      className={cn(
                        'flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200',
                        'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-950',
                        formData.visibility === vis
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/60'
                      )}
                    >
                      {vis === 'public' ? <><Eye size={16} className="inline mr-2" />Public</> : <><EyeOff size={16} className="inline mr-2" />Private</>}
                    </button>
                  ))}
                </div>
                {formData.visibility === 'private' && (
                  <>
                    <Input
                      type="password"
                      placeholder="Enter password..."
                      value={formData.password}
                      onChange={(e) => updateFormData('password', e.target.value)}
                      error={errors.password}
                    />
                    <p className="text-xs text-zinc-500">Private pastes require a password.</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Content Editor/Preview */}
          <div className="rounded-2xl border border-zinc-800/70 bg-zinc-950/60 shadow-[0_1px_0_0_rgba(255,255,255,0.02)_inset,0_10px_30px_-15px_rgba(0,0,0,0.9)] p-6">
            {/* Tabs */}
            <div className="inline-flex bg-zinc-900/60 border border-zinc-800 rounded-xl p-1 gap-1 mb-4">
              {['editor', 'preview'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-950',
                    activeTab === tab
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/60'
                  )}
                >
                  {tab === 'editor' ? 'Editor' : 'Preview'}
                </button>
              ))}
            </div>
            
            {activeTab === 'editor' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Select
                      value={formData.format}
                      onChange={(e) => updateFormData('format', e.target.value)}
                      className="w-32"
                    >
                      <option value="plain">Plain</option>
                      <option value="markdown">Markdown</option>
                      <option value="code">Code</option>
                    </Select>
                    <Button variant="ghost" size="sm" onClick={() => updateFormData('content', formData.content + '\n\n// Added ' + new Date().toLocaleString() + '\n')}>
                      <Clock size={14} />
                      Timestamp
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => updateFormData('content', '')} className="text-red-400 hover:text-red-300">
                      <Trash2 size={14} />
                      Clear
                    </Button>
                  </div>
                  <div className="text-xs text-zinc-500">
                    {formData.content.length} chars • {wordCount} words
                  </div>
                </div>
                <Textarea
                  value={formData.content}
                  onChange={(e) => updateFormData('content', e.target.value)}
                  placeholder="Paste your content here..."
                  rows={12}
                  className="font-mono text-sm leading-relaxed resize-y min-h-[300px] max-h-[500px]"
                  error={errors.content}
                />
              </div>
            ) : (
              <div className="min-h-[300px] max-h-[500px] overflow-y-auto p-4 border border-zinc-800 rounded-xl bg-zinc-900/30">
                {renderPreview()}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Details Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-[420px] bg-zinc-950 border-l border-zinc-800 shadow-2xl z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                <h2 className="text-lg font-semibold text-zinc-100">Details</h2>
                <button onClick={() => setDrawerOpen(false)} className="p-2 hover:bg-zinc-800 rounded-lg">
                  <ChevronRight size={20} className="text-zinc-400" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {/* Security Accordion */}
                <div className="border border-zinc-800 rounded-xl overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-zinc-900/40"
                    onClick={() => toggleAccordion('security')}
                  >
                    <span className="font-medium text-zinc-300">Security</span>
                    {accordionOpen.security ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                  {accordionOpen.security && (
                    <div className="p-4 pt-0 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-zinc-300">Burn after reading</span>
                        <Switch
                          checked={formData.options.selfDestruct}
                          onCheckedChange={(checked) => updateFormData('options', { ...formData.options, selfDestruct: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-zinc-300">Disable copy</span>
                        <Switch
                          checked={formData.options.disableCopy}
                          onCheckedChange={(checked) => updateFormData('options', { ...formData.options, disableCopy: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-zinc-300">Require email</span>
                        <Switch
                          checked={formData.options.requireEmail}
                          onCheckedChange={(checked) => updateFormData('options', { ...formData.options, requireEmail: checked })}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Metadata Accordion */}
                <div className="border border-zinc-800 rounded-xl overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-zinc-900/40"
                    onClick={() => toggleAccordion('metadata')}
                  >
                    <span className="font-medium text-zinc-300">Organization</span>
                    {accordionOpen.metadata ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                  {accordionOpen.metadata && (
                    <div className="p-4 pt-0 space-y-4">
                      <Select
                        label="Folder"
                        value={formData.folder}
                        onChange={(e) => updateFormData('folder', e.target.value)}
                      >
                        <option value="all">All Pastes</option>
                        <option value="work">Work</option>
                        <option value="personal">Personal</option>
                        <option value="projects">Projects</option>
                      </Select>
                      <Select
                        label="Expiration"
                        value={formData.expires.type}
                        onChange={(e) => updateFormData('expires', { type: e.target.value })}
                      >
                        <option value="21h">21 hours</option>
                        <option value="3d">3 days</option>
                        <option value="7d">7 days</option>
                        <option value="30d">30 days</option>
                        <option value="permanent">Never</option>
                      </Select>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {shareModalOpen && createdPaste && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShareModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                <h2 className="text-lg font-semibold text-zinc-100">Secure Link Created</h2>
                <button onClick={() => setShareModalOpen(false)} className="p-2 hover:bg-zinc-800 rounded-lg">
                  <ChevronRight size={20} className="text-zinc-400" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <AlertTriangle size={16} className="text-yellow-500 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-yellow-200 font-medium">Save this link now</p>
                    <p className="text-yellow-300/80">We cannot recover it due to zero-knowledge encryption.</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 p-4 bg-zinc-900/40 rounded-lg border border-zinc-800">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle size={14} className="text-green-500" />
                      <span className="text-sm font-medium text-zinc-300">Status</span>
                    </div>
                    <p className="text-sm text-green-400">Encrypted & Ready</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-300 mb-1">Expiration</p>
                    <p className="text-sm text-zinc-400">{createdPaste.expiresIn}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-300 mb-1">Protection</p>
                    <p className="text-sm text-zinc-400">{createdPaste.protection}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-300 mb-1">ID</p>
                    <p className="text-sm text-zinc-400 font-mono">{shortId()}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Full Access Link</label>
                    <div className="flex gap-2">
                      <input
                        value={createdPaste.url}
                        readOnly
                        className="flex-1 bg-zinc-900/60 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-zinc-100"
                      />
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(createdPaste.url)}>
                        <Copy size={14} />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Read-Only Link</label>
                    <div className="flex gap-2">
                      <input
                        value={createdPaste.url + '/view'}
                        readOnly
                        className="flex-1 bg-zinc-900/60 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-zinc-100"
                      />
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(createdPaste.url + '/view')}>
                        <Copy size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-zinc-500 text-center">Links self-destruct based on your settings</p>
              </div>
              <div className="flex items-center justify-end gap-3 p-6 border-t border-zinc-800">
                <Button variant="outline" onClick={() => setShareModalOpen(false)}>Close</Button>
                <Button onClick={() => window.open(createdPaste?.url, '_blank')}>Open Link</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Quick Bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 max-w-screen-lg w-[92%] z-30 rounded-2xl border border-zinc-800/70 bg-zinc-950/80 backdrop-blur shadow-2xl px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {saved ? (
              <Badge className="bg-green-900/50 text-green-400 border-green-700">Draft saved ✓</Badge>
            ) : (
              <Badge className="bg-zinc-800 text-zinc-400">Unsaved •</Badge>
            )}
            <span className="text-xs text-zinc-500">{wordCount} words</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setDrawerOpen(true)}>
              <Settings size={14} />
              <span className="hidden sm:inline">Details</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSaveDraft} loading={loading && !createdPaste}>
              Save Draft
            </Button>
            <Button size="sm" onClick={handleCreate} loading={loading && !saved} disabled={!formData.title || !formData.content}>
              Create Paste
            </Button>
            {createdPaste && (
              <Button variant="outline" size="sm" onClick={() => setShareModalOpen(true)}>
                <Share2 size={14} />
                Share
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Scroll to Top FAB */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: window.pageYOffset > 400 ? 1 : 0, scale: window.pageYOffset > 400 ? 1 : 0.8 }}
        className="fixed bottom-20 right-6 z-40 p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg transition-colors"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ display: window.pageYOffset > 400 ? 'block' : 'none' }}
      >
        <ChevronDown size={20} className="rotate-180" />
      </motion.button>
    </div>
  );
};

export default Create;
