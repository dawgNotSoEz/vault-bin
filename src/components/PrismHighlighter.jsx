// src/components/PrismHighlighter.jsx
import React, { useEffect } from 'react';
import Prism from 'prismjs';

// Import core languages
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markdown';

// Dark theme styles
const prismStyles = `
  .prism-container {
    background: rgb(9 9 11 / 0.6);
    border: 1px solid rgb(39 39 42 / 0.7);
    border-radius: 1rem;
    overflow: hidden;
  }
  
  .prism-header {
    background: rgb(24 24 27 / 0.8);
    border-bottom: 1px solid rgb(39 39 42 / 0.7);
    padding: 0.75rem 1rem;
    display: flex;
    justify-content: between;
    align-items: center;
    font-size: 0.875rem;
    color: rgb(161 161 170);
  }
  
  .prism-content {
    position: relative;
    overflow-x: auto;
  }
  
  pre[class*="language-"] {
    margin: 0;
    padding: 1rem;
    background: transparent !important;
    border-radius: 0;
    font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
    font-size: 0.875rem;
    line-height: 1.6;
  }
  
  code[class*="language-"] {
    font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
    color: rgb(244 244 245);
  }
  
  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: rgb(113 113 122);
    font-style: italic;
  }
  
  .token.punctuation {
    color: rgb(212 212 216);
  }
  
  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: rgb(251 146 60);
  }
  
  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: rgb(34 197 94);
  }
  
  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: rgb(168 85 247);
  }
  
  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: rgb(99 102 241);
  }
  
  .token.function,
  .token.class-name {
    color: rgb(244 114 182);
  }
  
  .token.regex,
  .token.important,
  .token.variable {
    color: rgb(245 158 11);
  }
  
  .line-numbers {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3rem;
    background: rgb(24 24 27 / 0.5);
    border-right: 1px solid rgb(39 39 42 / 0.7);
    padding: 1rem 0.5rem;
    font-size: 0.75rem;
    line-height: 1.6;
    color: rgb(113 113 122);
    user-select: none;
    pointer-events: none;
  }
  
  .line-numbers-content {
    margin-left: 3rem;
  }
  
  .copy-button {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    background: rgb(39 39 42 / 0.8);
    border: 1px solid rgb(63 63 70 / 0.7);
    border-radius: 0.5rem;
    padding: 0.5rem;
    color: rgb(161 161 170);
    font-size: 0.75rem;
    cursor: pointer;
    transition: all 0.2s;
    backdrop-filter: blur(8px);
  }
  
  .copy-button:hover {
    background: rgb(63 63 70 / 0.8);
    color: rgb(244 244 245);
  }
`;

function PrismHighlighter({ 
  code, 
  language = 'javascript', 
  showLineNumbers = true, 
  showCopyButton = true,
  title,
  className = '' 
}) {
  useEffect(() => {
    // Inject styles
    const styleId = 'prism-custom-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = prismStyles;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  };

  const generateLineNumbers = () => {
    const lines = code.split('\n');
    return lines.map((_, index) => index + 1).join('\n');
  };

  // Map common language aliases
  const languageMap = {
    'js': 'javascript',
    'ts': 'typescript',
    'py': 'python',
    'rb': 'ruby',
    'sh': 'bash',
    'yml': 'yaml'
  };

  const prismLanguage = languageMap[language] || language;

  return (
    <div className={`prism-container ${className}`}>
      {(title || showCopyButton) && (
        <div className="prism-header">
          <span>{title || `${language.toUpperCase()}`}</span>
          {showCopyButton && (
            <button 
              onClick={copyToClipboard}
              className="copy-button"
              aria-label="Copy code"
            >
              Copy
            </button>
          )}
        </div>
      )}
      
      <div className="prism-content">
        {showLineNumbers && (
          <div className="line-numbers">
            {generateLineNumbers()}
          </div>
        )}
        
        <div className={showLineNumbers ? 'line-numbers-content' : ''}>
          <pre className={`language-${prismLanguage}`}>
            <code className={`language-${prismLanguage}`}>
              {code}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default PrismHighlighter;