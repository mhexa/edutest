import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentResultCard = ({ result, onViewDetails }) => {
  const { 
    id, 
    title, 
    subject, 
    type, 
    score, 
    totalQuestions, 
    correctAnswers, 
    completedDate, 
    timeSpent, 
    grade,
    feedback 
  } = result;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+': case'A': return 'bg-green-100 text-green-800';
      case 'B+': case'B': return 'bg-blue-100 text-blue-800';
      case 'C+': case'C': return 'bg-yellow-100 text-yellow-800';
      case 'D': case'F': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Test': return 'FileText';
      case 'Practice': return 'BookOpen';
      case 'Quiz': return 'HelpCircle';
      default: return 'FileText';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getScoreBgColor(score)}`}>
            <Icon name={getTypeIcon(type)} size={20} color={getScoreColor(score).replace('text-', '#')} />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
            <p className="text-sm text-gray-600">{subject} • {type}</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
            {score}%
          </div>
          {grade && (
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${getGradeColor(grade)}`}>
              {grade}
            </span>
          )}
        </div>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-3 gap-4 mb-3">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">{correctAnswers}</div>
          <div className="text-xs text-gray-500">Correct</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">{totalQuestions}</div>
          <div className="text-xs text-gray-500">Total</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">{formatTime(timeSpent)}</div>
          <div className="text-xs text-gray-500">Time</div>
        </div>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className="bg-gray-50 rounded-lg p-3 mb-3">
          <p className="text-sm text-gray-700 italic">"{feedback}"</p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} color="#6B7280" />
          <span className="text-sm text-gray-600">
            {formatDate(completedDate)}
          </span>
        </div>
        
        <Button 
          variant="ghost"
          size="sm"
          onClick={() => onViewDetails(id)}
          iconName="Eye"
          iconPosition="left"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default RecentResultCard;