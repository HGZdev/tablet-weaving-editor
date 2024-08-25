import React, {createContext, useState, ReactNode} from "react";
import {cloneDeep, isEqual} from "lodash";
import initDraft from "../__fixtures__/draft0.js";

export type DraftContextType = {
  draft: Draft;
  paletteOfColors: string[];
  selectedColor: number;
  setSelectedColor: (index: number) => void;
  onUploaded: (uplDraft: Draft) => void;
  onSkewToggle: (col: number) => void;
  onDirChange: (col: number, row: number, isTurnPoint: boolean) => void;
  onColorChange: (col: number, row: number) => void;
  onHolesChange: (newHoles: Holes) => void;
  onPicksChange: (newPicks: Picks) => void;
  onTabletsChange: (newTabletsNum: number) => void;
  onPaletteColorChange: (color: string) => void;
};

export const DraftContext = createContext<DraftContextType | undefined>(
  undefined
);

export const DraftProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [draft, setDraft] = useState<Draft>(initDraft);
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [paletteOfColors, setPaletteOfColors] = useState<string[]>(
    draft.paletteOfColors
  );

  const handleUploaded = (uplDraft: Draft) => {
    setDraft(uplDraft);
    setPaletteOfColors(uplDraft.paletteOfColors);
  };

  const handleSkewToggle = (col: number) => {
    const newSkews = draft.skews.slice();
    newSkews[col] = draft.skews[col] > 0 ? -1 : 1;
    if (!isEqual(draft.skews, newSkews))
      setDraft((d) => ({...d, skews: newSkews}));
  };

  const handleDirChange = (col: number, row: number, isTurnPoint: boolean) => {
    const newDirsChanges = cloneDeep(draft.dirsChanges);
    newDirsChanges[col][row] = isTurnPoint ? 0 : 1;
    if (!isEqual(draft.dirsChanges, newDirsChanges))
      setDraft((d) => ({...d, dirsChanges: newDirsChanges}));
  };

  const handleColorChange = (col: number, row: number) => {
    const newTablets = draft.tablets.slice();
    newTablets[col][row] = paletteOfColors[selectedColor];
    setDraft((d) => ({...d, tablets: newTablets}));
  };

  const handleHolesChange = (newHoles: Holes) => {
    if (newHoles !== draft.holes) {
      const newTablets =
        newHoles > draft.holes
          ? draft.tablets.map((t) => [...t, t.slice(-1)[0]])
          : draft.tablets.map((t) => t.slice(0, -1));

      setDraft((d) => ({...d, holes: newHoles, tablets: newTablets}));
    }
  };

  const handlePicksChange = (newPicks: Picks) => {
    if (newPicks !== draft.picks) {
      const newDirsChanges =
        newPicks > draft.picks
          ? draft.dirsChanges.map((t) => [...t, 0 as MakeDirChange])
          : draft.dirsChanges.map((t) => t.slice(0, -1));

      setDraft((d) => ({...d, picks: newPicks, dirsChanges: newDirsChanges}));
    }
  };

  const handleTabletsChange = (newTabletsNum: number) => {
    if (!isEqual(newTabletsNum, draft.tablets?.length)) {
      const oneMore = newTabletsNum > draft.tablets?.length;
      const newDirsChanges = oneMore
        ? [...draft.dirsChanges, [...draft.dirsChanges.slice(-1)[0]]]
        : draft.dirsChanges.slice(0, -1);
      const newSkews = oneMore
        ? [...draft.skews, ...[...draft.skews.slice(-1)]]
        : draft.skews.slice(0, -1);
      const newTablets = oneMore
        ? [...draft.tablets, [...draft.tablets.slice(-1)[0]]]
        : draft.tablets.slice(0, -1);

      setDraft((d) => ({
        ...d,
        tablets: newTablets,
        skews: newSkews,
        dirsChanges: newDirsChanges,
      }));
    }
  };

  const handlePaletteColorChange = (color: string) => {
    const newPaletteOfColors = paletteOfColors.slice();
    newPaletteOfColors[selectedColor] = color;
    if (!isEqual(paletteOfColors, newPaletteOfColors))
      setPaletteOfColors(newPaletteOfColors);
  };

  return (
    <DraftContext.Provider
      value={{
        draft,
        paletteOfColors,
        selectedColor,
        setSelectedColor,
        onUploaded: handleUploaded,
        onSkewToggle: handleSkewToggle,
        onDirChange: handleDirChange,
        onColorChange: handleColorChange,
        onHolesChange: handleHolesChange,
        onPicksChange: handlePicksChange,
        onTabletsChange: handleTabletsChange,
        onPaletteColorChange: handlePaletteColorChange,
      }}
    >
      {children}
    </DraftContext.Provider>
  );
};
