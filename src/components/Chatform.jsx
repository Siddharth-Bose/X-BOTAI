import React, { useState } from "react";
import Button from "./Button";

function Chatform({ onSend, onSave }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    onSend(input.trim());
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <input
        type="text"
        name="message"
        id="message"
        placeholder="Message Bot AI..."
        className="bg-[#fff] rounded-xl min-w-3/4 p-3 shadow border border-gray-300 focus:border-gray-900 outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button submit>Ask</Button>
      <Button
        handler={() => {
          onSave();
        }}
      >
        Save
      </Button>
    </form>
  );
}

export default Chatform;
