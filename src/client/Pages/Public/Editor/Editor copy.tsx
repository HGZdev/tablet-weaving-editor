import React from "react";
import ControlPanel from "./ControlPanel.tsx";
import TabletsPanel from "./TabletsPanel.tsx";
import ThreadsPanel from "./ThreadsPanel.tsx";

const EditorPanel: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="inline-flex flex-col-reverse md:flex-col">
        <ThreadsPanel />
        <TabletsPanel />
      </div>
      <ControlPanel />
    </div>
  );
};

const Editor: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1>Tablet Weaving Editor</h1>
      <EditorPanel />
    </div>
  );
};

export default Editor;
