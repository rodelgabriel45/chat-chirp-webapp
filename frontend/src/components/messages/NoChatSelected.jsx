import { TiMessages } from "react-icons/ti";
import { useSelector } from "react-redux";

export default function NoChatSelected() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-xl text-gray-200 font-semibold flex flex-col">
        <p>Welcome 👋 {currentUser.username} 🥂</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl self-center" />
      </div>
    </div>
  );
}
