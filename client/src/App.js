import { Routes, Route } from 'react-router';
import React from 'react';

import AllCoursePage from './pages/AllCoursePage';
import AuthPage from './pages/AuthPage';
import CoursePreviewPage from './pages/СoursePreviewPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<AllCoursePage />} />
        <Route path="/auth/*" element={<AuthPage />} />
        <Route path="/course/:id" element={<CoursePreviewPage />} />
        <Route path="/settings/general" element={<SettingsPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
