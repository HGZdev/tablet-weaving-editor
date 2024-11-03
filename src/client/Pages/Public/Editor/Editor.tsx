import React, {useRef} from "react";
import ControlPanel from "./ControlPanel";
import ThreadsPanel from "./ThreadsPanel";
import TabletsPanel from "./TabletsPanel";
import {FiX} from "react-icons/fi";
import {NavButton} from "../../../Components/Buttons";
import PageFrame from "../../../Components/PageFrame";
import useOverflowDetection from "../../../hooks.ts/useOverflowDetection";

const Sidebar: React.FC<{
  onToggleSidebar: () => void;
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

export const Main: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const isOverflowing = useOverflowDetection(mainRef);

  return (
    <div
      ref={mainRef}
      className={`flex w-full ${
        isOverflowing ? "justify-start" : "justify-center"
      } overflow-x-auto pb-[15rem]`}
    >
      <div className="bg-white my-8 py-4 px-8 rounded-md">
        <ThreadsPanel />
        <TabletsPanel />
      </div>
    </div>
  );
};

const Editor: React.FC = () => {
  return <PageFrame {...{Sidebar, Main}} />;
};

export default Editor;
