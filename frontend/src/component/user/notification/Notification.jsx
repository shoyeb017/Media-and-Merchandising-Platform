import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Notification.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const Notification = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const user_id = localStorage.getItem("user_id");
  const username = localStorage.getItem("username");
  const hideTimeoutRef = useRef(null); // To store timeout reference

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        console.log("user_id:", user_id);
        const response = await fetch("http://localhost:5000/notifications", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }

        const notifications = await response.json();
        setNotifications(notifications);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    };

    fetchNotifications();
  }, [user_id]);

  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current); // Clear any existing hide timeout
    }
    setShowNotifications(true);
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setShowNotifications(false);
    }, 100); // Add a 300ms delay before hiding notifications
  };

  return (
    <div
      className="notification-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="notification-button">
        <FontAwesomeIcon icon={faBell} />
      </button>

      {showNotifications && (
        <div className="notification-bar">
          <div className="notification-bar-header"><i class="fa-regular fa-bell"></i>  Notifications </div>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <Link
                to={`/${username}/media/${notification.media_id}`}
                target="_blank" // Open link in a new tab
                rel="noopener noreferrer" // Security measure
                key={index}
              >
                <div className="notification-item">
                
                  <img
                    src={notification.media_poster}
                    alt={notification.media_title}
                    className="notification-left-side-image"
                  />

                  <div className="notification-right-side">
                    <h3 className="notification-right-side-headline">{notification.headline}</h3>
                    <p className="notification-right-side-media-name">
                      {notification.media_title}
                    </p>
                    <span className="notification-right-side-date">
                      {new Date(notification.news_date).toLocaleDateString()}
                    </span>
                    {/* <p className="notification-right-side-desc">
                      {notification.description}
                    </p> */}
                  </div>
                  <i class="fa-regular fa-bell"></i>
                </div>
              </Link>
            ))
          ) : (
            <p className="no-notifications-msg">No notifications available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
