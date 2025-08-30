// Mock data for development

export const folders = [
  { id: 'all', name: 'All', icon: 'FolderOpen', count: 23 },
  { id: 'work', name: 'Work', icon: 'Briefcase', count: 8 },
  { id: 'personal', name: 'Personal', icon: 'User', count: 12 },
  { id: 'projects', name: 'Projects', icon: 'Code', count: 3 }
];

export const mockPastes = [
  {
    id: '1',
    title: 'API Configuration',
    content: `const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3
};`,
    language: 'javascript',
    visibility: 'private',
    folder: 'work',
    tags: ['config', 'api'],
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    views: 15,
    expires: { type: '7d', at: '2024-01-22T10:30:00Z' },
    size: 1247
  },
  {
    id: '2',
    title: 'Database Schema',
    content: `CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);`,
    language: 'sql',
    visibility: 'public',
    folder: 'work',
    tags: ['database', 'schema'],
    createdAt: '2024-01-14T16:45:00Z',
    updatedAt: '2024-01-14T16:45:00Z',
    views: 32,
    expires: { type: 'permanent' },
    size: 892
  },
  {
    id: '3',
    title: 'React Component',
    content: `import React from 'react';

export function Button({ children, variant = 'primary', ...props }) {
  return (
    <button
      className={\`btn btn-\${variant}\`}
      {...props}
    >
      {children}
    </button>
  );
}`,
    language: 'javascript',
    visibility: 'public',
    folder: 'personal',
    tags: ['react', 'component'],
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z',
    views: 67,
    expires: { type: '30d', at: '2024-02-13T09:15:00Z' },
    size: 2156
  }
];

export const pastes = [
  {
    id: "api-config",
    title: "API Configuration",
    snippet: 'const apiConfig = { baseURL: "https://api.example.com", timeout: 5000 };',
    visibility: "private",
    expiresIn: "21h remaining",
    folder: "work",
    date: "2025-08-30",
    comments: 0,
  },
  {
    id: "meeting-notes-q4",
    title: "Meeting Notes - Q4 Planning",
    snippet: "# Q4 Planning Meeting ## Attendees - John Smith - Sarah Connor - Mike Johnson",
    visibility: "private",
    expiresIn: "Permanent",
    folder: "work",
    date: "2025-08-29",
    comments: 3,
  },
  {
    id: "personal-todo",
    title: "Personal Todo List",
    snippet: "- [ ] Buy groceries - [ ] Call dentist - [x] Complete project proposal",
    visibility: "private",
    expiresIn: "3d remaining",
    folder: "personal",
    date: "2025-08-27",
    comments: 0,
  },
  {
    id: "sql-optimization",
    title: "SQL Query Optimization",
    snippet: "SELECT u.name, COUNT(o.id) as order_count FROM users u LEFT JOIN orders o ON...",
    visibility: "private",
    expiresIn: "Permanent",
    folder: "projects",
    date: "2025-08-23",
    comments: 1,
  },
];

export const expirationOptions = [
  { value: '21h', label: '21 hours', duration: 21 * 60 * 60 * 1000 },
  { value: '3d', label: '3 days', duration: 3 * 24 * 60 * 60 * 1000 },
  { value: '7d', label: '7 days', duration: 7 * 24 * 60 * 60 * 1000 },
  { value: '30d', label: '30 days', duration: 30 * 24 * 60 * 60 * 1000 },
  { value: 'permanent', label: 'Permanent', duration: null },
  { value: 'custom', label: 'Custom', duration: null }
];

export const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'c', label: 'C' },
  { value: 'csharp', label: 'C#' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'sql', label: 'SQL' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'json', label: 'JSON' },
  { value: 'xml', label: 'XML' },
  { value: 'yaml', label: 'YAML' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'plaintext', label: 'Plain Text' }
];

export const allowedFileTypes = [
  '.txt', '.md', '.json', '.js', '.jsx', '.ts', '.tsx', 
  '.py', '.sql', '.csv', '.png', '.jpg', '.jpeg', '.pdf',
  '.doc', '.docx', '.xml', '.yaml', '.yml', '.log'
];

export const maxFileSize = 5 * 1024 * 1024; // 5MB
export const maxTotalSize = 20 * 1024 * 1024; // 20MB
export const maxTags = 6;
export const maxCollaborators = 8;

export const features = [
  {
    title: "Secure text sharing",
    description: "Share text securely with end-to-end encryption"
  },
  {
    title: "File attachments",
    description: "Attach files up to 10MB with your pastes"
  },
  {
    title: "Real-time collaboration",
    description: "Collaborate with others in real-time"
  },
  {
    title: "Auto-expiration",
    description: "Set automatic expiration for enhanced security"
  },
  {
    title: "Password protection",
    description: "Add an extra layer of security with passwords"
  }
];

export const security = [
  {
    title: "Zero-knowledge encryption",
    description: "Your data is encrypted before it leaves your device"
  },
  {
    title: "Client-side processing",
    description: "All encryption happens in your browser"
  },
  {
    title: "No server access to content",
    description: "We can't read your pastes even if we wanted to"
  },
  {
    title: "Automatic destruction",
    description: "Expired pastes are permanently deleted"
  },
  {
    title: "Open source",
    description: "Our code is open for security audits"
  }
];