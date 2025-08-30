import React, { useState } from 'react';
import { X, Mail, ChevronDown } from 'lucide-react';
import { isValidEmail } from '../lib/utils';
import { maxCollaborators } from '../lib/data';
import { cn } from '../lib/utils';

const CollaboratorPicker = ({ 
  value = [], 
  onChange, 
  error,
  className,
  ...props 
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [selectedRole, setSelectedRole] = useState('viewer');
  const [inputError, setInputError] = useState('');
  
  const roles = [
    { value: 'viewer', label: 'Viewer', description: 'Can view only' },
    { value: 'editor', label: 'Editor', description: 'Can view and edit' }
  ];
  
  const addCollaborator = () => {
    const email = emailInput.trim().toLowerCase();
    
    if (!email) return;
    
    if (!isValidEmail(email)) {
      setInputError('Please enter a valid email address');
      return;
    }
    
    if (value.length >= maxCollaborators) {
      setInputError(`Maximum ${maxCollaborators} collaborators allowed`);
      return;
    }
    
    if (value.some(collab => collab.email === email)) {
      setInputError('This email is already added');
      return;
    }
    
    onChange([...value, { email, role: selectedRole }]);
    setEmailInput('');
    setInputError('');
  };
  
  const removeCollaborator = (emailToRemove) => {
    onChange(value.filter(collab => collab.email !== emailToRemove));
  };
  
  const updateRole = (email, newRole) => {
    onChange(value.map(collab => 
      collab.email === email 
        ? { ...collab, role: newRole }
        : collab
    ));
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCollaborator();
    }
  };
  
  const handleInputChange = (e) => {
    setEmailInput(e.target.value);
    setInputError('');
  };
  
  // Generate avatar color based on email
  const getAvatarColor = (email) => {
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500',
      'bg-yellow-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
    ];
    const index = email.charCodeAt(0) % colors.length;
    return colors[index];
  };
  
  return (
    <div className={cn('space-y-4', className)} {...props}>
      <div className="space-y-3">
        <div className="flex gap-2">
          <div className="flex-1">
            <input
              type="email"
              value={emailInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter email address..."
              className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600/50 focus:outline-none transition-colors duration-200"
              disabled={value.length >= maxCollaborators}
            />
          </div>
          
          <div className="relative">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="appearance-none bg-zinc-900/60 border border-zinc-800 rounded-xl px-3 py-2 pr-8 text-sm text-zinc-100 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600/50 focus:outline-none transition-colors duration-200 cursor-pointer"
            >
              {roles.map(role => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
          </div>
          
          <button
            type="button"
            onClick={addCollaborator}
            disabled={!emailInput.trim() || value.length >= maxCollaborators}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Add
          </button>
        </div>
        
        {(inputError || error) && (
          <p className="text-sm text-red-400" role="alert">
            {inputError || error}
          </p>
        )}
      </div>
      
      {value.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-zinc-300">
            Collaborators ({value.length})
          </h4>
          
          <div className="space-y-2">
            {value.map((collaborator) => (
              <div
                key={collaborator.email}
                className="flex items-center justify-between p-3 bg-zinc-900/60 border border-zinc-800 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium',
                    getAvatarColor(collaborator.email)
                  )}>
                    {collaborator.email.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm text-zinc-300">{collaborator.email}</p>
                    <p className="text-xs text-zinc-500">
                      {roles.find(r => r.value === collaborator.role)?.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <select
                    value={collaborator.role}
                    onChange={(e) => updateRole(collaborator.email, e.target.value)}
                    className="text-xs bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1 text-zinc-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    {roles.map(role => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                  
                  <button
                    type="button"
                    onClick={() => removeCollaborator(collaborator.email)}
                    className="text-zinc-400 hover:text-red-400 transition-colors"
                    aria-label={`Remove ${collaborator.email}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-xs text-zinc-500">
            {maxCollaborators - value.length} more collaborators can be added
          </p>
        </div>
      )}
      
      {value.length === 0 && (
        <div className="text-center py-6 text-zinc-500">
          <Mail className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No collaborators added yet</p>
          <p className="text-xs">Add email addresses to collaborate on this paste</p>
        </div>
      )}
    </div>
  );
};

export default CollaboratorPicker;