import React from 'react';
import AdminCreateSection from './components/AdminCreateSection';
import AdminTeacherTable from './components/AdminTeacherTable';

const AdminTeachers = () => {
  return (
    <div className="adminTeachers-container">
      <h1>Управление учетныи записями учителей</h1>

      <AdminCreateSection />

      <AdminTeacherTable />
    </div>
  );
};

export default AdminTeachers;
