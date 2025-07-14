import React, { useState, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileUploadZone = ({ onFilesUpload, isProcessing }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files).filter(
      file => file.type === 'application/pdf'
    );
    
    if (files.length > 0) {
      handleFileUpload(files);
    }
  }, []);

  const handleFileSelect = useCallback((e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      handleFileUpload(files);
    }
  }, []);

  const handleFileUpload = (files) => {
    files.forEach((file, index) => {
      const fileId = `${file.name}-${Date.now()}-${index}`;
      
      // Simulate upload progress
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
      
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const currentProgress = prev[fileId] || 0;
          if (currentProgress >= 100) {
            clearInterval(interval);
            return prev;
          }
          return { ...prev, [fileId]: currentProgress + 10 };
        });
      }, 200);

      // Simulate file processing after upload
      setTimeout(() => {
        onFilesUpload([{
          id: fileId,
          name: file.name,
          size: file.size,
          uploadDate: new Date(),
          status: 'processing',
          file: file
        }]);
      }, 2000);
    });
  };

  return (
    <div className="bg-surface rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition-colors duration-200 hover:border-primary">
      <div
        className={`relative ${isDragOver ? 'border-primary bg-primary bg-opacity-5' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
            <Icon name="Upload" size={32} color="var(--color-primary)" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-onSurface">
              Upload PDF Files
            </h3>
            <p className="text-sm text-gray-600">
              Drag and drop your PDF files here or click to browse
            </p>
            <p className="text-xs text-gray-500">
              Supports multiple files • Maximum 50MB per file
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="primary"
              iconName="FolderOpen"
              iconPosition="left"
              onClick={() => document.getElementById('file-input').click()}
              disabled={isProcessing}
            >
              Browse Files
            </Button>
            <Button
              variant="outline"
              iconName="FileText"
              iconPosition="left"
              disabled={isProcessing}
            >
              Sample Format
            </Button>
          </div>

          <input
            id="file-input"
            type="file"
            multiple
            accept=".pdf"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {Object.keys(uploadProgress).length > 0 && (
          <div className="mt-6 space-y-3">
            <h4 className="text-sm font-medium text-onSurface">Uploading Files</h4>
            {Object.entries(uploadProgress).map(([fileId, progress]) => (
              <div key={fileId} className="bg-gray-100 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700 truncate">
                    {fileId.split('-')[0]}
                  </span>
                  <span className="text-xs text-gray-500">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadZone;