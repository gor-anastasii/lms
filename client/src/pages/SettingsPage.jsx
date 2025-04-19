import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Header from '../components/Header/Header';
import Settings from '../components/Settings/Settings';

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
