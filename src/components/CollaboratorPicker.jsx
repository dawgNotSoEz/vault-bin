import React, { useState } from 'react';
import { X, Search, UserPlus } from 'lucide-react';
import { cn } from '../../lib/utils';
import Input from './Input';
import Button from './Button';
import Box from './Box';

const CollaboratorPicker = ({
  selectedCollaborators = [],
  onCollaboratorsChange,
  availableUsers = [],
  className,
  ...props
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = availableUsers.filter(user =>
    !selectedCollaborators.some(collab => collab.id === user.id) &&
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const addCollaborator = (user) => {
    const newCollaborators = [...selectedCollaborators, user];
    onCollaboratorsChange?.(newCollaborators);
    setSearchTerm('');
  };

  const removeCollaborator = (userId) => {
    const newCollaborators = selectedCollaborators.filter(collab => collab.id !== userId);
    onCollaboratorsChange?.(newCollaborators);
  };

  return (
    <Box className={cn('space-y-4', className)} {...props}>
      <Input
        placeholder="Search users by name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        icon={Search}
      />

      {searchTerm && filteredUsers.length > 0 && (
        <div className="border border-zinc-700 rounded-lg max-h-48 overflow-y-auto">
          {filteredUsers.map(user => (
            <div key={user.id} className="flex items-center justify-between p-3 hover:bg-zinc-800/50 cursor-pointer">
              <div className="flex items-center space-x-3">
                <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full" />
                <div>
                  <div className="text-zinc-300 font-medium">{user.name}</div>
                  <div className="text-zinc-500 text-sm">{user.email}</div>
                </div>
              </div>
              <Button size="sm" onClick={() => addCollaborator(user)}>
                <UserPlus className="w-4 h-4" /> Add
              </Button>
            </div>
          ))}
        </div>
      )}

      {selectedCollaborators.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-zinc-300 text-sm font-medium">Selected Collaborators:</h3>
          {selectedCollaborators.map(user => (
            <div key={user.id} className="flex items-center justify-between p-3 bg-zinc-800/50 border border-zinc-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full" />
                <div>
                  <div className="text-zinc-300 font-medium">{user.name}</div>
                  <div className="text-zinc-500 text-sm">{user.email}</div>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => removeCollaborator(user.id)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </Box>
  );
};

export default CollaboratorPicker;
