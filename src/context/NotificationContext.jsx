import React, { createContext, useState, useContext } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      user: 'User A',
      message: 'liked your post.',
      timestamp: Date.now() - 5000, // 5 seconds ago
    },
    {
      id: 2,
      user: 'User B',
      message: 'commented on your post.',
      timestamp: Date.now() - 10000, // 10 seconds ago
    },
  ]);

  const addNotification = (notification) => {
    setNotifications((prev) => [
      { id: Date.now(), ...notification },
      ...prev,
    ]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        clearNotifications,
        notificationCount: notifications.length, // จำนวนแจ้งเตือน
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);