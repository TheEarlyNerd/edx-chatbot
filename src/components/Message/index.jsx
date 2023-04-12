import React from "react";
import "./Message.css";

const Message = ({ variant, message }) => {
  return (
    <div className={`msg ${variant}`}>{message}<div className='time'>14:43:12</div></div>
  )
}

export default Message;
