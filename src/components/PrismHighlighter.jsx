import React, { useEffect, useRef, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // Dark theme

// Language imports for syntax highlighting
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-xml';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-powershell';
import 'prismjs/components/prism-markdown';

import { Copy, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

const PrismHighlighter = ({
  code,
  language = 'plaintext',
  showLineNumbers = true,
  showCopyButton = true,
  className = '',
}) => {
  const codeRef = useRef(null);
  const [copied, setCopied] = useState(false);

  // Language mapping for Prism
  const languageMap = {
    'javascript': 'javascript',
    'js': 'javascript',
    'typescript': 'typescript',
    'ts': 'typescript',
    'jsx': 'jsx',
    'tsx': 'tsx',
    'python': 'python',
    'py': 'python',
    'java': 'java',
    'csharp': 'csharp',
    'c#': 'csharp',
    'cpp': 'c',
    'c++': 'c',
    'c': 'c',
    'php': 'php',
    'ruby': 'ruby',
    'rb': 'ruby',
    'go': 'go',
    'rust': 'rust',
    'rs': 'rust',
    'sql': 'sql',
    'json': 'json',
    'yaml': 'yaml',
    'yml': 'yaml',
    'xml': 'xml',
    'html': 'xml',
    'css': 'css',
    'scss': 'scss',
    'sass': 'scss',
    'bash': 'bash',
    'sh': 'bash',
    'powershell': 'powershell',
    'ps1': 'powershell',
    'markdown': 'markdown',
    'md': 'markdown',
    'plaintext': 'plaintext',
    'text': 'plaintext'
  };

  const prismLanguage = languageMap[language.toLowerCase()] || 'plaintext';

  useEffect(() => {
    if (codeRef.current && prismLanguage !== 'plaintext') {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, prismLanguage]);

  // Copy to clipboard function
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Generate line numbers
  const lineNumbers = showLineNumbers
    ? code.split('\n').map((_, index) => index + 1)
    : [];

  return (
    <div className={cn("relative bg-gray-900 rounded-lg overflow-hidden", className)}>
      {/* Header with language and copy button */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <span className="text-xs font-medium text-gray-300 uppercase tracking-wide">
          {language}
        </span>
        {showCopyButton && (
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors"
          >
            {copied ? (
              <>
                <Check size={14} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={14} />
                Copy
              </>
            )}
          </button>
        )}
      </div>

      {/* Code content */}
      <div className="relative overflow-auto">
        <div className="flex">
          {/* Line numbers */}
          {showLineNumbers && (
            <div className="select-none bg-gray-800 px-3 py-4 text-right">
              {lineNumbers.map(lineNum => (
                <div
                  key={lineNum}
                  className="text-xs text-gray-500 leading-6 font-mono"
                >
                  {lineNum}
                </div>
              ))}
            </div>
          )}

          {/* Code */}
          <pre className="flex-1 p-4 text-sm font-mono leading-6 text-gray-100 overflow-x-auto">
            <code
              ref={codeRef}
              className={prismLanguage !== 'plaintext' ? `language-${prismLanguage}` : ''}
            >
              {code}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default PrismHighlighter;
