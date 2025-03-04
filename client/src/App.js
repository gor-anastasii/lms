import { Routes, Route } from 'react-router';
import React from 'react';

import AllCoursePage from './pages/AllCoursePage';
import AuthPage from './pages/AuthPage';

import Header from './components/Header/Header';
import CoursePreviewPage from './pages/СoursePreviewPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<AllCoursePage />} />
          <Route path="/auth/*" element={<AuthPage />} />
          <Route path="/course/:id" element={<CoursePreviewPage />} />
          <Route path="/settings/general" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
