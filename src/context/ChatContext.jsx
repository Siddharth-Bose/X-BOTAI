import React, { createContext, useContext, useState, useEffect } from "react";
import faqData from "../data/faqData";

const ChatContext = createContext();

const LOCAL_CURRENT_CHAT = "currentChat";
const LOCAL_PREVIOUS_CHAT = "previousChat";

export const ChatProvider = ({ children }) => {
  // Initialize state from localStorage or empty array
  const [currentChat, setCurrentChat] = useState(() => {
    const saved = localStorage.getItem(LOCAL_CURRENT_CHAT);
    return saved ? JSON.parse(saved) : [];
  });
  const [previousChat, setPreviousChat] = useState(() => {
    const saved = localStorage.getItem(LOCAL_PREVIOUS_CHAT);
    return saved ? JSON.parse(saved) : [];
  });

  // Sync currentChat to localStorage on every change
  useEffect(() => {
    localStorage.setItem(LOCAL_CURRENT_CHAT, JSON.stringify(currentChat));
  }, [currentChat]);

  // Sync previousChat to localStorage on every change
  useEffect(() => {
    localStorage.setItem(LOCAL_PREVIOUS_CHAT, JSON.stringify(previousChat));
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
      time: new Date()
        .toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
        .toUpperCase(),
      like: false,
      dislike: false,
    };

    setCurrentChat((prev) => [...prev, botMsg]);
  };

  const saveToPreviousChat = (feedback) => {
    const time = new Date()
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .toUpperCase();

    if (feedback?.message && feedback?.rating) {
      const feedbackMsg = {
        id: crypto.randomUUID(),
        bot: false,
        message: `Feedback: ${feedback.message}\nRating: ${feedback.rating}/5`,
        time,
        like: false,
        dislike: false,
      };

      const chatWithFeedback = [...currentChat, feedbackMsg];
      setPreviousChat((prev) => [...prev, chatWithFeedback]);
    } else {
      setPreviousChat((prev) => [...prev, currentChat]);
    }

    setCurrentChat([]);
  };

  return (
    <ChatContext.Provider
      value={{
        currentChat,
        previousChat,
        addUserMessage,
        saveToPreviousChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
