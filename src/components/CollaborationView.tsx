import React, { useState, useEffect } from 'react';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { 
  Users, 
  MessageCircle, 
  Send, 
  Eye, 
  Edit3, 
  Clock,
  Shield,
  MoreHorizontal,
  UserPlus
} from 'lucide-react';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  avatar?: string;
  color: string;
  isOnline: boolean;
  cursor?: { line: number; column: number };
}

interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: string;
  line?: number;
}

interface CollaborationViewProps {
  pasteId: string;
  isOwner: boolean;
  onInvite?: () => void;
}

export function CollaborationView({ pasteId, isOwner, onInvite }: CollaborationViewProps) {
  const [content, setContent] = useState(`import React from 'react';
import { Button } from './ui/button';

function CollaborativeComponent() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 space-y-4">
      <h1>Collaborative Editing Demo</h1>
      <p>Multiple users can edit this content simultaneously.</p>
      
      <div className="flex items-center gap-2">
        <Button onClick={() => setCount(count + 1)}>
          Count: {count}
        </Button>
      </div>
      
      {/* Add your collaborative features here */}
    </div>
  );
}

export default CollaborativeComponent;`);

  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      userId: 'user2',
      userName: 'Alice',
      content: 'Great component structure! Consider adding error handling for the state updates.',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      line: 8
    },
    {
      id: '2',
      userId: 'user3',
      userName: 'Bob',
      content: 'Should we add TypeScript interfaces for better type safety?',
      timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [activeUsers] = useState<User[]>([
    {
      id: 'user1',
      name: 'You',
      color: '#3b82f6',
      isOnline: true,
      cursor: { line: 12, column: 10 }
    },
    {
      id: 'user2',
      name: 'Alice',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
      color: '#ef4444',
      isOnline: true,
      cursor: { line: 8, column: 25 }
    },
    {
      id: 'user3',
      name: 'Bob',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      color: '#10b981',
      isOnline: true
    },
    {
      id: 'user4',
      name: 'Carol',
      color: '#f59e0b',
      isOnline: false
    }
  ]);

  const addComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      userId: 'user1',
      userName: 'You',
      content: newComment,
      timestamp: new Date().toISOString(),
    };
    
    setComments(prev => [...prev, comment]);
    setNewComment('');
    toast.success('Comment added');
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now.getTime() - time.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const getUserColor = (userId: string) => {
    const user = activeUsers.find(u => u.id === userId);
    return user?.color || '#6b7280';
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Collaborative Paste</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>ID: {pasteId}</span>
            <Badge variant="outline" className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              End-to-end encrypted
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Active Users */}
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <div className="flex -space-x-2">
              {activeUsers.filter(u => u.isOnline).map((user) => (
                <Avatar key={user.id} className="w-8 h-8 border-2 border-background">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback 
                    className="text-xs"
                    style={{ backgroundColor: user.color + '20', color: user.color }}
                  >
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {activeUsers.filter(u => u.isOnline).length} online
            </span>
          </div>
          
          <Button variant="outline" size="sm" onClick={onInvite}>
            <UserPlus className="w-4 h-4 mr-2" />
            Invite
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Editor */}
        <div className="lg:col-span-3 space-y-4">
          <Card className="relative overflow-hidden">
            <div className="bg-muted px-4 py-2 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4" />
                <span className="font-medium">Collaborative Editor</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Eye className="w-3 h-3" />
                <span>Real-time sync</span>
              </div>
            </div>
            
            <div className="relative">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[500px] resize-none border-0 focus-visible:ring-0 font-mono text-sm"
                style={{ fontFamily: 'JetBrains Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace' }}
                placeholder="Start typing to collaborate..."
              />
              
              {/* User Cursors */}
              {activeUsers
                .filter(u => u.isOnline && u.cursor && u.id !== 'user1')
                .map((user) => (
                  <div
                    key={user.id}
                    className="absolute pointer-events-none"
                    style={{
                      top: `${(user.cursor!.line - 1) * 1.5}em`,
                      left: `${user.cursor!.column * 0.6}em`,
                    }}
                  >
                    <div 
                      className="w-0.5 h-5 animate-pulse"
                      style={{ backgroundColor: user.color }}
                    />
                    <div 
                      className="absolute -top-6 left-0 px-1 py-0.5 rounded text-xs text-white whitespace-nowrap"
                      style={{ backgroundColor: user.color }}
                    >
                      {user.name}
                    </div>
                  </div>
                ))}
            </div>
            
            <div className="bg-muted px-4 py-2 border-t text-xs text-muted-foreground flex items-center justify-between">
              <span>{content.split('\n').length} lines, {content.length} characters</span>
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3" />
                <span>Last saved: Just now</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Comments Sidebar */}
        <div className="space-y-4">
          <Card className="h-[600px] flex flex-col">
            <div className="p-4 border-b">
              <h3 className="font-medium flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Comments ({comments.length})
              </h3>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: getUserColor(comment.userId) }}
                      />
                      <span className="font-medium text-sm">{comment.userName}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(comment.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground pl-4">
                      {comment.content}
                    </p>
                    {comment.line && (
                      <div className="text-xs text-muted-foreground pl-4">
                        Line {comment.line}
                      </div>
                    )}
                    <Separator />
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t space-y-2">
              <Input
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    addComment();
                  }
                }}
              />
              <Button 
                onClick={addComment} 
                size="sm" 
                className="w-full"
                disabled={!newComment.trim()}
              >
                <Send className="w-3 h-3 mr-2" />
                Comment
              </Button>
            </div>
          </Card>

          {/* Active Users List */}
          <Card className="p-4">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Collaborators
            </h3>
            <div className="space-y-2">
              {activeUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback 
                        className="text-xs"
                        style={{ backgroundColor: user.color + '20', color: user.color }}
                      >
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{user.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div 
                      className={`w-2 h-2 rounded-full ${
                        user.isOnline ? 'bg-green-500' : 'bg-gray-400'
                      }`}
                    />
                    <span className="text-xs text-muted-foreground">
                      {user.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}