import { useState } from "react";
import toast from "react-hot-toast";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import useGetConversations from "../../hooks/useGetConversations";

import { selectConversation } from "../../redux/conversation/conversationSlice";

export default function SearchInput() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  const { conversations } = useGetConversations();
  const { selectedConversation } = useSelector((state) => state.conversation);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long.");
    }

    const conversation = conversations.find((c) =>
      c.username.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      dispatch(selectConversation(conversation));
      setSearch("");
    } else {
      toast.error("User not found!");
    }
  };

  return (
    <div className=" flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <img
          src={currentUser.profilePicture}
          alt="Profile Picture"
          className="w-14 h-14 rounded-full object-cover"
        />
        <span className="text-white font-bold text-lg">
          {currentUser.username}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered rounded-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-circle bg-orange-500 hover:bg-orange-700 text-white"
        >
          <IoSearch />
        </button>
      </form>
    </div>
  );
}
