import React, { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TestAnalysis = () => {
  const [selectedTest, setSelectedTest] = useState('math-quiz-1');

  const tests = [
    { id: 'math-quiz-1', name: 'Mathematics Quiz 1', date: '2024-01-15' },
    { id: 'science-test', name: 'Science Test', date: '2024-01-12' },
    { id: 'history-quiz', name: 'History Quiz', date: '2024-01-10' }
  ];

  const questionDifficultyData = [
    { question: 'Q1', difficulty: 85, correct: 92, topic: 'Algebra' },
    { question: 'Q2', difficulty: 72, correct: 78, topic: 'Geometry' },
    { question: 'Q3', difficulty: 45, correct: 45, topic: 'Calculus' },
    { question: 'Q4', difficulty: 68, correct: 71, topic: 'Statistics' },
    { question: 'Q5', difficulty: 91, correct: 95, topic: 'Algebra' },
    { question: 'Q6', difficulty: 38, correct: 42, topic: 'Calculus' },
    { question: 'Q7', difficulty: 76, correct: 82, topic: 'Geometry' },
    { question: 'Q8', difficulty: 82, correct: 88, topic: 'Statistics' }
  ];

  const commonMistakes = [
    {
      question: "Question 3: Solve for x in 2x + 5 = 15",
      correctAnswer: "x = 5",
      commonWrongAnswers: [
        { answer: "x = 10", count: 23, percentage: 18.1 },
        { answer: "x = 20", count: 15, percentage: 11.8 },
        { answer: "x = 2.5", count: 12, percentage: 9.4 }
      ],
      totalAttempts: 127
    },
    {
      question: "Question 6: Calculate the area of a circle with radius 4",
      correctAnswer: "16π or 50.27",
      commonWrongAnswers: [
        { answer: "16", count: 28, percentage: 22.0 },
        { answer: "8π", count: 19, percentage: 15.0 },
        { answer: "32", count: 14, percentage: 11.0 }
      ],
      totalAttempts: 127
    }
  ];

  const contentAreaPerformance = [
    { area: 'Algebra', average: 82.5, questions: 3, difficulty: 'Medium' },
    { area: 'Geometry', average: 76.8, questions: 2, difficulty: 'Medium' },
    { area: 'Calculus', average: 43.5, questions: 2, difficulty: 'Hard' },
    { area: 'Statistics', average: 79.2, questions: 1, difficulty: 'Easy' }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Hard': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Test Selector */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Test Analysis</h3>
        <div className="flex items-center space-x-3">
          <select
            value={selectedTest}
            onChange={(e) => setSelectedTest(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {tests.map((test) => (
              <option key={test.id} value={test.id}>
                {test.name} - {test.date}
              </option>
            ))}
          </select>
          <Button variant="outline" iconName="Download">
            Export Analysis
          </Button>
        </div>
      </div>

      {/* Question Difficulty vs Performance */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h4 className="text-md font-medium text-gray-900 mb-6">Question Difficulty vs Performance</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart data={questionDifficultyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="difficulty" 
                name="Expected Difficulty (%)"
                domain={[0, 100]}
              />
              <YAxis 
                dataKey="correct" 
                name="Actual Correct (%)"
                domain={[0, 100]}
              />
              <Tooltip 
                formatter={(value, name) => [
                  `${value}%`, 
                  name === 'correct' ? 'Students Correct' : 'Expected Difficulty'
                ]}
                labelFormatter={(label, payload) => 
                  payload && payload[0] ? `${payload[0].payload.question} - ${payload[0].payload.topic}` : ''
                }
              />
              <Scatter dataKey="correct" fill="#3B82F6" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Points above the diagonal line indicate questions that were easier than expected, 
          while points below indicate questions that were harder than expected.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Area Performance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="text-md font-medium text-gray-900 mb-6">Content Area Performance</h4>
          <div className="space-y-4">
            {contentAreaPerformance.map((area, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <h5 className="font-medium text-gray-900">{area.area}</h5>
                    <p className="text-sm text-gray-600">{area.questions} questions</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(area.difficulty)}`}>
                    {area.difficulty}
                  </span>
                  <span className="text-lg font-semibold text-gray-900">{area.average}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="text-md font-medium text-gray-900 mb-6">Common Mistakes Analysis</h4>
          <div className="space-y-6">
            {commonMistakes.map((mistake, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                <h5 className="font-medium text-gray-900 mb-2">{mistake.question}</h5>
                <p className="text-sm text-green-600 mb-3">Correct Answer: {mistake.correctAnswer}</p>
                <div className="space-y-2">
                  <h6 className="text-sm font-medium text-gray-700">Common Wrong Answers:</h6>
                  {mistake.commonWrongAnswers.map((wrong, wrongIndex) => (
                    <div key={wrongIndex} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{wrong.answer}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500">{wrong.count} students</span>
                        <span className="text-red-600 font-medium">{wrong.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Test Statistics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Icon name="BarChart3" size={24} className="text-blue-600" />
            </div>
            <div className="ml-4">
              <h5 className="text-sm font-medium text-gray-900">Average Score</h5>
              <p className="text-2xl font-bold text-blue-600">78.5%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <Icon name="Clock" size={24} className="text-green-600" />
            </div>
            <div className="ml-4">
              <h5 className="text-sm font-medium text-gray-900">Avg. Time</h5>
              <p className="text-2xl font-bold text-green-600">24m</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Icon name="AlertTriangle" size={24} className="text-yellow-600" />
            </div>
            <div className="ml-4">
              <h5 className="text-sm font-medium text-gray-900">Hardest Question</h5>
              <p className="text-2xl font-bold text-yellow-600">Q6</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Icon name="CheckCircle" size={24} className="text-purple-600" />
            </div>
            <div className="ml-4">
              <h5 className="text-sm font-medium text-gray-900">Completion Rate</h5>
              <p className="text-2xl font-bold text-purple-600">94.3%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestAnalysis;