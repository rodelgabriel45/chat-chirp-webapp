import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";

export default function Conversations() {
  const { conversations, loading } = useGetConversations();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => {
        return (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            lastIdx={idx === conversations.length - 1}
          />
        );
      })}

      {loading && <span className="loading loading-spinner mx-auto"></span>}
    </div>
  );
}
