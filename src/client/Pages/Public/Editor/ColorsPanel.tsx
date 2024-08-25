import {useState, useEffect} from "react";
import {ButtonPrimary} from "../../../Components/Buttons";
import {useDraft} from "./DraftContext/useDraft";

const ColorsPanel: React.FC = () => {
  const {
    paletteOfColors,
    selectedColor,
    setSelectedColor,
    onPaletteColorChange,
  } = useDraft();
  const [inputColor, setInputColor] = useState<ThreadColor>(
    paletteOfColors[selectedColor]
  );

  useEffect(() => {
    if (paletteOfColors[selectedColor] !== inputColor)
      setInputColor(paletteOfColors[selectedColor]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColor]);

  return (
    <div title="colors-panel" className="flex flex-col gap-2">
      <div className="flex gap-1">
        {paletteOfColors?.map((color, i) => (
          <button
            key={i}
            title={color}
            className={`w-[1.5rem] h-[1.5rem] cursor-pointer ${
              selectedColor === i
                ? `border-2 border-gray-400 border-dashed`
                : `border-[0.5px] border-gray-400 border-solid`
            }`}
            style={{backgroundColor: color}}
            onClick={() => setSelectedColor(i)}
          />
        ))}
      </div>

      <div className="flex gap-2 w-56">
        <input
          title="color-input"
          type="text"
          className="input input-bordered rounded-none input-sm w-full"
          value={inputColor || ""}
          onChange={(e) => setInputColor(e.target.value)}
        />
        <ButtonPrimary
          type="submit"
          onClick={() => onPaletteColorChange(inputColor)}
        >
          Change color
        </ButtonPrimary>
      </div>
      {/* </FormikForm> */}
    </div>
  );
};

export default ColorsPanel;
