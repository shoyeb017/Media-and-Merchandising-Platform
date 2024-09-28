import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Notification from "../notification/Notification";

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
    console.log(storedUsername);
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container1">
        <div className="logo-container1">
          <p className="logo-title">MMP</p>
        </div>
        <div className="menu-container1">
          <ul className="menu-list1">
            <Link to={`/${username}/home`}>
              <li className="menu-list-item1">
                <i class="fa fa-home"></i> Home
              </li>
            </Link>
            <Link to={`/${username}/search`}>
              <li className="menu-list-item1">
                <i class="fa fa-search"></i>Search
              </li>
            </Link>
            <Link to={`/${username}/mylist`}>
              <li className="menu-list-item1">
                <i class="fa fa-list"></i>My List
              </li>
            </Link>
            <Link to={`/${username}/discussion`}>
              <li className="menu-list-item1">
                <i class="fa fa-comments"></i>Discussion
              </li>
            </Link>
            <Link to={`/${username}/company`}>
              <li className="menu-list-item1">
                <i class="fa fa-building"></i>Company
              </li>
            </Link>
            <Link to={`/${username}/merch`}>
              <li className="menu-list-item1">
                <i class="fa fa-shopping-bag"></i>Merchandiser
              </li>
            </Link>
          </ul>
        </div>
        <Notification />
        <button className="orders-btn">
          <Link to={`/${username}/merch/order`} className="order-button">
          <i class="fa-solid fa-truck-fast"></i>{" "}
            {/* Replace with the desired FontAwesome icon */}
          </Link>
        </button>
        <Link to={`/${username}/merch/cart`} className="profile-text1">
          <i className="fa fa-shopping-cart"></i>
        </Link>
        <Link to={`/${username}/profile`} className="profile-text1">
          <i className="fa fa-user"></i>
        </Link>
        <Link to="/" className="logout-btn1" onClick={handleLogout}>
          Logout
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
