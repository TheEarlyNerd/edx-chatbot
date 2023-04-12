import { useState, useReducer, useEffect } from "react";
import ToggleXpert from "../components/ToggleXpertButton";
import Sidebar from "../components/Sidebar";

const initialState = {
  currentMessage: "",
  messageList: [
    {
      user: "xpert",
      message: "Hello, how can I help you?",
      timestamp: new Date(),
    },
  ],
};

function parseTimestamp(timestamp) {
  return new Date(
    timestamp
  );
}

function reducer(state, action) {
  switch (action.type) {

    case "UPDATE_CURRENT_MESSAGE":
      return { ...state, currentMessage: action.payload };

    case "SEND_MESSAGE":
      const newMessages = [...state.messageList, action.payload];
      localStorage.setItem("messages", JSON.stringify(newMessages));
      return { ...state, messageList: newMessages, currentMessage: "" };

    case "LOAD_MESSAGES":
      const storedMessages = localStorage.getItem("messages");
      const parsedMessages = storedMessages
        ? JSON.parse(storedMessages).map((message) => {
            const parsedTimestamp = parseTimestamp(message.timestamp);
            return {
              ...message,
              timestamp: parsedTimestamp
            };
          })
        : [];
      return { ...state, messageList: parsedMessages };

    default:
      return state;
  }
}

function Xpert() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  useEffect(() => {
    dispatch({ type: "LOAD_MESSAGES" });
  }, []);

  const handleUpdateCurrentMessage = (event) => {
    dispatch({ type: "UPDATE_CURRENT_MESSAGE", payload: event.target.value });
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (state.currentMessage) {
      const timestamp = new Date();

      dispatch({
        type: "SEND_MESSAGE",
        payload: {
          role: 'user',
          currentMessage: state.currentMessage,
          timestamp,
        },
      });

      
    }
  };

  function clearLocalStorage() {
    localStorage.clear();
  }

  console.log(state)

  // clearLocalStorage()

  return (
    <div>
      <ToggleXpert isOpen={sidebarIsOpen} setIsOpen={setSidebarIsOpen} />
      <Sidebar
        state={state}
        handleUpdateCurrentMessage={handleUpdateCurrentMessage}
        handleSendMessage={handleSendMessage}
        isOpen={sidebarIsOpen}
        setIsOpen={setSidebarIsOpen}
      />
    </div>
  );
}

export default Xpert;
