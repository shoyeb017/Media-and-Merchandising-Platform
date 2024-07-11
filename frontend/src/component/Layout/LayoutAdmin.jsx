import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../admin/common/Navbar.jsx';
import Footer from '../user/common/Footer.jsx';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <NavBar />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
