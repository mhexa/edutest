import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ClassPerformance = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');

  const scoreDistributionData = [
    { range: '90-100%', students: 25, percentage: 19.7 },
    { range: '80-89%', students: 42, percentage: 33.1 },
    { range: '70-79%', students: 35, percentage: 27.6 },
    { range: '60-69%', students: 18, percentage: 14.2 },
    { range: '50-59%', students: 7, percentage: 5.5 }
  ];

  const progressData = [
    { month: 'Sep', average: 72.5, participation: 89 },
    { month: 'Oct', average: 75.2, participation: 92 },
    { month: 'Nov', average: 77.8, participation: 94 },
    { month: 'Dec', average: 78.5, participation: 94.3 },
    { month: 'Jan', average: 80.1, participation: 96 }
  ];

  const subjectData = [
    { subject: 'Mathematics', average: 82.3, color: '#3B82F6' },
    { subject: 'Science', average: 78.9, color: '#10B981' },
    { subject: 'History', average: 75.4, color: '#F59E0B' },
    { subject: 'English', average: 81.7, color: '#EF4444' },
    { subject: 'Geography', average: 77.2, color: '#8B5CF6' }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="space-y-6">
      {/* Time Frame Selector */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Class Performance Overview</h3>
        <div className="flex items-center space-x-2">
          {['week', 'month', 'semester'].map((timeframe) => (
            <Button
              key={timeframe}
              variant={selectedTimeframe === timeframe ? 'primary' : 'outline'}
              onClick={() => setSelectedTimeframe(timeframe)}
              className="capitalize"
            >
              {timeframe}
            </Button>
          ))}
        </div>
      </div>

      {/* Score Distribution Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-md font-medium text-gray-900">Score Distribution</h4>
          <Button variant="ghost" iconName="Download">
            Export Chart
          </Button>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={scoreDistributionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [value, name === 'students' ? 'Students' : 'Percentage']}
                labelFormatter={(label) => `Score Range: ${label}`}
              />
              <Bar dataKey="students" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Trends */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="text-md font-medium text-gray-900 mb-6">Progress Trends</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="average" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  name="Class Average (%)"
                />
                <Line 
                  type="monotone" 
                  dataKey="participation" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  name="Participation (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Performance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="text-md font-medium text-gray-900 mb-6">Subject Performance</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={subjectData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="average"
                  label={({ subject, average }) => `${subject}: ${average}%`}
                >
                  {subjectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Average Score']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Performance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <Icon name="TrendingUp" size={24} className="text-green-600" />
            </div>
            <div className="ml-4">
              <h5 className="text-sm font-medium text-gray-900">Improvement Rate</h5>
              <p className="text-2xl font-bold text-green-600">+12.3%</p>
              <p className="text-xs text-gray-500">vs last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Icon name="Target" size={24} className="text-blue-600" />
            </div>
            <div className="ml-4">
              <h5 className="text-sm font-medium text-gray-900">Goal Achievement</h5>
              <p className="text-2xl font-bold text-blue-600">87%</p>
              <p className="text-xs text-gray-500">students above 75%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Icon name="Award" size={24} className="text-purple-600" />
            </div>
            <div className="ml-4">
              <h5 className="text-sm font-medium text-gray-900">Top Performers</h5>
              <p className="text-2xl font-bold text-purple-600">25</p>
              <p className="text-xs text-gray-500">students above 90%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassPerformance;