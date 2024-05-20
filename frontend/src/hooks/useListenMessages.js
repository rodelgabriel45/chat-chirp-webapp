import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import {
  newMessage,
  newNotification,
} from "../redux/conversation/conversationSlice";

import notificationSound from "../assets/sounds/notification.mp3";

export default function useListenMessages() {
  const dispatch = useDispatch();
  const { socket } = useSocketContext();
  const { selectedConversation } = useSelector((state) => state.conversation);

  useEffect(() => {
    socket?.on("newMessage", (newIOMessage) => {
      const sound = new Audio(notificationSound);
      sound.play();

      if (selectedConversation?._id === newIOMessage.senderId) {
        newIOMessage.shouldShake = true;
        dispatch(newMessage(newIOMessage));
      }
      if (
        !selectedConversation ||
        selectedConversation?._id !== newIOMessage.senderId
      ) {
        dispatch(newNotification(newIOMessage));
      }
    });

    return () => socket?.off("newMessage");
  }, [socket, selectedConversation]);
}
