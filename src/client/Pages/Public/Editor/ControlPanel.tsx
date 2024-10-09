import ColorsPanel from "./ColorsPanel";
import FilePanel from "./FilePanel";
import InputsPanel from "./InputsPanel";

const ControlPanel: React.FC = () => {
  return (
    <div title="control-panel" className="flex flex-col h-full gap-4 p-4  ">
      <InputsPanel />
      <ColorsPanel />
      <FilePanel />
    </div>
  );
};

export default ControlPanel;
