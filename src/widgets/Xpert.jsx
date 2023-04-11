import { useState } from "react";
import ToggleXpert from "../components/ToggleXpertButton";
import Sidebar from "../components/Sidebar";

function Xpert() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  return (
    <div className="">
      <ToggleXpert isOpen={sidebarIsOpen} setIsOpen={setSidebarIsOpen} />
      <Sidebar isOpen={sidebarIsOpen} setIsOpen={setSidebarIsOpen} />
    </div>
  );
}

export default Xpert;
