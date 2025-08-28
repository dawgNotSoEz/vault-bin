import React, { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Shield, Lock, Clock, FileText, Code2, Upload, Copy, Share2 } from 'lucide-react';
import { Progress } from './ui/progress';

interface EditorProps {
  onCreatePaste: (content: string, options: PasteOptions) => void;
}

interface PasteOptions {
  expiration: string;
  password?: string;
  format: string;
  burnAfterReading: boolean;
}

const languageOptions = [
  { value: 'plaintext', label: 'Plain Text' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'rust', label: 'Rust' },
  { value: 'go', label: 'Go' },
  { value: 'json', label: 'JSON' },
  { value: 'yaml', label: 'YAML' },
  { value: 'sql', label: 'SQL' },
  { value: 'bash', label: 'Bash' },
];

const expirationOptions = [
  { value: 'burn', label: 'Burn after reading' },
  { value: '10m', label: '10 minutes' },
  { value: '1h', label: '1 hour' },
  { value: '1d', label: '1 day' },
  { value: '1w', label: '1 week' },
  { value: '1m', label: '1 month' },
  { value: 'never', label: 'Never' },
];

export function Editor({ onCreatePaste }: EditorProps) {
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const [expiration, setExpiration] = useState('1d');
  const [format, setFormat] = useState('plaintext');
  const [burnAfterReading, setBurnAfterReading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getPasswordStrength = (password: string): number => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score += 25;
    if (password.length >= 12) score += 25;
    if (/[A-Z]/.test(password)) score += 15;
    if (/[a-z]/.test(password)) score += 15;
    if (/[0-9]/.test(password)) score += 10;
    if (/[^A-Za-z0-9]/.test(password)) score += 10;
    return Math.min(score, 100);
  };

  const passwordStrength = getPasswordStrength(password);
  const passwordStrengthColor = passwordStrength < 40 ? 'bg-destructive' : 
                                 passwordStrength < 70 ? 'bg-yellow-500' : 'bg-green-500';

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleCreate = () => {
    if (!content.trim() && files.length === 0) return;
    
    const options: PasteOptions = {
      expiration: burnAfterReading ? 'burn' : expiration,
      password: password || undefined,
      format,
      burnAfterReading,
    };
    
    onCreatePaste(content, options);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2 mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Shield className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">VaultBin</h1>
        </div>
        <p className="text-muted-foreground">
          Zero-knowledge, privacy-first secure sharing for text, code, and files
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Lock className="w-4 h-4" />
          <span>End-to-end encrypted</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-3 space-y-4">
          <div className="relative">
            <Textarea
              placeholder="Paste your text, code, or start typing..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[400px] resize-none font-mono text-sm bg-card border-border focus:ring-1 focus:ring-ring"
              style={{ fontFamily: 'JetBrains Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace' }}
            />
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
              {content.length} characters
            </div>
          </div>

          {/* File Upload Area */}
          <Card 
            className={`border-2 border-dashed transition-colors ${
              isDragging ? 'border-primary bg-primary/5' : 'border-border'
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
          >
            <div className="p-6 text-center">
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Drop files here or{' '}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-primary hover:underline"
                >
                  browse to upload
                </button>
              </p>
              <p className="text-xs text-muted-foreground">
                Maximum 10MB per file
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </Card>

          {/* Attached Files */}
          {files.length > 0 && (
            <div className="space-y-2">
              <Label>Attached Files</Label>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm">{file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-xs text-destructive hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Options Panel */}
        <div className="space-y-6">
          <Card className="p-4 space-y-4">
            <h3 className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Expiration
            </h3>
            <Select value={expiration} onValueChange={setExpiration} disabled={burnAfterReading}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {expirationOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="burn-after-reading"
                checked={burnAfterReading}
                onCheckedChange={setBurnAfterReading}
              />
              <Label htmlFor="burn-after-reading" className="text-sm">
                Burn after reading
              </Label>
            </div>
          </Card>

          <Card className="p-4 space-y-4">
            <h3 className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Password Protection
            </h3>
            <Input
              type="password"
              placeholder="Optional password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Strength</span>
                  <span>{passwordStrength}%</span>
                </div>
                <Progress 
                  value={passwordStrength} 
                  className="h-1"
                />
              </div>
            )}
          </Card>

          <Card className="p-4 space-y-4">
            <h3 className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Format
            </h3>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Card>

          <Button 
            onClick={handleCreate}
            className="w-full h-12"
            disabled={!content.trim() && files.length === 0}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Create Secure Link
          </Button>
        </div>
      </div>
    </div>
  );
}