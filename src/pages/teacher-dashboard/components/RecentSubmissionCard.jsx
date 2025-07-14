import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentSubmissionCard = ({ submission, onReview }) => {
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const submissionDate = new Date(dateString);
    const diffInMinutes = Math.floor((now - submissionDate) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours}h ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days}d ago`;
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-medium text-gray-900 text-sm">{submission.studentName}</h4>
          <p className="text-xs text-gray-600">{submission.testTitle}</p>
        </div>
        <span className={`text-sm font-semibold ${getScoreColor(submission.score)}`}>
          {submission.score}%
        </span>
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
        <div className="flex items-center">
          <Icon name="Clock" size={12} className="mr-1" />
          <span>{formatTimeAgo(submission.submittedAt)}</span>
        </div>
        <div className="flex items-center">
          <Icon name="FileText" size={12} className="mr-1" />
          <span>{submission.questionsAnswered}/{submission.totalQuestions}</span>
        </div>
      </div>

      <Button 
        variant="outline" 
        size="xs" 
        iconName="Eye" 
        iconPosition="left"
        onClick={() => onReview(submission.id)}
        fullWidth
      >
        Review
      </Button>
    </div>
  );
};

export default RecentSubmissionCard;