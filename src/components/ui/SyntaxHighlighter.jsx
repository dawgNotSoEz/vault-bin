import React, { useState, useEffect, useRef } from 'react'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

// Language imports for syntax highlighting
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-csharp'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-xml'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-powershell'
import 'prismjs/components/prism-markdown'

import { Copy, Check } from 'lucide-react'
import { cn } from '../../lib/utils'

// Collaborative cursor component
const CollaborativeCursor = ({ cursor, isOwn = false }) => {
  return (
    <div
      className={cn(
        "absolute pointer-events-none z-50 transition-all duration-100 ease-out",
        isOwn && "hidden"
      )}
      style={{
        left: cursor.x,
        top: cursor.y,
        transform: 'translate(-2px, -2px)'
      }}
    >
      {/* Cursor SVG */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="drop-shadow-lg"
      >
        <path
          d="M2 2L18 8L8 10L6 18L2 2Z"
          fill={cursor.color}
          stroke="white"
          strokeWidth="1"
        />
      </svg>
      
      {/* User name label */}
      <div
        className="absolute top-5 left-2 px-2 py-1 rounded text-xs font-medium text-white whitespace-nowrap shadow-lg"
        style={{ backgroundColor: cursor.color }}
      >
        {cursor.userName}
      </div>
    </div>
  )
}

const SyntaxHighlighter = ({ 
  code, 
  language = 'plaintext', 
  showLineNumbers = true, 
  showCopyButton = true,
  collaborativeCursors = [],
  onCursorMove = null,
  className = ""
}) => {
  const codeRef = useRef(null)
  const [copied, setCopied] = useState(false)
  const [cursors, setCursors] = useState([])

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
    'cpp': 'cpp',
    'c++': 'cpp',
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
  }

  const prismLanguage = languageMap[language.toLowerCase()] || 'plaintext'

  useEffect(() => {
    if (codeRef.current && prismLanguage !== 'plaintext') {
      Prism.highlightElement(codeRef.current)
    }
  }, [code, prismLanguage])

  // Handle mouse movement for collaborative cursors
  const handleMouseMove = (e) => {
    if (onCursorMove) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      onCursorMove({ x, y })
    }
  }

  // Copy to clipboard function
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Generate line numbers
  const lineNumbers = showLineNumbers 
    ? code.split('\n').map((_, index) => index + 1)
    : []

  return (
    <div className={cn("relative bg-gray-900 rounded-lg overflow-hidden", className)}>
      {/* Header with language and copy button */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-300 uppercase tracking-wide">
            {language}
          </span>
          <div className="flex items-center gap-1">
            {collaborativeCursors.length > 0 && (
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                {collaborativeCursors.length} online
              </div>
            )}
          </div>
        </div>
        
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
      <div 
        className="relative overflow-auto"
        onMouseMove={handleMouseMove}
      >
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
          <div className="flex-1 relative">
            <pre className="p-4 text-sm font-mono leading-6 text-gray-100 overflow-x-auto">
              <code
                ref={codeRef}
                className={prismLanguage !== 'plaintext' ? `language-${prismLanguage}` : ''}
              >
                {code}
              </code>
            </pre>

            {/* Collaborative cursors */}
            {collaborativeCursors.map(cursor => (
              <CollaborativeCursor
                key={cursor.id}
                cursor={cursor}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SyntaxHighlighter
