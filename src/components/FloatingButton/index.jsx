import React, { useState } from "react";
import Sidebar from "../Sidebar";

const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className={`fixed bottom-0 right-96 bg-red-950 text-white px-4 py-2 rounded-t-lg shadow transition-all duration-500`}
        onClick={handleClick}
      >
        {isOpen ? "Close" : "Talk to Xey"}
      </button>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default FloatingButton;
