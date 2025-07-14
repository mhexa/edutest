import React from 'react';
import Icon from '../../../components/AppIcon';

const QuestionDisplay = ({ question, questionNumber, totalQuestions, selectedAnswer, onAnswerSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-500">Question</span>
            <span className="text-lg font-bold text-gray-900">
              {questionNumber} of {totalQuestions}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">Marks:</span>
            <span className="text-sm font-semibold text-gray-700">{question.marks}</span>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 leading-relaxed mb-4">
          {question.question}
        </h2>
        
        {question.image && (
          <div className="mb-6 flex justify-center">
            <img 
              src={question.image} 
              alt="Question illustration"
              className="max-w-full h-auto rounded-lg border border-gray-200"
              style={{ maxHeight: '300px' }}
            />
          </div>
        )}
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Choose the correct answer:</h3>
        {question.options.map((option, index) => {
          const optionLabel = String.fromCharCode(65 + index); // A, B, C, D
          const isSelected = selectedAnswer === index;
          
          return (
            <label
              key={index}
              className={`
                flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50' :'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              <div className="flex-shrink-0 mt-0.5">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={index}
                  checked={isSelected}
                  onChange={() => onAnswerSelect(index)}
                  className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start space-x-2">
                  <span className="text-sm font-medium text-gray-700 mt-0.5">
                    {optionLabel}.
                  </span>
                  <span className="text-sm text-gray-900 leading-relaxed">
                    {option}
                  </span>
                </div>
              </div>
            </label>
          );
        })}
      </div>

      {question.isMarkedForReview && (
        <div className="mt-6 flex items-center space-x-2 text-yellow-700 bg-yellow-50 p-3 rounded-lg">
          <Icon name="Flag" size={16} />
          <span className="text-sm font-medium">Marked for review</span>
        </div>
      )}
    </div>
  );
};

export default QuestionDisplay;