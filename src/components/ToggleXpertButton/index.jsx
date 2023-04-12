import { ChevronRight } from "react-feather";
import { ReactComponent as NewXeySvg } from "../../assets/new_xey.svg";
import "./index.css";

const ToggleXpert = ({ isOpen, setIsOpen }) => {
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  if (isOpen) {
    return (
      <button
        className={`fixed flex flex-row bottom-4 sidebar-open bg-white p-2 rounded-full shadow transition-all ease duration-800`}
        onClick={handleClick}
      >
        <ChevronRight size="20" color="black" />
      </button>
    );
  }

  return (
    <button
      className={`fixed bottom-4 sidebar-closed px-4 py-2 transition-all ease duration-800`}
      onClick={handleClick}
    >
      <NewXeySvg width="58" />
    </button>
  );
};

export default ToggleXpert;
