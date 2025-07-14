import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TestPreview = ({ test, isVisible, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(test.duration * 60); // Convert to seconds

  if (!isVisible) return null;

  const handleAnswerSelect = (questionId, optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestionData = test.questions[currentQuestion];
  const totalQuestions = test.questions.length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-4xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-onSurface">{test.title} - Preview</h2>
            <p className="text-sm text-gray-600 mt-1">Student View Simulation</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <Icon name="Clock" size={16} className="text-gray-500" />
              <span className="font-mono text-primary">{formatTime(timeRemaining)}</span>
            </div>
            <Button variant="ghost" iconName="X" onClick={onClose} />
          </div>
        </div>

        {/* Test Info Bar */}
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <span>Question {currentQuestion + 1} of {totalQuestions}</span>
              <span>Total Marks: {test.totalMarks}</span>
              <span>Duration: {test.duration} minutes</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Progress:</span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
                />
              </div>
              <span className="text-primary font-medium">
                {Math.round(((currentQuestion + 1) / totalQuestions) * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto">
            {/* Question */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-medium text-onSurface">
                  Question {currentQuestion + 1}
                </h3>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    currentQuestionData.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    currentQuestionData.difficulty === 'Medium'? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {currentQuestionData.difficulty}
                  </span>
                  <span className="text-sm text-gray-600">
                    ({currentQuestionData.marks || 1} mark{(currentQuestionData.marks || 1) > 1 ? 's' : ''})
                  </span>
                </div>
              </div>
              
              <p className="text-onSurface leading-relaxed mb-6">
                {currentQuestionData.content}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestionData.options.map((option, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedAnswers[currentQuestionData.id] === index
                      ? 'border-primary bg-primary bg-opacity-10' :'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handleAnswerSelect(currentQuestionData.id, index)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[currentQuestionData.id] === index
                        ? 'border-primary bg-primary' :'border-gray-300'
                    }`}>
                      {selectedAnswers[currentQuestionData.id] === index && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="font-medium text-gray-700 mr-2">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span className="text-onSurface">{option}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Question Navigation */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  iconName="ChevronLeft"
                  iconPosition="left"
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>

                <div className="flex items-center space-x-2">
                  {Array.from({ length: totalQuestions }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestion(index)}
                      className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                        index === currentQuestion
                          ? 'bg-primary text-white'
                          : selectedAnswers[test.questions[index].id] !== undefined
                          ? 'bg-green-100 text-green-800' :'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <Button
                  variant="primary"
                  iconName="ChevronRight"
                  iconPosition="right"
                  onClick={() => setCurrentQuestion(Math.min(totalQuestions - 1, currentQuestion + 1))}
                  disabled={currentQuestion === totalQuestions - 1}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <Icon name="Eye" size={16} className="inline mr-1" />
              Preview Mode - Changes are not saved
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={onClose}>
                Close Preview
              </Button>
              <Button variant="success" iconName="Send">
                Submit Test (Preview)
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPreview;