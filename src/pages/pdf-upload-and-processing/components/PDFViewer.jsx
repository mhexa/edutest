import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PDFViewer = ({ selectedFile, extractedContent, onContentEdit, onApproveQuestions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [viewMode, setViewMode] = useState('preview'); // 'preview' or 'extracted'

  if (!selectedFile) {
    return (
      <div className="bg-surface rounded-lg shadow-sm border border-gray-200 h-full flex items-center justify-center">
        <div className="text-center">
          <Icon name="FileText" size={64} className="text-gray-300 mb-4 mx-auto" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No File Selected</h3>
          <p className="text-sm text-gray-500">
            Select a PDF file from the left panel to view and process
          </p>
        </div>
      </div>
    );
  }

  const mockExtractedQuestions = [
    {
      id: 1,
      type: 'multiple-choice',
      question: `What is the primary function of mitochondria in a cell?\n\nA) Protein synthesis\nB) Energy production\nC) DNA replication\nD) Waste removal`,
      answer: 'B',
      difficulty: 'medium',
      subject: 'Biology',
      page: 1,
      confidence: 95
    },
    {
      id: 2,
      type: 'multiple-choice',
      question: `Which of the following is NOT a renewable energy source?\n\nA) Solar power\nB) Wind power\nC) Coal\nD) Hydroelectric power`,
      answer: 'C',
      difficulty: 'easy',
      subject: 'Environmental Science',
      page: 1,
      confidence: 98
    },
    {
      id: 3,
      type: 'short-answer',
      question: `Explain the process of photosynthesis in plants and its importance to the ecosystem.`,
      answer: `Photosynthesis is the process by which plants convert light energy into chemical energy, producing glucose and oxygen from carbon dioxide and water. This process is crucial for the ecosystem as it provides oxygen for respiration and forms the base of most food chains.`,
      difficulty: 'hard',
      subject: 'Biology',
      page: 2,
      confidence: 87
    }
  ];

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-surface rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-semibold text-onSurface truncate">
              {selectedFile.name}
            </h2>
            <p className="text-sm text-gray-500">
              Status: <span className="capitalize">{selectedFile.status}</span>
            </p>
          </div>
          
          {selectedFile.status === 'completed' && (
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'preview' ? 'primary' : 'outline'}
                size="sm"
                iconName="Eye"
                onClick={() => setViewMode('preview')}
              >
                Preview
              </Button>
              <Button
                variant={viewMode === 'extracted' ? 'primary' : 'outline'}
                size="sm"
                iconName="List"
                onClick={() => setViewMode('extracted')}
              >
                Extracted
              </Button>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" iconName="ZoomOut" onClick={handleZoomOut} />
            <span className="text-sm text-gray-600 min-w-[60px] text-center">
              {zoomLevel}%
            </span>
            <Button variant="ghost" size="sm" iconName="ZoomIn" onClick={handleZoomIn} />
          </div>

          {viewMode === 'preview' && (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" iconName="ChevronLeft" />
              <span className="text-sm text-gray-600">
                Page {currentPage} of 5
              </span>
              <Button variant="ghost" size="sm" iconName="ChevronRight" />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" iconName="Download" />
            <Button variant="ghost" size="sm" iconName="Share" />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {selectedFile.status === 'processing' ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Icon name="Loader" size={48} className="text-primary animate-spin mb-4 mx-auto" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">Processing PDF</h3>
              <p className="text-sm text-gray-500 mb-4">
                Extracting questions and analyzing content...
              </p>
              <div className="w-64 bg-gray-200 rounded-full h-2 mx-auto">
                <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '60%' }} />
              </div>
            </div>
          </div>
        ) : viewMode === 'preview' ? (
          <div className="h-full p-4 overflow-auto">
            <div 
              className="bg-white border border-gray-300 rounded-lg mx-auto shadow-lg"
              style={{ 
                width: `${(595 * zoomLevel) / 100}px`,
                height: `${(842 * zoomLevel) / 100}px`,
                minHeight: '600px'
              }}
            >
              <div className="p-8 h-full">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Biology Assessment - Chapter 5
                  </h1>
                  <p className="text-gray-600">Cell Structure and Function</p>
                </div>
                
                <div className="space-y-6">
                  <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400">
                    <h3 className="font-semibold text-gray-800 mb-2">Question 1:</h3>
                    <p className="text-gray-700 whitespace-pre-line">
                      What is the primary function of mitochondria in a cell?{'\n\n'}
                      A) Protein synthesis{'\n'}
                      B) Energy production{'\n'}
                      C) DNA replication{'\n'}
                      D) Waste removal
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 border-l-4 border-blue-400">
                    <h3 className="font-semibold text-gray-800 mb-2">Question 2:</h3>
                    <p className="text-gray-700 whitespace-pre-line">
                      Which of the following is NOT a renewable energy source?{'\n\n'}
                      A) Solar power{'\n'}
                      B) Wind power{'\n'}
                      C) Coal{'\n'}
                      D) Hydroelectric power
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full overflow-auto p-4">
            <div className="space-y-4">
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {mockExtractedQuestions.length}
                  </div>
                  <div className="text-sm text-blue-800">Questions Found</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">92%</div>
                  <div className="text-sm text-green-800">Avg Confidence</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">2</div>
                  <div className="text-sm text-yellow-800">Subjects</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">5</div>
                  <div className="text-sm text-purple-800">Pages</div>
                </div>
              </div>

              {/* Extracted Questions */}
              <div className="space-y-4">
                {mockExtractedQuestions.map((question, index) => (
                  <div key={question.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="bg-primary text-white text-sm font-medium px-2 py-1 rounded">
                          Q{index + 1}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                          {question.difficulty}
                        </span>
                        <span className="text-xs text-gray-500">
                          Page {question.page}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${getConfidenceColor(question.confidence)}`}>
                          {question.confidence}% confidence
                        </span>
                        <Button variant="ghost" size="xs" iconName="Edit" />
                        <Button variant="ghost" size="xs" iconName="Trash2" />
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                        {question.subject} • {question.type}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-gray-800 whitespace-pre-line">
                        {question.question}
                      </p>
                    </div>
                    
                    {question.answer && (
                      <div className="bg-green-50 border border-green-200 rounded p-3">
                        <span className="text-xs text-green-700 font-medium">ANSWER:</span>
                        <p className="text-green-800 mt-1 whitespace-pre-line">
                          {question.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <Button variant="outline" iconName="Edit">
                  Edit All
                </Button>
                <Button variant="primary" iconName="CheckCircle">
                  Approve Questions
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;