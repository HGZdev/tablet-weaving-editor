import {useDraft} from "./DraftContext/useDraft";

export const NumberInput: React.FC<{
  innerWrapProps?: {
    arrows?: boolean;
  };
  value: number;
  title?: string;
  label?: string;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}> = ({label, title, value: valueOrg, min, max, onChange}) => {
  const handleIncrement = () => {
    if (max === undefined || valueOrg < max) {
      onChange(valueOrg + 1);
    }
  };

  const handleDecrement = () => {
    if (min === undefined || valueOrg > min) {
      onChange(valueOrg - 1);
    }
  };

  return (
    <div className="flex gap-2">
      <label className="min-w-16">{label}</label>
      <input
        title={title}
        className="w-8 text-center"
        type="number"
        value={valueOrg}
        readOnly
      />
      <button
        title={title + " decrement"}
        className="btn btn-xs btn-neutral w-8 text-center"
        onClick={handleDecrement}
        disabled={min !== undefined && valueOrg <= min}
      >
        <span>-</span>
      </button>
      <button
        title={title + " increment"}
        className="btn btn-xs btn-neutral w-8 text-center"
        onClick={handleIncrement}
        disabled={max !== undefined && valueOrg >= max}
      >
        <span>+</span>
      </button>
    </div>
  );
};

const InputsPanel: React.FC = () => {
  const {draft, onHolesChange, onPicksChange, onTabletsChange} = useDraft();
  const {holes, tablets, picks} = draft;

  if (!tablets || tablets.length === 0) return null;

  return (
    <div title="inputs-panel" className="flex flex-col gap-1">
      <NumberInput
        title="holes-input"
        label="Holes:"
        value={holes}
        min={2}
        onChange={(v) => onHolesChange(v)}
      />
      <NumberInput
        title="picks-input"
        label="Picks:"
        value={picks}
        min={1}
        onChange={(v) => onPicksChange(v)}
      />
      <NumberInput
        title="tablets-input"
        label="Tablets:"
        value={tablets.length}
        min={1}
        onChange={(v) => onTabletsChange(v)}
      />
    </div>
  );
};

export default InputsPanel;
