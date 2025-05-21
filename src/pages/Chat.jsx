import React, { useState } from "react";
import Chatform from "../components/Chatform";
import Message from "../components/Message";
import Suggestions from "../components/Suggestions";
import FeedbackModal from "../components/FeedbackModal";
import { useChat } from "../context/ChatContext";

function Chat() {
  const { currentChat, addUserMessage, saveToPreviousChat } = useChat();
  const [showModal, setShowModal] = useState(false);

  const handleSaveClick = () => {
    setShowModal(true);
  };

  const handleFeedbackSubmit = (feedback) => {
    saveToPreviousChat(feedback);
    setShowModal(false);
  };

  return (
    <div className="flex flex-col h-full p-2 justify-end">
      <div className="flex flex-col grow overflow-y-auto">
        {currentChat.length ? (
          currentChat.map((msg) => <Message key={msg.id} {...msg} />)
        ) : (
          <Suggestions onSend={addUserMessage} />
        )}
      </div>
      <Chatform onSend={addUserMessage} onSave={handleSaveClick} />
      {showModal && currentChat.length > 0 && (
        <FeedbackModal
          onClose={() => setShowModal(false)}
          onSubmit={handleFeedbackSubmit}
        />
      )}
    </div>
  );
}

export default Chat;
