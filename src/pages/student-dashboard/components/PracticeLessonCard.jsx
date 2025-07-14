import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PracticeLessonCard = ({ lesson, onPracticeNow }) => {
  const { 
    id, 
    title, 
    subject, 
    topic, 
    questionsCount, 
    estimatedTime, 
    difficulty, 
    completionRate, 
    lastAttempt,
    isNew 
  } = lesson;

  const getDifficultyIcon = (level) => {
    switch (level) {
      case 'Easy': return 'TrendingUp';
      case 'Medium': return 'BarChart3';
      case 'Hard': return 'TrendingUp';
      default: return 'BarChart3';
    }
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'Easy': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'Hard': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const formatLastAttempt = (date) => {
    if (!date) return 'Not attempted';
    const now = new Date();
    const attemptDate = new Date(date);
    const diffDays = Math.floor((now - attemptDate) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return attemptDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
            {isNew && (
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                New
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600">{subject} • {topic}</p>
        </div>
        <div className={`flex items-center space-x-1 ${getDifficultyColor(difficulty)}`}>
          <Icon name={getDifficultyIcon(difficulty)} size={16} />
          <span className="text-sm font-medium">{difficulty}</span>
        </div>
      </div>

      {/* Progress Bar */}
      {completionRate > 0 && (
        <div className="mb-3">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{completionRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Lesson Details */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="FileQuestion" size={16} color="#6B7280" />
          <span className="text-sm text-gray-600">{questionsCount} MCQs</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} color="#6B7280" />
          <span className="text-sm text-gray-600">{estimatedTime} min</span>
        </div>
      </div>

      {/* Last Attempt */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="History" size={16} color="#6B7280" />
          <span className="text-sm text-gray-600">
            Last: {formatLastAttempt(lastAttempt)}
          </span>
        </div>
        
        <Button 
          variant={completionRate === 0 ? "primary" : "outline"}
          size="sm"
          onClick={() => onPracticeNow(id)}
          iconName={completionRate === 0 ? "Play" : "RotateCcw"}
          iconPosition="left"
        >
          {completionRate === 0 ? 'Start' : 'Retry'}
        </Button>
      </div>
    </div>
  );
};

export default PracticeLessonCard;