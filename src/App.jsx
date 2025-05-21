import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import { TiThMenu } from "react-icons/ti";
import useIsMobile from "./hooks/useIsMobile";
import { Route, Routes } from "react-router-dom";
import PastConversations from "./pages/PastConversations";
import Feedbacks from "./pages/Feedbacks";
import Chat from "./pages/Chat";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();
  return (
    <div className="flex items-start">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main
        className={`p-4 w-full h-screen ${
          !isMobile
            ? "bg-gradient-to-b from-[rgba(215,199,244,0.2)] to-[rgba(151,133,186,0.2)]"
            : "bg-gradient-to-b from-[#F9FAFA] from-[59%] to-[#EDE4FF] to-[100%]"
        }`}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="focus:outline-none flex gap-3 text-2xl"
        >
          <TiThMenu
            size={32}
            className="hover:cursor-pointer"
            style={{ color: "#D7C7F4" }}
          />
          <h1 className="text-[#D7C7F4] font-bold">Bot AI</h1>
        </button>
        <Routes>
          <Route path="/past-conversations" element={<PastConversations />} />
          <Route path="/feedbacks" element={<Feedbacks />} />
          <Route path="/" element={<Chat />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
