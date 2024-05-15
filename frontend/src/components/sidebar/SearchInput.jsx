import { IoSearch } from "react-icons/io5";

export default function SearchInput() {
  return (
    <form className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
      />
      <button
        type="submit"
        className="btn btn-circle bg-orange-500 hover:bg-orange-700 text-white"
      >
        <IoSearch />
      </button>
    </form>
  );
}
