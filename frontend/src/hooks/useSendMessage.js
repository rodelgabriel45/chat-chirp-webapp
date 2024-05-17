import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { newMessage } from "../redux/conversation/conversationSlice";

const useSendMessage = () => {
  const { selectedConversation } = useSelector((state) => state.conversation);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/message/send/${selectedConversation._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      dispatch(newMessage(data));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
