import React from 'react';
import { Routes, Route } from 'react-router';

import Header from '../../components/Header/Header';
import NavbarTeacher from '../../components/Navbar/NavbarTeacher';
import TeacherCourse from '../../components/Teacher/TeachersCourse';
import TeacherNewCourse from '../../components/Teacher/TeacherNewCourse';
import TeacherCourseDetails from '../../components/Teacher/TeacherCourseDetails';

const TeacherPage = () => {
  return (
    <>
      <Header />
      <main>
        <NavbarTeacher />
        <div className="content">
          <Routes>
            <Route path="/" element={<TeacherCourse />} />
            <Route path="/create" element={<TeacherNewCourse />} />
            <Route path="/course/:id" element={<TeacherCourseDetails />} />
          </Routes>
        </div>
      </main>
    </>
  );
};

export default TeacherPage;
