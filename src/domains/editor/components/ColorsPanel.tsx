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
      role="region"
      aria-labelledby="palette-heading"
    >
      <h2 id="palette-heading" className="text-lg font-semibold">
        Palette
      </h2>
      <div className="flex gap-1" role="group" aria-label="Color palette">
        {paletteOfColors &&
          paletteOfColors.map((color, i) => (
            <button
              key={i}
              title={`Color ${i + 1}: ${color}`}
              className={`w-6 h-6 cursor-pointer ${
                selectedColor === i
                  ? "border-2 border-gray-400 border-dashed"
                  : "border border-gray-400 border-solid"
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(i)}
              aria-label={`Select color ${i + 1}: ${color}`}
              aria-pressed={selectedColor === i}
              role="radio"
              aria-checked={selectedColor === i}
            />
          ))}
      </div>

      <div className="flex gap-2 w-56" role="group" aria-label="Color editor">
        <label htmlFor="color-input" className="sr-only">
          Color value
        </label>
        <input
          id="color-input"
          title="color-input"
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          value={inputColor || ""}
          onChange={(e) => setInputColor(e.target.value)}
          aria-label="Color value"
          aria-describedby="color-change-button"
        />
        <button
          id="color-change-button"
          type="submit"
          className="btn btn-primary px-4 py-2 text-sm"
          onClick={() => handlePaletteColorChange(inputColor)}
          aria-label="Apply color change"
        >
          Change
        </button>
      </div>
    </div>
  );
};

export default ColorsPanel;
