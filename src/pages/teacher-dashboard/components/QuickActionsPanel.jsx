import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = ({ onAction }) => {
  const quickActions = [
    {
      id: 'create-test',
      label: 'Create New Test',
      icon: 'Plus',
      variant: 'primary',
      description: 'Start creating a new test for your classes'
    },
    {
      id: 'upload-pdf',
      label: 'Upload PDF',
      icon: 'Upload',
      variant: 'secondary',
      description: 'Upload study materials and answer keys'
    },
    {
      id: 'view-analytics',
      label: 'View Analytics',
      icon: 'BarChart3',
      variant: 'outline',
      description: 'Check detailed performance analytics'
    },
    {
      id: 'schedule-test',
      label: 'Schedule Test',
      icon: 'Calendar',
      variant: 'ghost',
      description: 'Schedule tests across multiple classes'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      
      <div className="space-y-3">
        {quickActions.map((action) => (
          <div key={action.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-medium text-gray-900 text-sm">{action.label}</h4>
                <p className="text-xs text-gray-600 mt-1">{action.description}</p>
              </div>
            </div>
            <Button 
              variant={action.variant}
              size="sm"
              iconName={action.icon}
              iconPosition="left"
              onClick={() => onAction(action.id)}
              fullWidth
            >
              {action.label}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsPanel;