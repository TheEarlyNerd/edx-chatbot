import { useState, useReducer, useEffect } from "react";
import ToggleXpert from "../components/ToggleXpertButton";
import Sidebar from "../components/Sidebar";

const initialState = {
  message: "",
  messages: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_MESSAGE":
      return { ...state, message: action.payload };
      
    case "ADD_MESSAGE":
      const newMessages = [...state.messages, action.payload];
      localStorage.setItem("messages", JSON.stringify(newMessages));
      return { ...state, messages: newMessages, message: "" };

    case "LOAD_MESSAGES":
      const storedMessages = localStorage.getItem("messages");
      return {
        ...state,
        messages: storedMessages ? JSON.parse(storedMessages) : [],
      };

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

  const handleMessageChange = (event) => {
    dispatch({ type: "SET_MESSAGE", payload: event.target.value });
  };

  const handleSendMessage = () => {
    if (state.message) {
      dispatch({ type: "ADD_MESSAGE", payload: state.message });
    }
  };

  return (
    <div className="">
      <ToggleXpert isOpen={sidebarIsOpen} setIsOpen={setSidebarIsOpen} />
      <Sidebar
        handleMessageChange={handleMessageChange}
        handleSendMessage={handleSendMessage}
        isOpen={sidebarIsOpen}
        setIsOpen={setSidebarIsOpen}
      />
    </div>
  );
}

export default Xpert;
