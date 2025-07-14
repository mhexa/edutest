import React from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceMetrics = () => {
  const metrics = [
    {
      id: 1,
      title: "Class Average",
      value: "78.5%",
      change: "+5.2%",
      trend: "up",
      icon: "TrendingUp",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      id: 2,
      title: "Completion Rate",
      value: "94.3%",
      change: "+2.1%",
      trend: "up",
      icon: "CheckCircle",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: 3,
      title: "Active Students",
      value: "127",
      change: "+8",
      trend: "up",
      icon: "Users",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      id: 4,
      title: "Tests Completed",
      value: "342",
      change: "+23",
      trend: "up",
      icon: "FileText",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric) => (
        <div key={metric.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${metric.bgColor}`}>
              <Icon name={metric.icon} size={24} className={metric.color} />
            </div>
            <div className="flex items-center text-sm text-green-600">
              <Icon name="TrendingUp" size={16} className="mr-1" />
              {metric.change}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
            <p className="text-sm text-gray-600">{metric.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PerformanceMetrics;