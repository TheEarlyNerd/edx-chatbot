import React from "react";
import Message from "../Message";

// container for all of the messages
const ChatBox = ({ variant }) => {
  return (
    <div>
      <Message variant={variant}>hello!</Message>
    </div>
  )
}

export default ChatBox;
