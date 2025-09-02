import React, { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const SimpleSyntaxHighlighter = ({ 
  code, 
  language = 'javascript', 
  showLineNumbers = true,
  showCopyButton = true,
  className = ''
}) => {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState('');

  // Simple syntax highlighting patterns
  const getHighlightedCode = (code, lang) => {
    let highlighted = code;

    // Escape HTML first
    highlighted = highlighted.replace(/[&<>"']/g, (match) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[match]));

    switch (lang) {
      case 'javascript':
      case 'jsx':
      case 'typescript':
      case 'tsx':
        // Keywords
        highlighted = highlighted.replace(
          /\b(const|let|var|function|class|if|else|for|while|return|import|export|from|default|async|await|try|catch|finally)\b/g,
          '<span class="text-purple-400 font-semibold">$1</span>'
        );
        // Strings
        highlighted = highlighted.replace(
          /(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g,
          '<span class="text-green-400">$1$2$1</span>'
        );
        // Comments
        highlighted = highlighted.replace(
          /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
          '<span class="text-gray-500 italic">$1</span>'
        );
        // Numbers
        highlighted = highlighted.replace(
          /\b(\d+\.?\d*)\b/g,
          '<span class="text-yellow-400">$1</span>'
        );
        break;

      case 'python':
        // Keywords
        highlighted = highlighted.replace(
          /\b(def|class|if|elif|else|for|while|return|import|from|as|try|except|finally|with|lambda|yield)\b/g,
          '<span class="text-purple-400 font-semibold">$1</span>'
        );
        // Strings
        highlighted = highlighted.replace(
          /(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g,
          '<span class="text-green-400">$1$2$1</span>'
        );
        // Comments
        highlighted = highlighted.replace(
          /(#.*$)/gm,
          '<span class="text-gray-500 italic">$1</span>'
        );
        break;

      case 'sql':
        // Keywords
        highlighted = highlighted.replace(
          /\b(SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|GROUP|BY|ORDER|HAVING|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|TABLE|INDEX|DATABASE)\b/gi,
          '<span class="text-purple-400 font-semibold">$1</span>'
        );
        // Strings
        highlighted = highlighted.replace(
          /(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g,
          '<span class="text-green-400">$1$2$1</span>'
        );
        break;

      case 'json':
        // Keys
        highlighted = highlighted.replace(
          /"([^"]+)"(\s*:)/g,
          '<span class="text-blue-400">"$1"</span>$2'
        );
        // String values
        highlighted = highlighted.replace(
          /:\s*"([^"]*)"/g,
          ': <span class="text-green-400">"$1"</span>'
        );
        // Numbers, booleans, null
        highlighted = highlighted.replace(
          /:\s*(true|false|null|\d+\.?\d*)/g,
          ': <span class="text-yellow-400">$1</span>'
        );
        break;

      case 'markdown':
        // Headers
        highlighted = highlighted.replace(
          /^(#{1,6})\s+(.*)$/gm,
          '<span class="text-purple-400 font-bold">$1</span> <span class="text-white font-semibold">$2</span>'
        );
        // Bold
        highlighted = highlighted.replace(
          /\*\*(.*?)\*\*/g,
          '<span class="font-bold text-yellow-300">**$1**</span>'
        );
        // Italic
        highlighted = highlighted.replace(
          /\*(.*?)\*/g,
          '<span class="italic text-blue-300">*$1*</span>'
        );
        // Code
        highlighted = highlighted.replace(
          /`([^`]+)`/g,
          '<span class="bg-gray-700 text-red-300 px-1 rounded">`$1`</span>'
        );
        // Links
        highlighted = highlighted.replace(
          /\[([^\]]+)\]\(([^)]+)\)/g,
          '<span class="text-blue-400">[$1]</span><span class="text-gray-400">($2)</span>'
        );
        break;

      case 'css':
      case 'scss':
        // Selectors
        highlighted = highlighted.replace(
          /([.#]?[a-zA-Z][\w-]*)\s*{/g,
          '<span class="text-yellow-400">$1</span> {'
        );
        // Properties
        highlighted = highlighted.replace(
          /([a-zA-Z-]+):\s*/g,
          '<span class="text-blue-400">$1</span>: '
        );
        // Values
        highlighted = highlighted.replace(
          /:\s*([^;]+);/g,
          ': <span class="text-green-400">$1</span>;'
        );
        break;

      default:
        // No highlighting for unknown languages
        break;
    }

    return highlighted;
  };

  useEffect(() => {
    if (code) {
      const highlighted = getHighlightedCode(code, language);
      setHighlightedCode(highlighted);
    }
  }, [code, language]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getLanguageDisplayName = (lang) => {
    const languageMap = {
      javascript: 'JavaScript',
      typescript: 'TypeScript',
      jsx: 'JSX',
      tsx: 'TSX',
      python: 'Python',
      java: 'Java',
      csharp: 'C#',
      cpp: 'C++',
      c: 'C',
      php: 'PHP',
      ruby: 'Ruby',
      go: 'Go',
      rust: 'Rust',
      sql: 'SQL',
      json: 'JSON',
      yaml: 'YAML',
      css: 'CSS',
      scss: 'SCSS',
      bash: 'Bash',
      powershell: 'PowerShell',
      markdown: 'Markdown',
      markup: 'HTML/XML',
      plaintext: 'Plain Text'
    };
    return languageMap[lang] || lang.toUpperCase();
  };

  const lineNumbers = showLineNumbers ? code.split('\n').map((_, i) => i + 1) : [];

  return (
    <div className={cn("bg-neutral-900 border border-neutral-700 rounded-2xl overflow-hidden shadow-lg", className)}>
      {/* Header */}
      <div className="bg-neutral-800 border-b border-neutral-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-300">
            {getLanguageDisplayName(language)}
          </span>
          
          {showCopyButton && (
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-700 hover:bg-neutral-600 text-neutral-300 hover:text-white rounded-lg transition-colors text-sm"
              title="Copy code"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>
      </div>

      {/* Code Block */}
      <div className="relative overflow-auto">
        <div className="flex">
          {showLineNumbers && (
            <div className="bg-neutral-800 px-4 py-4 text-right border-r border-neutral-700 select-none flex-shrink-0">
              {lineNumbers.map(num => (
                <div key={num} className="text-neutral-500 text-sm leading-6 font-mono min-h-[1.5rem]">
                  {num}
                </div>
              ))}
            </div>
          )}
          
          <pre className="flex-1 p-4 text-sm leading-6 overflow-auto bg-neutral-900">
            <code
              className="text-neutral-100 block font-mono"
              dangerouslySetInnerHTML={{
                __html: highlightedCode || code
              }}
            />
          </pre>
        </div>
      </div>
    </div>
  );
};

export default SimpleSyntaxHighlighter;