import React from "react";
import ChatBox from "../ChatBox";
import "./Sidebar.css";

const Sidebar = ({
  state,
  handleUpdateCurrentMessage,
  handleSendMessage,
  isOpen,
  setIsOpen,
}) => {
  const handleClick = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={`flex flex-col justify-between fixed top-0 ${
        isOpen ? "open-sidebar" : "closed-sidebar"
      } h-screen bg-gray-50 border-gray-400 border-l transition-all ease duration-800`}
    >
      <div className="flex flex-col">
        <button
          className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-600"
          onClick={handleClick}
        >
          <svg
            className="w-6 h-6 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 8.586L4.707 3.293a1 1 0 00-1.414 1.414L8.586 10l-5.293 5.293a1 1 0 101.414 1.414L10 11.414l5.293 5.293a1 1 0 001.414-1.414L11.414 10l5.293-5.293a1 1 0 00-1.414-1.414L10 8.586z" />
          </svg>
        </button>
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4">Hi! I'm Xey 😊</h1>
          <p className="px-4">
            Stuck on a concept? Need more clarification on a complicated topic?
          </p>
        </div>
      </div>
      <ChatBox messageList={state.messageList} />
      <form className="p-2 mt-auto" onSubmit={handleSendMessage}>
        <input
          textarea
          type="text"
          value={state.currentMessage}
          onChange={handleUpdateCurrentMessage}
          placeholder="Type your question..."
          className="w-full border border-gray-300 rounded-md p-4 focus:outline-none focus:border-blue-500"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Sidebar;
