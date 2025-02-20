import React, { useEffect, useState } from "react";
import Global from "../../context/Global";
import Sidebar from "./Events/Sidebar";
import Dashboard from "./Events/Dashboard";
import Events from "./Events/Events";
import Profile from "./Events/Profile";
import Admin from "./Events/Admin";
import Notification from "./Events/Notification";
import EventForm from '../CreateEvent/EventForm';

const EventHiveDashboard = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resize and check if mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Consider tablet as mobile
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await Global.fetchgetNotificationRequestedById(Global.userId);
        if (response.data) {
          const unreadCount = response.data.filter((n) => n.read_status === "0").length;
          setUnreadNotifications(unreadCount);
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

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "events":
        return <Events />;
      case "create-events":
        return <EventForm />;
      case "profile":
        return <Profile />;
      case "admin":
        return <Admin />;
      case "Notification":
        return <Notification setUnreadNotifications={setUnreadNotifications} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="overflow-hidden bg-white min-h-screen">
      <div className="flex min-h-screen pt-16">
        <Sidebar
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          unreadNotifications={unreadNotifications}
        />
        
        <div className={`
          flex-grow transition-all duration-300 bg-white
          ${!isMobile && isSidebarOpen ? 'lg:ml-[250px]' : 'ml-0'}
          relative
        `}>
          <div className="p-6 w-full">
            <div className="
              w-full max-w-[1200px] mx-auto 
              min-h-[calc(100vh-7rem)] 
              bg-gray-50 
              rounded-xl
              p-6
              lg:px-8
              md:px-6
              sm:px-4
              xs:px-3
              shadow-sm
            ">
              {renderContent()}
            </div>
          </div>
        </div>

        {/* Overlay for mobile when sidebar is open */}
        {isMobile && isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default EventHiveDashboard;