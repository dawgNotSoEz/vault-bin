export const demoUsers = [
  {
    id: 'user-1',
    name: 'Nate',
    username: 'codeMaster',
    email: 'nate@vaultbin.dev',
    avatarUrl: 'https://api.dicebear.com/7.x/notionists/svg?seed=Nate',
    plan: 'pro',
    theme: 'dark',
    signedIn: true,
    isOnline: true,
    lastSeen: new Date(),
    role: 'developer',
    joinedAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000), // 6 months ago
  },
  {
    id: 'user-2',
    name: 'Alice',
    username: 'designPro',
    email: 'alice@example.com',
    avatarUrl: 'https://api.dicebear.com/7.x/notionists/svg?seed=Alice',
    plan: 'free',
    signedIn: false,
    isOnline: true,
    lastSeen: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    role: 'designer',
    joinedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 3 months ago
  },
  {
    id: 'user-3',
    name: 'Bob',
    username: 'devOpsGuru',
    email: 'bob@example.com',
    avatarUrl: 'https://api.dicebear.com/7.x/notionists/svg?seed=Bob',
    plan: 'free',
    signedIn: false,
    isOnline: false,
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    role: 'devops',
    joinedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 2 months ago
  },
  {
    id: 'user-4',
    name: 'Carol',
    username: 'fullStackDev',
    email: 'carol@example.com',
    avatarUrl: 'https://api.dicebear.com/7.x/notionists/svg?seed=Carol',
    plan: 'pro',
    signedIn: false,
    isOnline: false,
    lastSeen: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    role: 'fullstack',
    joinedAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000), // 4 months ago
  },
];

export const demoFolders = [
  { 
    id: 'all', 
    name: 'All Pastes', 
    slug: 'all', 
    count: 0, 
    description: 'All your pastes in one place',
    color: '#6366F1',
    isPrivate: false,
    createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000)
  },
  { 
    id: 'work', 
    name: 'Work', 
    slug: 'work', 
    count: 0,
    description: 'Professional code snippets and documentation',
    color: '#8B5CF6',
    isPrivate: false,
    createdAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000)
  },
  { 
    id: 'personal', 
    name: 'Personal', 
    slug: 'personal', 
    count: 0,
    description: 'Personal notes and code experiments',
    color: '#10B981',
    isPrivate: true,
    createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000)
  },
  { 
    id: 'projects', 
    name: 'Projects', 
    slug: 'projects', 
    count: 0,
    description: 'Code from various development projects',
    color: '#F59E0B',
    isPrivate: false,
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'snippets',
    name: 'Code Snippets',
    slug: 'snippets',
    count: 0,
    description: 'Reusable code snippets and utilities',
    color: '#EF4444',
    isPrivate: false,
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'templates',
    name: 'Templates',
    slug: 'templates',
    count: 0,
    description: 'Boilerplate code and project templates',
    color: '#3B82F6',
    isPrivate: false,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  }
];

export const demoPastes = [
  {
    id: 'p_api_cfg',
    title: 'API Configuration',
    content: `const apiConfig = {
  baseURL: 'https://api.example.com',
  timeout: 5000
};`,
    language: 'javascript',
    tags: ['Work'],
    visibility: 'private',
    passwordProtected: true,
    expires: '1d',
    burnAfterReading: false,
    createdAt: '2025-08-31T09:42:00Z',
    updatedAt: '2025-08-31T09:42:00Z',
    views: 18,
    commentsCount: 2,
    reactionsCount: 5,
    snippetPreview: 'const apiConfig = { baseURL: \'https://api.example.com\', timeout: 5000 }...', // Note: The original string had \' which is correct for template literals containing single quotes. This is preserved.
    folderId: 'work',
    ownerId: 'user-1',
    attachments: [],
  },
  {
    id: 'p_meeting_q4',
    title: 'Meeting Notes – Q4 Planning',
    content: `# Q4 Planning Meeting\n\n## Attendees\n- John Smith\n- Sarah Connor\n- Mike Johnson`,
    language: 'markdown',
    tags: ['Work'],
    visibility: 'public',
    passwordProtected: false,
    expires: 'permanent',
    burnAfterReading: false,
    createdAt: '2025-08-31T10:30:00Z',
    updatedAt: '2025-08-31T10:30:00Z',
    views: 42,
    commentsCount: 3,
    reactionsCount: 0,
    snippetPreview: '# Q4 Planning Meeting ## Attendees – John Smith – Sarah Connor – Mike Johnson',
    folderId: 'work',
    ownerId: 'user-1',
    attachments: [],
  },
  {
    id: 'p_todo',
    title: 'Personal Todo List',
    content: `- [ ] Buy groceries\n- [ ] Call dentist\n- [x] Complete project proposal`,
    language: 'markdown',
    tags: ['Personal'],
    visibility: 'private',
    passwordProtected: false,
    expires: '3d',
    burnAfterReading: false,
    createdAt: '2025-08-29T10:00:00Z',
    updatedAt: '2025-08-29T10:00:00Z',
    views: 5,
    commentsCount: 0,
    reactionsCount: 0,
    snippetPreview: '- [ ] Buy groceries – [ ] Call dentist – [x] Complete project proposal',
    folderId: 'personal',
    ownerId: 'user-1',
    attachments: [],
  },
  {
    id: 'p_sql_opt',
    title: 'SQL Query Optimization',
    content: 'SELECT u.name, COUNT(o.id) as order_count FROM users u LEFT JOIN orders o ON u.id = o.user_id GROUP BY u.name ORDER BY order_count DESC;'
    ,
    language: 'sql',
    tags: ['Projects'],
    visibility: 'public',
    passwordProtected: false,
    expires: 'permanent',
    burnAfterReading: false,
    createdAt: '2025-08-25T15:00:00Z',
    updatedAt: '2025-08-25T15:00:00Z',
    views: 120,
    commentsCount: 1,
    reactionsCount: 10,
    snippetPreview: 'SELECT u.name, COUNT(o.id) as order_count FROM users u LEFT JOIN orders o ON...',
    folderId: 'projects',
    ownerId: 'user-1',
    attachments: [],
  },
  {
    id: 'p_react_hello',
    title: 'React Component Code',
    content: `function MyComponent() {
  return <div>Hello World</div>;
}`,
    language: 'javascript',
    tags: [],
    visibility: 'public',
    passwordProtected: false,
    expires: 'permanent',
    burnAfterReading: false,
    createdAt: '2025-08-20T11:00:00Z',
    updatedAt: '2025-08-20T11:00:00Z',
    views: 75,
    commentsCount: 0,
    reactionsCount: 2,
    snippetPreview: 'function MyComponent() { return <div>Hello World</div>; }',
    folderId: null,
    ownerId: 'user-1',
    attachments: [],
  },
  {
    id: 'p_md_style',
    title: 'Markdown Guide',
    content: `# Markdown Cheatsheet

## Headers
# H1
## H2

## Lists
- Item 1
- Item 2

## Code Block
\`\`\`javascript
console.log("Hello");
\`\`\`

[Link to Google](https://www.google.com)`,
    language: 'markdown',
    tags: [],
    visibility: 'public',
    passwordProtected: false,
    expires: 'permanent',
    burnAfterReading: false,
    createdAt: '2025-08-18T14:00:00Z',
    updatedAt: '2025-08-18T14:00:00Z',
    views: 30,
    commentsCount: 0,
    reactionsCount: 0,
    snippetPreview: 'Markdown Guide with headings, lists, code fence, and links.',
    folderId: null,
    ownerId: 'user-1',
    attachments: [],
  },
  {
    id: 'p_py_script',
    title: 'Data Cleanup Script',
    content: `import csv, json;
from datetime import datetime;

def clean_data(file_path):
    with open(file_path, 'r') as f:
        reader = csv.reader(f)
        header = next(reader)
        data = [row for row in reader]
    # ... more cleaning logic ...
    return cleaned_data`,
    language: 'python',
    tags: [],
    visibility: 'private',
    passwordProtected: false,
    expires: '7d',
    burnAfterReading: false,
    createdAt: '2025-08-15T09:00:00Z',
    updatedAt: '2025-08-15T09:00:00Z',
    views: 10,
    commentsCount: 0,
    reactionsCount: 0,
    snippetPreview: 'import csv, json; from datetime import datetime...',
    folderId: null,
    ownerId: 'user-1',
    attachments: [],
  },
  {
    id: 'p_bash_env',
    title: 'Env Setup Bash',
    content: `#!/usr/bin/env bash

export NODE_ENV=production
export API_KEY="your_api_key_here"

# Install dependencies
npm install

# Run build
npm run build`,
    language: 'bash',
    tags: [],
    visibility: 'private',
    passwordProtected: false,
    expires: 'permanent',
    burnAfterReading: true,
    createdAt: '2025-08-10T10:00:00Z',
    updatedAt: '2025-08-10T10:00:00Z',
    views: 2,
    commentsCount: 0,
    reactionsCount: 0,
    snippetPreview: '#!/usr/bin/env bash\nexport NODE_ENV=production...',
    folderId: null,
    ownerId: 'user-1',
    attachments: [],
  },
  {
    id: 'p_yaml_cfg',
    title: 'K8s Deployment Template',
    content: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: web-app
        image: nginx:latest
        ports:
        - containerPort: 80`,
    language: 'yaml',
    tags: [],
    visibility: 'public',
    passwordProtected: false,
    expires: 'permanent',
    burnAfterReading: false,
    createdAt: '2025-08-05T16:00:00Z',
    updatedAt: '2025-08-05T16:00:00Z',
    views: 50,
    commentsCount: 0,
    reactionsCount: 0,
    snippetPreview: 'apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: web...',
    folderId: null,
    ownerId: 'user-1',
    attachments: [],
  },
  {
    id: 'p_rust_util',
    title: 'Rust Utility – Hashing',
    content: `use sha2::{Sha256, Digest};

fn hash(s: &str) -> String {
    let mut hasher = Sha256::new();
    hasher.update(s.as_bytes());
    format!("{:x}", hasher.finalize())
}`,
    language: 'rust',
    tags: [],
    visibility: 'public',
    passwordProtected: false,
    expires: 'permanent',
    burnAfterReading: false,
    createdAt: '2025-08-01T11:00:00Z',
    updatedAt: '2025-08-01T11:00:00Z',
    views: 25,
    commentsCount: 0,
    reactionsCount: 0,
    snippetPreview: 'use sha2::{Sha256, Digest}; fn hash(s: &str)->String { ... }',
    folderId: null,
    ownerId: 'user-1',
    attachments: [],
  },
  {
    id: 'p_java_http',
    title: 'Java HTTP Client',
    content: `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class SimpleHttpClient {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://www.example.com"))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}`,
    language: 'java',
    tags: [],
    visibility: 'public',
    passwordProtected: false,
    expires: 'permanent',
    burnAfterReading: false,
    createdAt: '2025-07-28T14:00:00Z',
    updatedAt: '2025-07-28T14:00:00Z',
    views: 35,
    commentsCount: 0,
    reactionsCount: 0,
    snippetPreview: 'HttpClient client = HttpClient.newHttpClient(); ...',
    folderId: null,
    ownerId: 'user-1',
    attachments: [],
  },
  {
    id: 'p_cpp_ds',
    title: 'C++ DS – LRU Cache',
    content: `class LRUCache {
public:
    LRUCache(int capacity) {
        // constructor logic
    }
    
    int get(int key) {
        // get logic
    }
    
    void put(int key, int value) {
        // put logic
    }
};`,
    language: 'cpp',
    tags: [],
    visibility: 'public',
    passwordProtected: false,
    expires: 'permanent',
    burnAfterReading: false,
    createdAt: '2025-07-25T09:00:00Z',
    updatedAt: '2025-07-25T09:00:00Z',
    views: 40,
    commentsCount: 0,
    reactionsCount: 0,
    snippetPreview: 'class LRUCache { ... };',
    folderId: null,
    ownerId: 'user-1',
    attachments: [],
  },
  {
    id: 'p_go_worker',
    title: 'Go Worker Pool',
    content: `package main

import (
	"fmt"
	"time"
)

type Job struct {
	ID int
}

func worker(id int, jobs <-chan Job, results chan<- string) {
	for j := range jobs {
		fmt.Printf("Worker %d started job %d\n", id, j.ID)
		time.Sleep(time.Second)
		results <- fmt.Sprintf("Worker %d finished job %d", id, j.ID)
	}
}`,
    language: 'go',
    tags: [],
    visibility: 'public',
    passwordProtected: false,
    expires: 'permanent',
    burnAfterReading: false,
    createdAt: '2025-07-20T10:00:00Z',
    updatedAt: '2025-07-20T10:00:00Z',
    views: 30,
    commentsCount: 0,
    reactionsCount: 0,
    snippetPreview: 'type Job struct { ... } func worker(id int, jobs <-chan Job)...',
    folderId: null,
    ownerId: 'user-1',
    attachments: [],
  },
  {
    id: 'p_ts_types',
    title: 'TypeScript Types Cheat',
    content: `type User = {
  id: string;
  name: string;
  email?: string;
};

interface Product {
  id: number;
  name: string;
  price: number;
}`,
    language: 'typescript',
    tags: [],
    visibility: 'public',
    passwordProtected: false,
    expires: 'permanent',
    burnAfterReading: false,
    createdAt: '2025-07-15T12:00:00Z',
    updatedAt: '2025-07-15T12:00:00Z',
    views: 60,
    commentsCount: 0,
    reactionsCount: 0,
    snippetPreview: 'type User = { id: string; name: string }...', // Note: The original string had \' which is correct for template literals containing single quotes. This is preserved.
    folderId: null,
    ownerId: 'user-1',
    attachments: [],
  },
  {
    id: 'p_json_schema',
    title: 'JSON Schema Example',
    content: `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Product",
  "description": "A product in the catalog",
  "type": "object",
  "properties": {
    "productId": {
      "type": "number",
      "description": "The unique identifier for a product"
    },
    "productName": {
      "type": "string"
    }
  },
  "required": [ "productId", "productName" ]
}`,
    language: 'json',
    tags: [],
    visibility: 'public',
    passwordProtected: false,
    expires: 'permanent',
    burnAfterReading: false,
    createdAt: '2025-07-10T09:00:00Z',
    updatedAt: '2025-07-10T09:00:00Z',
    views: 45,
    commentsCount: 0,
    reactionsCount: 0,
    snippetPreview: '{ \'$schema\': \'https://json-schema.org/draft/2020-12/schema\', ... }', // Note: The original string had \' which is correct for template literals containing single quotes. This is preserved.
    folderId: null,
    ownerId: 'user-1',
    attachments: [],
  },
  {
    id: 'p_sec_policy',
    title: 'Security Policy',
    content: `Zero-knowledge, privacy-first sharing policy.\n\nThis document outlines the principles and practices governing data security and user privacy within our platform. We employ end-to-end encryption to ensure that your data remains confidential and inaccessible to unauthorized parties, including ourselves.`, // Example content
    language: 'plaintext',
    tags: [],
    visibility: 'public',
    passwordProtected: false,
    expires: 'permanent',
    burnAfterReading: false,
    createdAt: '2025-07-05T10:00:00Z',
    updatedAt: '2025-07-05T10:00:00Z',
    views: 20,
    commentsCount: 0,
    reactionsCount: 0,
    snippetPreview: 'Zero-knowledge, privacy-first sharing policy...', // Note: The original string had \n which is correct for template literals. This is preserved.
    folderId: null,
    ownerId: 'user-1',
    attachments: [],
  },
  {
    id: 'demo-paste-123',
    title: 'Demo Paste with Password',
    content: `This is a demo paste content that is password protected.\n\nIt showcases how the password wall works and how content is displayed after unlocking.`,
    language: 'plaintext',
    tags: [],
    visibility: 'private',
    passwordProtected: true,
    expires: 'permanent',
    burnAfterReading: false,
    createdAt: '2025-08-28T12:00:00Z',
    updatedAt: '2025-08-28T12:00:00Z',
    views: 0,
    commentsCount: 0,
    reactionsCount: 0,
    snippetPreview: 'This is a demo paste content that is password protected...', // Note: The original string had \n which is correct for template literals. This is preserved.
    folderId: null,
    ownerId: 'user-1',
    attachments: [
      { id: 'att-1', filename: 'document.pdf', sizeKB: 250 },
      { id: 'att-2', filename: 'image.png', sizeKB: 1200 },
    ],
  },
];

// Calculate dynamic folder counts
export const updateFolderCounts = () => {
  const counts = demoPastes.reduce((acc, paste) => {
    if (paste.folderId) {
      acc[paste.folderId] = (acc[paste.folderId] || 0) + 1;
    }
    return acc;
  }, {});

  demoFolders.forEach(folder => {
    if (folder.id === 'all') {
      folder.count = demoPastes.length;
    } else {
      folder.count = counts[folder.id] || 0;
    }
  });
};

// Initial update of counts
updateFolderCounts();

export const getPasteById = (id) => demoPastes.find(paste => paste.id === id);

export const addPaste = (newPaste) => {
  demoPastes.push(newPaste);
  updateFolderCounts();
};

export const updatePaste = (id, updatedFields) => {
  const index = demoPastes.findIndex(paste => paste.id === id);
  if (index !== -1) {
    demoPastes[index] = { ...demoPastes[index], ...updatedFields };
  }
};

export const deletePaste = (id) => {
  const index = demoPastes.findIndex(paste => paste.id === id);
  if (index !== -1) {
    demoPastes.splice(index, 1);
    updateFolderCounts();
  }
};

export const getFolders = () => demoFolders;

export const getPastes = (filters = {}) => {
  let filtered = [...demoPastes];

  if (filters.folderId && filters.folderId !== 'all') {
    filtered = filtered.filter(paste => paste.folderId === filters.folderId);
  }
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(paste => 
      paste.title.toLowerCase().includes(query) ||
      paste.snippetPreview.toLowerCase().includes(query) ||
      (paste.tags && paste.tags.some(tag => tag.toLowerCase().includes(query)))
    );
  }
  // Add more filters as needed (visibility, language, etc.)

  return filtered;
};

export const getStats = () => {
  const totalPastes = demoPastes.length;
  const publicPastes = demoPastes.filter(p => p.visibility === 'public').length;
  const privatePastes = demoPastes.filter(p => p.visibility === 'private').length;
  const totalViews = demoPastes.reduce((sum, p) => sum + p.views, 0);
  const totalLikes = demoPastes.reduce((sum, p) => sum + p.reactionsCount, 0);

  return {
    totalPastes,
    public: publicPastes,
    private: privatePastes,
    totalViews,
    totalLikes,
    totalFolders: demoFolders.length - 1, // Exclude 'all' folder
    weeklyGrowth: 12,
    monthlyGrowth: 45,
    recentActivity: [
      {
        id: 'activity-1',
        type: 'paste_created',
        title: 'React Authentication Hook',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        user: demoUsers[0]
      },
      {
        id: 'activity-2',
        type: 'paste_liked',
        title: 'CSS Grid Dashboard Layout',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        user: demoUsers[1]
      },
      {
        id: 'activity-3',
        type: 'folder_created',
        title: 'TypeScript Utils',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        user: demoUsers[0]
      },
      {
        id: 'activity-4',
        type: 'collaboration',
        title: 'Advanced TypeScript API Client',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        user: demoUsers[1]
      }
    ]
  };
};

// Export demoStats as a computed value
export const demoStats = getStats();

export const demoPresence = [
  { id: 'user-1', name: 'You', avatarUrl: demoUsers[0].avatarUrl, colorHex: '#8B5CF6', cursor: { x: 0, y: 0 }, lastActiveAt: new Date().toISOString() },
  { id: 'user-2', name: 'Alice', avatarUrl: demoUsers[1].avatarUrl, colorHex: '#EC4899', cursor: { x: 0, y: 0 }, lastActiveAt: new Date().toISOString() },
  { id: 'user-3', name: 'Bob', avatarUrl: demoUsers[2].avatarUrl, colorHex: '#22C55E', cursor: { x: 0, y: 0 }, lastActiveAt: new Date().toISOString() },
  { id: 'user-4', name: 'Carol', avatarUrl: demoUsers[3].avatarUrl, colorHex: '#F97316', cursor: { x: 0, y: 0 }, lastActiveAt: new Date(Date.now() - 60 * 1000 * 5).toISOString() }, // 5 minutes ago
];

export const demoComments = [
  { 
    id: 'c1', 
    pasteId: 'p_meeting_q4', 
    authorId: 'user-2', 
    lineStart: 5, 
    lineEnd: 5, 
    message: 'Great component structure! Consider adding error handling for the state updates.', 
    createdAt: new Date(Date.now() - 60 * 1000 * 5).toISOString(),
    replies: [
      {
        id: 'c1-r1',
        authorId: 'user-1',
        message: 'Good point! I\'ll add try-catch blocks.',
        createdAt: new Date(Date.now() - 60 * 1000 * 3).toISOString()
      }
    ]
  },
  { 
    id: 'c2', 
    pasteId: 'p_meeting_q4', 
    authorId: 'user-1', 
    lineStart: 10, 
    lineEnd: 12, 
    message: 'Should we add TypeScript interfaces for better type safety?', 
    createdAt: new Date(Date.now() - 60 * 1000 * 2).toISOString(),
    replies: []
  },
  {
    id: 'c3',
    pasteId: 'p_api_cfg',
    authorId: 'user-3',
    lineStart: 1,
    lineEnd: 1,
    message: 'Consider using environment variables for the API URL.',
    createdAt: new Date(Date.now() - 60 * 1000 * 30).toISOString(),
    replies: []
  }
];

// Collaboration and presence data
export const demoCollaborations = [
  {
    id: 'collab-1',
    pasteId: 'p_api_cfg',
    participants: [demoUsers[0], demoUsers[1]],
    cursors: [
      {
        userId: demoUsers[1].id,
        position: { line: 15, column: 23 },
        selection: { start: { line: 15, column: 20 }, end: { line: 15, column: 30 } },
        color: '#8B5CF6'
      }
    ],
    isActive: true,
    lastActivity: new Date(),
    createdAt: new Date(Date.now() - 30 * 60 * 1000)
  },
  {
    id: 'collab-2',
    pasteId: 'p_meeting_q4',
    participants: [demoUsers[0], demoUsers[2]],
    cursors: [],
    isActive: false,
    lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
  }
];

// Language support for syntax highlighting
export const demoLanguages = [
  'plaintext', 'markdown', 'javascript', 'typescript', 'jsx', 'tsx',
  'python', 'java', 'csharp', 'cpp', 'c', 'php', 'ruby', 'go',
  'rust', 'sql', 'json', 'yaml', 'css', 'scss', 'bash', 'powershell', 'markup'
];
