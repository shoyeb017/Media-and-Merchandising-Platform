import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <i className="left-menu-icon fas fa-search"></i>
      <i className="left-menu-icon fas fa-home"></i>
      <i className="left-menu-icon fas fa-users"></i>
      <i className="left-menu-icon fas fa-bookmark"></i>
      <i className="left-menu-icon fas fa-tv"></i>
      <i className="left-menu-icon fas fa-hourglass-start"></i>
      <i className="left-menu-icon fas fa-shopping-cart"></i>
    </div>
  );
}

export default Sidebar;
