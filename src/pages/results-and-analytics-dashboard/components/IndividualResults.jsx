import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const IndividualResults = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedStudent, setExpandedStudent] = useState(null);

  const students = [
    {
      id: 1,
      name: "Emma Thompson",
      email: "emma.thompson@school.edu",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      overallScore: 85.5,
      testsCompleted: 12,
      lastActivity: "2024-01-15",
      recentTests: [
        { name: "Math Quiz 1", score: 92, date: "2024-01-15", questions: 20, correct: 18 },
        { name: "Science Test", score: 78, date: "2024-01-12", questions: 25, correct: 19 },
        { name: "History Quiz", score: 88, date: "2024-01-10", questions: 15, correct: 13 }
      ]
    },
    {
      id: 2,
      name: "James Wilson",
      email: "james.wilson@school.edu",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      overallScore: 72.3,
      testsCompleted: 10,
      lastActivity: "2024-01-14",
      recentTests: [
        { name: "Math Quiz 1", score: 68, date: "2024-01-14", questions: 20, correct: 14 },
        { name: "Science Test", score: 75, date: "2024-01-11", questions: 25, correct: 19 },
        { name: "History Quiz", score: 74, date: "2024-01-09", questions: 15, correct: 11 }
      ]
    },
    {
      id: 3,
      name: "Sophia Davis",
      email: "sophia.davis@school.edu",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      overallScore: 91.2,
      testsCompleted: 15,
      lastActivity: "2024-01-15",
      recentTests: [
        { name: "Math Quiz 1", score: 95, date: "2024-01-15", questions: 20, correct: 19 },
        { name: "Science Test", score: 89, date: "2024-01-12", questions: 25, correct: 22 },
        { name: "History Quiz", score: 90, date: "2024-01-10", questions: 15, correct: 14 }
      ]
    }
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-lg font-semibold text-gray-900">Individual Student Results</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" iconName="Download">
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {filteredStudents.map((student) => (
          <div key={student.id} className="p-6">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setExpandedStudent(expandedStudent === student.id ? null : student.id)}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{student.name}</h4>
                  <p className="text-sm text-gray-500">{student.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreColor(student.overallScore)}`}>
                    {student.overallScore}%
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Overall Score</p>
                </div>
                
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900">{student.testsCompleted}</p>
                  <p className="text-xs text-gray-500">Tests Completed</p>
                </div>
                
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900">{student.lastActivity}</p>
                  <p className="text-xs text-gray-500">Last Activity</p>
                </div>
                
                <Icon 
                  name={expandedStudent === student.id ? "ChevronUp" : "ChevronDown"} 
                  size={20} 
                  className="text-gray-400" 
                />
              </div>
            </div>

            {expandedStudent === student.id && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h5 className="text-sm font-medium text-gray-900 mb-4">Recent Test Results</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {student.recentTests.map((test, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h6 className="text-sm font-medium text-gray-900">{test.name}</h6>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(test.score)}`}>
                          {test.score}%
                        </span>
                      </div>
                      <div className="space-y-1 text-xs text-gray-600">
                        <p>Date: {test.date}</p>
                        <p>Correct: {test.correct}/{test.questions}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndividualResults;