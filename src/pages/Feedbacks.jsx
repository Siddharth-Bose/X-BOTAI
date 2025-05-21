import React from "react";
import { useChat } from "../context/ChatContext";

const Feedbacks = () => {
  const { previousChat } = useChat();

  const feedbackMessages = previousChat.flatMap((conv) =>
    conv.filter(({ message }) => message.startsWith("Feedback:"))
  );

  if (feedbackMessages.length === 0) {
    return <p className="text-center mt-4">No feedbacks yet.</p>;
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="font-bold mb-4 text-xl text-center">Feedbacks</h2>
      <ul className="space-y-4">
        {feedbackMessages.map(({ id, message, time }) => (
          <li
            key={id}
            className="border rounded p-3 bg-yellow-50 shadow-sm whitespace-pre-wrap"
          >
            <p>{message.replace("Feedback:", "").trim()}</p>
            <small className="text-xs text-gray-500 block mt-1">{time}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feedbacks;
