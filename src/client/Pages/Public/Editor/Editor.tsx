import React, {MouseEventHandler} from "react";
import ControlPanel from "./ControlPanel";
import ThreadsPanel from "./ThreadsPanel";
import TabletsPanel from "./TabletsPanel";
import {FiX} from "react-icons/fi";
import {NavButton} from "../../../Components/Buttons";
import PageFrame from "../../../Components/PageFrame/PageFrame";

const Sidebar: React.FC<{
  onToggleSidebar: MouseEventHandler<HTMLButtonElement>;
}> = ({onToggleSidebar}) => {
  return (
    <div className="flex flex-col items-start bg-base-100 h-full">
      {/* close sidebar button */}
      <NavButton onClick={onToggleSidebar} className="md:hidden">
        <FiX size={24} />
      </NavButton>
      <ControlPanel />
    </div>
  );
};

export const Main = () => {
  return (
    <div className="flex flex-col flex-1 bg-base-100 justify-center">
      <ThreadsPanel />
      <TabletsPanel />
    </div>
  );
};

const Editor: React.FC = () => {
  return <PageFrame {...{Sidebar, Main}} />;
};

export default Editor;
