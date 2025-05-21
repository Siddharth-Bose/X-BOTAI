import React, { useState } from "react";

function Suggestions({ onSend }) {
  const suggestions = [
    "Hi, what is the weather",
    "Hi, what is my location",
    "Hi, what is the temperature",
    "Hi, how are you",
  ];

  const [input, setInput] = useState("");

  const handleSubmit = (e, text) => {
    setInput(text);
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input.trim());
    setInput("");
  };
  return (
    <div className="grid grid-flow-col grid-rows-2 gap-4 mt-auto p-4 w-full">
      {suggestions.map((suggestion, idx) => {
        return (
          <div
            key={idx}
            className="bg-white p-4 border-lg rounded-lg shadow-xl hover:cursor-pointer hover:bg-[#f9f9f9]"
            onClick={(e) => handleSubmit(e, suggestion)}
          >
            <h3 className="font-bold">{suggestion}</h3>
            <p>Get immediate AI generated response</p>
          </div>
        );
      })}
    </div>
  );
}

export default Suggestions;
