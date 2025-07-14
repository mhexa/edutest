import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingTestCard = ({ test, onStartTest }) => {
  const { id, title, subject, dueDate, duration, questionsCount, difficulty, status } = test;

  const formatTimeRemaining = (date) => {
    const now = new Date();
    const testDate = new Date(date);
    const diff = testDate - now;
    
    if (diff < 0) return 'Overdue';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'text-green-600';
      case 'Due Soon': return 'text-orange-600';
      case 'Overdue': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const timeRemaining = formatTimeRemaining(dueDate);
  const isOverdue = timeRemaining === 'Overdue';

  return (
    <div className={`bg-white rounded-lg border-l-4 shadow-sm p-4 hover:shadow-md transition-shadow duration-200 ${
      isOverdue ? 'border-l-red-500' : status === 'Due Soon' ? 'border-l-orange-500' : 'border-l-blue-500'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-gray-900 mb-1">{title}</h4>
          <p className="text-sm text-gray-600">{subject}</p>
        </div>
        <div className="text-right">
          <div className={`text-sm font-medium ${getStatusColor(status)}`}>
            {status}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {timeRemaining}
          </div>
        </div>
      </div>

      {/* Test Details */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} color="#6B7280" />
          <span className="text-sm text-gray-600">{duration} min</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="FileText" size={16} color="#6B7280" />
          <span className="text-sm text-gray-600">{questionsCount} questions</span>
        </div>
        <div>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </span>
        </div>
      </div>

      {/* Due Date */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} color="#6B7280" />
          <span className="text-sm text-gray-600">
            Due: {new Date(dueDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
        
        <Button 
          variant={isOverdue ? "danger" : status === 'Due Soon' ? "warning" : "primary"}
          size="sm"
          onClick={() => onStartTest(id)}
          iconName="Play"
          iconPosition="left"
        >
          {isOverdue ? 'Start Now' : 'Start Test'}
        </Button>
      </div>
    </div>
  );
};

export default UpcomingTestCard;