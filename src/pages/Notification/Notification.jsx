import React from 'react';
import { Link } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';
import './Notification.css';

const tabs = [
  { name: "home", label: "Home🏠" },
  { name: "explorer", label: "Explorer🌐" },
  { name: "search", label: "Search🔎" },
  { name: "message", label: "Message💬" },
  { name: "notification", label: "Notification🔔" },
  { name: "bookmark", label: "Bookmark📑" },
  { name: "profile", label: "Profile👤" },
  { name: "logout", label: "Logout" },
];

const Notification = () => {
  const { notifications } = useNotification();

  const renderNotifications = (notifications) =>
    notifications.map((notification, index) => (
      <div key={index} className="notification-item">
        <div className="notification-avatar">
          <span className="avatar-icon">👤</span>
        </div>
        <div className="notification-details">
          <h4>{notification.user}</h4>
          <p>{notification.message}</p>
          <small>
            {new Date(notification.timestamp).toLocaleDateString()} |{' '}
            {new Date(notification.timestamp).toLocaleTimeString()}
          </small>
        </div>
      </div>
    ));

  return (
    <div className="layout-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="Navbar-container">
          {tabs.map(({ name, label }) => (
            <Link key={name} to={`/${name}`}>
              <button className="btn">{label}</button>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="notification-page">
          <h2>การแจ้งเตือน</h2>
          <section className="notification-section">
            <h3>ใหม่ล่าสุด</h3>
            {renderNotifications(notifications.slice(0, 5))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Notification;
