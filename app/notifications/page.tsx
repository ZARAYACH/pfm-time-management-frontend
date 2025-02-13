"use client"
import {useEffect, useState} from 'react';
import NotificationBell from '@components/common/NotificationBell';
import {Notification} from '@/app/types/types';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    fetch('/api/notifications')
      .then(res => res.json())
      .then(setNotifications);
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <NotificationBell/>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className="p-4 border-b last:border-b-0 hover:bg-gray-50"
          >
            <p className={!notification.read ? "font-semibold" : ""}>
              {notification.message}
            </p>
            <small className="text-gray-500">{new Date(notification.date).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;