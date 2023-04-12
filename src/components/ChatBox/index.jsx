import React from "react";
import Message from "../Message";
import "./ChatBox.css";


// container for all of the messages
const ChatBox = () => {
  const messageResponses = { 'hello': 'Hello back!', 'this is a long question just asking if this team is going to do amazing at the hackathon': 'As an Xpert, I have full confidence in you.' }
  Object.entries(messageResponses).map(([key, value]) => console.log(key + ': ' + value));
  return (
    <div class="scroller container d-flex justify-content-center">
      {Object.entries(messageResponses).map(([key, value]) => {
        return (
          <>
            <Message variant='user' message={key} />
            <Message variant='xpert' message={value} />
          </>
        )
      })}
    </div>);

} 

export default ChatBox;