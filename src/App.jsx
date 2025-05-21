import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import { TiThMenu } from "react-icons/ti";
import useIsMobile from "./hooks/useIsMobile";
import { Route, Routes } from "react-router-dom";
import PastConversations from "./pages/PastConversations";
import Feedbacks from "./pages/Feedbacks";
import Chat from "./pages/Chat";
import { useChat } from "./context/ChatContext";
import FeedbackModal from "./components/FeedbackModal";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { saveToPreviousChat, currentChat } = useChat();
  const isMobile = useIsMobile();
  const handleFeedbackSubmit = (feedback) => {
    saveToPreviousChat(feedback);
    setShowModal(false);
  };
  return (
    <div className="flex items-start">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        handler={() => {
          if (currentChat.length > 0) {
            setShowModal(true);
          }
        }}
      />
      <main
        className={`p-4 w-full h-screen max-h-screen flex flex-col ${
          !isMobile
            ? "bg-gradient-to-b from-[rgba(215,199,244,0.2)] to-[rgba(151,133,186,0.2)]"
            : "bg-gradient-to-b from-[#F9FAFA] from-[59%] to-[#EDE4FF] to-[100%]"
        }`}
      >
        <header className="focus:outline-none flex gap-3 text-2xl">
          <TiThMenu
            size={32}
            onClick={() => setCollapsed(!collapsed)}
            className="hover:cursor-pointer"
            style={{ color: "#D7C7F4" }}
          />
          <h1 className="text-[#D7C7F4] font-bold">Bot AI</h1>
        </header>
        <Routes>
          <Route path="/history" element={<PastConversations />} />
          <Route path="/feedbacks" element={<Feedbacks />} />
          <Route path="/" element={<Chat />} />
        </Routes>
      </main>
      {showModal && currentChat.length > 0 && (
        <FeedbackModal
          onClose={() => setShowModal(false)}
          onSubmit={handleFeedbackSubmit}
        />
      )}
    </div>
  );
}

export default App;
