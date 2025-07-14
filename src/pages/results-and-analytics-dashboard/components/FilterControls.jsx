import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterControls = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    dateRange: 'last-month',
    studentGroup: 'all',
    subject: 'all',
    testType: 'all'
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const dateRanges = [
    { value: 'last-week', label: 'Last Week' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'last-quarter', label: 'Last Quarter' },
    { value: 'last-semester', label: 'Last Semester' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const studentGroups = [
    { value: 'all', label: 'All Students' },
    { value: 'class-a', label: 'Class A' },
    { value: 'class-b', label: 'Class B' },
    { value: 'class-c', label: 'Class C' },
    { value: 'struggling', label: 'Struggling Students' },
    { value: 'advanced', label: 'Advanced Students' }
  ];

  const subjects = [
    { value: 'all', label: 'All Subjects' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'science', label: 'Science' },
    { value: 'history', label: 'History' },
    { value: 'english', label: 'English' },
    { value: 'geography', label: 'Geography' }
  ];

  const testTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'quiz', label: 'Quizzes' },
    { value: 'test', label: 'Tests' },
    { value: 'assignment', label: 'Assignments' },
    { value: 'practice', label: 'Practice Sessions' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange && onFiltersChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      dateRange: 'last-month',
      studentGroup: 'all',
      subject: 'all',
      testType: 'all'
    };
    setFilters(defaultFilters);
    onFiltersChange && onFiltersChange(defaultFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters & Analysis Controls</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            onClick={() => setShowAdvanced(!showAdvanced)}
            iconName={showAdvanced ? "ChevronUp" : "ChevronDown"}
          >
            Advanced Filters
          </Button>
          <Button variant="outline" onClick={resetFilters} iconName="RotateCcw">
            Reset
          </Button>
        </div>
      </div>

      {/* Basic Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
          <select
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {dateRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Student Group</label>
          <select
            value={filters.studentGroup}
            onChange={(e) => handleFilterChange('studentGroup', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {studentGroups.map((group) => (
              <option key={group.value} value={group.value}>
                {group.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
          <select
            value={filters.subject}
            onChange={(e) => handleFilterChange('subject', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {subjects.map((subject) => (
              <option key={subject.value} value={subject.value}>
                {subject.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Test Type</label>
          <select
            value={filters.testType}
            onChange={(e) => handleFilterChange('testType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {testTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t border-gray-200 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Custom Start Date</label>
              <Input
                type="date"
                className="w-full"
                disabled={filters.dateRange !== 'custom'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Custom End Date</label>
              <Input
                type="date"
                className="w-full"
                disabled={filters.dateRange !== 'custom'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Score</label>
              <Input
                type="number"
                placeholder="0-100"
                min="0"
                max="100"
                className="w-full"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center space-x-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-700">Include incomplete tests</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-700">Show only retakes</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-700">Exclude practice sessions</span>
            </label>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      <div className="mt-4 flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-700">Active Filters:</span>
        {Object.entries(filters).map(([key, value]) => {
          if (value === 'all') return null;
          const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
          return (
            <span
              key={key}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {label}: {value}
              <button
                onClick={() => handleFilterChange(key, 'all')}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default FilterControls;