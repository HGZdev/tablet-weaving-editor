// FloatingButton.tsx
import React from "react";
import Draggable from "react-draggable";
import {FiMenu} from "react-icons/fi";

interface FloatingButtonProps {
  onClick: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({onClick}) => {
  return (
    <Draggable>
      <div className="fixed bottom-10 right-10 z-50 cursor-pointer">
        <button
          onClick={onClick}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg focus:outline-none"
          title="Toggle Sidebar"
        >
          <FiMenu size={24} />
        </button>
      </div>
    </Draggable>
  );
};

export default FloatingButton;
