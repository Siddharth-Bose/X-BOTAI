import React from "react";
import { useChat } from "../context/ChatContext";

const PastConversations = () => {
  const { previousChat } = useChat();

  if (previousChat.length === 0) {
    return <p className="text-center mt-4">No previous conversations.</p>;
  }

  return (
    <div className="grid gap-4 p-4">
      {previousChat.map((conversation, idx) => (
        <div
          key={idx}
          className="border rounded-lg shadow-md p-4 bg-white max-w-md mx-auto"
        >
          <h3 className="font-bold mb-2">Conversation #{idx + 1}</h3>
          <div className="max-h-48 overflow-y-auto">
            {conversation.map(({ id, bot, message, time }) => (
              <div
                key={id}
                className={`mb-2 p-2 rounded ${
                  bot ? "bg-purple-100 text-purple-800" : "bg-gray-100"
                }`}
              >
                <p className="whitespace-pre-wrap">{message}</p>
                <small className="text-xs text-gray-500">{time}</small>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PastConversations;
