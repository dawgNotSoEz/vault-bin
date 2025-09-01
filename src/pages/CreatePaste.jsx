import React, { useState } from 'react';
import { Upload, Save, Copy, ExternalLink, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import SyntaxHighlighter from '@/components/SyntaxHighlighter';

const CreatePaste = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    language: 'javascript',
    expiration: '1w',
    password: '',
    visibility: 'public'
  });
  const [showModal, setShowModal] = useState(false);
  const [pasteUrl, setPasteUrl] = useState('');

  const languages = [
    'javascript', 'typescript', 'python', 'java', 'markdown', 
    'sql', 'json', 'yaml', 'bash', 'powershell', 'rust', 'go'
  ];

  const expirations = [
    { value: '12h', label: '12 Hours' },
    { value: '1d', label: '1 Day' },
    { value: '1w', label: '1 Week' },
    { value: '1m', label: '1 Month' },
    { value: 'never', label: 'Never' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate dummy hash
    const hash = Math.random().toString(36).substring(2, 15);
    setPasteUrl(`https://vaultbin.app/read/${hash}`);
    setShowModal(true);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 50 * 1024 * 1024) { // 50MB limit
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ 
          ...prev, 
          content: e.target.result,
          title: prev.title || file.name 
        }));
      };
      reader.readAsText(file);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Create New Paste</h1>
        <p className="text-neutral-400 mt-1">Share your code securely with syntax highlighting</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="My awesome code..."
            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-2xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Settings Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Language
            </label>
            <select
              value={formData.language}
              onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Expiration
            </label>
            <select
              value={formData.expiration}
              onChange={(e) => setFormData(prev => ({ ...prev, expiration: e.target.value }))}
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            >
              {expirations.map(exp => (
                <option key={exp.value} value={exp.value}>
                  {exp.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Password (Optional)
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              placeholder="Protect with password"
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-2xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">
            File Upload (Max 50MB)
          </label>
          <div className="border-2 border-dashed border-neutral-700 rounded-2xl p-6 bg-neutral-800/50">
            <input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
              accept=".txt,.js,.ts,.py,.java,.md,.sql,.json,.yaml,.yml,.sh,.ps1,.rs,.go"
            />
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center cursor-pointer"
            >
              <Upload className="h-8 w-8 text-neutral-400 mb-2" />
              <span className="text-neutral-300">Click to upload or drag and drop</span>
              <span className="text-sm text-neutral-500">Supports various code file formats</span>
            </label>
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">
            Content
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            placeholder="Paste your code here..."
            rows={15}
            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-2xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 font-mono text-sm"
          />
        </div>

        {/* Preview */}
        {formData.content && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Preview</h3>
            <SyntaxHighlighter 
              code={formData.content} 
              language={formData.language}
              showCopyButton={false}
            />
          </div>
        )}

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl transition-all duration-200 hover:scale-[1.02] shadow-lg font-medium"
          >
            <Save className="h-4 w-4" />
            Create Paste
          </button>
        </div>
      </form>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Paste Created!</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Read-only Link
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={pasteUrl}
                    readOnly
                    className="flex-1 px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-xl text-white text-sm"
                  />
                  <button
                    onClick={() => copyToClipboard(pasteUrl)}
                    className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Edit Link
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={pasteUrl.replace('/read/', '/write/')}
                    readOnly
                    className="flex-1 px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-xl text-white text-sm"
                  />
                  <button
                    onClick={() => copyToClipboard(pasteUrl.replace('/read/', '/write/'))}
                    className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={() => window.open(pasteUrl, '_blank')}
                className="w-full flex items-center justify-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-xl transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                Open Paste
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePaste;