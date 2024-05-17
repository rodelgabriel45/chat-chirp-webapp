/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";

import {
  selectConversation,
  clearSelected,
  clearMessages,
} from "../../redux/conversation/conversationSlice";
import { useEffect } from "react";

export default function Conversation({ conversation, lastIdx }) {
  const dispatch = useDispatch();
  const { selectedConversation } = useSelector((state) => state.conversation);

  const handleSelect = async () => {
    dispatch(selectConversation(conversation));
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
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src={conversation.profilePicture} />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.username}</p>
            <span className="text-xl">😴</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1"></div>}
    </>
  );
}
