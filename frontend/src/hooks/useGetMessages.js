import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { setMessages } from "../redux/conversation/conversationSlice";

const useGetMessages = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { selectedConversation } = useSelector((state) => state.conversation);

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/message/${selectedConversation._id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message);
        }

        dispatch(setMessages(data));
      } catch (error) {
        toast.error(error.message || error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id]);

  return { loading };
};

export default useGetMessages;
