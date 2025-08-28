import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Alert, AlertDescription } from './ui/alert';
import { Card } from './ui/card';
import { Copy, Check, ExternalLink, Eye, EyeOff, AlertTriangle, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface LinkShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  pasteId: string;
  hasPassword: boolean;
  expiration: string;
  burnAfterReading: boolean;
}

export function LinkShareModal({ 
  isOpen, 
  onClose, 
  pasteId, 
  hasPassword, 
  expiration,
  burnAfterReading 
}: LinkShareModalProps) {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://vaultbin.example.com';
  const fullLink = `${baseUrl}/paste/${pasteId}`;
  const readOnlyLink = `${baseUrl}/view/${pasteId}`;

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLink(text);
      toast.success(`${type} copied to clipboard`);
      setTimeout(() => setCopiedLink(null), 2000);
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const getExpirationText = () => {
    if (burnAfterReading) return 'Burns after first read';
    switch (expiration) {
      case '10m': return 'Expires in 10 minutes';
      case '1h': return 'Expires in 1 hour';
      case '1d': return 'Expires in 1 day';
      case '1w': return 'Expires in 1 week';
      case '1m': return 'Expires in 1 month';
      case 'never': return 'Never expires';
      default: return 'Expiration set';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Secure Link Created
          </DialogTitle>
          <DialogDescription>
            Your encrypted paste is ready to share. Save these links as we cannot recover them for you.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Warning Alert */}
          <Alert className="border-yellow-500/20 bg-yellow-500/10">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <AlertDescription className="text-yellow-700 dark:text-yellow-300">
              <strong>Important:</strong> Save this link now. We cannot recover it for you due to zero-knowledge encryption.
            </AlertDescription>
          </Alert>

          {/* Paste Info */}
          <Card className="p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Status:</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Encrypted & Ready</span>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Expiration:</span>
                <div className="mt-1">{getExpirationText()}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Protection:</span>
                <div className="flex items-center gap-2 mt-1">
                  {hasPassword ? (
                    <>
                      <EyeOff className="w-4 h-4" />
                      <span>Password Protected</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      <span>Link Access</span>
                    </>
                  )}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">ID:</span>
                <div className="mt-1 font-mono text-xs">{pasteId}</div>
              </div>
            </div>
          </Card>

          {/* Full Access Link */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Access Link</label>
            <div className="flex gap-2">
              <Input
                value={fullLink}
                readOnly
                className="font-mono text-sm"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(fullLink, 'Link')}
                className="shrink-0"
              >
                {copiedLink === fullLink ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Allows viewing and editing (if not password protected)
            </p>
          </div>

          {/* Read-Only Link */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Read-Only Link</label>
            <div className="flex gap-2">
              <Input
                value={readOnlyLink}
                readOnly
                className="font-mono text-sm"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(readOnlyLink, 'Read-only link')}
                className="shrink-0"
              >
                {copiedLink === readOnlyLink ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              View-only access, cannot edit or clone
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={() => copyToClipboard(fullLink, 'Link')}
              className="flex-1"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Link
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open(fullLink, '_blank')}
              className="flex-1"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open Link
            </Button>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              Links are encrypted and self-destruct based on your settings
            </p>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}