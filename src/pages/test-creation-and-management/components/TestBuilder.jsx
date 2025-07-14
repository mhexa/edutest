import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TestBuilder = ({ selectedQuestions, onRemoveQuestion, onReorderQuestions, testConfig, onConfigChange }) => {
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedItem !== null && draggedItem !== dropIndex) {
      onReorderQuestions(draggedItem, dropIndex);
    }
    setDraggedItem(null);
  };

  const getTotalMarks = () => {
    return selectedQuestions.reduce((total, question) => total + (question.marks || 1), 0);
  };

  const getEstimatedDuration = () => {
    // Estimate 1.5 minutes per question
    return Math.ceil(selectedQuestions.length * 1.5);
  };

  return (
    <div className="bg-surface rounded-lg border border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-onSurface">Test Builder</h2>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Questions: {selectedQuestions.length}</span>
            <span>Total Marks: {getTotalMarks()}</span>
            <span>Est. Duration: {getEstimatedDuration()} min</span>
          </div>
        </div>

        {/* Test Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-onSurface mb-1">Test Title</label>
            <Input
              type="text"
              placeholder="Enter test title"
              value={testConfig.title}
              onChange={(e) => onConfigChange('title', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-onSurface mb-1">Duration (minutes)</label>
            <Input
              type="number"
              placeholder="60"
              value={testConfig.duration}
              onChange={(e) => onConfigChange('duration', parseInt(e.target.value) || 0)}
              min="1"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-onSurface mb-1">Total Marks</label>
            <Input
              type="number"
              placeholder="100"
              value={testConfig.totalMarks}
              onChange={(e) => onConfigChange('totalMarks', parseInt(e.target.value) || 0)}
              min="1"
            />
          </div>
        </div>
      </div>

      {/* Question List */}
      <div className="flex-1 overflow-y-auto p-6">
        {selectedQuestions.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="FileText" size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">No Questions Selected</h3>
            <p className="text-gray-400">Select questions from the question bank to start building your test</p>
          </div>
        ) : (
          <div className="space-y-4">
            {selectedQuestions.map((question, index) => (
              <div
                key={question.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className={`p-4 border rounded-lg bg-white transition-all duration-200 cursor-move ${
                  draggedItem === index ? 'opacity-50 scale-95' : 'hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Icon name="GripVertical" size={16} className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-600">Q{index + 1}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      question.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      question.difficulty === 'Medium'? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {question.difficulty}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                      <label className="text-xs text-gray-500">Marks:</label>
                      <Input
                        type="number"
                        value={question.marks || 1}
                        onChange={(e) => {
                          const updatedQuestions = [...selectedQuestions];
                          updatedQuestions[index].marks = parseInt(e.target.value) || 1;
                          onReorderQuestions(null, null, updatedQuestions);
                        }}
                        className="w-16 text-xs"
                        min="1"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      iconName="X"
                      onClick={() => onRemoveQuestion(question.id)}
                      className="text-red-500 hover:text-red-700"
                    />
                  </div>
                </div>

                <p className="text-sm text-onSurface mb-3">{question.content}</p>

                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      <span className="text-xs font-medium text-gray-500 w-6">
                        {String.fromCharCode(65 + optionIndex)}.
                      </span>
                      <span className={`text-sm ${
                        optionIndex === question.correctAnswer 
                          ? 'text-green-700 font-medium' :'text-gray-700'
                      }`}>
                        {option}
                      </span>
                      {optionIndex === question.correctAnswer && (
                        <Icon name="Check" size={14} className="text-green-600" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-500">{question.subject}</span>
                  <span className="text-xs text-gray-500">Source: {question.source}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      {selectedQuestions.length > 0 && (
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <span className="font-medium">{selectedQuestions.length}</span> questions selected
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" iconName="Shuffle">
                Randomize Order
              </Button>
              <Button variant="secondary" iconName="Eye">
                Preview Test
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestBuilder;