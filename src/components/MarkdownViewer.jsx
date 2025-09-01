import React, { useEffect, useRef } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { cn } from '../../lib/utils';

const MarkdownViewer = ({
  content,
  className,
  ...props
}) => {
  const viewerRef = useRef(null);

  useEffect(() => {
    if (viewerRef.current && content) {
      const html = marked.parse(content);
      viewerRef.current.innerHTML = DOMPurify.sanitize(html);
    }
  }, [content]);

  return (
    <div
      ref={viewerRef}
      className={cn(
        'prose prose-invert prose-sm max-w-none overflow-auto',
        'prose-headings:font-bold prose-headings:text-white',
        'prose-p:text-zinc-300 prose-a:text-purple-400 hover:prose-a:text-purple-300',
        'prose-ul:list-disc prose-ul:pl-5',
        'prose-li:text-zinc-300',
        'prose-code:bg-zinc-800 prose-code:text-zinc-100 prose-code:px-1 prose-code:rounded',
        'prose-pre:bg-zinc-800 prose-pre:border prose-pre:border-zinc-700 prose-pre:rounded-xl',
        'prose-pre>code:text-zinc-100',
        className
      )}
      {...props}
    />
  );
};

export default MarkdownViewer;
