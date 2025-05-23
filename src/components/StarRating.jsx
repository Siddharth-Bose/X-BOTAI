import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating, onRate = () => {}, feedbackRatings = false }) => {
  const [hover, setHover] = useState(null);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={`${
            feedbackRatings && "cursor-pointer"
          } text-2xl transition-colors ${
            (hover || rating) >= star ? "text-yellow-400" : "text-gray-300"
          }`}
          onClick={() => onRate(star)}
          onMouseEnter={!feedbackRatings ? () => setHover(star) : null}
          onMouseLeave={!feedbackRatings ? () => setHover(null) : null}
        />
      ))}
    </div>
  );
};

export default StarRating;
