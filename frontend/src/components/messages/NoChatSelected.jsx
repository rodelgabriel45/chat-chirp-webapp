import { TiMessages } from "react-icons/ti";

export default function NoChatSelected() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-xl text-gray-200 font-semibold flex flex-col">
        <p>Welcome 👋 John Doe 🥂</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl self-center" />
      </div>
    </div>
  );
}
