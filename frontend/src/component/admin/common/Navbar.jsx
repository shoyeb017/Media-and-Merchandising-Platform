import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [username, setUsername] = useState("");

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

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container2">
        <div className="logo-container2">
          <h1 className="logo-title2">MMP</h1>
        </div>
        <div className="menu-container2">
          <ul className="menu-list2">
            <Link to={`/${username}/home`}>
              <li className="menu-list-item2">
                <i className="fa-solid fa-chart-line"></i> Statistic
              </li>
            </Link>

            {/* Dropdown2 Button */}
            <li className="menu-list-item2 dropdown2">
              <span className="dropdown2-btn">
                <i className="fa fa-users"></i> Users
              </span>
              <div className="dropdown2-content">
                <Link to={`/${username}/userlist`}>
                  <span className="dropdown2-item">
                    <i className="fa fa-user"></i> User
                  </span>
                </Link>
                <Link to={`/${username}/companylist`}>
                  <span className="dropdown2-item">
                    <i className="fa-solid fa-user-tie"></i> Company
                  </span>
                </Link>
                <Link to={`/${username}/merchandiserlist`}>
                  <span className="dropdown2-item">
                    <i className="fa-solid fa-store"></i> Merchandiser
                  </span>
                </Link>
              </div>
            </li>

            <Link to={`/${username}/viewrole`}>
              <li className="menu-list-item2">
                <i className="fa-solid fa-user-plus"></i> Roles
              </li>
            </Link>
          </ul>
        </div>

        <Link to={`/${username}/profile`} className="profile-text2">
          <i className="fa fa-user"></i>
        </Link>
        <Link to="/" className="logout-btn2" onClick={handleLogout}>
          Logout
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
