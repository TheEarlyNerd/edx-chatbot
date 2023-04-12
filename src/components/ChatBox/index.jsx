import React, { useEffect, useState} from "react";
import Message from "../Message";
import "./ChatBox.css";

// container for all of the messages
const ChatBox = ({ messageList, chatboxContainerRef }) => {
  const [isResponseLoading, setResponseLoading] = useState(false);

  useEffect(() => {
    if (messageList[messageList.length-1].role === 'user') {
      setResponseLoading(true);
    } else {
      setResponseLoading(false);
    }
  }, [messageList])

  return (
    <div ref={chatboxContainerRef} className="scroller container d-flex justify-content-center">
      {messageList.map(({ role, content, timestamp }) => (
        <Message key={timestamp.toString()} variant={role} message={content} timestamp={timestamp} />
      ))}
      {isResponseLoading && (
        <div className='loading'>Xpert is thinking</div>
      )}
    </div>
  );
};

export default ChatBox;
