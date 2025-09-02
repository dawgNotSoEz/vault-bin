import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, Search, ChevronUp, ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import Prism core
import Prism from 'prismjs';

// Import PrismJS components in correct dependency order
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-powershell';
import 'prismjs/components/prism-markdown';

const SyntaxHighlighter = ({ 
  code, 
  language = 'javascript', 
  showLineNumbers = true,
  showCopyButton = true,
  enableSearch = true,
  className = ''
}) => {
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [matches, setMatches] = useState([]);
  const [currentMatch, setCurrentMatch] = useState(-1);
  const [highlightedCode, setHighlightedCode] = useState('');
  
  const codeRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (code && language) {
      try {
        // Ensure Prism is properly initialized
        if (!Prism || !Prism.languages) {
          setHighlightedCode(code);
          return;
        }

        // Get the language grammar, fallback to plaintext
        const grammar = Prism.languages[language] || 
                       Prism.languages.plaintext || 
                       Prism.languages.plain ||
                       null;

        if (grammar) {
          const highlighted = Prism.highlight(code, grammar, language);
          setHighlightedCode(highlighted);
        } else {
          // If no grammar found, just escape HTML and return
          setHighlightedCode(code.replace(/[&<>"']/g, (match) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
          }[match])));
        }
      } catch (error) {
        console.warn('Prism highlighting failed for language:', language, error);
        // Fallback to escaped plain text
        setHighlightedCode(code.replace(/[&<>"']/g, (match) => ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;'
        }[match])));
      }
    }
  }, [code, language]);

  useEffect(() => {
    if (searchTerm && code) {
      const regex = new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      const newMatches = [];
      let match;
      while ((match = regex.exec(code)) !== null) {
        newMatches.push({
          index: match.index,
          text: match[0],
          length: match[0].length
        });
        // Prevent infinite loop on zero-length matches
        if (match.index === regex.lastIndex) {
          regex.lastIndex++;
        }
      }
      setMatches(newMatches);
      setCurrentMatch(newMatches.length > 0 ? 0 : -1);
    } else {
      setMatches([]);
      setCurrentMatch(-1);
    }
  }, [searchTerm, code]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchTerm('');
      setMatches([]);
      setCurrentMatch(-1);
    }
  };

  const goToMatch = (direction) => {
    if (matches.length === 0) return;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = currentMatch + 1 >= matches.length ? 0 : currentMatch + 1;
    } else {
      newIndex = currentMatch - 1 < 0 ? matches.length - 1 : currentMatch - 1;
    }
    setCurrentMatch(newIndex);
  };

  const highlightSearchMatches = (htmlCode) => {
    if (!searchTerm || matches.length === 0) return htmlCode;
    
    const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedTerm})`, 'gi');
    
    return htmlCode.replace(regex, (match, p1, offset) => {
      const matchIndex = matches.findIndex(m => m.index <= offset && offset < m.index + m.length);
      const isActive = matchIndex === currentMatch;
      
      return `<mark class="${isActive 
        ? 'bg-purple-500 bg-opacity-50 border border-purple-400 text-white' 
        : 'bg-yellow-400 bg-opacity-30 text-neutral-900'
      } rounded px-0.5">${p1}</mark>`;
    });
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
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-neutral-300">
              {getLanguageDisplayName(language)}
            </span>
            {matches.length > 0 && (
              <span className="text-xs text-neutral-400 bg-neutral-700 px-2 py-1 rounded-full">
                {currentMatch + 1} of {matches.length}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {enableSearch && (
              <button
                onClick={toggleSearch}
                className={cn(
                  "p-1.5 rounded-lg transition-colors",
                  showSearch 
                    ? "bg-purple-600 text-white" 
                    : "text-neutral-400 hover:text-white hover:bg-neutral-700"
                )}
                title="Search in code"
              >
                <Search className="h-4 w-4" />
              </button>
            )}
            
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

        {/* Search Bar */}
        {showSearch && (
          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search in code..."
                className="w-full pl-10 pr-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            {matches.length > 0 && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => goToMatch('prev')}
                  className="p-2 hover:bg-neutral-700 rounded-lg text-neutral-400 hover:text-white transition-colors"
                  title="Previous match"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button
                  onClick={() => goToMatch('next')}
                  className="p-2 hover:bg-neutral-700 rounded-lg text-neutral-400 hover:text-white transition-colors"
                  title="Next match"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            )}
            
            <button
              onClick={toggleSearch}
              className="p-2 hover:bg-neutral-700 rounded-lg text-neutral-400 hover:text-white transition-colors"
              title="Close search"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
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
              ref={codeRef}
              className={`language-${language} text-neutral-100 block`}
              dangerouslySetInnerHTML={{
                __html: highlightSearchMatches(highlightedCode)
              }}
            />
          </pre>
        </div>
      </div>
    </div>
  );
};

export default SyntaxHighlighter;
