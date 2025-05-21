import React, { useState } from "react";
import StarRating from "./StarRating";

const FeedbackModal = ({ onClose, onSubmit }) => {
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = () => {
    if (!feedbackMessage || !rating) return alert("Please fill all fields.");
    onSubmit({ message: feedbackMessage, rating });
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-[4px] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-1/2">
        <div className="flex gap-5 items-center p-4">
          <img src="/bulb.png" alt="Think" width={"25px"} />
          <p className="text-xl font-bold">Provide Additional Feedback</p>
        </div>

        <textarea
          className="w-full h-56 p-2 border border-gray-300 rounded mb-4"
          placeholder="Write your feedback..."
          value={feedbackMessage}
          onChange={(e) => setFeedbackMessage(e.target.value)}
        />

        <label className="block mb-2 font-medium">Rating:</label>
        <StarRating rating={rating} onRate={setRating} />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
