import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import TeacherDashboard from "pages/teacher-dashboard";
import StudentTestInterface from "pages/student-test-interface";
import StudentDashboard from "pages/student-dashboard";
import ResultsAndAnalyticsDashboard from "pages/results-and-analytics-dashboard";
import PdfUploadAndProcessing from "pages/pdf-upload-and-processing";
import TestCreationAndManagement from "pages/test-creation-and-management";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<TeacherDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/student-test-interface" element={<StudentTestInterface />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/results-and-analytics-dashboard" element={<ResultsAndAnalyticsDashboard />} />
        <Route path="/pdf-upload-and-processing" element={<PdfUploadAndProcessing />} />
        <Route path="/test-creation-and-management" element={<TestCreationAndManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;