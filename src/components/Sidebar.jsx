import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useIsMobile from "../hooks/useIsMobile";

const Sidebar = ({ collapsed, setCollapsed, handler }) => {
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    isMobile && setCollapsed(true);
  }, [isMobile]);

  const links = [
    { path: "/history", label: "Past Conversation" },
    { path: "/feedbacks", label: "Feedbacks" },
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
        <Link to="/" onClick={handler} className="flex gap-4 items-center">
        <span className="text-[#000] font-bold">New Chat</span>
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
            <div className="text-sm font-bold text-gray-700">
              {link.label}
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
