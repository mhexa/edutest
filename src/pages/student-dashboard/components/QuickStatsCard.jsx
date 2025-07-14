import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStatsCard = ({ stats }) => {
  const { 
    totalClasses, 
    pendingTests, 
    averageScore, 
    practiceCompleted, 
    streak,
    totalTestsCompleted 
  } = stats;

  const getStreakColor = (days) => {
    if (days >= 7) return 'text-green-600';
    if (days >= 3) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Total Classes */}
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Icon name="BookOpen" size={24} color="#2563EB" />
          </div>
          <div className="text-2xl font-bold text-blue-600">{totalClasses}</div>
          <div className="text-sm text-gray-600">Classes</div>
        </div>

        {/* Pending Tests */}
        <div className="text-center p-3 bg-orange-50 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Icon name="Clock" size={24} color="#EA580C" />
          </div>
          <div className="text-2xl font-bold text-orange-600">{pendingTests}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>

        {/* Average Score */}
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Icon name="TrendingUp" size={24} color="#16A34A" />
          </div>
          <div className={`text-2xl font-bold ${getScoreColor(averageScore)}`}>
            {averageScore}%
          </div>
          <div className="text-sm text-gray-600">Avg Score</div>
        </div>

        {/* Practice Completed */}
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Icon name="Target" size={24} color="#9333EA" />
          </div>
          <div className="text-2xl font-bold text-purple-600">{practiceCompleted}</div>
          <div className="text-sm text-gray-600">Practice</div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Flame" size={20} color={getStreakColor(streak).replace('text-', '#')} />
            <span className="text-sm text-gray-600">Study Streak</span>
          </div>
          <span className={`font-semibold ${getStreakColor(streak)}`}>
            {streak} days
          </span>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={20} color="#16A34A" />
            <span className="text-sm text-gray-600">Tests Completed</span>
          </div>
          <span className="font-semibold text-green-600">
            {totalTestsCompleted}
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuickStatsCard;