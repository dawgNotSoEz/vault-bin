import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import {
  Users,
  Copy,
  Eye,
  Edit,
  UserMinus,
  Shield,
  Clock,
  RefreshCw,
  Mail,
  Plus
} from 'lucide-react';
import { toast } from 'sonner';

interface Collaborator {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'owner' | 'editor' | 'viewer';
  joinedAt: Date;
}

interface InviteCollaborateModalProps {
  isOpen: boolean;
  onClose: () => void;
  pasteId: string;
  currentUser: string;
}

export function InviteCollaborateModal({ 
  isOpen, 
  onClose, 
  pasteId, 
  currentUser 
}: InviteCollaborateModalProps) {
  const [inviteEmail, setInviteEmail] = useState('');
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    {
      id: '1',
      name: 'Sarah Connor',
      email: 'sarah.connor@example.com',
      role: 'editor',
      joinedAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    },
    {
      id: '2',
      name: 'Mike Johnson',
      email: 'mike.j@example.com',
      role: 'viewer',
      joinedAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
    }
  ]);

  const generateShareLink = (type: 'edit' | 'view') => {
    const baseUrl = window.location.origin;
    const token = Math.random().toString(36).substring(2, 15);
    return `${baseUrl}/paste/${pasteId}?invite=${token}&role=${type}`;
  };

  const copyShareLink = (type: 'edit' | 'view') => {
    const link = generateShareLink(type);
    navigator.clipboard.writeText(link);
    toast.success(`${type === 'edit' ? 'Editor' : 'Viewer'} link copied to clipboard`);
  };

  const handleInviteByEmail = () => {
    if (!inviteEmail) return;
    
    // In real app, this would send an email invitation
    toast.success(`Invitation sent to ${inviteEmail}`);
    setInviteEmail('');
  };

  const handleRemoveCollaborator = (collaboratorId: string) => {
    setCollaborators(prev => prev.filter(c => c.id !== collaboratorId));
    toast.success('Collaborator removed');
  };

  const revokeAllAccess = () => {
    // In real app, this would invalidate all current invite links
    toast.success('All access links revoked. New links generated.');
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-primary text-primary-foreground';
      case 'editor': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'viewer': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Collaborate & Share
          </DialogTitle>
          <DialogDescription>
            Invite others to view or edit this paste, or share direct links.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Collaborators */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label>Current Collaborators</Label>
              <Badge variant="outline" className="text-xs">
                {collaborators.length + 1} members
              </Badge>
            </div>
            
            <ScrollArea className="max-h-40">
              <div className="space-y-2">
                {/* Current user */}
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8 bg-primary text-primary-foreground">
                      {currentUser[0]?.toUpperCase()}
                    </Avatar>
                    <div>
                      <div className="font-medium">{currentUser}</div>
                      <div className="text-xs text-muted-foreground">You</div>
                    </div>
                  </div>
                  <Badge className={getRoleColor('owner')}>Owner</Badge>
                </div>
                
                {/* Other collaborators */}
                {collaborators.map(collaborator => (
                  <div key={collaborator.id} className="flex items-center justify-between p-3 bg-card rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8 bg-muted text-muted-foreground">
                        {collaborator.name[0]?.toUpperCase()}
                      </Avatar>
                      <div>
                        <div className="font-medium">{collaborator.name}</div>
                        <div className="text-xs text-muted-foreground">{collaborator.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getRoleColor(collaborator.role)}>{collaborator.role}</Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveCollaborator(collaborator.id)}
                        className="h-8 w-8"
                      >
                        <UserMinus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <Separator />

          {/* Invite by Email */}
          <div>
            <Label className="mb-3 block">Invite by Email</Label>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder="colleague@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleInviteByEmail()}
                />
              </div>
              <Button onClick={handleInviteByEmail} disabled={!inviteEmail}>
                <Mail className="w-4 h-4 mr-2" />
                Send Invite
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              They'll receive an email with instructions to access this paste.
            </p>
          </div>

          <Separator />

          {/* Share Links */}
          <div className="space-y-4">
            <Label>Share Links</Label>
            
            {/* Editor Link */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Edit className="w-4 h-4 text-blue-600" />
                <span className="font-medium">Editor Access</span>
                <Badge variant="outline" className="text-xs">Full Edit</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Anyone with this link can view and edit this paste.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => copyShareLink('edit')}>
                  <Copy className="w-3 h-3 mr-2" />
                  Copy Editor Link
                </Button>
              </div>
            </div>

            {/* Viewer Link */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4 text-green-600" />
                <span className="font-medium">Viewer Access</span>
                <Badge variant="outline" className="text-xs">Read Only</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Anyone with this link can view this paste but cannot edit it.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => copyShareLink('view')}>
                  <Copy className="w-3 h-3 mr-2" />
                  Copy Viewer Link
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Security Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>Links expire in 7 days</span>
            </div>
            <Button variant="outline" size="sm" onClick={revokeAllAccess}>
              <RefreshCw className="w-3 h-3 mr-2" />
              Revoke All Access
            </Button>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}