import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PerformanceMetrics from './components/PerformanceMetrics';
import IndividualResults from './components/IndividualResults';
import ClassPerformance from './components/ClassPerformance';
import TestAnalysis from './components/TestAnalysis';
import FilterControls from './components/FilterControls';

const ResultsAndAnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState('individual');
  const [filters, setFilters] = useState({});

  const tabs = [
    { id: 'individual', label: 'Individual Results', icon: 'User' },
    { id: 'class', label: 'Class Performance', icon: 'Users' },
    { id: 'test', label: 'Test Analysis', icon: 'BarChart3' }
  ];

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // Here you would typically update the data based on filters
    console.log('Filters updated:', newFilters);
  };

  const handleExportData = () => {
    // Mock export functionality
    console.log('Exporting data with filters:', filters);
    // In a real app, this would trigger a download
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Icon name="GraduationCap" size={20} className="text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">EduTest Pro</span>
              </div>
              
              <div className="hidden md:flex items-center space-x-6">
                <Link to="/teacher-dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Teacher Dashboard
                </Link>
                <Link to="/student-dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Student Dashboard
                </Link>
                <Link to="/pdf-upload-and-processing" className="text-gray-600 hover:text-gray-900 transition-colors">
                  PDF Upload
                </Link>
                <Link to="/test-creation-and-management" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Test Management
                </Link>
                <Link to="/student-test-interface" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Take Test
                </Link>
                <Link to="/results-and-analytics-dashboard" className="text-blue-600 font-medium">
                  Results & Analytics
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" iconName="Bell">
                Notifications
              </Button>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Results & Analytics Dashboard</h1>
              <p className="mt-2 text-gray-600">
                Comprehensive performance insights and assessment analytics for data-driven instruction
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <Button variant="outline" iconName="RefreshCw">
                Refresh Data
              </Button>
              <Button variant="primary" iconName="Download" onClick={handleExportData}>
                Export Reports
              </Button>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <PerformanceMetrics />

        {/* Filter Controls */}
        <FilterControls onFiltersChange={handleFiltersChange} />

        {/* Tabbed Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600' :'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon name={tab.icon} size={18} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'individual' && <IndividualResults />}
            {activeTab === 'class' && <ClassPerformance />}
            {activeTab === 'test' && <TestAnalysis />}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Icon name="FileText" size={20} className="text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-900">Generate Report</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Create comprehensive performance reports for parent conferences or administrative review.
            </p>
            <Button variant="outline" fullWidth>
              Create Report
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-50 rounded-lg">
                <Icon name="TrendingUp" size={20} className="text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900">Performance Trends</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Analyze long-term performance trends and identify areas for improvement.
            </p>
            <Button variant="outline" fullWidth>
              View Trends
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Icon name="Target" size={20} className="text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-900">Set Goals</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Set performance goals and track progress towards achievement targets.
            </p>
            <Button variant="outline" fullWidth>
              Manage Goals
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <Icon name="GraduationCap" size={16} className="text-white" />
              </div>
              <span className="font-semibold text-gray-900">EduTest Pro</span>
            </div>
            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} EduTest Pro. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResultsAndAnalyticsDashboard;