import { useState, useReducer, useEffect } from "react";
import ToggleXpert from "../components/ToggleXpertButton";
import Sidebar from "../components/Sidebar";

const initialState = {
  currentMessage: "",
  messageList: [
    {
      role: "assistant",
      content: "Hello! What can I help you to understand today?",
      timestamp: new Date(),
    },
  ],
};

const API_URL =
  "https://gi03ikk2u1.execute-api.us-west-2.amazonaws.com/prod/chat";

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_CURRENT_MESSAGE":
      return { ...state, currentMessage: action.payload };

    case "ADD_NEW_MESSAGE":
      const newMessages = [...state.messageList, action.payload];
      // localStorage.setItem("messages", JSON.stringify(newMessages));
      return { ...state, messageList: newMessages, currentMessage: "" };

    case "FETCH_ERROR":
      return {
        loading: false,
        data: [],
        error: action.payload,
      };

    case "CLEAR_MESSAGES":
      return initialState;

    default:
      return state;
  }
}

function Xpert() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  useEffect(() => {
    if (state.messageList[state.messageList.length - 1].role === 'user') {
      getGPTResponse();
    }
  }, [state.messageList])

  const getGPTResponse = async () => {
    const requestBody = {
      chatbotPersona: "default",
      responseComplexityLevel: "advanced",
      courseData: {
        title: "Introduction to Circuts",
        keywords: [
          "Haaaahvad",
          "Introduction",
          "Engineering",
          "Electronics",
          "STEM",
        ],
        description:
          "An electrical network is an interconnection of electrical components (e.g., batteries, resistors, inductors, capacitors, switches, transistors) or a model of such an interconnection, consisting of electrical elements (e.g., voltage sources, current sources, resistances, inductances, capacitances). An electrical circuit is a network consisting of a closed loop, giving a return path for the current. Linear electrical networks, a special type consisting only of sources (voltage or current), linear lumped elements (resistors, capacitors, inductors), and linear distributed elements (transmission lines), have the property that signals are linearly superimposable. They are thus more easily analyzed, using powerful frequency domain methods such as Laplace transforms, to determine DC response, AC response, and transient response.",
      },
      chat_history: {
        messages: state.messageList.map((message) => ({
          role: message?.role,
          content: message?.content,
        })),
      },
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    };

    try {
      const response = await fetch(API_URL, requestOptions);
      const data = await response.json();
      const gptMessageResponse = {
        role: 'assistant',
        content: data.message.messageBody,
        timestamp: new Date(),
      }
      dispatch({ type: "ADD_NEW_MESSAGE", payload: gptMessageResponse });
    } catch (error) {
      console.error("Hey it failed :(")
      dispatch({ type: "FETCH_ERROR", payload: "Error fetching data" });
    }
  };

  const handleUpdateCurrentMessage = (event) => {
    dispatch({ type: "UPDATE_CURRENT_MESSAGE", payload: event.target.value });
  };

  const handleSubmitMessage = (event) => {
    event.preventDefault();
    if (state.currentMessage) {
      const timestamp = new Date();
      dispatch({
        type: "ADD_NEW_MESSAGE",
        payload: {
          role: "user",
          content: state.currentMessage,
          timestamp,
        },
      });
    }
  }

  const clearState = () => {
    dispatch({
      type: "CLEAR_MESSAGES",
    });
  };

  return (
    <div>
      <ToggleXpert isOpen={sidebarIsOpen} setIsOpen={setSidebarIsOpen} />
      <Sidebar
        state={state}
        handleUpdateCurrentMessage={handleUpdateCurrentMessage}
        handleSubmitMessage={handleSubmitMessage}
        isOpen={sidebarIsOpen}
        setIsOpen={setSidebarIsOpen}
        clearState={clearState}
      />
    </div>
  );
}

export default Xpert;
