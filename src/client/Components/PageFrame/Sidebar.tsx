import React, {MouseEventHandler} from "react";
import {NavButton} from "../Buttons";
import {FiX} from "react-icons/fi";

const Sidebar: React.FC<{
  onToggleSidebar: MouseEventHandler<HTMLButtonElement>;
}> = ({onToggleSidebar, children}) => {
  return (
    <div className="flex flex-col items-start bg-base-100 h-full">
      {/* close sidebar button */}
      <NavButton onClick={onToggleSidebar} className="md:hidden">
        <FiX size={24} />
      </NavButton>
      {children}
    </div>
  );
};

export default Sidebar;
