import React from "react";
import Message from "../Message";
import "./ChatBox.css";

// container for all of the messages
const ChatBox = ({ messageList, chatboxContainerRef }) => {
  return (
    <div ref={chatboxContainerRef} className="scroller container d-flex justify-content-center">
      {messageList.map(({ role, content, timestamp }) => (
        <Message key={timestamp.toString()} variant={role} message={content} timestamp={timestamp} />
      ))}
    </div>
  );
};

export default ChatBox;
