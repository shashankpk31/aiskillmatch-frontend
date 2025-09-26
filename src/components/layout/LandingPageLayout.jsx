import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

const LandingPageLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPageLayout;