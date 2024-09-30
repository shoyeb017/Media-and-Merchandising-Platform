import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [username, setUsername] = useState("");

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
      <div className="navbar-container3">
        <div className="logo-container3">
          <p className="logo-title3">MMP</p>
        </div>
        <div className="menu-container3">
          <ul className="menu-list3">
            <Link to={`/${username}/home`}>
              <li className="menu-list-item3">
                <i class="fa fa-home"></i> Home
              </li>
            </Link>
            <Link to={`/${username}/mediaform`}>
              <li className="menu-list-item3">
              <i class="fa-solid fa-folder-plus"></i>Add Media
              </li>
            </Link>
            <Link to={`/${username}/company/collaborate`}>
              <li className="menu-list-item3">
              <i class="fa-solid fa-handshake"></i>Collaborate
              </li>
            </Link>
          </ul>
        </div>
        <Link to={`/${username}/profile`} className="profile-text3">
          <i className="fa fa-user"></i>
        </Link>
        <Link to="/" className="logout-btn3">
          Logout
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
