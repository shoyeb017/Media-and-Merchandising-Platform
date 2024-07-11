// src/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../user/common/Navbar.jsx';

const Layout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Layout;
