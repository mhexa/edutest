import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import QuestionBankSidebar from './components/QuestionBankSidebar';
import TestBuilder from './components/TestBuilder';
import TestConfiguration from './components/TestConfiguration';
import TestPreview from './components/TestPreview';
import ClassAssignment from './components/ClassAssignment';

const TestCreationAndManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('builder');
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedClasses, setSelectedClasses] = useState([]);

  // Mock data for question banks
  const questionBanks = [
    {
      id: 1,
      content: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: 2,
      difficulty: "Easy",
      subject: "Geography",
      source: "World Capitals PDF",
      marks: 1
    },
    {
      id: 2,
      content: "Solve for x: 2x + 5 = 15",
      options: ["x = 5", "x = 10", "x = 7.5", "x = 2.5"],
      correctAnswer: 0,
      difficulty: "Medium",
      subject: "Mathematics",
      source: "Algebra Basics PDF",
      marks: 2
    },
    {
      id: 3,
      content: "Which of the following is a renewable energy source?",
      options: ["Coal", "Natural Gas", "Solar Power", "Nuclear Power"],
      correctAnswer: 2,
      difficulty: "Easy",
      subject: "Science",
      source: "Environmental Science PDF",
      marks: 1
    },
    {
      id: 4,
      content: "What is the past tense of the verb \'to go\'?",
      options: ["Goed", "Went", "Gone", "Going"],
      correctAnswer: 1,
      difficulty: "Easy",
      subject: "English",
      source: "Grammar Fundamentals PDF",
      marks: 1
    },
    {
      id: 5,
      content: "In which year did World War II end?",
      options: ["1944", "1945", "1946", "1947"],
      correctAnswer: 1,
      difficulty: "Medium",
      subject: "History",
      source: "Modern History PDF",
      marks: 2
    },
    {
      id: 6,
      content: "What is the chemical symbol for gold?",
      options: ["Go", "Gd", "Au", "Ag"],
      correctAnswer: 2,
      difficulty: "Hard",
      subject: "Science",
      source: "Chemistry Elements PDF",
      marks: 3
    }
  ];

  // Mock data for classes
  const classes = [
    {
      id: 1,
      name: "Mathematics 10A",
      subject: "Mathematics",
      grade: 10,
      teacher: "Dr. Sarah Johnson",
      studentCount: 28,
      activeStudents: 26,
      room: "Room 201",
      schedule: "Mon, Wed, Fri 9:00 AM"
    },
    {
      id: 2,
      name: "Science 9B",
      subject: "Science",
      grade: 9,
      teacher: "Prof. Michael Chen",
      studentCount: 24,
      activeStudents: 23,
      room: "Lab 105",
      schedule: "Tue, Thu 10:30 AM"
    },
    {
      id: 3,
      name: "English 11C",
      subject: "English",
      grade: 11,
      teacher: "Ms. Emily Davis",
      studentCount: 22,
      activeStudents: 22,
      room: "Room 304",
      schedule: "Daily 2:00 PM"
    },
    {
      id: 4,
      name: "History 12A",
      subject: "History",
      grade: 12,
      teacher: "Dr. Robert Wilson",
      studentCount: 20,
      activeStudents: 19,
      room: "Room 208",
      schedule: "Mon, Wed 11:00 AM"
    }
  ];

  // Test configuration state
  const [testConfig, setTestConfig] = useState({
    title: '',
    duration: 60,
    totalMarks: 100,
    instructions: 'Read all questions carefully before answering. Choose the best option for each question.',
    passingMarks: 60,
    maxAttempts: 1,
    randomizeQuestions: false,
    randomizeOptions: false,
    showResultsImmediately: true,
    allowReview: true,
    autoSubmit: true,
    preventTabSwitching: false,
    startDateTime: '',
    endDateTime: '',
    timeZone: 'UTC'
  });

  const tabs = [
    { id: 'builder', label: 'Test Builder', icon: 'FileText' },
    { id: 'config', label: 'Configuration', icon: 'Settings' },
    { id: 'assign', label: 'Assign Classes', icon: 'Users' }
  ];

  const handleQuestionSelect = (question) => {
    const isSelected = selectedQuestions.some(q => q.id === question.id);
    
    if (isSelected) {
      setSelectedQuestions(prev => prev.filter(q => q.id !== question.id));
    } else {
      setSelectedQuestions(prev => [...prev, question]);
    }
  };

  const handleRemoveQuestion = (questionId) => {
    setSelectedQuestions(prev => prev.filter(q => q.id !== questionId));
  };

  const handleReorderQuestions = (fromIndex, toIndex, updatedQuestions = null) => {
    if (updatedQuestions) {
      setSelectedQuestions(updatedQuestions);
      return;
    }

    if (fromIndex === null || toIndex === null) return;

    const newQuestions = [...selectedQuestions];
    const [movedQuestion] = newQuestions.splice(fromIndex, 1);
    newQuestions.splice(toIndex, 0, movedQuestion);
    setSelectedQuestions(newQuestions);
  };

  const handleConfigChange = (field, value) => {
    setTestConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleClassToggle = (classId) => {
    setSelectedClasses(prev => 
      prev.includes(classId)
        ? prev.filter(id => id !== classId)
        : [...prev, classId]
    );
  };

  const handleSaveTest = () => {
    console.log('Saving test as draft...', {
      config: testConfig,
      questions: selectedQuestions
    });
    // Mock save functionality
    alert('Test saved as draft successfully!');
  };

  const handleScheduleTest = () => {
    if (!testConfig.title.trim()) {
      alert('Please enter a test title');
      return;
    }
    if (selectedQuestions.length === 0) {
      alert('Please select at least one question');
      return;
    }
    if (!testConfig.startDateTime || !testConfig.endDateTime) {
      alert('Please set start and end date/time');
      return;
    }

    console.log('Scheduling test...', {
      config: testConfig,
      questions: selectedQuestions
    });
    alert('Test scheduled successfully!');
  };

  const handleAssignTest = () => {
    if (selectedClasses.length === 0) {
      alert('Please select at least one class');
      return;
    }

    console.log('Assigning test to classes...', {
      config: testConfig,
      questions: selectedQuestions,
      classes: selectedClasses
    });
    alert(`Test assigned to ${selectedClasses.length} classes successfully!`);
  };

  const handlePreviewTest = () => {
    if (selectedQuestions.length === 0) {
      alert('Please select at least one question to preview');
      return;
    }
    setShowPreview(true);
  };

  const previewTestData = {
    title: testConfig.title || 'Untitled Test',
    duration: testConfig.duration,
    totalMarks: testConfig.totalMarks,
    questions: selectedQuestions
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <div className="bg-surface border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              iconName="ArrowLeft"
              onClick={() => navigate('/teacher-dashboard')}
            />
            <div>
              <h1 className="text-2xl font-bold text-onSurface">Test Creation & Management</h1>
              <p className="text-sm text-gray-600">Create and manage assessments for your classes</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              iconName="Eye"
              onClick={handlePreviewTest}
              disabled={selectedQuestions.length === 0}
            >
              Preview
            </Button>
            <Button
              variant="primary"
              iconName="Save"
              onClick={handleSaveTest}
              disabled={selectedQuestions.length === 0}
            >
              Save Test
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-1 mt-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-white' :'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-140px)]">
        {/* Left Sidebar - Question Bank */}
        {activeTab === 'builder' && (
          <div className="w-80 flex-shrink-0">
            <QuestionBankSidebar
              questionBanks={questionBanks}
              onQuestionSelect={handleQuestionSelect}
              selectedQuestions={selectedQuestions}
            />
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'builder' && (
            <TestBuilder
              selectedQuestions={selectedQuestions}
              onRemoveQuestion={handleRemoveQuestion}
              onReorderQuestions={handleReorderQuestions}
              testConfig={testConfig}
              onConfigChange={handleConfigChange}
            />
          )}

          {activeTab === 'config' && (
            <div className="p-6 overflow-y-auto h-full">
              <TestConfiguration
                config={testConfig}
                onConfigChange={handleConfigChange}
                onSaveTest={handleSaveTest}
                onScheduleTest={handleScheduleTest}
              />
            </div>
          )}

          {activeTab === 'assign' && (
            <div className="p-6 overflow-y-auto h-full">
              <ClassAssignment
                classes={classes}
                selectedClasses={selectedClasses}
                onClassToggle={handleClassToggle}
                onAssignTest={handleAssignTest}
              />
            </div>
          )}
        </div>
      </div>

      {/* Test Preview Modal */}
      <TestPreview
        test={previewTestData}
        isVisible={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </div>
  );
};

export default TestCreationAndManagement;