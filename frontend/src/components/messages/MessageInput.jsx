import { FiSend } from "react-icons/fi";

export default function MessageInput() {
  return (
    <form className="px-4 my-3">
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm text-white p-2.5 bg-gray-500 border-gray-600 w-full"
          placeholder="Enter your message..."
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3 text-xl hover:text-white"
        >
          <FiSend />
        </button>
      </div>
    </form>
  );
}
