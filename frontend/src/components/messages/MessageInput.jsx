import { useEffect, useState } from "react";
import io from "socket.io-client";

import { FiSend } from "react-icons/fi";
import useSendMessage from "../../hooks/useSendMessage";
import { useSelector } from "react-redux";

const socket = io("http://localhost:3000");

export default function MessageInput() {
  const [messageData, setMessageData] = useState("");
  const { sendMessage, loading } = useSendMessage();
  const [isTyping, setIsTyping] = useState(false);
  const { selectedConversation } = useSelector((state) => state.conversation);
  const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!messageData) return;
    await sendMessage(messageData);
    setMessageData("");
  };

  const handleTyping = () => {
    socket.emit("typing", {
      isTyping: true,
      receiverId: currentUser._id,
    });
  };

  const handleStopTyping = () => {
    socket.emit("typing", {
      isTyping: false,
      receiverId: currentUser._id,
    });
  };

  useEffect(() => {
    socket.on("typing", (data) => {
      console.log(data);
      if (data.receiverId === selectedConversation._id) {
        setIsTyping(data.isTyping);
      }
    });

    return () => {
      socket.off("typing");
    };
  }, [selectedConversation]);

  return (
    <form onSubmit={handleSubmit} className="px-4 my-3">
      {isTyping && <p>User is typing ...</p>}
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm text-white p-2.5 bg-gray-500 border-gray-600 w-full"
          placeholder="Enter your message..."
          onChange={(e) => setMessageData(e.target.value)}
          value={messageData}
          onBlur={handleStopTyping}
          onFocus={handleTyping}
        />
        <button
          disabled={loading}
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3 text-xl hover:text-white disabled:opacity-80"
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <FiSend />
          )}
        </button>
      </div>
    </form>
  );
}
