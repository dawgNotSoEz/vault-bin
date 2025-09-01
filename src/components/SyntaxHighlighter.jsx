import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

// Import PrismJS languages in the correct order
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-powershell';

import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const SyntaxHighlighter = ({ 
  code, 
  language = 'javascript',
  className = '',
  showCopyButton = true,
  showLineNumbers = true
}) => {
  const codeRef = useRef(null);
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
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

  const lineNumbers = showLineNumbers ? code.split('\n').map((_, i) => i + 1) : [];

  return (
    <div className={cn('bg-neutral-900 rounded-2xl overflow-hidden shadow-lg border border-neutral-700', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-neutral-800 border-b border-neutral-700">
        <span className="text-sm text-neutral-300 font-medium capitalize">{language}</span>
        {showCopyButton && (
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-3 py-1 text-sm bg-neutral-700 hover:bg-neutral-600 text-neutral-300 rounded-xl transition-all duration-200 hover:scale-[1.02]"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                Copy
              </>
            )}
          </button>
        )}
      </div>

      {/* Code */}
      <div className="relative overflow-auto">
        <div className="flex">
          {showLineNumbers && (
            <div className="bg-neutral-800 px-4 py-4 text-right border-r border-neutral-700 select-none">
              {lineNumbers.map(num => (
                <div key={num} className="text-neutral-500 text-sm leading-6 font-mono">
                  {num}
                </div>
              ))}
            </div>
          )}
          
          <pre className="flex-1 p-4 text-sm leading-6 overflow-auto">
            <code
              ref={codeRef}
              className={`language-${language} text-neutral-100`}
            >
              {code}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default SyntaxHighlighter;
