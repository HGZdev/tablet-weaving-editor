import * as React from "react";
import ColorsPanel from "./ColorsPanel";
import FilePanel from "./FilePanel";
import InputsPanel from "./InputsPanel";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "../../../shared/components/ui/drawer";

interface ControlPanelProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  testId?: string;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  isOpen,
  onOpenChange,
  testId,
}) => {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange} testId={testId}>
      <DrawerContent className="max-h-[80vh]" id="control-drawer">
        <DrawerHeader>
          <DrawerTitle>Control Panel</DrawerTitle>
          <DrawerDescription>
            Configure your tablet weaving parameters
          </DrawerDescription>
        </DrawerHeader>
        <div
          className="flex flex-col gap-4 p-4 overflow-y-auto"
          role="region"
          aria-label="Control panel settings"
        >
          <InputsPanel />
          <ColorsPanel />
          <FilePanel />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ControlPanel;
