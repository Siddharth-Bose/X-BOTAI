import React, { createContext, useContext, useState, useEffect } from "react";
import faqData from "../data/faqData";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [currentChat, setCurrentChat] = useState(() => {
    const saved = localStorage.getItem("currentChat");
    return saved ? JSON.parse(saved) : [];
  });

  const [previousChat, setPreviousChat] = useState(() => {
    const saved = localStorage.getItem("previousChat");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("currentChat", JSON.stringify(currentChat));
  }, [currentChat]);

  useEffect(() => {
    localStorage.setItem("previousChat", JSON.stringify(previousChat));
  }, [previousChat]);

  const addUserMessage = (message) => {
    const time = new Date()
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .toUpperCase();

    const userMsg = {
      id: crypto.randomUUID(),
      bot: false,
      message,
      time,
      like: false,
      dislike: false,
    };

    setCurrentChat((prev) => [...prev, userMsg]);

    const match = faqData.find(
      (faq) => faq.question.toLowerCase() === message.toLowerCase()
    );

    const botResponse = match
      ? match.response
      : "Sorry, Did not understand your query!";

    const botMsg = {
      id: crypto.randomUUID(),
      bot: true,
      message: botResponse,
      time,
      like: false,
      dislike: false,
    };

    setCurrentChat((prev) => [...prev, botMsg]);
  };

  const updateFeedback = (msgId, type) => {
    setCurrentChat((prev) =>
      prev.map((msg) =>
        msg.id === msgId
          ? { ...msg, like: type === "like", dislike: type === "dislike" }
          : msg
      )
    );
  };

  const attachFeedbackToMessage = (msgId, feedback) => {
    setCurrentChat((prev) =>
      prev.map((msg) =>
        msg.id === msgId
          ? {
              ...msg,
              feedback: feedback.message,
              rating: Number(feedback.rating),
            }
          : msg
      )
    );
  };

  const saveToPreviousChat = () => {
    setPreviousChat((prev) => [...prev, currentChat]);
    setCurrentChat([]);
  };

  return (
    <ChatContext.Provider
      value={{
        currentChat,
        previousChat,
        addUserMessage,
        saveToPreviousChat,
        updateFeedback,
        attachFeedbackToMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
