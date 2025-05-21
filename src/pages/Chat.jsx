import React, { useState } from "react";
import Chatform from "../components/Chatform";
import Message from "../components/Message";
import Suggestions from "../components/Suggestions";
import FeedbackModal from "../components/FeedbackModal";
import { useChat } from "../context/ChatContext";

function Chat() {
  const {
    currentChat,
    addUserMessage,
    saveToPreviousChat,
    updateFeedback,
    attachFeedbackToMessage,
  } = useChat();

  const [showModal, setShowModal] = useState(false);
  const [feedbackMsgId, setFeedbackMsgId] = useState(null);

  const handleFeedbackTrigger = (msgId, type) => {
    updateFeedback(msgId, type);
    setFeedbackMsgId(msgId);
    setShowModal(true);
  };

  const handleFeedbackSubmit = (feedback) => {
    if (feedbackMsgId && feedback?.message && feedback?.rating) {
      attachFeedbackToMessage(feedbackMsgId, feedback);
    }
    setShowModal(false);
    setFeedbackMsgId(null);
  };

  return (
    <div className="flex flex-col h-full p-2 justify-end">
      <div className="flex flex-col grow overflow-y-auto">
        {currentChat.length ? (
          currentChat.map((msg) => (
            <Message key={msg.id} {...msg} onFeedback={handleFeedbackTrigger} />
          ))
        ) : (
          <Suggestions onSend={addUserMessage} />
        )}
      </div>

      <Chatform onSend={addUserMessage} onSave={saveToPreviousChat} />

      {showModal && feedbackMsgId && (
        <FeedbackModal
          onClose={() => setShowModal(false)}
          onSubmit={handleFeedbackSubmit}
        />
      )}
    </div>
  );
}

export default Chat;
