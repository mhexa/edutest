import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import ClassCard from './components/ClassCard';
import UpcomingTestCard from './components/UpcomingTestCard';
import PracticeLessonCard from './components/PracticeLessonCard';
import RecentResultCard from './components/RecentResultCard';
import QuickStatsCard from './components/QuickStatsCard';
import NotificationPanel from './components/NotificationPanel';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock student data
  const studentInfo = {
    name: "Alex Johnson",
    studentId: "STU2024001",
    grade: "Grade 10",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  };

  // Mock classes data
  const classesData = [
    {
      id: 1,
      name: "Advanced Mathematics",
      subject: "Mathematics",
      teacher: "Dr. Sarah Wilson",
      upcomingTests: 2,
      recentScore: 85,
      practiceAvailable: 5,
      completionRate: 78,
      nextTestDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      color: "#3B82F6"
    },
    {
      id: 2,
      name: "Physics Fundamentals",
      subject: "Physics",
      teacher: "Prof. Michael Chen",
      upcomingTests: 1,
      recentScore: 92,
      practiceAvailable: 3,
      completionRate: 85,
      nextTestDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      color: "#10B981"
    },
    {
      id: 3,
      name: "English Literature",
      subject: "English",
      teacher: "Ms. Emily Davis",
      upcomingTests: 0,
      recentScore: 78,
      practiceAvailable: 7,
      completionRate: 65,
      nextTestDate: null,
      color: "#8B5CF6"
    },
    {
      id: 4,
      name: "World History",
      subject: "History",
      teacher: "Mr. Robert Taylor",
      upcomingTests: 1,
      recentScore: 88,
      practiceAvailable: 4,
      completionRate: 72,
      nextTestDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      color: "#F59E0B"
    }
  ];

  // Mock upcoming tests
  const upcomingTests = [
    {
      id: 1,
      title: "Calculus Integration Test",
      subject: "Mathematics",
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      duration: 90,
      questionsCount: 25,
      difficulty: "Hard",
      status: "Due Soon"
    },
    {
      id: 2,
      title: "Thermodynamics Quiz",
      subject: "Physics",
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      duration: 45,
      questionsCount: 15,
      difficulty: "Medium",
      status: "Available"
    },
    {
      id: 3,
      title: "World War II Assessment",
      subject: "History",
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      duration: 60,
      questionsCount: 20,
      difficulty: "Medium",
      status: "Available"
    }
  ];

  // Mock practice lessons
  const practiceLessons = [
    {
      id: 1,
      title: "Quadratic Equations Practice",
      subject: "Mathematics",
      topic: "Algebra",
      questionsCount: 20,
      estimatedTime: 30,
      difficulty: "Medium",
      completionRate: 75,
      lastAttempt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      isNew: false
    },
    {
      id: 2,
      title: "Newton\'s Laws of Motion",
      subject: "Physics",
      topic: "Mechanics",
      questionsCount: 15,
      estimatedTime: 25,
      difficulty: "Easy",
      completionRate: 0,
      lastAttempt: null,
      isNew: true
    },
    {
      id: 3,
      title: "Shakespeare\'s Sonnets",
      subject: "English",
      topic: "Literature",
      questionsCount: 12,
      estimatedTime: 20,
      difficulty: "Medium",
      completionRate: 100,
      lastAttempt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      isNew: false
    },
    {
      id: 4,
      title: "Ancient Civilizations",
      subject: "History",
      topic: "Ancient History",
      questionsCount: 18,
      estimatedTime: 35,
      difficulty: "Hard",
      completionRate: 50,
      lastAttempt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      isNew: false
    }
  ];

  // Mock recent results
  const recentResults = [
    {
      id: 1,
      title: "Trigonometry Test",
      subject: "Mathematics",
      type: "Test",
      score: 92,
      totalQuestions: 20,
      correctAnswers: 18,
      completedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      timeSpent: 75,
      grade: "A",
      feedback: "Excellent work! Strong understanding of trigonometric concepts."
    },
    {
      id: 2,
      title: "Optics Practice Quiz",
      subject: "Physics",
      type: "Practice",
      score: 85,
      totalQuestions: 15,
      correctAnswers: 13,
      completedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      timeSpent: 30,
      grade: "B+",
      feedback: "Good understanding, review refraction concepts."
    },
    {
      id: 3,
      title: "Poetry Analysis",
      subject: "English",
      type: "Quiz",
      score: 78,
      totalQuestions: 10,
      correctAnswers: 8,
      completedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      timeSpent: 45,
      grade: "B",
      feedback: "Well done! Focus more on literary devices."
    }
  ];

  // Mock quick stats
  const quickStats = {
    totalClasses: 4,
    pendingTests: 3,
    averageScore: 85,
    practiceCompleted: 12,
    streak: 5,
    totalTestsCompleted: 18
  };

  // Mock notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "test",
      title: "New Test Available",
      message: "Calculus Integration Test is now available. Due in 2 days.",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
      actionRequired: true
    },
    {
      id: 2,
      type: "grade",
      title: "Grade Posted",
      message: "Your Trigonometry Test grade has been posted: 92% (A)",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      actionRequired: false
    },
    {
      id: 3,
      type: "reminder",
      title: "Practice Reminder",
      message: "You haven\'t practiced Physics this week. Try the Newton\'s Laws lesson!",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: true,
      actionRequired: false
    },
    {
      id: 4,
      type: "announcement",
      title: "Class Update",
      message: "Dr. Wilson has posted new study materials for Advanced Mathematics.",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      read: true,
      actionRequired: false
    }
  ]);

  // Event handlers
  const handleStartTest = (testId) => {
    navigate('/student-test-interface', { state: { testId } });
  };

  const handlePracticeNow = (lessonId) => {
    navigate('/student-test-interface', { state: { lessonId, isPractice: true } });
  };

  const handleViewDetails = (id) => {
    navigate('/results-and-analytics-dashboard', { state: { resultId: id } });
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Filter data based on search and filter
  const filteredClasses = classesData.filter(classItem => {
    const matchesSearch = classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classItem.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'pending') return matchesSearch && classItem.upcomingTests > 0;
    if (selectedFilter === 'completed') return matchesSearch && classItem.upcomingTests === 0;
    
    return matchesSearch;
  });

  const filteredTests = upcomingTests.filter(test =>
    test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLessons = practiceLessons.filter(lesson =>
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredResults = recentResults.filter(result =>
    result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Icon name="GraduationCap" size={20} color="white" />
                </div>
                <span className="text-xl font-bold text-gray-900">EduTest Pro</span>
              </div>
              
              <nav className="hidden md:flex space-x-6">
                <button
                  onClick={() => handleNavigation('/student-dashboard')}
                  className="text-blue-600 font-medium"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => handleNavigation('/student-test-interface')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Tests
                </button>
                <button
                  onClick={() => handleNavigation('/results-and-analytics-dashboard')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Results
                </button>
              </nav>
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Icon name="Bell" size={20} />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                )}
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img 
                    src={studentInfo.avatar} 
                    alt={studentInfo.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-gray-900">{studentInfo.name}</div>
                  <div className="text-xs text-gray-500">{studentInfo.grade}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {studentInfo.name}!
          </h1>
          <p className="text-gray-600">
            Ready to continue your learning journey? You have {upcomingTests.length} upcoming tests.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search classes, tests, or subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex space-x-2">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Classes</option>
              <option value="pending">With Pending Tests</option>
              <option value="completed">No Pending Tests</option>
            </select>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
          {[
            { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
            { id: 'tests', label: 'Upcoming Tests', icon: 'FileText' },
            { id: 'practice', label: 'Practice', icon: 'BookOpen' },
            { id: 'results', label: 'Recent Results', icon: 'Award' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content based on active tab */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Classes Grid */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">My Classes</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredClasses.map((classData) => (
                      <ClassCard
                        key={classData.id}
                        classData={classData}
                        onStartTest={handleStartTest}
                        onPracticeNow={handlePracticeNow}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button
                      variant="outline"
                      onClick={() => handleNavigation('/student-test-interface')}
                      iconName="Play"
                      iconPosition="left"
                      className="h-16 flex-col"
                    >
                      Start Test
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setActiveTab('practice')}
                      iconName="BookOpen"
                      iconPosition="left"
                      className="h-16 flex-col"
                    >
                      Practice
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleNavigation('/results-and-analytics-dashboard')}
                      iconName="BarChart3"
                      iconPosition="left"
                      className="h-16 flex-col"
                    >
                      View Results
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setActiveTab('tests')}
                      iconName="Calendar"
                      iconPosition="left"
                      className="h-16 flex-col"
                    >
                      Schedule
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tests' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Tests</h2>
                <div className="space-y-4">
                  {filteredTests.map((test) => (
                    <UpcomingTestCard
                      key={test.id}
                      test={test}
                      onStartTest={handleStartTest}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'practice' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Practice Lessons</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredLessons.map((lesson) => (
                    <PracticeLessonCard
                      key={lesson.id}
                      lesson={lesson}
                      onPracticeNow={handlePracticeNow}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'results' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Results</h2>
                <div className="space-y-4">
                  {filteredResults.map((result) => (
                    <RecentResultCard
                      key={result.id}
                      result={result}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <QuickStatsCard stats={quickStats} />

            {/* Notifications */}
            <NotificationPanel
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;