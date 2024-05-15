import MessageInput from "./MessageInput";
import Messages from "./Messages";
import NoChatSelected from "./NoChatSelected.jsx";

export default function MessageContainer() {
  const noChatSelected = true;

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {noChatSelected ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center gap-2 bg-teal-900 px-4 py-2 mb-2">
            <span className="label-text">To:</span>
            <span className="text-gray-900 font-bold">John Doe</span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
}
