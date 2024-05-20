import MessageContainer from "../components/messages/MessageContainer";
import Sidebar from "../components/sidebar/Sidebar";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center p-4 h-screen">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-10 text-gray-500">
        <span className="text-amber-500">ChatChirp</span>
      </h1>
      <div className="flex border p-4 border-white-900 shadow-lg sm:h-[450px] md:h-[550px] lg:h-[800px] lg:w-[80%] gap-4 rounded-lg overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <Sidebar />

        <MessageContainer />
      </div>
    </div>
  );
}
