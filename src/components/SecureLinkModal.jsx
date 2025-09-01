import React, { useState } from 'react';
import { Icon } from './Icon';
import Modal from './Modal';
import Button from './Button';
import Input from './Input';
import { useToast } from '../context/ToastContext';

export const SecureLinkModal = ({ isOpen, onClose, paste }) => {
  const { success } = useToast();
  const [copiedField, setCopiedField] = useState(null);

  if (!paste) return null;

  const fullAccessLink = `${window.location.origin}/p/${paste.id}`;
  const readOnlyLink = `${window.location.origin}/demo/${paste.id}`;

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      success('Link copied to clipboard');
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getExpirationText = () => {
    if (paste.expires === 'permanent') return 'Never expires';
    if (paste.expires === '1h') return '1 hour';
    if (paste.expires === '1d') return '1 day';
    if (paste.expires === '7d') return '7 days';
    if (paste.expires === '30d') return '30 days';
    return paste.expires;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
            <Icon name="shield-check" size={24} className="text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Secure Link Created</h2>
            <p className="text-gray-400">Your content is encrypted and ready to share</p>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Icon name="alert-triangle" size={20} className="text-amber-400 mt-0.5" />
            <div>
              <h3 className="text-amber-400 font-semibold text-sm mb-1">Important</h3>
              <p className="text-amber-300/80 text-sm">
                This paste uses zero-knowledge encryption. If you lose the link, your data cannot be recovered.
              </p>
            </div>
          </div>
        </div>

        {/* Status Info */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Status</label>
            <div className="mt-1 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-white">Encrypted & Ready</span>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Protection</label>
            <div className="mt-1">
              <span className="text-sm text-white">
                {paste.passwordProtected ? 'Password Protected' : 'Link Access'}
              </span>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Expiration</label>
            <div className="mt-1">
              <span className="text-sm text-white">{getExpirationText()}</span>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="space-y-4 mb-8">
          {/* Full Access Link */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Access Link
            </label>
            <div className="flex gap-2">
              <Input
                value={fullAccessLink}
                readOnly
                className="flex-1 font-mono text-sm"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(fullAccessLink, 'full')}
                className="shrink-0"
              >
                {copiedField === 'full' ? (
                  <><Icon name="check" size={16} /> Copied</>
                ) : (
                  <><Icon name="copy" size={16} /> Copy</>
                )}
              </Button>
            </div>
          </div>

          {/* Read-Only Link */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Read-Only Link
            </label>
            <div className="flex gap-2">
              <Input
                value={readOnlyLink}
                readOnly
                className="flex-1 font-mono text-sm"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(readOnlyLink, 'readonly')}
                className="shrink-0"
              >
                {copiedField === 'readonly' ? (
                  <><Icon name="check" size={16} /> Copied</>
                ) : (
                  <><Icon name="copy" size={16} /> Copy</>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => window.open(fullAccessLink, '_blank')}
            className="gap-2"
          >
            <Icon name="external-link" size={16} />
            Open Link
          </Button>
          
          <Button onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SecureLinkModal;
