import React, { useRef, useEffect } from 'react';
import Textarea from './Textarea';
import { cn } from '../../lib/utils';

const Editor = ({ 
  value, 
  onChange, 
  placeholder = "Enter your content here...",
  className,
  showLineNumbers = true,
  language = 'plaintext',
  ...props 
}) => {
  const textareaRef = useRef();
  const lineNumbersRef = useRef();
  
  // Calculate line numbers
  const lines = value ? value.split('\n') : [''];
  const lineCount = lines.length;
  
  // Sync scroll between textarea and line numbers
  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };
  
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener('scroll', handleScroll);
      return () => textarea.removeEventListener('scroll', handleScroll);
    }
  }, []);
  
  return (
    <div className={cn('relative', className)}>
      <div className="flex rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-950 to-zinc-900/60 overflow-hidden">
        {showLineNumbers && (
          <div
            ref={lineNumbersRef}
            className="flex-shrink-0 w-12 bg-zinc-900/80 border-r border-zinc-800 overflow-hidden"
            style={{ height: '400px' }}
          >
            <div className="py-2 text-right text-xs text-zinc-500 font-mono leading-6 select-none pointer-events-none">
              {Array.from({ length: Math.max(lineCount, 20) }, (_, i) => (
                <div key={i + 1} className="px-2 h-6 flex items-center justify-end">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={cn(
              'font-mono text-sm leading-6 resize-none border-0 bg-transparent focus:ring-0 p-3',
              'min-h-[400px] max-h-[600px] overflow-y-auto'
            )}
            style={{ height: '400px' }}
            {...props}
          />
          
          {/* Markdown hints */}
          {value === '' && (
            <div className="absolute top-16 left-3 pointer-events-none text-xs text-zinc-600 space-y-1 font-mono">
              <div># Heading 1</div>
              <div>## Heading 2</div>
              <div>**bold text**</div>
              <div>*italic text*</div>
              <div>`inline code`</div>
              <div>```</div>
              <div>code block</div>
              <div>```</div>
            </div>
          )}
        </div>
      </div>
      
      {/* Status bar */}
      <div className="flex justify-between items-center mt-2 text-xs text-zinc-500">
        <div className="flex items-center gap-4">
          <span>Lines: {lineCount}</span>
          <span>Characters: {value?.length || 0}</span>
          <span>Language: {language}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Ctrl+S to save</span>
        </div>
      </div>
    </div>
  );
};

export default Editor;
