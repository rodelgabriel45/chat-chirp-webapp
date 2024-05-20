/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";

import {
  selectConversation,
  clearSelected,
  clearMessages,
  clearNotification,
} from "../../redux/conversation/conversationSlice";
import { useEffect, useState } from "react";
import { useSocketContext } from "../../context/SocketContext";
import useListenMessages from "../../hooks/useListenMessages";

export default function Conversation({ conversation, lastIdx }) {
  const dispatch = useDispatch();
  const { selectedConversation } = useSelector((state) => state.conversation);
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);
  const { notifications } = useSelector((state) => state.conversation);
  const [newNotif, setNewNotif] = useState(false);

  useListenMessages();

  useEffect(() => {
    if (notifications?.senderId === conversation._id) {
      setNewNotif(true);
    }
  }, [notifications]);

  const handleSelect = async () => {
    dispatch(selectConversation(conversation));
    if (newNotif) {
      setNewNotif(false);
      dispatch(clearNotification());
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearSelected());
      dispatch(clearMessages());
    };
  }, []);

  return (
    <>
      <div
        onClick={handleSelect}
        className={`flex gap-2 items-center hover:bg-amber-500 rounded-md p-2 py-1 cursor-pointer ${
          selectedConversation?._id === conversation._id ? "bg-amber-500" : ""
        }`}
      >
        <div className={`avatar ${isOnline ? "online" : ""} relative`}>
          {newNotif && (
            <div className="badge badge-primary badge-sm absolute inset-y-0"></div>
          )}
          <div className="w-12 rounded-full">
            <img src={conversation.profilePicture} />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.username}</p>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1"></div>}
    </>
  );
}
