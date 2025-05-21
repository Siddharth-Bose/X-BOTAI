import React from "react";
import { useChat } from "../context/ChatContext";
import StarRating from "../components/StarRating";

function PastConversations() {
  const { previousChat } = useChat();

  if (!previousChat || previousChat.length === 0) {
    return (
      <div className="flex flex-col grow items-center justify-center text-gray-500">
        <p>No past conversations available.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col grow overflow-y-auto">
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Past Conversations</h1>
      </header>

      {previousChat.map((chat, idx) => (
        <div key={idx} className="bg-[#D7C7F4] p-4 rounded-lg my-4 space-y-4">
          {chat.map((msg, index) => (
            <div key={msg.id || index} className="flex flex-col space-y-1">
              <div className="flex items-start space-x-2">
                <img
                  src={msg.bot ? "/botai.png" : "/user.png"}
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div className="bg-[#EBDDFD] p-3 rounded-xl max-w-xl shadow">
                  <p className="text-gray-800">{msg.message}</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <p className="text-xs text-gray-600 ml-12">{msg.time}</p>
                {msg.rating && <StarRating rating={msg.rating} />}
              </div>
              {msg.feedback && (
                <p className="pl-14">
                  <strong>Feedback:</strong> {msg.feedback}
                </p>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default PastConversations;
