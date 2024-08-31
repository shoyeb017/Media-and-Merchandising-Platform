import React, { useState, useEffect } from 'react';
import './Notification.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const Notification = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const user_id = localStorage.getItem('user_id'); // Assuming user_id is stored in localStorage

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch('http://localhost:5000/notifications', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user_id })
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch notifications');
                }

                const notifications = await response.json();
                setNotifications(notifications);
            } catch (err) {
                console.error('Failed to fetch notifications:', err);
            }
        };

        fetchNotifications();
    }, [user_id]);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    return (
        <div className="notification-container">
            <button className="notification-button" onClick={toggleNotifications}>
                <FontAwesomeIcon icon={faBell} />
            </button>

            {showNotifications && (
                <div className="notification-bar">
                    {notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                            <div key={index} className="notification-item">
                                <h3>{notification.headline}</h3>
                                <p className="notification-media-name">
                                    <em>{notification.media_title}</em>
                                </p>
                                <span className="notification-date">
                                    {new Date(notification.news_date).toLocaleDateString()}
                                </span>
                                <p className="notification-desc">{notification.description}</p>
                            </div>
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
