import Conversations from "./Conversations";
import SearchInput from "./SearchInput";
import { SlLogout } from "react-icons/sl";

export default function Sidebar() {
  return (
    <div className="border-r border-gray-600 px-3">
      <SearchInput />
      <div className="divider p-3"></div>
      <Conversations />
      <div className="mt-auto">
        <button
          type="button"
          className="flex gap-2 items-center hover:bg-red-400 p-2 rounded-md hover:text-white"
        >
          <SlLogout />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
