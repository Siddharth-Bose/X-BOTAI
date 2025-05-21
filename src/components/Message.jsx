import React from "react";
import { AiOutlineDislike, AiTwotoneDislike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { BiSolidDislike, BiSolidLike } from "react-icons/bi";

function Message({
  id,
  bot = false,
  message = "",
  time,
  like,
  dislike,
  onFeedback,
}) {
  return (
    <div className="w-full bg-[#D7C7F421]  p-2 m-2 rounded-xl shadow-xl">
      <div className="flex gap-3 items-center">
        <div>
          <img
            src={bot ? "/botai.png" : "/user.png"}
            alt="User"
            className="h-[50px] min-w-[50px] w-full rounded-full grow-1"
          />
        </div>
        <div>
          <span className="font-bold">{bot ? "Soul AI" : "You"}</span>
          <p>{message}</p>
        </div>
      </div>
      {bot && (
        <div className="w-3/4 flex gap-3 pl-[60px] my-3 items-center">
          <p>{time}</p>
          <span
            className="hover:cursor-pointer text-2xl"
            onClick={() => onFeedback?.(id, "like")}
          >
            {like ? <BiSolidLike /> : <AiOutlineLike />}
          </span>
          <span
            className="hover:cursor-pointer text-2xl"
            onClick={() => onFeedback?.(id, "dislike")}
          >
            {dislike ? <BiSolidDislike /> : <AiOutlineDislike />}
          </span>
        </div>
      )}
    </div>
  );
}

export default Message;
