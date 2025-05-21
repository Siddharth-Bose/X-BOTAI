import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useIsMobile from "../hooks/useIsMobile";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    isMobile && setCollapsed(true);
  }, [isMobile]);

  const links = [
    { path: "/past-conversations", label: "Past Conversation", icon: "🔍" },
    { path: "/feedbacks", label: "Feedbacks", icon: "⭐️" },
  ];
  if (collapsed) return;
  return (
    <div
      className={`text-white h-screen transition-all duration-300 w-64 flex flex-col`}
    >
      <div className="w-full flex items-center justify-around gap-3 bg-[#D7C7F4] p-2">
        <img
          src="/botai.png"
          alt="Soul AI"
          className="w-10 rounded-full ring shadow-xl"
        />
        <span className="text-[#000] font-bold">New Chat</span>
        <Link to="/">
          <img
            src="/newChat.png"
            alt="New Chat"
            className="w-10 rounded-lg shadow-sm border-none hover:cursor-pointer"
          />
        </Link>
      </div>
      <nav className="flex flex-col space-y-4">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center space-x-4 p-2 rounded-lg bg-[#D7C7F4] m-3  hover:bg-[#f8ebff] transition ${
              location.pathname === link.path ? "bg-[#D7C7F4]" : ""
            }`}
            onClick={isMobile ? () => setCollapsed(true) : () => {}}
          >
            <span className="text-lg text-gray-700">{link.icon}</span>
            <span className="text-sm font-bold text-gray-700">
              {link.label}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
