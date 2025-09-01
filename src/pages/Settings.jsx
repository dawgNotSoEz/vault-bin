import React, { useState } from 'react';
import { User, Palette, Folder, Keyboard, Info, Save, Trash2, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    displayName: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=face'
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'folders', label: 'Folders', icon: Folder },
    { id: 'shortcuts', label: 'Shortcuts', icon: Keyboard },
    { id: 'about', label: 'About', icon: Info }
  ];

  const folders = [
    { id: 1, name: 'Personal', count: 12, color: '#8b5cf6' },
    { id: 2, name: 'Work', count: 8, color: '#10b981' },
    { id: 3, name: 'Snippets', count: 24, color: '#f59e0b' }
  ];

  const shortcuts = [
    { keys: ['Ctrl', 'N'], description: 'Create new paste' },
    { keys: ['Ctrl', 'S'], description: 'Save paste' },
    { keys: ['Ctrl', '/'], description: 'Focus search' },
    { keys: ['G', 'D'], description: 'Go to Dashboard' },
    { keys: ['G', 'C'], description: 'Go to Create' },
    { keys: ['T'], description: 'Toggle theme' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Profile Information</h3>
              
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={formData.avatar} 
                  alt="Profile" 
                  className="w-16 h-16 rounded-full border-2 border-neutral-600"
                />
                <div>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-2xl text-sm transition-colors">
                    Change Avatar
                  </button>
                  <p className="text-xs text-neutral-400 mt-1">PNG, JPG up to 2MB</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Display Name</label>
                  <input
                    type="text"
                    value={formData.displayName}
                    onChange={(e) => handleInputChange('displayName', e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-2xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-2xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-2xl transition-colors">
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>
                <button className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-2xl transition-colors">
                  Cancel
                </button>
              </div>
            </div>

            <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Auto-save drafts</div>
                    <div className="text-sm text-neutral-400">Automatically save your work as you type</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-neutral-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Show line numbers</div>
                    <div className="text-sm text-neutral-400">Display line numbers in code editor</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-neutral-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Theme Settings</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-3">Color Theme</label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <input type="radio" name="theme" id="dark" className="sr-only peer" defaultChecked />
                    <label htmlFor="dark" className="flex items-center p-4 bg-neutral-700 border-2 border-transparent peer-checked:border-purple-500 rounded-2xl cursor-pointer hover:bg-neutral-600 transition-colors">
                      <div className="w-8 h-8 bg-neutral-900 rounded-lg mr-3"></div>
                      <div>
                        <div className="text-white font-medium">Dark</div>
                        <div className="text-sm text-neutral-400">Dark theme</div>
                      </div>
                    </label>
                  </div>
                  
                  <div className="relative">
                    <input type="radio" name="theme" id="light" className="sr-only peer" />
                    <label htmlFor="light" className="flex items-center p-4 bg-neutral-700 border-2 border-transparent peer-checked:border-purple-500 rounded-2xl cursor-pointer hover:bg-neutral-600 transition-colors">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg mr-3"></div>
                      <div>
                        <div className="text-white font-medium">Light</div>
                        <div className="text-sm text-neutral-400">Light theme</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-3">Accent Color</label>
                <div className="flex gap-3">
                  {[
                    { color: '#8b5cf6', name: 'Purple' },
                    { color: '#10b981', name: 'Green' },
                    { color: '#f59e0b', name: 'Amber' },
                    { color: '#ef4444', name: 'Red' },
                    { color: '#3b82f6', name: 'Blue' }
                  ].map(({ color, name }) => (
                    <button
                      key={color}
                      className={cn(
                        "w-8 h-8 rounded-full border-2 border-neutral-600 hover:scale-110 transition-transform",
                        color === '#8b5cf6' && "ring-2 ring-white"
                      )}
                      style={{ backgroundColor: color }}
                      title={name}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'folders':
        return (
          <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Manage Folders</h3>
              <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-2xl transition-colors">
                <Plus className="h-4 w-4" />
                New Folder
              </button>
            </div>
            
            <div className="space-y-3">
              {folders.map(folder => (
                <div key={folder.id} className="flex items-center justify-between p-4 bg-neutral-700 rounded-2xl hover:bg-neutral-600 transition-colors">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: folder.color }}
                    />
                    <div>
                      <div className="text-white font-medium">{folder.name}</div>
                      <div className="text-sm text-neutral-400">{folder.count} pastes</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-600 rounded-lg transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button className="p-2 text-neutral-400 hover:text-red-400 hover:bg-neutral-600 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'shortcuts':
        return (
          <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Keyboard Shortcuts</h3>
            <div className="space-y-3">
              {shortcuts.map((shortcut, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-neutral-700 rounded-2xl">
                  <span className="text-neutral-300">{shortcut.description}</span>
                  <div className="flex items-center gap-1">
                    {shortcut.keys.map((key, keyIndex) => (
                      <React.Fragment key={keyIndex}>
                        <kbd className="px-2 py-1 bg-neutral-600 text-neutral-200 rounded-lg text-sm font-mono">
                          {key}
                        </kbd>
                        {keyIndex < shortcut.keys.length - 1 && (
                          <span className="text-neutral-500 mx-1">+</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">About VaultBin</h3>
            <div className="space-y-4 text-neutral-300">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">VaultBin</h4>
                  <p className="text-neutral-400">Version 1.0.0</p>
                </div>
              </div>
              
              <p>A secure, privacy-focused paste sharing platform with end-to-end encryption and zero-knowledge architecture.</p>
              
              <div className="space-y-2">
                <p><strong>Features:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-sm text-neutral-400">
                  <li>End-to-end encryption</li>
                  <li>Zero-knowledge storage</li>
                  <li>Syntax highlighting for 100+ languages</li>
                  <li>Real-time collaboration</li>
                  <li>Custom expiration times</li>
                </ul>
              </div>
              
              <div className="pt-4 border-t border-neutral-700">
                <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-neutral-400 mt-1">Manage your account and preferences</p>
      </div>

      <div className="flex space-x-6">
        {/* Sidebar */}
        <div className="w-64 space-y-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 text-left",
                  activeTab === tab.id
                    ? "bg-purple-600 text-white"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                )}
              >
                <Icon className="h-5 w-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;