import React from "react";
import "./Message.css";

const Message = ({ variant, message, timestamp }) => {
  if (!timestamp) {
    return null;
  }
  return (
    <div className={`msg ${variant}`}>
      {message}
      <div className="time">{`${timestamp?.getHours()}:${timestamp?.getMinutes()}:${timestamp?.getSeconds()}`}</div>
    </div>
  );
};

export default Message;
