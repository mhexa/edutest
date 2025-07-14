import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcessingWorkflow = ({ selectedFile, onProcessingComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const processingSteps = [
    {
      id: 'upload',
      title: 'File Upload',
      description: 'PDF file uploaded successfully',
      icon: 'Upload',
      status: 'completed'
    },
    {
      id: 'analysis',
      title: 'Content Analysis',
      description: 'Analyzing PDF structure and content',
      icon: 'Search',
      status: selectedFile?.status === 'processing' ? 'active' : selectedFile?.status === 'completed' ? 'completed' : 'pending'
    },
    {
      id: 'extraction',
      title: 'Question Extraction',
      description: 'Identifying and extracting questions',
      icon: 'FileText',
      status: selectedFile?.status === 'completed' ? 'completed' : 'pending'
    },
    {
      id: 'validation',
      title: 'Content Validation',
      description: 'Validating extracted content quality',
      icon: 'CheckCircle',
      status: selectedFile?.status === 'completed' ? 'completed' : 'pending'
    },
    {
      id: 'review',
      title: 'Manual Review',
      description: 'Ready for teacher review and approval',
      icon: 'Eye',
      status: selectedFile?.status === 'completed' ? 'active' : 'pending'
    }
  ];

  useEffect(() => {
    if (selectedFile?.status === 'processing') {
      setIsProcessing(true);
      // Simulate processing steps
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < 3) {
            return prev + 1;
          } else {
            clearInterval(interval);
            setIsProcessing(false);
            if (onProcessingComplete) {
              onProcessingComplete(selectedFile.id);
            }
            return prev;
          }
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [selectedFile, onProcessingComplete]);

  const getStepStatus = (step, index) => {
    if (step.status === 'completed') return 'completed';
    if (step.status === 'active' || (isProcessing && index === currentStep)) return 'active';
    return 'pending';
  };

  const getStepIcon = (step, status) => {
    if (status === 'completed') return 'CheckCircle';
    if (status === 'active') return step.icon;
    return step.icon;
  };

  const getStepColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100 border-green-200';
      case 'active': return 'text-primary bg-primary bg-opacity-10 border-primary';
      case 'pending': return 'text-gray-400 bg-gray-50 border-gray-200';
      default: return 'text-gray-400 bg-gray-50 border-gray-200';
    }
  };

  const getConnectorColor = (status) => {
    return status === 'completed' ? 'bg-green-300' : 'bg-gray-200';
  };

  if (!selectedFile) {
    return (
      <div className="bg-surface rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center">
          <Icon name="Workflow" size={48} className="text-gray-300 mb-4 mx-auto" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">Processing Workflow</h3>
          <p className="text-sm text-gray-500">
            Select a file to view its processing status
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-onSurface mb-2">
          Processing Workflow
        </h3>
        <p className="text-sm text-gray-600">
          Track the automated processing of your PDF file
        </p>
      </div>

      {/* Processing Steps */}
      <div className="space-y-4">
        {processingSteps.map((step, index) => {
          const status = getStepStatus(step, index);
          const isLast = index === processingSteps.length - 1;

          return (
            <div key={step.id} className="relative">
              <div className="flex items-start space-x-4">
                {/* Step Icon */}
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${getStepColor(status)}`}>
                  <Icon 
                    name={getStepIcon(step, status)} 
                    size={20} 
                    className={status === 'active' && isProcessing ? 'animate-spin' : ''}
                  />
                </div>

                {/* Step Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-sm font-medium ${
                      status === 'completed' ? 'text-green-700' :
                      status === 'active' ? 'text-primary' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </h4>
                    {status === 'completed' && (
                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                        Complete
                      </span>
                    )}
                    {status === 'active' && (
                      <span className="text-xs text-primary bg-primary bg-opacity-10 px-2 py-1 rounded-full">
                        Processing...
                      </span>
                    )}
                  </div>
                  <p className={`text-xs mt-1 ${
                    status === 'completed' ? 'text-green-600' :
                    status === 'active' ? 'text-gray-700' : 'text-gray-400'
                  }`}>
                    {step.description}
                  </p>

                  {/* Progress Details */}
                  {status === 'active' && step.id === 'analysis' && (
                    <div className="mt-3 space-y-2">
                      <div className="text-xs text-gray-600">
                        Analyzing document structure...
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-primary h-1.5 rounded-full animate-pulse" style={{ width: '60%' }} />
                      </div>
                    </div>
                  )}

                  {status === 'active' && step.id === 'extraction' && (
                    <div className="mt-3 space-y-2">
                      <div className="text-xs text-gray-600">
                        Found 3 questions so far...
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-primary h-1.5 rounded-full animate-pulse" style={{ width: '80%' }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Connector Line */}
              {!isLast && (
                <div className={`absolute left-5 top-10 w-0.5 h-6 ${getConnectorColor(status)}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Processing Summary */}
      {selectedFile.status === 'completed' && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="CheckCircle" size={16} className="text-green-600" />
            <span className="text-sm font-medium text-green-800">
              Processing Complete
            </span>
          </div>
          <div className="text-xs text-green-700 space-y-1">
            <div>• 3 questions successfully extracted</div>
            <div>• 2 subjects identified (Biology, Environmental Science)</div>
            <div>• Average confidence: 92%</div>
            <div>• Ready for manual review</div>
          </div>
        </div>
      )}

      {/* Error State */}
      {selectedFile.status === 'error' && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertCircle" size={16} className="text-red-600" />
            <span className="text-sm font-medium text-red-800">
              Processing Failed
            </span>
          </div>
          <div className="text-xs text-red-700 mb-3">
            Unable to extract content from PDF. The file may be corrupted or contain unsupported formatting.
          </div>
          <Button variant="outline" size="sm" iconName="RefreshCw">
            Retry Processing
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProcessingWorkflow;