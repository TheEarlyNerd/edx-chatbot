import React from "react";
import Message from "../Message";
import "./ChatBox.css";

// container for all of the messages
const ChatBox = ({ messageList }) => {
  return (
    <div className="scroller container d-flex justify-content-center">
      {messageList.map(({ role, currentMessage, timestamp }) => (
        <Message variant={role} message={currentMessage} timestamp={timestamp} />
      ))}
    </div>
  );
};

export default ChatBox;
