import React, { useRef, useState } from "react";
import ControlPanel from "./ControlPanel";
import ThreadsPanel from "./ThreadsPanel";
import TabletsPanel from "./TabletsPanel";
import { FiSettings } from "react-icons/fi";
import { NavButton } from "../../../shared/components/ui/Buttons";
import PageFrame from "../../../shared/components/ui/PageFrame";
import useOverflowDetection from "../../../shared/hooks/useOverflowDetection";
import { DrawerTrigger } from "../../../shared/components/ui/drawer";

const Sidebar: React.FC<{
  onToggleSidebar: () => void;
}> = () => {
  const [isControlPanelOpen, setIsControlPanelOpen] = useState(false);

  return (
    <div className="flex flex-col items-start bg-card border-r border-border h-full">
      {/* Control Panel Trigger Button */}
      <DrawerTrigger asChild>
        <NavButton
          onClick={() => setIsControlPanelOpen(true)}
          className="w-full justify-start gap-2"
          title="control-panel"
          aria-label="Open control panel"
          aria-expanded={isControlPanelOpen}
          aria-controls="control-drawer"
        >
          <FiSettings size={20} aria-hidden="true" />
          Control Panel
        </NavButton>
      </DrawerTrigger>

      {/* Control Panel Drawer */}
      <ControlPanel
        isOpen={isControlPanelOpen}
        onOpenChange={setIsControlPanelOpen}
      />
    </div>
  );
};

// Mobile Control Panel Component
const MobileControlPanel: React.FC = () => {
  const [isControlPanelOpen, setIsControlPanelOpen] = useState(false);

  return (
    <>
      {/* Mobile Control Panel Trigger */}
      <NavButton
        onClick={() => setIsControlPanelOpen(true)}
        className="md:hidden"
        aria-label="Open Control Panel"
      >
        <FiSettings size={24} />
      </NavButton>

      {/* Control Panel Drawer */}
      <ControlPanel
        isOpen={isControlPanelOpen}
        onOpenChange={setIsControlPanelOpen}
      />
    </>
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
      <div className="bg-card border border-border my-8 py-4 px-8 rounded-lg shadow-sm">
        <ThreadsPanel />
        <TabletsPanel />
      </div>
    </div>
  );
};

const Editor: React.FC = () => {
  return <PageFrame {...{ Sidebar, Main, MobileControlPanel }} />;
};

export default Editor;
