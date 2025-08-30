import React, { useState, useRef } from 'react';
import { Upload, X, File } from 'lucide-react';
import { allowedFileTypes, maxFileSize, maxTotalSize } from '../lib/data';
import { formatBytes, cn } from '../lib/utils';

const AttachmentDropzone = ({ 
  value = [], 
  onChange, 
  error,
  className,
  ...props 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef();
  
  const totalSize = value.reduce((sum, file) => sum + file.size, 0);
  
  const validateFile = (file) => {
    const extension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!allowedFileTypes.includes(extension)) {
      return `File type ${extension} not allowed`;
    }
    
    if (file.size > maxFileSize) {
      return `File size exceeds ${formatBytes(maxFileSize)} limit`;
    }
    
    if (totalSize + file.size > maxTotalSize) {
      return `Total size would exceed ${formatBytes(maxTotalSize)} limit`;
    }
    
    return null;
  };
  
  const addFiles = (newFiles) => {
    const validFiles = [];
    let errorMsg = '';
    
    for (const file of newFiles) {
      const error = validateFile(file);
      if (error) {
        errorMsg = error;
        break;
      }
      validFiles.push({
        name: file.name,
        size: file.size,
        type: file.type,
        file: file // Store the actual file object for upload
      });
    }
    
    if (errorMsg) {
      setUploadError(errorMsg);
      return;
    }
    
    onChange([...value, ...validFiles]);
    setUploadError('');
  };
  
  const removeFile = (index) => {
    onChange(value.filter((_, i) => i !== index));
    setUploadError('');
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    addFiles(files);
  };
  
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    addFiles(files);
    // Reset input to allow selecting the same file again
    e.target.value = '';
  };
  
  return (
    <div className={cn('space-y-4', className)} {...props}>
      <div
        className={cn(
          'border-2 border-dashed rounded-xl p-6 text-center transition-colors duration-200 cursor-pointer',
          isDragOver
            ? 'border-indigo-500 bg-indigo-500/10'
            : 'border-zinc-700 hover:border-zinc-600 bg-zinc-900/30'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={allowedFileTypes.join(',')}
          onChange={handleFileSelect}
          className="hidden"
          aria-label="Select files to attach"
        />
        
        <Upload className="h-8 w-8 text-zinc-400 mx-auto mb-3" />
        <div className="space-y-1">
          <p className="text-sm font-medium text-zinc-300">
            Drop files here or click to browse
          </p>
          <p className="text-xs text-zinc-500">
            Max {formatBytes(maxFileSize)} per file, {formatBytes(maxTotalSize)} total
          </p>
        </div>
      </div>
      
      {value.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-zinc-300">
            Attached Files ({value.length})
          </h4>
          <div className="space-y-2">
            {value.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-zinc-900/60 border border-zinc-800 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <File className="h-4 w-4 text-zinc-400" />
                  <div>
                    <p className="text-sm text-zinc-300 truncate max-w-48">
                      {file.name}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {formatBytes(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-zinc-400 hover:text-red-400 transition-colors"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between text-xs text-zinc-500">
            <span>Total: {formatBytes(totalSize)}</span>
            <span>{formatBytes(maxTotalSize - totalSize)} remaining</span>
          </div>
        </div>
      )}
      
      {(uploadError || error) && (
        <p className="text-sm text-red-400" role="alert">
          {uploadError || error}
        </p>
      )}
      
      <div className="text-xs text-zinc-500">
        <p>Supported formats: {allowedFileTypes.join(', ')}</p>
      </div>
    </div>
  );
};

export default AttachmentDropzone;