import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, User, Send, Users, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import SyntaxHighlighter from '@/components/SyntaxHighlighter';

const Collaborate = () => {
  const [editorContent, setEditorContent] = useState(
    `// Collaborative Code Editor Demo
function fibonacci(n) {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Optimized version using memoization
function fibonacciMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  
  memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
  return memo[n];
}

console.log(fibonacci(10)); // 55
console.log(fibonacciMemo(10)); // 55 (faster)`
  );
  
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Alice Chen',
      message: 'The recursive approach is elegant but inefficient for large n values.',
      timestamp: '2 minutes ago',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b607?w=32&h=32&fit=crop&crop=face'
    },
    {
      id: 2,
      author: 'Bob Martinez',
      message: 'Good point! The memoized version is much better for performance.',
      timestamp: '1 minute ago',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    }
  ]);
  
  const [newComment, setNewComment] = useState('');
  
  const collaborators = [
    {
      id: 1,
      name: 'You',
      status: 'online',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face',
      cursor: { line: 8, color: '#8b5cf6' }
    },
    {
      id: 2,
      name: 'Alice Chen',
      status: 'online',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b607?w=32&h=32&fit=crop&crop=face',
      cursor: { line: 15, color: '#10b981' }
    },
    {
      id: 3,
      name: 'Bob Martinez',
      status: 'online',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      cursor: { line: 3, color: '#f59e0b' }
    }
  ];

  const handleNewComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: 'You',
        message: newComment.trim(),
        timestamp: 'Just now',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face'
      };
      setComments(prev => [...prev, comment]);
      setNewComment('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Collaborative Paste</h1>
          <p className="text-neutral-400 mt-1">Real-time collaborative editing demo</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Circle className="h-3 w-3 text-green-500 fill-current" />
            <span className="text-sm text-neutral-400">Live collaboration</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-neutral-400" />
            <span className="text-sm text-neutral-400">{collaborators.length} active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Editor Section */}
        <div className="lg:col-span-3">
          <div className="bg-neutral-800 border border-neutral-700 rounded-2xl overflow-hidden">
            <div className="bg-neutral-900 border-b border-neutral-700 px-4 py-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">fibonacci.js</h2>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Circle className="h-2 w-2 text-green-500 fill-current animate-pulse" />
                    <span className="text-xs text-neutral-400">Auto-save enabled</span>
                  </div>
                  <span className="text-xs text-neutral-400">JavaScript</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <SyntaxHighlighter 
                code={editorContent} 
                language="javascript"
                showLineNumbers={true}
              />
              
              {/* Collaborative Cursors */}
              <div className="absolute inset-0 pointer-events-none">
                {collaborators.slice(1).map(collaborator => (
                  <div
                    key={collaborator.id}
                    className="absolute transform -translate-y-1/2"
                    style={{
                      top: `${collaborator.cursor.line * 24 + 12}px`,
                      left: '60px'
                    }}
                  >
                    <div 
                      className="w-0.5 h-5 animate-pulse"
                      style={{ backgroundColor: collaborator.cursor.color }}
                    />
                    <div 
                      className="absolute -top-6 left-0 px-2 py-1 text-xs text-white rounded-md whitespace-nowrap"
                      style={{ backgroundColor: collaborator.cursor.color }}
                    >
                      {collaborator.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Collaborators */}
          <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-4">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Collaborators
            </h3>
            <div className="space-y-3">
              {collaborators.map(collaborator => (
                <div key={collaborator.id} className="flex items-center gap-3">
                  <img 
                    src={collaborator.avatar} 
                    alt={collaborator.name}
                    className="w-8 h-8 rounded-full border-2"
                    style={{ borderColor: collaborator.cursor.color }}
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">{collaborator.name}</div>
                    <div className="flex items-center gap-1">
                      <Circle className={cn(
                        "h-2 w-2 fill-current",
                        collaborator.status === 'online' ? 'text-green-500' : 'text-neutral-500'
                      )} />
                      <span className="text-xs text-neutral-400">{collaborator.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="bg-neutral-800 border border-neutral-700 rounded-2xl flex flex-col h-96">
            <div className="p-4 border-b border-neutral-700">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Comments ({comments.length})
              </h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {comments.map(comment => (
                <div key={comment.id} className="flex gap-3">
                  <img 
                    src={comment.avatar} 
                    alt={comment.author}
                    className="w-8 h-8 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-white">{comment.author}</span>
                      <span className="text-xs text-neutral-500">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-neutral-300">{comment.message}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-neutral-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleNewComment()}
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-2xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={handleNewComment}
                  className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaborate;
