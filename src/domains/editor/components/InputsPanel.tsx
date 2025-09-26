import React from "react";
import { useDraft } from "../context/DraftContext/useDraft";

export const NumberInput: React.FC<{
  value: number;
  title?: string;
  label?: string;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}> = ({ label, title, value: valueOrg, min, max, onChange }) => {
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
      <label className="min-w-16 text-sm">{label}</label>
      <button
        onClick={handleDecrement}
        className="btn btn-outline btn-sm w-8 h-8 p-0 flex items-center justify-center text-sm font-bold"
        disabled={min !== undefined && valueOrg <= min}
        title={`${title} decrement`}
      >
        −
      </button>
      <div
        title={title}
        className="w-8 text-center text-sm border border-neutral-300 rounded px-1 py-1 bg-white flex items-center justify-center"
      >
        {valueOrg}
      </div>
      <button
        onClick={handleIncrement}
        className="btn btn-outline btn-sm w-8 h-8 p-0 flex items-center justify-center text-sm font-bold"
        disabled={max !== undefined && valueOrg >= max}
        title={`${title} increment`}
      >
        +
      </button>
    </div>
  );
};

const InputsPanel: React.FC = () => {
  try {
    const { draft, updateHoles, updatePicks, updateTablets } = useDraft();
    const { tablets, picks, holes } = draft;

    if (!tablets || tablets.length === 0) {
      console.log("InputsPanel: No tablets, returning null");
      return null;
    }

    return (
      <div
        title="inputs-panel"
        className="flex flex-col gap-2 p-4 bg-white rounded-md shadow-md"
      >
        <h2 className="text-lg font-semibold">Frame</h2>
        <NumberInput
          title="holes-input"
          label="Holes:"
          value={holes}
          min={3}
          max={8}
          onChange={(v) => updateHoles(v)}
        />
        <NumberInput
          title="picks-input"
          label="Picks:"
          value={picks}
          min={1}
          max={99}
          onChange={(v) => updatePicks(v)}
        />
        <NumberInput
          title="tablets-input"
          label="Tablets:"
          value={tablets.length}
          min={2}
          max={30}
          onChange={(v) => updateTablets(v)}
        />
      </div>
    );
  } catch (error) {
    console.error("InputsPanel error:", error);
    return <div>Error loading InputsPanel</div>;
  }
};

export default InputsPanel;
