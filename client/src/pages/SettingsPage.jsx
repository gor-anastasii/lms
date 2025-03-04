import React from 'react';
import Navbar from '../components/Navbar';
import Settings from '../components/Settings/Settings';

const SettingsPage = () => {
  return (
    <>
      <Navbar />

      <div className="content">
        <Settings />
      </div>
    </>
  );
};

export default SettingsPage;
