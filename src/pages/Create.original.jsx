import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Plus, MoreVertical, FileText, Eye } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import Switch from '../components/Switch';
import Tabs from '../components/Tabs';
import FormSection from '../components/FormSection';
import Editor from '../components/Editor';
import VisibilityControl from '../components/VisibilityControl';
import PasswordField from '../components/PasswordField';
import ExpirationPicker from '../components/ExpirationPicker';
import TagInput from '../components/TagInput';
import AttachmentDropzone from '../components/AttachmentDropzone';
import CollaboratorPicker from '../components/CollaboratorPicker';
import StickySummary from '../components/StickySummary';
import { createPaste, saveDraft } from '../lib/api';
import { folders } from '../lib/data';
import { debounce } from '../lib/utils';

const Create = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    visibility: 'public',
    password: '',
    folder: 'personal',
    expires: { type: 'permanent' },
    tags: [],
    attachments: [],
    collaborators: [],
    options: {
      disableCopy: false,
      selfDestruct: false,
      requireEmail: false
    }
  });
  
  // UI state
  const [activeTab, setActiveTab] = useState('editor');
  const [errors, setErrors] = useState({});
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [draftStatus, setDraftStatus] = useState('');
  
  // Validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3 || formData.title.length > 80) {
      newErrors.title = 'Title must be between 3 and 80 characters';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length < 5) {
      newErrors.content = 'Content must be at least 5 characters';
    }
    
    if (formData.visibility === 'private' && !formData.password) {
      newErrors.password = 'Password is required for private pastes';
    } else if (formData.password && (formData.password.length < 8 || formData.password.length > 64)) {
      newErrors.password = 'Password must be between 8 and 64 characters';
    }
    
    if (formData.tags.length > 6) {
      newErrors.tags = 'Maximum 6 tags allowed';
    }
    
    if (formData.collaborators.length > 8) {
      newErrors.collaborators = 'Maximum 8 collaborators allowed';
    }
    
    return newErrors;
  };
  
  // Auto-save draft with debounce
  const debouncedSaveDraft = useCallback(
    debounce(async () => {
      if (formData.title.trim() || formData.content.trim()) {
        try {
          await saveDraft(formData);
          setDraftStatus('Draft saved');
          setTimeout(() => setDraftStatus(''), 2000);
        } catch (error) {
          console.error('Failed to save draft:', error);
        }
      }
    }, 2000),
    [formData]
  );
  
  // Auto-save effect
  useEffect(() => {
    debouncedSaveDraft();
  }, [formData.title, formData.content, debouncedSaveDraft]);
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSaveDraft();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Form update helper
  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };
  
  // Handle save draft
  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      await saveDraft(formData);
      setDraftStatus('Draft saved');
      setTimeout(() => setDraftStatus(''), 2000);
    } catch (error) {
      console.error('Failed to save draft:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  // Handle create paste
  const handleCreatePaste = async () => {
    const validationErrors = validateForm();
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length > 0) {
      // Focus first error field
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      if (element) {
        element.focus();
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setIsCreating(true);
    try {
      const result = await createPaste(formData);
      console.log('Paste created:', result);
      navigate('/', { 
        state: { 
          message: 'Paste created successfully!',
          pasteUrl: result.url 
        }
      });
    } catch (error) {
      console.error('Failed to create paste:', error);
      setErrors({ submit: error.message });
    } finally {
      setIsCreating(false);
    }
  };
  
  // Simple markdown preview renderer
  const renderPreview = (content) => {
    if (!content) return <p className="text-zinc-500 italic">No content to preview</p>;
    
    // Simple markdown-like rendering
    const lines = content.split('\n');
    const rendered = lines.map((line, index) => {
      // Headers
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-lg font-semibold text-zinc-200 mt-4 mb-2">{line.slice(4)}</h3>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-semibold text-zinc-100 mt-4 mb-2">{line.slice(3)}</h2>;
      }
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-2xl font-bold text-zinc-100 mt-4 mb-2">{line.slice(2)}</h1>;
      }
      
      // Code blocks (simple)
      if (line.startsWith('```')) {
        return <div key={index} className="font-mono text-sm text-zinc-400 my-2">```</div>;
      }
      
      // Bold and italic (simple)
      let processedLine = line
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-zinc-100">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic text-zinc-200">$1</em>')
        .replace(/`(.*?)`/g, '<code class="px-1 py-0.5 bg-zinc-800 rounded text-zinc-300 text-sm font-mono">$1</code>');
      
      return (
        <p 
          key={index} 
          className="text-zinc-300 mb-2 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: processedLine }}
        />
      );
    });
    
    return <div className="space-y-1">{rendered}</div>;
  };
  
  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="mx-auto max-w-screen-2xl px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-100">Create Paste</h1>
            <p className="text-zinc-400 mt-1">Compose and protect your content</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={handleSaveDraft}
              disabled={isSaving || (!formData.title.trim() && !formData.content.trim())}
              loading={isSaving}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Draft
            </Button>
            
            <Button
              variant="primary"
              onClick={handleCreatePaste}
              disabled={isCreating || !formData.title.trim() || !formData.content.trim()}
              loading={isCreating}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Paste
            </Button>
            
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
          {/* Left Column - Form */}
          <div className="space-y-8">
            {/* Title & Visibility */}
            <FormSection
              title="Title & Visibility"
              description="Set the title and access level for your paste"
            >
              <div className="space-y-6">
                <Input
                  label="Title"
                  value={formData.title}
                  onChange={(e) => updateFormData('title', e.target.value)}
                  error={errors.title}
                  placeholder="e.g., API Configuration"
                  name="title"
                />
                
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-3">
                    Visibility
                  </label>
                  <VisibilityControl
                    value={formData.visibility}
                    onChange={(value) => updateFormData('visibility', value)}
                  />
                </div>
                
                {formData.visibility === 'private' && (
                  <PasswordField
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                    error={errors.password}
                    placeholder="Enter password for private access"
                  />
                )}
              </div>
            </FormSection>
            
            {/* Content */}
            <FormSection
              title="Content"
              description="Write or paste your content"
            >
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <Tabs.List>
                  <Tabs.Trigger value="editor">
                    <FileText className="h-4 w-4 mr-2" />
                    Editor
                  </Tabs.Trigger>
                  <Tabs.Trigger value="preview">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Tabs.Trigger>
                </Tabs.List>
                
                <Tabs.Content value="editor">
                  <Editor
                    value={formData.content}
                    onChange={(e) => updateFormData('content', e.target.value)}
                    placeholder="Enter your content here..."
                    error={errors.content}
                  />
                  {errors.content && (
                    <p className="text-sm text-red-400 mt-2">{errors.content}</p>
                  )}
                </Tabs.Content>
                
                <Tabs.Content value="preview">
                  <div className="min-h-[400px] p-6 bg-zinc-900/60 border border-zinc-800 rounded-xl">
                    {renderPreview(formData.content)}
                  </div>
                </Tabs.Content>
              </Tabs>
            </FormSection>
            
            {/* Metadata */}
            <FormSection
              title="Metadata"
              description="Organize your paste with folders, expiration, and tags"
            >
              <div className="space-y-6">
                <Select
                  label="Folder"
                  value={formData.folder}
                  onChange={(e) => updateFormData('folder', e.target.value)}
                >
                  {folders.map(folder => (
                    <option key={folder.id} value={folder.id}>
                      {folder.name}
                    </option>
                  ))}
                </Select>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-3">
                    Expiration
                  </label>
                  <ExpirationPicker
                    value={formData.expires}
                    onChange={(value) => updateFormData('expires', value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-3">
                    Tags
                  </label>
                  <TagInput
                    value={formData.tags}
                    onChange={(value) => updateFormData('tags', value)}
                    error={errors.tags}
                  />
                </div>
              </div>
            </FormSection>
            
            {/* Attachments */}
            <FormSection
              title="Attachments"
              description="Attach files to your paste (optional)"
            >
              <AttachmentDropzone
                value={formData.attachments}
                onChange={(value) => updateFormData('attachments', value)}
                error={errors.attachments}
              />
            </FormSection>
            
            {/* Collaboration */}
            <FormSection
              title="Collaboration"
              description="Invite others to view or edit this paste"
            >
              <CollaboratorPicker
                value={formData.collaborators}
                onChange={(value) => updateFormData('collaborators', value)}
                error={errors.collaborators}
              />
            </FormSection>
            
            {/* Options */}
            <FormSection
              title="Advanced Options"
              description="Additional security and access controls"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-zinc-300">
                      Disable copy
                    </label>
                    <p className="text-xs text-zinc-500">
                      Prevent copying content to clipboard
                    </p>
                  </div>
                  <Switch
                    checked={formData.options.disableCopy}
                    onCheckedChange={(checked) => 
                      updateFormData('options', { ...formData.options, disableCopy: checked })
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-zinc-300">
                      Self-destruct after first view
                    </label>
                    <p className="text-xs text-zinc-500">
                      Automatically delete after being viewed once
                    </p>
                  </div>
                  <Switch
                    checked={formData.options.selfDestruct}
                    onCheckedChange={(checked) => 
                      updateFormData('options', { ...formData.options, selfDestruct: checked })
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-zinc-300">
                      Require email to access
                    </label>
                    <p className="text-xs text-zinc-500">
                      Visitors must enter email before viewing
                    </p>
                  </div>
                  <Switch
                    checked={formData.options.requireEmail}
                    onCheckedChange={(checked) => 
                      updateFormData('options', { ...formData.options, requireEmail: checked })
                    }
                  />
                </div>
              </div>
            </FormSection>
          </div>
          
          {/* Right Column - Sticky Summary */}
          <StickySummary
            formData={formData}
            onSaveDraft={handleSaveDraft}
            onCreatePaste={handleCreatePaste}
            draftStatus={draftStatus}
            isCreating={isCreating}
            isSaving={isSaving}
          />
        </div>
        
        {/* Submit Error */}
        {errors.submit && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-sm text-red-400">{errors.submit}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Create;
