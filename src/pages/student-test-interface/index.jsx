import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import TestHeader from './components/TestHeader';
import QuestionPalette from './components/QuestionPalette';
import QuestionDisplay from './components/QuestionDisplay';
import NavigationControls from './components/NavigationControls';
import SubmissionModal from './components/SubmissionModal';
import AutoSaveIndicator from './components/AutoSaveIndicator';

const StudentTestInterface = () => {
  const navigate = useNavigate();
  
  // Mock test data
  const mockTestData = {
    id: "test_001",
    title: "Mathematics - Algebra and Geometry",
    duration: 7200, // 2 hours in seconds
    student: {
      id: "student_001",
      name: "Sarah Johnson"
    },
    questions: [
      {
        id: "q1",
        question: "What is the value of x in the equation 2x + 5 = 15?",
        options: ["x = 5", "x = 10", "x = 7.5", "x = 2.5"],
        marks: 2,
        image: null,
        selectedAnswer: null,
        isMarkedForReview: false
      },
      {
        id: "q2",
        question: "Which of the following is the correct formula for the area of a circle?",
        options: ["πr²", "2πr", "πd", "r²"],
        marks: 1,
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=200&fit=crop",
        selectedAnswer: null,
        isMarkedForReview: false
      },
      {
        id: "q3",
        question: "If a triangle has sides of length 3, 4, and 5 units, what type of triangle is it?",
        options: ["Equilateral triangle", "Isosceles triangle", "Right triangle", "Scalene triangle"],
        marks: 2,
        image: null,
        selectedAnswer: null,
        isMarkedForReview: false
      },
      {
        id: "q4",
        question: "What is the slope of a line passing through points (2, 3) and (6, 11)?",
        options: ["2", "4", "1/2", "8"],
        marks: 3,
        image: null,
        selectedAnswer: null,
        isMarkedForReview: false
      },
      {
        id: "q5",
        question: "Which of the following represents a quadratic equation?",
        options: ["y = 2x + 3", "y = x² + 2x + 1", "y = 1/x", "y = 2^x"],
        marks: 1,
        image: null,
        selectedAnswer: null,
        isMarkedForReview: false
      },
      {
        id: "q6",
        question: "What is the perimeter of a rectangle with length 8 cm and width 5 cm?",
        options: ["13 cm", "26 cm", "40 cm", "18 cm"],
        marks: 2,
        image: null,
        selectedAnswer: null,
        isMarkedForReview: false
      },
      {
        id: "q7",
        question: "If log₂(8) = x, what is the value of x?",
        options: ["2", "3", "4", "8"],
        marks: 2,
        image: null,
        selectedAnswer: null,
        isMarkedForReview: false
      },
      {
        id: "q8",
        question: "What is the volume of a cube with side length 4 units?",
        options: ["16 cubic units", "64 cubic units", "12 cubic units", "48 cubic units"],
        marks: 2,
        image: null,
        selectedAnswer: null,
        isMarkedForReview: false
      }
    ]
  };

  const [testData, setTestData] = useState(mockTestData);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(mockTestData.duration);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [isPaletteCollapsed, setIsPaletteCollapsed] = useState(false);
  const [lastSaved, setLastSaved] = useState(new Date());
  const [isSaving, setIsSaving] = useState(false);

  // Auto-save functionality
  const autoSave = useCallback(async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setLastSaved(new Date());
    setIsSaving(false);
  }, []);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-save when answers change
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      autoSave();
    }, 2000);

    return () => clearTimeout(saveTimer);
  }, [testData.questions, autoSave]);

  const handleAnswerSelect = (answerIndex) => {
    setTestData(prev => ({
      ...prev,
      questions: prev.questions.map((q, index) => 
        index === currentQuestion 
          ? { ...q, selectedAnswer: answerIndex }
          : q
      )
    }));
  };

  const handleMarkForReview = () => {
    setTestData(prev => ({
      ...prev,
      questions: prev.questions.map((q, index) => 
        index === currentQuestion 
          ? { ...q, isMarkedForReview: !q.isMarkedForReview }
          : q
      )
    }));
  };

  const handleQuestionNavigation = (direction) => {
    if (direction === 'next' && currentQuestion < testData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else if (direction === 'previous' && currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleQuestionSelect = (questionIndex) => {
    setCurrentQuestion(questionIndex);
  };

  const handleSubmitTest = () => {
    setIsSubmissionModalOpen(true);
  };

  const handleConfirmSubmission = async () => {
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    navigate('/results-and-analytics-dashboard');
  };

  const getTestStats = () => {
    const answered = testData.questions.filter(q => q.selectedAnswer !== null).length;
    const markedForReview = testData.questions.filter(q => q.isMarkedForReview).length;
    const notAnswered = testData.questions.length - answered;
    
    return {
      total: testData.questions.length,
      answered,
      markedForReview,
      notAnswered
    };
  };

  const currentQuestionData = testData.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TestHeader
        studentName={testData.student.name}
        testTitle={testData.title}
        timeRemaining={timeRemaining}
        onSubmit={handleSubmitTest}
      />

      <div className="flex flex-1 overflow-hidden">
        <QuestionPalette
          questions={testData.questions}
          currentQuestion={currentQuestion}
          onQuestionSelect={handleQuestionSelect}
          isCollapsed={isPaletteCollapsed}
          onToggleCollapse={() => setIsPaletteCollapsed(!isPaletteCollapsed)}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-4 flex justify-between items-center">
                <AutoSaveIndicator lastSaved={lastSaved} isSaving={isSaving} />
                <div className="text-sm text-gray-500">
                  Total Marks: {testData.questions.reduce((sum, q) => sum + q.marks, 0)}
                </div>
              </div>

              <QuestionDisplay
                question={currentQuestionData}
                questionNumber={currentQuestion + 1}
                totalQuestions={testData.questions.length}
                selectedAnswer={currentQuestionData.selectedAnswer}
                onAnswerSelect={handleAnswerSelect}
              />
            </div>
          </div>

          <NavigationControls
            currentQuestion={currentQuestion}
            totalQuestions={testData.questions.length}
            onPrevious={() => handleQuestionNavigation('previous')}
            onNext={() => handleQuestionNavigation('next')}
            onMarkForReview={handleMarkForReview}
            isMarkedForReview={currentQuestionData.isMarkedForReview}
            onSubmit={handleSubmitTest}
          />
        </div>
      </div>

      <SubmissionModal
        isOpen={isSubmissionModalOpen}
        onClose={() => setIsSubmissionModalOpen(false)}
        onConfirm={handleConfirmSubmission}
        testStats={getTestStats()}
      />
    </div>
  );
};

export default StudentTestInterface;