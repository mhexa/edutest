import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ClassCard = ({ classData, onCreateTest, onViewResults, onManageStudents }) => {
  const getPerformanceColor = (average) => {
    if (average >= 80) return 'text-green-600';
    if (average >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceBg = (average) => {
    if (average >= 80) return 'bg-green-100';
    if (average >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{classData.name}</h3>
          <p className="text-sm text-gray-600">{classData.subject}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getPerformanceBg(classData.averageScore)} ${getPerformanceColor(classData.averageScore)}`}>
          {classData.averageScore}% Avg
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Icon name="Users" size={16} className="text-blue-600 mr-1" />
            <span className="text-2xl font-bold text-gray-900">{classData.studentCount}</span>
          </div>
          <p className="text-xs text-gray-600">Students</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Icon name="FileText" size={16} className="text-green-600 mr-1" />
            <span className="text-2xl font-bold text-gray-900">{classData.testsCount}</span>
          </div>
          <p className="text-xs text-gray-600">Tests</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Icon name="Clock" size={16} className="text-orange-600 mr-1" />
            <span className="text-2xl font-bold text-gray-900">{classData.pendingAssignments}</span>
          </div>
          <p className="text-xs text-gray-600">Pending</p>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="primary" 
            size="sm" 
            iconName="Plus" 
            iconPosition="left"
            onClick={() => onCreateTest(classData.id)}
            className="flex-1 min-w-0"
          >
            Create Test
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            iconName="BarChart3" 
            iconPosition="left"
            onClick={() => onViewResults(classData.id)}
            className="flex-1 min-w-0"
          >
            Results
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            iconName="Settings" 
            onClick={() => onManageStudents(classData.id)}
            className="px-3"
          >
          </Button>
        </div>
      </div>

      {classData.recentActivity && (
        <div className="mt-3 pt-3 border-t">
          <p className="text-xs text-gray-500">
            <Icon name="Activity" size={12} className="inline mr-1" />
            {classData.recentActivity}
          </p>
        </div>
      )}
    </div>
  );
};

export default ClassCard;