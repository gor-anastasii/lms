import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Settings from '../components/Settings/Settings';
import Header from '../components/Header/Header';

const SettingsPage = () => {
  return (
    <>
      <Header />
      <main>
        <Navbar />

        <div className="content">
          <Settings />
        </div>
      </main>
    </>
  );
};

export default SettingsPage;
