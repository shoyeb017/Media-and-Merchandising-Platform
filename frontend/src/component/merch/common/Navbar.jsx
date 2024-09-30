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
      <div className="navbar-container1">
        <div className="logo-container1">
          <h1 className="logo-title1">MMP</h1>
        </div>
        <div className="menu-container1">
          <ul className="menu-list1">
            <Link to={`/${username}/home`}>
              <li className="menu-list-item1"><i class="fa fa-home"></i>Home</li>
            </Link>

            <Link to={`/${username}/productform`}>
              <li className="menu-list-item1"><i class="fa fa-plus"></i>Add Product</li>
            </Link>

            <Link to={`/${username}/merchandiser/collaborate`}>
              <li className="menu-list-item1"><i class="fa-solid fa-handshake"></i>Collaborate</li>
            </Link>

            <Link to={`/${username}/merchandiser/orders`}>
              <li className="menu-list-item1"><i class="fa-solid fa-truck-fast"></i>Orders</li>
            </Link>
          </ul>
        </div>
        <Link to={`/${username}/profile`} className="profile-text1">
        <i className="fa fa-user"></i>
        </Link>
        <Link to="/" className="logout-btn1">
          Logout
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
