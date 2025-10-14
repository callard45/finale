import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { HomePageComplete } from "./screens/HomePageComplete";
import { LoginPage } from "./screens/LoginPage";
import { Dashboard } from "./screens/Dashboard/Dashboard";
import { AIInterview } from "./screens/AIInterview";
import { Generator } from "./screens/Generator";
import { Profile } from "./screens/Profile";
import { Network } from "./screens/Network";
import { JobTracker } from "./screens/JobTracker";
import { CoachDashboard } from "./screens/CoachDashboard/CoachDashboard";
import { Analytics } from "./screens/Analytics/Analytics";
import { AnalyticsOptimized } from "./screens/Analytics/AnalyticsOptimized";
import { CoachJobTracker } from "./screens/CoachJobTracker";
import { CoachSettings } from "./screens/CoachSettings/CoachSettings";
import { StudentEducation } from "./screens/StudentEducation";
import { EditableDivDemo } from "./screens/EditableDivDemo";
import { ProfileEditorDemo } from "./screens/Profile/ProfileEditorDemo";
import { ProfileImageDemo } from "./screens/Profile/ProfileImageDemo";
import { AuthProvider, useAuth } from "./lib/auth";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Routes component with auth check
const AppRoutes = () => {
  const { user } = useAuth();
  
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePageComplete />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/editable-div-demo" element={<EditableDivDemo />} />
      <Route path="/profile-editor-demo" element={<ProfileEditorDemo />} />
      <Route path="/profile-image-demo" element={<ProfileImageDemo />} />
      
      {/* Student Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/ai-interview" element={
        <ProtectedRoute>
          <AIInterview />
        </ProtectedRoute>
      } />
      <Route path="/generator" element={
        <ProtectedRoute>
          <Generator />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/network" element={
        <ProtectedRoute>
          <Network />
        </ProtectedRoute>
      } />
      <Route path="/job-tracker" element={
        <ProtectedRoute>
          <JobTracker />
        </ProtectedRoute>
      } />
      
      {/* Coach Routes */}
      <Route path="/coach" element={
        <ProtectedRoute>
          <CoachDashboard />
        </ProtectedRoute>
      } />
      <Route path="/analytics" element={
        <ProtectedRoute>
          <Analytics />
        </ProtectedRoute>
      } />
      <Route path="/analytics-optimized" element={
        <ProtectedRoute>
          <AnalyticsOptimized />
        </ProtectedRoute>
      } />
      <Route path="/coach-job-tracker" element={
        <ProtectedRoute>
          <CoachJobTracker />
        </ProtectedRoute>
      } />
      <Route path="/coach-settings" element={
        <ProtectedRoute>
          <CoachSettings />
        </ProtectedRoute>
      } />
      <Route path="/student-education/:studentId" element={
        <ProtectedRoute>
          <StudentEducation />
        </ProtectedRoute>
      } />
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to={user?.role === 'coach' ? "/coach" : "/"} replace />} />
    </Routes>
  );
};

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};