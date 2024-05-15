export default function Message() {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src="https://t3.ftcdn.net/jpg/03/64/62/36/360_F_364623623_ERzQYfO4HHHyawYkJ16tREsizLyvcaeg.jpg"
            alt="Picture"
          />
        </div>
      </div>

      <div className="chat-bubble bg-blue-500 text-white">
        You were the Chosen One!
      </div>
      <div className="chat-footer opacity-50">Delivered</div>
    </div>
  );
}
