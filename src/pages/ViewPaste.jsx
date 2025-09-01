import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPasteById, updatePaste, deletePaste } from '@/lib/demoData';
import { cn, formatTimeAgo } from '@/lib/utils';
import { Copy, Download, Share, Edit, Trash, Lock, Eye, Globe, EyeOff } from 'lucide-react';
import SyntaxHighlighter from '@/components/SyntaxHighlighter';
import Box from '@/components/Box';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useToast } from '@/context/ToastContext';

const ViewPaste = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast: showToast } = useToast();

  const [paste, setPaste] = useState(null);
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const foundPaste = getPasteById(id);
    if (foundPaste) {
      setPaste(foundPaste);
      if (!foundPaste.passwordProtected) {
        setUnlocked(true);
      }
    } else {
      navigate('/404');
    }
  }, [id, navigate]);

  useEffect(() => {
    if (paste && paste.burnAfterReading && unlocked) {
      showToast('This paste will be deleted after this view.', 'warning');
      // Simulate deletion after a short delay
      setTimeout(() => {
        deletePaste(paste.id);
        showToast('Paste deleted.', 'info');
        navigate('/dashboard');
      }, 3000);
    }
  }, [paste, unlocked, showToast, navigate]);

  const handleUnlock = () => {
    if (password === 'demo') { // Hardcoded password for demo
      setUnlocked(true);
      showToast('Paste unlocked!', 'success');
      // Increment view count for demo
      if (paste) {
        updatePaste(paste.id, { views: paste.views + 1 });
      }
    } else {
      showToast('Incorrect password.', 'error');
    }
  };

  const handleCopy = async () => {
    if (paste?.content) {
      await navigator.clipboard.writeText(paste.content);
      showToast('Content copied to clipboard!', 'success');
    }
  };

  const handleDownload = () => {
    if (paste?.content) {
      const blob = new Blob([paste.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${paste.title || 'paste'}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('File download initiated!', 'success');
    }
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/p/${paste?.id}`;
    navigator.clipboard.writeText(shareUrl);
    showToast('Share link copied to clipboard!', 'success');
  };

  if (!paste) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-zinc-400">Loading paste...</p>
      </div>
    );
  }

  const visibilityConfig = {
    public: { icon: Globe, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    private: { icon: Lock, color: 'text-red-400', bg: 'bg-red-500/10' },
    unlisted: { icon: EyeOff, color: 'text-amber-400', bg: 'bg-amber-500/10' }
  };
  const config = visibilityConfig[paste.visibility] || visibilityConfig.public;
  const VisibilityIcon = config.icon;

  const getExpirationLabel = (expires) => {
    if (expires === 'permanent') return 'Permanent';
    const durationMap = {
      '1h': '1 hour',
      '1d': '1 day',
      '7d': '7 days',
      '30d': '30 days',
    };
    return `${durationMap[expires]} remaining`;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {paste.passwordProtected && !unlocked ? (
        <Box className="max-w-md mx-auto text-center p-8">
          <Lock className="w-16 h-16 text-zinc-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Password Protected</h2>
          <p className="text-zinc-400 mb-6">This paste is encrypted and requires a password to view.</p>
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => { if (e.key === 'Enter') handleUnlock(); }}
            className="mb-4"
          />
          <Button onClick={handleUnlock} className="w-full">Unlock Paste</Button>
          <div className="flex items-center justify-center mt-4 text-sm text-zinc-500">
            <Lock className="w-4 h-4 mr-2" />
            End-to-end encrypted
          </div>
          <p className="text-xs text-zinc-600 mt-2">Paste ID: {paste.id}</p>
        </Box>
      ) : (
        <>
          <Box className="mb-6">
            <Box.Header>
              <h1 className="text-2xl font-bold text-white">{paste.title}</h1>
              <div className="flex items-center space-x-2">
                <Button variant="secondary" size="sm" onClick={handleCopy}><Copy className="w-4 h-4" /> Copy</Button>
                <Button variant="secondary" size="sm" onClick={handleDownload}><Download className="w-4 h-4" /> Download</Button>
                <Button variant="secondary" size="sm" onClick={handleShare}><Share className="w-4 h-4" /> Share</Button>
                {/* Add Edit/Delete buttons if user is owner */}
                <Button variant="secondary" size="sm"><Edit className="w-4 h-4" /> Edit</Button>
                <Button variant="danger" size="sm"><Trash className="w-4 h-4" /> Delete</Button>
              </div>
            </Box.Header>
            <Box.Body>
              <div className="flex items-center space-x-4 mb-4">
                <Badge variant="outline" size="sm" className={cn('flex items-center space-x-1', config.bg, config.color)}>
                  <VisibilityIcon className="w-3 h-3" />
                  <span>{paste.visibility}</span>
                </Badge>
                {paste.folderId && (
                  <Badge variant="outline" size="sm">Folder: {paste.folderId}</Badge>
                )}
                <Badge variant="outline" size="sm">Created: {formatTimeAgo(paste.createdAt)}</Badge>
                <Badge variant="outline" size="sm">Expires: {getExpirationLabel(paste.expires)}</Badge>
                {paste.burnAfterReading && (
                  <Badge variant="warning" size="sm">Burn after reading</Badge>
                )}
              </div>
              <SyntaxHighlighter code={paste.content} language={paste.language} />
            </Box.Body>
          </Box>

          {paste.attachments && paste.attachments.length > 0 && (
            <Box className="mb-6">
              <Box.Header>
                <h2 className="text-xl font-bold text-white">Attachments</h2>
              </Box.Header>
              <Box.Body>
                <ul className="space-y-2">
                  {paste.attachments.map(att => (
                    <li key={att.id} className="flex items-center justify-between bg-zinc-800/50 p-3 rounded-lg">
                      <span className="text-zinc-300">{att.filename} ({att.sizeKB}KB)</span>
                      <Button variant="secondary" size="sm">Download</Button>
                    </li>
                  ))}
                </ul>
              </Box.Body>
            </Box>
          )}

          {/* Comments Section Placeholder */}
          <Box>
            <Box.Header>
              <h2 className="text-xl font-bold text-white">Comments</h2>
            </Box.Header>
            <Box.Body>
              <p className="text-zinc-400">Comments section coming soon...</p>
            </Box.Body>
          </Box>
        </>
      )}
    </div>
  );
};

export default ViewPaste;