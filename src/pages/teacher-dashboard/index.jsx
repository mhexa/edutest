import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './components/DashboardHeader';
import ClassCard from './components/ClassCard';
import UpcomingTestCard from './components/UpcomingTestCard';
import RecentSubmissionCard from './components/RecentSubmissionCard';
import PerformanceSummaryWidget from './components/PerformanceSummaryWidget';
import QuickActionsPanel from './components/QuickActionsPanel';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  // Mock data for classes
  const mockClasses = [
    {
      id: 1,
      name: "Mathematics Grade 10A",
      subject: "Mathematics",
      studentCount: 28,
      testsCount: 12,
      pendingAssignments: 3,
      averageScore: 85,
      recentActivity: "Last test completed 2 days ago"
    },
    {
      id: 2,
      name: "Science Grade 9B",
      subject: "Science",
      studentCount: 32,
      testsCount: 8,
      pendingAssignments: 1,
      averageScore: 78,
      recentActivity: "New assignment submitted 1 hour ago"
    },
    {
      id: 3,
      name: "English Grade 11C",
      subject: "English",
      studentCount: 25,
      testsCount: 15,
      pendingAssignments: 5,
      averageScore: 92,
      recentActivity: "Quiz scheduled for tomorrow"
    },
    {
      id: 4,
      name: "History Grade 8A",
      subject: "History",
      studentCount: 30,
      testsCount: 6,
      pendingAssignments: 2,
      averageScore: 73,
      recentActivity: "Test results published yesterday"
    },
    {
      id: 5,
      name: "Physics Grade 12B",
      subject: "Science",
      studentCount: 22,
      testsCount: 10,
      pendingAssignments: 4,
      averageScore: 88,
      recentActivity: "Lab report due next week"
    },
    {
      id: 6,
      name: "Chemistry Grade 11A",
      subject: "Science",
      studentCount: 26,
      testsCount: 9,
      pendingAssignments: 1,
      averageScore: 81,
      recentActivity: "Practical exam completed"
    }
  ];

  // Mock data for upcoming tests
  const mockUpcomingTests = [
    {
      id: 1,
      title: "Algebra Chapter Test",
      className: "Math Grade 10A",
      studentCount: 28,
      scheduledDate: "2024-12-20T10:00:00",
      duration: 60
    },
    {
      id: 2,
      title: "Periodic Table Quiz",
      className: "Chemistry Grade 11A",
      studentCount: 26,
      scheduledDate: "2024-12-21T14:30:00",
      duration: 45
    },
    {
      id: 3,
      title: "Shakespeare Literature Test",
      className: "English Grade 11C",
      studentCount: 25,
      scheduledDate: "2024-12-22T09:15:00",
      duration: 90
    },
    {
      id: 4,
      title: "World War II Assessment",
      className: "History Grade 8A",
      studentCount: 30,
      scheduledDate: "2024-12-23T11:00:00",
      duration: 75
    }
  ];

  // Mock data for recent submissions
  const mockRecentSubmissions = [
    {
      id: 1,
      studentName: "Emma Johnson",
      testTitle: "Geometry Quiz",
      score: 94,
      submittedAt: "2024-12-19T15:30:00",
      questionsAnswered: 18,
      totalQuestions: 20
    },
    {
      id: 2,
      studentName: "Michael Chen",
      testTitle: "Chemical Reactions Test",
      score: 87,
      submittedAt: "2024-12-19T14:45:00",
      questionsAnswered: 22,
      totalQuestions: 25
    },
    {
      id: 3,
      studentName: "Sarah Williams",
      testTitle: "Poetry Analysis",
      score: 76,
      submittedAt: "2024-12-19T13:20:00",
      questionsAnswered: 15,
      totalQuestions: 15
    },
    {
      id: 4,
      studentName: "David Rodriguez",
      testTitle: "Ancient Civilizations",
      score: 82,
      submittedAt: "2024-12-19T12:10:00",
      questionsAnswered: 28,
      totalQuestions: 30
    },
    {
      id: 5,
      studentName: "Lisa Thompson",
      testTitle: "Physics Laws Quiz",
      score: 91,
      submittedAt: "2024-12-19T11:55:00",
      questionsAnswered: 12,
      totalQuestions: 12
    }
  ];

  // Mock performance summary data
  const mockPerformanceData = {
    totalStudents: 163,
    testsThisWeek: 8,
    averagePerformance: 83,
    pendingReviews: 12
  };

  // Filter classes based on search and filter criteria
  const filteredClasses = mockClasses.filter(classItem => {
    const matchesSearch = classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classItem.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === 'all' || classItem.subject.toLowerCase() === filterBy;
    return matchesSearch && matchesFilter;
  });

  const handleCreateTest = (classId) => {
    navigate('/test-creation-and-management', { state: { classId } });
  };

  const handleViewResults = (classId) => {
    navigate('/results-and-analytics-dashboard', { state: { classId } });
  };

  const handleManageStudents = (classId) => {
    // Navigate to student management (not implemented in this scope)
    console.log('Manage students for class:', classId);
  };

  const handleReviewSubmission = (submissionId) => {
    navigate('/results-and-analytics-dashboard', { state: { submissionId } });
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'create-test': navigate('/test-creation-and-management');
        break;
      case 'upload-pdf': navigate('/pdf-upload-and-processing');
        break;
      case 'view-analytics': navigate('/results-and-analytics-dashboard');
        break;
      case 'schedule-test': navigate('/test-creation-and-management', { state: { mode: 'schedule' } });
        break;
      default:
        console.log('Unknown action:', actionId);
    }
  };

  const handleBulkAction = (action) => {
    switch (action) {
      case 'export':
        // Handle export functionality
        console.log('Exporting data...');
        break;
      case 'create-test': navigate('/test-creation-and-management');
        break;
      default:
        console.log('Unknown bulk action:', action);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterBy={filterBy}
        onFilterChange={setFilterBy}
        onBulkAction={handleBulkAction}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area - 8 columns */}
          <div className="lg:col-span-8">
            {activeTab === 'overview' && (
              <div>
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Classes</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredClasses.slice(0, 4).map((classItem) => (
                      <ClassCard
                        key={classItem.id}
                        classData={classItem}
                        onCreateTest={handleCreateTest}
                        onViewResults={handleViewResults}
                        onManageStudents={handleManageStudents}
                      />
                    ))}
                  </div>
                </div>

                {filteredClasses.length > 4 && (
                  <div className="text-center">
                    <button
                      onClick={() => setActiveTab('classes')}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View All Classes ({filteredClasses.length})
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'classes' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">All Classes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredClasses.map((classItem) => (
                    <ClassCard
                      key={classItem.id}
                      classData={classItem}
                      onCreateTest={handleCreateTest}
                      onViewResults={handleViewResults}
                      onManageStudents={handleManageStudents}
                    />
                  ))}
                </div>
              </div>
            )}

            {(activeTab === 'tests' || activeTab === 'results' || activeTab === 'analytics') && (
              <div className="text-center py-12">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {activeTab === 'tests' && 'Test Management'}
                    {activeTab === 'results' && 'Results & Analytics'}
                    {activeTab === 'analytics' && 'Advanced Analytics'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Navigate to the dedicated section for detailed {activeTab} management.
                  </p>
                  <button
                    onClick={() => {
                      if (activeTab === 'tests') navigate('/test-creation-and-management');
                      if (activeTab === 'results' || activeTab === 'analytics') navigate('/results-and-analytics-dashboard');
                    }}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Go to {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - 4 columns */}
          <div className="lg:col-span-4 space-y-6">
            <PerformanceSummaryWidget data={mockPerformanceData} />

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Tests</h3>
              <div className="space-y-3">
                {mockUpcomingTests.slice(0, 3).map((test) => (
                  <UpcomingTestCard key={test.id} test={test} />
                ))}
              </div>
              {mockUpcomingTests.length > 3 && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => navigate('/test-creation-and-management')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View All Tests
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Submissions</h3>
              <div className="space-y-3">
                {mockRecentSubmissions.slice(0, 4).map((submission) => (
                  <RecentSubmissionCard
                    key={submission.id}
                    submission={submission}
                    onReview={handleReviewSubmission}
                  />
                ))}
              </div>
              {mockRecentSubmissions.length > 4 && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => navigate('/results-and-analytics-dashboard')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View All Submissions
                  </button>
                </div>
              )}
            </div>

            <QuickActionsPanel onAction={handleQuickAction} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;