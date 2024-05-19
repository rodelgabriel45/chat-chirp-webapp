import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import { newMessage } from "../redux/conversation/conversationSlice";

import notificationSound from "../assets/sounds/notification.mp3";

export default function useListenMessages() {
  const dispatch = useDispatch();
  const { socket } = useSocketContext();

  useEffect(() => {
    socket?.on("newMessage", (newIOMessage) => {
      newIOMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      dispatch(newMessage(newIOMessage));
    });

    return () => socket?.off("newMessage");
  }, [socket]);
}
