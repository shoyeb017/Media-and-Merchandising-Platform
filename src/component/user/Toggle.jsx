import React, { useState } from 'react';

function Toggle() {
  const [active, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!active);
    document.querySelectorAll(".container, .movie-list-title, .navbar-container, .sidebar, .left-menu-icon, .toggle").forEach((item) => {
      item.classList.toggle("active");
    });
  };

  return (
    <div className={`toggle ${active ? 'active' : ''}`} onClick={toggleClass}>
      <i className="fas fa-moon toggle-icon"></i>
      <i className="fas fa-sun toggle-icon"></i>
      <div className={`toggle-ball ${active ? 'active' : ''}`}></div>
    </div>
  );
}

export default Toggle;
