import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import Skeleton from "../Skeleton";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import useListenMessages from "../../hooks/useListenMessages";

export default function Messages() {
  const { loading } = useGetMessages();
  const { messages } = useSelector((state) => state.conversation);
  const lastMessageRef = useRef();
  useListenMessages();

  // scroll to the latest message
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => {
      clearTimeout();
    };
  }, [messages]);

  return (
    <>
      <div className="px-4 flex-1 overflow-auto">
        {loading && [...Array(5)].map((_, idx) => <Skeleton key={idx} />)}
        {!loading && messages?.length > 0 && (
          <div className="px-4 flex-1 overflow-auto">
            {messages?.map((message) => {
              return (
                <div key={message?._id} ref={lastMessageRef}>
                  <Message message={message} />
                </div>
              );
            })}
          </div>
        )}
        {!loading && messages?.length === 0 && (
          <p className="text-center">Send a message to start a conversation.</p>
        )}
      </div>
    </>
  );
}
