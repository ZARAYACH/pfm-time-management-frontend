"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

type Notification = {
  id: string;
  message: string;
  read: boolean;
};

const NotificationBell = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Exemple de fetch API
    fetch("/api/notifications")
      .then(res => res.json())
      .then(data => setNotifications(data));
  }, []);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-full relative"
      >
        🔔
        {notifications.filter(n => !n.read).length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
            {notifications.filter(n => !n.read).length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg py-2">
          {notifications.map(notification => (
            <div 
              key={notification.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => toast.info(notification.message)}
            >
              <p className={!notification.read ? "font-semibold" : ""}>
                {notification.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;