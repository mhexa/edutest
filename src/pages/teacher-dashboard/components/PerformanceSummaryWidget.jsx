import React from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceSummaryWidget = ({ data }) => {
  const metrics = [
    {
      label: 'Total Students',
      value: data.totalStudents,
      icon: 'Users',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Tests This Week',
      value: data.testsThisWeek,
      icon: 'FileText',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Avg Performance',
      value: `${data.averagePerformance}%`,
      icon: 'TrendingUp',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      label: 'Pending Reviews',
      value: data.pendingReviews,
      icon: 'Clock',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
      
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${metric.bgColor} mr-3`}>
                <Icon name={metric.icon} size={16} className={metric.color} />
              </div>
              <span className="text-sm text-gray-600">{metric.label}</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">{metric.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">This Month's Progress</span>
          <div className="flex items-center text-green-600">
            <Icon name="TrendingUp" size={14} className="mr-1" />
            <span className="font-medium">+12%</span>
          </div>
        </div>
        <div className="mt-2 bg-gray-200 rounded-full h-2">
          <div className="bg-green-500 h-2 rounded-full" style={{ width: '68%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceSummaryWidget;