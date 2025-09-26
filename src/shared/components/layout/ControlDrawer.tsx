import React from "react";
import { X } from "lucide-react";
import InputsPanel from "../../../domains/editor/components/InputsPanel";
import ColorsPanel from "../../../domains/editor/components/ColorsPanel";

interface ControlDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ControlDrawer: React.FC<ControlDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay - only on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`drawer z-50 ${
          isOpen ? "drawer-open" : "drawer-closed"
        } lg:translate-x-0 lg:static lg:shadow-none lg:border-l-0`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between p-4 border-b border-neutral-200">
            <div>
              <h2 className="text-lg font-semibold text-neutral-800">
                Pattern Settings
              </h2>
              <p className="text-sm text-neutral-600">
                Configure your tablet weaving parameters
              </p>
            </div>
            <button
              onClick={onClose}
              className="btn btn-ghost btn-sm lg:hidden"
              aria-label="Close panel"
            >
              <X size={16} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <InputsPanel />
            <ColorsPanel />
          </div>
        </div>
      </div>
    </>
  );
};

export default ControlDrawer;
