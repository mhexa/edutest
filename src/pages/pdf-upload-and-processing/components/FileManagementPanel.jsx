import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const FileManagementPanel = ({ files, onFileSelect, selectedFileId, onFileDelete, onFileProcess }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'uploaded': return 'text-blue-600 bg-blue-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'uploaded': return 'Clock';
      case 'processing': return 'Loader';
      case 'completed': return 'CheckCircle';
      case 'error': return 'AlertCircle';
      default: return 'File';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="bg-surface rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-onSurface">
            Uploaded Files
          </h2>
          <span className="text-sm text-gray-500">
            {files.length} file{files.length !== 1 ? 's' : ''}
          </span>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          />
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto">
        {filteredFiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Icon name="FileX" size={48} className="text-gray-300 mb-4" />
            <p className="text-gray-500 text-sm">
              {searchTerm ? 'No files match your search' : 'No files uploaded yet'}
            </p>
          </div>
        ) : (
          <div className="p-2 space-y-2">
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedFileId === file.id
                    ? 'border-primary bg-primary bg-opacity-5' :'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => onFileSelect(file)}
              >
                <div className="flex items-start space-x-3">
                  {/* File Thumbnail */}
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="FileText" size={20} color="#DC2626" />
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-onSurface truncate">
                      {file.name}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500">
                        {formatFileSize(file.size)}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">
                        {formatDate(file.uploadDate)}
                      </span>
                    </div>
                    
                    {/* Status Badge */}
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium mt-2 ${getStatusColor(file.status)}`}>
                      <Icon 
                        name={getStatusIcon(file.status)} 
                        size={12} 
                        className={file.status === 'processing' ? 'animate-spin' : ''}
                      />
                      <span className="capitalize">{file.status}</span>
                    </div>

                    {/* Questions Count */}
                    {file.questionsExtracted && (
                      <div className="text-xs text-gray-600 mt-1">
                        {file.questionsExtracted} questions extracted
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-1">
                    {file.status === 'uploaded' && (
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="Play"
                        onClick={(e) => {
                          e.stopPropagation();
                          onFileProcess(file);
                        }}
                      />
                    )}
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Trash2"
                      onClick={(e) => {
                        e.stopPropagation();
                        onFileDelete(file.id);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      {files.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="RefreshCw"
              fullWidth
            >
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              fullWidth
            >
              Export
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileManagementPanel;