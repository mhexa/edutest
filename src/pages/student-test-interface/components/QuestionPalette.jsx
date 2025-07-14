import React from 'react';
import Icon from '../../../components/AppIcon';

const QuestionPalette = ({ questions, currentQuestion, onQuestionSelect, isCollapsed, onToggleCollapse }) => {
  const getQuestionStatus = (question) => {
    if (question.isMarkedForReview) return 'review';
    if (question.selectedAnswer !== null) return 'answered';
    return 'unanswered';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'answered':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'review':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'answered':
        return 'Check';
      case 'review':
        return 'Flag';
      default:
        return 'Circle';
    }
  };

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h3 className="text-sm font-semibold text-gray-700">Question Palette</h3>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Icon 
              name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
              size={16} 
              className="text-gray-600" 
            />
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <div className="p-4">
          <div className="space-y-3 mb-4">
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
              <span className="text-gray-600">Answered</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded"></div>
              <span className="text-gray-600">Marked for Review</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded"></div>
              <span className="text-gray-600">Not Answered</span>
            </div>
          </div>
        </div>
      )}

      <div className="px-2 pb-4 max-h-96 overflow-y-auto">
        <div className={`grid gap-2 ${isCollapsed ? 'grid-cols-1' : 'grid-cols-4'}`}>
          {questions.map((question, index) => {
            const status = getQuestionStatus(question);
            const isActive = currentQuestion === index;
            
            return (
              <button
                key={question.id}
                onClick={() => onQuestionSelect(index)}
                className={`
                  relative w-10 h-10 rounded border-2 font-medium text-sm transition-all duration-200
                  ${isActive ? 'ring-2 ring-blue-500 ring-offset-1' : ''}
                  ${getStatusColor(status)}
                  hover:shadow-md
                `}
                title={`Question ${index + 1} - ${status}`}
              >
                {isCollapsed ? (
                  <Icon 
                    name={getStatusIcon(status)} 
                    size={16} 
                    className="mx-auto" 
                  />
                ) : (
                  <span>{index + 1}</span>
                )}
                {question.isMarkedForReview && !isCollapsed && (
                  <Icon 
                    name="Flag" 
                    size={10} 
                    className="absolute -top-1 -right-1 text-yellow-600" 
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuestionPalette;