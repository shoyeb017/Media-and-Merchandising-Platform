import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="logo-container">
          <h1 className="logo">MMP</h1>
        </div>
        <div className="menu-container">
          <ul className="menu-list">
            <li className="menu-list-item">
              <Link to={`/${username}/home`}>Home</Link>
            </li>
          </ul>
        </div>
        <Link to={`/${username}/profile`} className="profile-text">Profile</Link>
        <Link to="/" className="logout-btn">Logout</Link>
      </div>
    </div>
  );
}

export default Navbar;
