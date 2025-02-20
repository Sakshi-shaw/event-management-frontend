import React, { useEffect, useState } from "react";
import Global from "../../../context/Global";

function Notification({ setUnreadNotifications }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loading1, setLoading1] = useState(true);
  const [error1, setError1] = useState(null);

  // Fetch notifications from API (replace the URL with your backend endpoint)
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await Global.fetchgetNotificationRequestedById(Global.userId);
        //console.log(JSON.stringify(response.data));
        if (response.data) {
          setNotifications(response.data);

          // Count unread notifications
          //const unreadCount = response.data.filter((n) => n.read_status === "0").length;
          //setUnreadNotifications(unreadCount); // Update the unread count in the parent component
        } else {
          setError("No notifications found.");
        }
      } catch (err) {
        setError("Failed to load notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Mark notifications as read when the page loads
  useEffect(() => {
    const markNotificationsAsRead = async () => {
      try {
        await Global.markNotificationsAsRead(Global.userId); // API call to update read_status
        setUnreadNotifications(0); // Reset the unread notification count
      } catch (err) {
        console.error("Failed to update read status:", err);
      }
    };

    markNotificationsAsRead();
  }, [setUnreadNotifications]);

  useEffect(() => {
    const getNotificationsByAcceptedBy = async () => {
      try {
        const response = await Global.getNotificationsByAcceptedBy(Global.userId);
        //console.log(JSON.stringify(response.data));
        if (response.data) {
          setNotifications(response.data);
        } else {
          setError1("No notifications found.");
        }
      } catch (err) {
        setError1("Failed to load notifications.");
      } finally {
        setLoading1(false);
      }
    };

    getNotificationsByAcceptedBy();
  }, []);


  const handleRemoveNotification = async (id) => {
    const result = await Global.removeNotification(id);
    
    if (result.success) {
      // Update frontend state to remove notification
      setNotifications(notifications.filter(notification => notification.id !== id));
    } else {
      setError(result.error);
    }
  };


  if (loading) {
    return <p className="text-center text-gray-500">Loading notifications...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Notifications</h2>
      {notifications.length > 0 ? (
        <div>
          <h3 className="text-xl font-bold text-gray-600 mb-2">Rejected Notifications</h3>
          <ul className="space-y-4">
            {/* Filter and display rejected notifications (accepted_rejected === "0") */}
            {notifications
              .filter((notification) => notification.accepted_rejected === "0")
              .map((notification, index) => (
                <li
                  key={index}
                  className="bg-red-100 text-black-700 border-red-300 border-b pb-4 last:border-b-0 rounded-lg p-4"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold">{notification.event_name}</p>
                    <button
                      onClick={() => handleRemoveNotification(notification.id)}
                      className="text-black font-bold"
                    >
                      ✕
                    </button>
                  </div>
                  <p>{notification.message}</p>
                  <small className="text-gray-500">
                    {new Date(notification.created_at).toLocaleString()}
                  </small>
                </li>
              ))}
          </ul>
  
          <h3 className="text-xl font-bold text-gray-600 mb-2 mt-6">Accepted Notifications</h3>
          <ul className="space-y-4">
            {/* Filter and display accepted notifications (accepted_rejected === "1") */}
            {notifications
              .filter((notification) => notification.accepted_rejected === "1")
              .map((notification, index) => (
                <li
                  key={index}
                  className="bg-green-100 text-green-700 border-green-300 border-b pb-4 last:border-b-0 rounded-lg p-4"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold">{notification.event_name}</p>
                    <button
                      onClick={() => handleRemoveNotification(notification.id)}
                      className="text-black font-bold"
                    >
                      ✕
                    </button>
                  </div>
                  <p>{notification.message}</p>
                  <small className="text-gray-500">
                    {new Date(notification.created_at).toLocaleString()}
                  </small>
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500 text-center">No notifications found.</p>
      )}
    </div>
  );
  
}
export default Notification;