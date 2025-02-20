import React from "react";
import { AiOutlineBell } from "react-icons/ai";
import { MdOutlineEventNote, MdOutlinePostAdd } from "react-icons/md";
import { FiUsers, FiMenu } from "react-icons/fi";
import Global from "../../../context/Global";
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ setCurrentPage, currentPage, isOpen, setIsOpen, unreadNotifications }) {
  const navigate = useNavigate();
  const menuItems = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2dfdc4d6da05eacff9d133255040832e0f0505117d4249227ea366522452bc75?placeholderIfAbsent=true&apiKey=58da0bc4bd54467aa5614e6442508e2b",
      label: "Dashboard",
      id: "dashboard",
      type: "image",
    },
    {
      icon: <MdOutlineEventNote size={24} className="text-black" />,
      label: "Events",
      id: "events",
      type: "react-icon",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/205894162c5ad3ec813b4964751ff80730e114e5ca16c190984c80d5b52c1455?placeholderIfAbsent=true&apiKey=58da0bc4bd54467aa5614e6442508e2b",
      label: "Messages",
      id: "messages",
      type: "image",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e4f502fc8beb2526aa81ff784bff64196767eb34ea67510bed1d392f05dad43d?placeholderIfAbsent=true&apiKey=58da0bc4bd54467aa5614e6442508e2b",
      label: "Profile",
      id: "profile",
      type: "image",
    },
  ];

  if (Global.userId !== 0) {
    if (Global.userRoleId === 4) {
      menuItems.push(
        {
          icon: <MdOutlinePostAdd size={24} className="text-black" />,
          label: "Create Events",
          id: "create-events",
          type: "react-icon",
        },
        {
          icon: <FiUsers size={24} className="text-black" />,
          label: "Admin",
          id: "admin",
          type: "react-icon",
        },
        {
          icon: (
            <div className="relative">
              <AiOutlineBell size={24} className="text-black" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                  {unreadNotifications}
                </span>
              )}
            </div>
          ),
          label: "Notification",
          id: "Notification",
          type: "react-icon",
        }
      );
    } else if (Global.userRoleId === 2) {
      menuItems.push(
        {
          icon: <MdOutlinePostAdd size={24} className="text-black" />,
          label: "Create Events",
          id: "create-events",
          type: "react-icon",
        },
        {
          icon: (
            <div className="relative">
              <AiOutlineBell size={24} className="text-black" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                  {unreadNotifications}
                </span>
              )}
            </div>
          ),
          label: "Notification",
          id: "Notification",
          type: "react-icon",
        }
      );
    }
  }

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50 px-4 flex items-center">
        <div className="flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl mr-2 text-violet-600 hover:text-violet-700 transition-colors"
          >
            <FiMenu size={24} />
          </button>
          {/* <span className="text-2xl font-bold text-violet-600">
            Campus Connect
          </span> */}
          <span 
          onClick={() => navigate('/')}
          className="text-2xl font-bold text-violet-600 cursor-pointer hover:text-violet-700 transition-colors"
        >
          Campus Connect
        </span>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white shadow-lg transition-transform duration-300 ease-in-out transform 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          w-[250px] md:w-[17%] md:min-w-[250px] z-40`}
      >
        <div className="flex flex-col h-full">
          <div 
            className="flex flex-col grow items-center px-6 pt-2 w-full font-bold rounded-3xl 
            overflow-y-auto scrollbar-thin scrollbar-thumb-violet-200 scrollbar-track-gray-100"
          >
            <nav className="flex flex-col justify-center w-full text-lg whitespace-nowrap max-w-[200px] text-neutral-900">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    if (window.innerWidth < 768) {
                      setIsOpen(false);
                    }
                  }}
                  className={`flex gap-4 items-center py-1.5 px-2.5 mt-12 w-full  cursor-pointer ${
                    currentPage === item.id
                      ? "bg-violet-600 rounded-md  "
                      : ""
                  } hover:bg-violet-200 transition-colors  rounded-md `}
                  role="button"
                  tabIndex={0}
                >
                  <div className="flex items-center">
                    {item.type === "image" ? (
                      <img
                        src={item.icon}
                        alt={item.label}
                        className="object-contain shrink-0 self-stretch my-auto w-7 aspect-square"
                      />
                    ) : (
                      <div className="shrink-0 w-8 h-8 flex items-center justify-center">
                        {item.icon}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">{item.label}</div>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-20 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}