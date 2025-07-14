import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ClassCard = ({ classData, onStartTest, onPracticeNow, onViewDetails }) => {
  const { 
    id, 
    name, 
    subject, 
    teacher, 
    upcomingTests, 
    recentScore, 
    practiceAvailable, 
    completionRate,
    nextTestDate,
    color 
  } = classData;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div 
            className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-semibold text-lg`}
            style={{ backgroundColor: color }}
          >
            {subject.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-600">{subject} • {teacher}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {upcomingTests > 0 && (
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
              {upcomingTests} test{upcomingTests > 1 ? 's' : ''} due
            </span>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{completionRate}%</div>
          <div className="text-xs text-gray-500">Completion</div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${getScoreColor(recentScore)}`}>
            {recentScore}%
          </div>
          <div className="text-xs text-gray-500">Recent Score</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{practiceAvailable}</div>
          <div className="text-xs text-gray-500">Practice</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Course Progress</span>
          <span>{completionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>

      {/* Next Test Info */}
      {nextTestDate && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} color="#D97706" />
            <span className="text-sm font-medium text-yellow-800">
              Next Test: {formatDate(nextTestDate)}
            </span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-2">
        {upcomingTests > 0 && (
          <Button 
            variant="primary" 
            onClick={() => onStartTest(id)}
            iconName="Play"
            iconPosition="left"
            className="flex-1"
          >
            Start Test
          </Button>
        )}
        {practiceAvailable > 0 && (
          <Button 
            variant="outline" 
            onClick={() => onPracticeNow(id)}
            iconName="BookOpen"
            iconPosition="left"
            className="flex-1"
          >
            Practice
          </Button>
        )}
        <Button 
          variant="ghost" 
          onClick={() => onViewDetails(id)}
          iconName="Eye"
          size="md"
        >
        </Button>
      </div>
    </div>
  );
};

export default ClassCard;