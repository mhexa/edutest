import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DashboardHeader = ({ 
  activeTab, 
  onTabChange, 
  searchTerm, 
  onSearchChange, 
  filterBy, 
  onFilterChange,
  onBulkAction 
}) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Home' },
    { id: 'classes', label: 'Classes', icon: 'Users' },
    { id: 'tests', label: 'Tests', icon: 'FileText' },
    { id: 'results', label: 'Results', icon: 'BarChart3' },
    { id: 'analytics', label: 'Analytics', icon: 'TrendingUp' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Classes' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'science', label: 'Science' },
    { value: 'english', label: 'English' },
    { value: 'history', label: 'History' }
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
            <p className="text-gray-600">Manage your classes, tests, and student performance</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              iconName="Download" 
              iconPosition="left"
              onClick={() => onBulkAction('export')}
            >
              Export Data
            </Button>
            <Button 
              variant="primary" 
              iconName="Plus" 
              iconPosition="left"
              onClick={() => onBulkAction('create-test')}
            >
              Create Test
            </Button>
          </div>
        </div>

        <div className="mt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <nav className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon name={tab.icon} size={16} className="mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search classes, tests..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
            
            <select
              value={filterBy}
              onChange={(e) => onFilterChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;