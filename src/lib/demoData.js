// src/lib/demoData.js
/**
 * Seeded demo content for VaultBin
 */

export const demoData = {
  pastes: [
    {
      id: "demo-paste-api",
      title: "API Configuration",
      folder: "Projects", 
      visibility: "public",
      passwordRequired: false,
      expiresAt: null,
      format: "code",
      language: "javascript",
      content: `// API Configuration for VaultBin
const config = {
  apiUrl: process.env.VITE_API_URL || 'http://localhost:8000',
  maxFileSize: 50 * 1024 * 1024, // 50MB
  supportedLanguages: [
    'javascript', 'typescript', 'python', 'java',
    'cpp', 'rust', 'go', 'json', 'yaml', 'sql',
    'bash', 'ruby', 'html', 'css', 'markdown'
  ],
  defaultExpiration: '7d',
  encryption: {
    algorithm: 'AES-GCM',
    keyLength: 256
  }
};

export default config;`,
      attachments: [],
      tags: ["config", "api"],
      readToken: "rtkn_demo_api_read_token_12345",
      writeToken: "wtkn_demo_api_write_token_67890", 
      collaborators: [],
      comments: [],
      createdAt: "2025-08-30T10:00:00Z",
      views: 42
    },
    
    {
      id: "demo-paste-collab",
      title: "Collaborative Paste",
      folder: "Work",
      visibility: "private", 
      passwordRequired: true,
      expiresAt: "2025-09-15T12:00:00Z",
      format: "code",
      language: "javascript",
      content: `import React from 'react';
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

export default CollaborativeComponent;`,
      attachments: [
        {
          id: "att1",
          name: "diagram.png", 
          type: "image/png",
          size: 125340,
          url: "/assets/demo.png"
        }
      ],
      tags: ["react", "collaboration"],
      readToken: "rtkn_demo_collab_read_token_abcde",
      writeToken: "wtkn_demo_collab_write_token_fghij",
      collaborators: [
        {
          id: "u-alice",
          name: "Alice",
          email: "alice@example.com", 
          role: "editor",
          avatar: "/assets/avatars/alice.png",
          online: true,
          color: "#A78BFA"
        },
        {
          id: "u-bob", 
          name: "Bob",
          email: "bob@example.com",
          role: "viewer",
          avatar: "/assets/avatars/bob.png", 
          online: true,
          color: "#34D399"
        }
      ],
      comments: [
        {
          id: "c1",
          authorId: "u-alice",
          line: 8,
          text: "Great component structure! Consider adding error handling for the state updates.",
          timestamp: 1725000000,
          resolved: false
        },
        {
          id: "c2", 
          authorId: "u-bob",
          line: 23,
          text: "Should we add TypeScript interfaces for better type safety?",
          timestamp: 1725000500,
          resolved: false
        }
      ],
      createdAt: "2025-08-29T15:30:00Z",
      views: 15
    }
  ],

  folders: [
    { id: "all", name: "All Pastes", count: 12 },
    { id: "work", name: "Work", count: 5 },
    { id: "personal", name: "Personal", count: 4 },
    { id: "projects", name: "Projects", count: 3 }
  ],

  currentUser: {
    id: "u-current-user",
    name: "You", 
    email: "you@example.com",
    avatar: null,
    color: "#6366F1"
  }
};