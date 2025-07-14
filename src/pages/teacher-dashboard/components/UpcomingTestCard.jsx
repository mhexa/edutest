import React from 'react';
import Icon from '../../../components/AppIcon';

const UpcomingTestCard = ({ test }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeUntil = (dateString) => {
    const now = new Date();
    const testDate = new Date(dateString);
    const diffInHours = Math.ceil((testDate - now) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h`;
    } else {
      const days = Math.ceil(diffInHours / 24);
      return `${days}d`;
    }
  };

  const getUrgencyColor = (dateString) => {
    const now = new Date();
    const testDate = new Date(dateString);
    const diffInHours = (testDate - now) / (1000 * 60 * 60);
    
    if (diffInHours < 24) return 'text-red-600 bg-red-50';
    if (diffInHours < 72) return 'text-orange-600 bg-orange-50';
    return 'text-blue-600 bg-blue-50';
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-900 text-sm">{test.title}</h4>
        <span className={`px-2 py-1 rounded text-xs font-medium ${getUrgencyColor(test.scheduledDate)}`}>
          {getTimeUntil(test.scheduledDate)}
        </span>
      </div>
      
      <div className="space-y-1 text-xs text-gray-600">
        <div className="flex items-center">
          <Icon name="Calendar" size={12} className="mr-1" />
          <span>{formatDate(test.scheduledDate)}</span>
        </div>
        <div className="flex items-center">
          <Icon name="Users" size={12} className="mr-1" />
          <span>{test.className} • {test.studentCount} students</span>
        </div>
        <div className="flex items-center">
          <Icon name="Clock" size={12} className="mr-1" />
          <span>{test.duration} minutes</span>
        </div>
      </div>
    </div>
  );
};

export default UpcomingTestCard;