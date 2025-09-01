import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const AttachmentDropzone = ({
  onFilesChange,
  maxSize = 10 * 1024 * 1024, // 10MB
  maxFiles = 5,
  className,
  ...props
}) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    setError(null);
    const newFiles = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));

    const updatedFiles = [...files, ...newFiles].slice(0, maxFiles);
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  }, [files, maxFiles, onFilesChange]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    maxSize,
    maxFiles,
    noClick: false,
    noKeyboard: false,
  });

  const removeFile = (fileName) => {
    const updatedFiles = files.filter(file => file.name !== fileName);
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  };

  useEffect(() => {
    if (fileRejections.length > 0) {
      const rejection = fileRejections[0];
      if (rejection.errors[0].code === 'file-too-large') {
        setError(`File is too large. Max size is ${maxSize / (1024 * 1024)}MB.`);
      } else if (rejection.errors[0].code === 'too-many-files') {
        setError(`Too many files. Max files is ${maxFiles}.`);
      } else {
        setError('File rejected. Please try again.');
      }
    }
  }, [fileRejections, maxSize, maxFiles]);

  return (
    <div className={cn('space-y-4', className)} {...props}>
      <div
        {...getRootProps()}
        className={cn(
          'flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl transition-colors duration-200',
          'cursor-pointer',
          isDragActive ? 'border-purple-500 bg-purple-500/10' : 'border-zinc-700 bg-zinc-800/50',
          error ? 'border-red-500' : '',
        )}
      >
        <input {...getInputProps()} />
        <UploadCloud className="w-10 h-10 text-zinc-400 mb-3" />
        <p className="text-zinc-300 text-center mb-1">
          {isDragActive ? 'Drop the files here ...' : 'Drag & drop files here, or click to select'}
        </p>
        <p className="text-zinc-500 text-sm">Max {maxSize / (1024 * 1024)}MB per file, up to {maxFiles} files</p>
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-zinc-300 text-sm font-medium">Attached Files:</h3>
          <ul className="space-y-2">
            {files.map(file => (
              <li key={file.name} className="flex items-center justify-between p-3 bg-zinc-800/50 border border-zinc-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-zinc-400" />
                  <span className="text-zinc-300 text-sm truncate">{file.name}</span>
                  <span className="text-zinc-500 text-xs">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                </div>
                <button
                  onClick={() => removeFile(file.name)}
                  className="p-1 rounded-full text-zinc-400 hover:bg-zinc-700/50 hover:text-white transition-colors"
                  aria-label="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AttachmentDropzone;
