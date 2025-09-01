import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import Editor from './Editor';
import Select from './Select';
import Tabs from './Tabs';
import SyntaxHighlighter from './SyntaxHighlighter';
import MarkdownViewer from './MarkdownViewer';

const EditorSwitcher = ({
  content,
  setContent,
  language,
  setLanguage,
  className,
  ...props
}) => {
  const [editorMode, setEditorMode] = useState('plain'); // plain, markdown, code
  const [markdownPreview, setMarkdownPreview] = useState(false);

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

  return (
    <div className={cn('space-y-4', className)} {...props}>
      <Tabs
        activeTab={editorMode}
        onTabChange={setEditorMode}
        tabs={[
          { id: 'plain', label: 'Plain Text' },
          { id: 'markdown', label: 'Markdown' },
          { id: 'code', label: 'Code' },
        ]}
      />

      {editorMode === 'plain' && (
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste your plain text here..."
          rows={15}
        />
      )}

      {editorMode === 'markdown' && (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Switch
              id="markdown-preview-toggle"
              checked={markdownPreview}
              onCheckedChange={setMarkdownPreview}
            />
            <label htmlFor="markdown-preview-toggle" className="text-sm text-zinc-300">Show Preview</label>
          </div>
          {markdownPreview ? (
            <MarkdownViewer content={content} className="p-4 border border-zinc-800 rounded-xl bg-zinc-900/60" />
          ) : (
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your Markdown here..."
              rows={15}
            />
          )}
        </div>
      )}

      {editorMode === 'code' && (
        <div className="space-y-4">
          <Select
            options={languageOptions}
            value={language}
            onChange={setLanguage}
            placeholder="Select code language"
          />
          <SyntaxHighlighter
            code={content}
            language={language}
            showLineNumbers
            showCopyButton
          />
        </div>
      )}
    </div>
  );
};

export default EditorSwitcher;
