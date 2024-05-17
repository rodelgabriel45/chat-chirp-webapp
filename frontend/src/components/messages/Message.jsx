import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { extractTime } from "../../utils/extractTime";

export default function Message({ message }) {
  const { currentUser } = useSelector((state) => state.user);
  const { selectedConversation } = useSelector((state) => state.conversation);
  const fromMe = message.senderId === currentUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? currentUser.profilePicture
    : selectedConversation?.profilePicture;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const formattedTime = extractTime(message.createdAt);

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="Picture" />
        </div>
      </div>

      <div className={`chat-bubble pb-2 text-white ${bubbleBgColor}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50">{formattedTime}</div>
    </div>
  );
}
