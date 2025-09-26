import React, { useState, useEffect } from "react";
import { useDraft } from "../context/DraftContext/useDraft";

type ThreadColor = string;

const ColorsPanel: React.FC = () => {
  const {
    paletteOfColors,
    selectedColor,
    setSelectedColor,
    onPaletteColorChange,
  } = useDraft();
  const [inputColor, setInputColor] = useState<ThreadColor>("#000000");

  useEffect(() => {
    if (paletteOfColors && paletteOfColors[selectedColor] !== inputColor) {
      setInputColor(paletteOfColors[selectedColor]);
    }
  }, [selectedColor, paletteOfColors]);

  const handlePaletteColorChange = (newColor: ThreadColor) => {
    onPaletteColorChange(newColor);
  };

  return (
    <div
      title="colors-panel"
      className="flex flex-col gap-4 p-4 bg-white rounded-md shadow-md"
    >
      <h2 className="text-lg font-semibold">Palette</h2>
      <div className="flex gap-1">
        {paletteOfColors &&
          paletteOfColors.map((color, i) => (
            <button
              key={i}
              title={color}
              className={`w-6 h-6 cursor-pointer ${
                selectedColor === i
                  ? "border-2 border-gray-400 border-dashed"
                  : "border border-gray-400 border-solid"
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(i)}
            />
          ))}
      </div>

      <div className="flex gap-2 w-56">
        <input
          title="color-input"
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          value={inputColor || ""}
          onChange={(e) => setInputColor(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary px-4 py-2 text-sm"
          onClick={() => handlePaletteColorChange(inputColor)}
        >
          Change
        </button>
      </div>
    </div>
  );
};

export default ColorsPanel;
