import React from 'react';
import Header from '../../components/Header/Header';
import { Route, Routes } from 'react-router';
import NavbarAdmin from '../../components/Navbar/NavbarAdmin';
import AdminTeachers from '../../components/Admin/AdminTeachers';
import AdminCourses from '../../components/Admin/AdminCourses';

const AdminPage = () => {
  return (
    <>
      <Header />
      <main>
        <NavbarAdmin />
        <div className="content">
          <Routes>
            <Route path="/" element={<AdminTeachers />} />
            <Route path="/courses" element={<AdminCourses />} />
          </Routes>
        </div>
      </main>
    </>
  );
};

export default AdminPage;
