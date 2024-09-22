import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Notification from '../notification/Notification';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [username, setUsername] = useState('');


  const handleLogout = () => {
    localStorage.clear();
  };

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
    console.log(storedUsername);
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container1">
        <div className="logo-container1">
          <p className="logo-title">MMP</p>
        </div>
        <div className="menu-container1">
          <ul className="menu-list1">
            <li className="menu-list-item1">
              <Link to={`/${username}/home`}><i class="fa fa-home"></i> Home</Link>
            </li>
            <li className="menu-list-item1">
              <Link to={`/${username}/search`}><i class="fa fa-search"></i>Search</Link>
            </li>
            <li className="menu-list-item1">
              <Link to={`/${username}/mylist`}><i class="fa fa-list"></i>My List</Link>
            </li>
            <li className="menu-list-item1">
              <Link to={`/${username}/discussion`}><i class="fa fa-comments"></i>Discussion</Link>
            </li>
            <li className="menu-list-item1">
              <Link to={`/${username}/company`}><i class="fa fa-building"></i>Company</Link>
            </li>
            <li className="menu-list-item1">
              <Link to={`/${username}/merch`}><i class="fa fa-shopping-bag"></i>Merchandiser</Link>
            </li>
          </ul>
        </div>
        <Notification />
        <button className="orders-btn">
          <Link to={`/${username}/merch/order`} className="order-button">
            <i className="fa fa-shopping-cart"></i> {/* Replace with the desired FontAwesome icon */}
          </Link>
        </button>


        <Link to={`/${username}/profile`} className="profile-text1"><i className="fa fa-user"></i></Link>
        <Link to="/" className="logout-btn1" onClick={handleLogout}>Logout</Link>
      </div>
    </div>
  );
}

export default Navbar;
