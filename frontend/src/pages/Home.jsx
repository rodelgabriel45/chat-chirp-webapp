import MessageContainer from "../components/messages/MessageContainer";
import Sidebar from "../components/sidebar/Sidebar";

export default function Home() {
  return (
    <div className="flex justify-center items-center p-4 h-screen">
      <div className="flex border p-4 border-gray-900 shadow-lg sm:h-[450px] md:h-[550px] gap-4 rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <Sidebar />

        <MessageContainer />
      </div>
    </div>
  );
}
