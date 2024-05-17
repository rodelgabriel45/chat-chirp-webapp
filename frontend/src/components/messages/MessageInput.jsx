import { useState } from "react";
import { FiSend } from "react-icons/fi";
import useSendMessage from "../../hooks/useSendMessage";

export default function MessageInput() {
  const [messageData, setMessageData] = useState("");
  const { sendMessage, loading } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!messageData) return;
    await sendMessage(messageData);
    setMessageData("");
  };

  return (
    <form onSubmit={handleSubmit} className="px-4 my-3">
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm text-white p-2.5 bg-gray-500 border-gray-600 w-full"
          placeholder="Enter your message..."
          onChange={(e) => setMessageData(e.target.value)}
          value={messageData}
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
