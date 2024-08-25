import ColorsPanel from "./ColorsPanel";
import FilePanel from "./FilePanel";
import InputsPanel from "./InputsPanel";

const ControlPanel: React.FC = () => {
  return (
    <div title="control-panel" className="inline-flex flex-col gap-4 ">
      <h2>Control Panel</h2>
      <InputsPanel />
      <ColorsPanel />
      <FilePanel />
    </div>
  );
};

export default ControlPanel;
