import React, { useState } from 'react';
import { Lock, Eye, Copy, Download, Share } from 'lucide-react';
import { cn } from '@/lib/utils';
import SimpleSyntaxHighlighter from '@/components/SimpleSyntaxHighlighter';

const ViewDemo = () => {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(true);

  const demoContent = `// Demo API Example - Protected Paste
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// User authentication endpoint
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Find user in database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Verify password
    const isValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ 
      token, 
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.name 
      } 
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`;

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === 'demo123') {
      setIsUnlocked(true);
      setShowPasswordModal(false);
    } else {
      alert('Incorrect password! Hint: demo123');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(demoContent);
  };

  const downloadPaste = () => {
    const blob = new Blob([demoContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'demo-api-example.js';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Protected Demo Paste</h1>
          <p className="text-neutral-400 mt-1">This paste is password protected</p>
        </div>
        
        {isUnlocked && (
          <div className="flex items-center gap-3">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-2xl transition-all duration-200 hover:scale-[1.02]"
            >
              <Copy className="h-4 w-4" />
              Copy
            </button>
            
            <button
              onClick={downloadPaste}
              className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-2xl transition-all duration-200 hover:scale-[1.02]"
            >
              <Download className="h-4 w-4" />
              Download
            </button>
            
            <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-2xl transition-all duration-200 hover:scale-[1.02]">
              <Share className="h-4 w-4" />
              Share
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      {isUnlocked ? (
        <div className="space-y-4">
          {/* Metadata */}
          <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-neutral-300">Protected</span>
                </div>
                <div className="text-sm text-neutral-400">•</div>
                <span className="text-sm text-neutral-400">JavaScript</span>
                <div className="text-sm text-neutral-400">•</div>
                <span className="text-sm text-neutral-400">Created 2 hours ago</span>
                <div className="text-sm text-neutral-400">•</div>
                <span className="text-sm text-neutral-400">Expires in 1 week</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-neutral-400" />
                <span className="text-sm text-neutral-400">42 views</span>
              </div>
            </div>
          </div>

          {/* Code Content */}
          <SimpleSyntaxHighlighter 
            code={demoContent} 
            language="javascript"
          />
        </div>
      ) : (
        <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-8 text-center">
          <Lock className="h-16 w-16 text-neutral-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">This paste is password protected</h3>
          <p className="text-neutral-400 mb-6">Enter the password to view the content</p>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl transition-all duration-200 hover:scale-[1.02] font-medium"
          >
            Enter Password
          </button>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && !isUnlocked && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <Lock className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Enter Password</h3>
              <p className="text-neutral-400 text-sm">This paste is protected. Please enter the password to continue.</p>
            </div>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-2xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                autoFocus
              />
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 px-4 py-3 bg-neutral-700 hover:bg-neutral-600 text-white rounded-2xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl transition-colors font-medium"
                >
                  Unlock
                </button>
              </div>
            </form>
            
            <div className="mt-4 p-3 bg-neutral-700/50 rounded-xl">
              <p className="text-xs text-neutral-400 text-center">
                💡 Demo hint: The password is "demo123"
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewDemo;
