import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FileUploadZone from './components/FileUploadZone';
import FileManagementPanel from './components/FileManagementPanel';
import PDFViewer from './components/PDFViewer';
import ProcessingWorkflow from './components/ProcessingWorkflow';

const PDFUploadAndProcessing = () => {
  const [files, setFiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock initial files for demonstration
  useEffect(() => {
    const mockFiles = [
      {
        id: 'sample-1',
        name: 'Biology_Chapter5_Assessment.pdf',
        size: 2456789,
        uploadDate: new Date(Date.now() - 3600000),
        status: 'completed',
        questionsExtracted: 15
      },
      {
        id: 'sample-2',
        name: 'Math_Algebra_Quiz.pdf',
        size: 1234567,
        uploadDate: new Date(Date.now() - 7200000),
        status: 'processing'
      }
    ];
    setFiles(mockFiles);
    setSelectedFileId('sample-1');
  }, []);

  const selectedFile = files.find(file => file.id === selectedFileId);

  const handleFilesUpload = (newFiles) => {
    setFiles(prev => [...prev, ...newFiles]);
    if (newFiles.length > 0) {
      setSelectedFileId(newFiles[0].id);
    }
  };

  const handleFileSelect = (file) => {
    setSelectedFileId(file.id);
  };

  const handleFileDelete = (fileId) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
    if (selectedFileId === fileId) {
      setSelectedFileId(files.length > 1 ? files.find(f => f.id !== fileId)?.id : null);
    }
  };

  const handleFileProcess = (file) => {
    setFiles(prev => prev.map(f => 
      f.id === file.id ? { ...f, status: 'processing' } : f
    ));
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setFiles(prev => prev.map(f => 
        f.id === file.id ? { 
          ...f, 
          status: 'completed',
          questionsExtracted: Math.floor(Math.random() * 20) + 5
        } : f
      ));
      setIsProcessing(false);
    }, 5000);
  };

  const handleProcessingComplete = (fileId) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { 
        ...f, 
        status: 'completed',
        questionsExtracted: Math.floor(Math.random() * 20) + 5
      } : f
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/teacher-dashboard" className="text-gray-500 hover:text-gray-700">
                <Icon name="ArrowLeft" size={20} />
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-onSurface">
                  PDF Upload & Processing
                </h1>
                <p className="text-sm text-gray-600">
                  Transform educational materials into interactive assessments
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" iconName="HelpCircle" size="sm">
                Help
              </Button>
              <Button variant="primary" iconName="Settings" size="sm">
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 py-3 text-sm">
            <Link to="/teacher-dashboard" className="text-gray-500 hover:text-gray-700">
              Dashboard
            </Link>
            <Icon name="ChevronRight" size={16} className="text-gray-400" />
            <span className="text-gray-900">PDF Processing</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Upload Zone - Show when no files or on mobile */}
        {files.length === 0 && (
          <div className="mb-6">
            <FileUploadZone 
              onFilesUpload={handleFilesUpload}
              isProcessing={isProcessing}
            />
          </div>
        )}

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel - File Management */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="space-y-4">
              {/* Quick Upload Button for when files exist */}
              {files.length > 0 && (
                <div className="lg:hidden">
                  <Button
                    variant="primary"
                    iconName="Plus"
                    fullWidth
                    onClick={() => document.getElementById('file-input').click()}
                  >
                    Upload More Files
                  </Button>
                </div>
              )}
              
              <FileManagementPanel
                files={files}
                onFileSelect={handleFileSelect}
                selectedFileId={selectedFileId}
                onFileDelete={handleFileDelete}
                onFileProcess={handleFileProcess}
              />
              
              {/* Processing Workflow - Desktop */}
              <div className="hidden lg:block">
                <ProcessingWorkflow
                  selectedFile={selectedFile}
                  onProcessingComplete={handleProcessingComplete}
                />
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="space-y-6">
              {/* Quick Upload for Desktop */}
              {files.length > 0 && (
                <div className="hidden lg:block">
                  <FileUploadZone 
                    onFilesUpload={handleFilesUpload}
                    isProcessing={isProcessing}
                  />
                </div>
              )}

              {/* PDF Viewer */}
              <PDFViewer
                selectedFile={selectedFile}
                extractedContent={selectedFile?.extractedContent}
                onContentEdit={() => {}}
                onApproveQuestions={() => {}}
              />

              {/* Processing Workflow - Mobile/Tablet */}
              <div className="lg:hidden">
                <ProcessingWorkflow
                  selectedFile={selectedFile}
                  onProcessingComplete={handleProcessingComplete}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Footer */}
        {selectedFile && selectedFile.status === 'completed' && (
          <div className="mt-8 bg-surface border border-gray-200 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
              <div>
                <h3 className="text-sm font-medium text-onSurface">
                  Ready to create tests from extracted content?
                </h3>
                <p className="text-xs text-gray-600">
                  {selectedFile.questionsExtracted || 0} questions available for test creation
                </p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" iconName="Eye">
                  Preview Questions
                </Button>
                <Link to="/test-creation-and-management">
                  <Button variant="primary" iconName="Plus">
                    Create Test
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hidden file input for additional uploads */}
      <input
        id="file-input"
        type="file"
        multiple
        accept=".pdf"
        onChange={(e) => {
          const newFiles = Array.from(e.target.files).map((file, index) => ({
            id: `${file.name}-${Date.now()}-${index}`,
            name: file.name,
            size: file.size,
            uploadDate: new Date(),
            status: 'uploaded',
            file: file
          }));
          handleFilesUpload(newFiles);
          e.target.value = '';
        }}
        className="hidden"
      />
    </div>
  );
};

export default PDFUploadAndProcessing;