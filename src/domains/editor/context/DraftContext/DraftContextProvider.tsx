import React, { createContext, useState, ReactNode, useCallback } from "react";
import { cloneDeep, isEqual } from "lodash";
import initDraft from "../../../../tests/fixtures/initialDraft";
import type {
  Draft,
  ThreadColor,
  Skew,
  MakeDirChange,
} from "../../components/types";

export type DraftContextType = {
  draft: Draft;
  paletteOfColors: string[];
  selectedColor: number;
  setSelectedColor: (index: number) => void;
  onUploaded: (uplDraft: Draft) => void;
  onSkewToggle: (col: number) => void;
  onDirChange: (col: number, row: number, isTurnPoint: boolean) => void;
  onColorChange: (col: number, row: number) => void;
  onHolesChange: (newHoles: Draft["holes"]) => void;
  onPicksChange: (newPicks: Draft["picks"]) => void;
  onTabletsChange: (newTabletsNum: number) => void;
  onPaletteColorChange: (color: string) => void;

  setTablets: (tablets: ThreadColor[][]) => void;
  setPicks: (picks: number) => void;
  setSkews: (skews: Skew[]) => void;
  setDirsChanges: (dirsChanges: MakeDirChange[][]) => void;
  updateHoles: (holes: number) => void;
  updatePicks: (picks: number) => void;
  updateTablets: (tablets: number) => void;
};

export const DraftContext = createContext<DraftContextType | undefined>(
  undefined
);

export const DraftProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [draft, setDraft] = useState<Draft>(initDraft as Draft);
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [paletteOfColors, setPaletteOfColors] = useState<string[]>(
    draft.paletteOfColors
  );

  const handleUploaded = (uplDraft: Draft) => {
    setDraft(uplDraft);
    setPaletteOfColors(uplDraft.paletteOfColors);
  };

  const handleSkewToggle = (col: number) => {
    const newSkews = draft.skews.slice() as typeof draft.skews;
    newSkews[col] = draft.skews[col] > 0 ? -1 : 1;
    if (!isEqual(draft.skews, newSkews))
      setDraft((d) => ({ ...d, skews: newSkews }));
  };

  const handleDirChange = (col: number, row: number, isTurnPoint: boolean) => {
    const newDirsChanges = cloneDeep(draft.dirsChanges);
    newDirsChanges[col][row] = isTurnPoint ? 0 : 1;
    if (!isEqual(draft.dirsChanges, newDirsChanges))
      setDraft((d) => ({ ...d, dirsChanges: newDirsChanges }));
  };

  const handleColorChange = (col: number, row: number) => {
    const newTablets = draft.tablets.slice() as typeof draft.tablets;
    newTablets[col][row] = paletteOfColors[selectedColor];
    setDraft((d) => ({ ...d, tablets: newTablets }));
  };

  const handleHolesChange = useCallback((newHoles: number) => {
    setDraft((prevDraft) => {
      if (newHoles !== prevDraft.holes) {
        const newTablets =
          newHoles > prevDraft.holes
            ? (prevDraft.tablets.map((t) => {
                const lastColor = t[t.length - 1];
                const additionalColors = Array(newHoles - prevDraft.holes).fill(
                  lastColor
                );
                return [...t, ...additionalColors];
              }) as unknown as typeof prevDraft.tablets)
            : (prevDraft.tablets.map((t) =>
                t.slice(0, newHoles)
              ) as typeof prevDraft.tablets);

        return { ...prevDraft, holes: newHoles, tablets: newTablets };
      }
      return prevDraft;
    });
  }, []);

  const handlePicksChange = useCallback((newPicks: number) => {
    setDraft((prevDraft) => {
      if (newPicks !== prevDraft.picks) {
        const newDirsChanges =
          newPicks > prevDraft.picks
            ? (prevDraft.dirsChanges.map((t) => [
                ...t,
                ...Array(newPicks - prevDraft.picks).fill(0 as MakeDirChange),
              ]) as unknown as typeof prevDraft.dirsChanges)
            : (prevDraft.dirsChanges.map((t) =>
                t.slice(0, newPicks)
              ) as unknown as typeof prevDraft.dirsChanges);

        return {
          ...prevDraft,
          picks: newPicks,
          dirsChanges: newDirsChanges,
        };
      }
      return prevDraft;
    });
  }, []);

  const handleTabletsChange = useCallback((newTabletsNum: number) => {
    setDraft((prevDraft) => {
      if (newTabletsNum !== prevDraft.tablets?.length) {
        const oneMore = newTabletsNum > prevDraft.tablets?.length;
        const newDirsChanges = oneMore
          ? [...prevDraft.dirsChanges, [...prevDraft.dirsChanges.slice(-1)[0]]]
          : prevDraft.dirsChanges.slice(0, -1);
        const newSkews = oneMore
          ? [...prevDraft.skews, ...[...prevDraft.skews.slice(-1)]]
          : prevDraft.skews.slice(0, -1);
        const newTablets = oneMore
          ? [...prevDraft.tablets, [...prevDraft.tablets.slice(-1)[0]]]
          : prevDraft.tablets.slice(0, -1);

        // Update holes to match the number of holes in the tablets
        const newHoles =
          newTablets.length > 0 ? newTablets[0].length : prevDraft.holes;

        return {
          ...prevDraft,
          tablets: newTablets,
          skews: newSkews,
          dirsChanges: newDirsChanges,
          holes: newHoles,
        };
      }
      return prevDraft;
    });
  }, []);

  const handlePaletteColorChange = (color: string) => {
    const newPaletteOfColors = [...paletteOfColors] as [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ];
    newPaletteOfColors[selectedColor] = color;
    if (!isEqual(paletteOfColors, newPaletteOfColors)) {
      setPaletteOfColors(newPaletteOfColors);
      // Also update the draft's paletteOfColors to keep them in sync
      setDraft((d) => ({ ...d, paletteOfColors: newPaletteOfColors }));
    }
  };

  const setTablets = useCallback((newTablets: ThreadColor[][]) => {
    setDraft((d) => ({ ...d, tablets: newTablets }));
  }, []);

  const setPicks = useCallback(
    (newPicks: number) => {
      handlePicksChange(newPicks);
    },
    [handlePicksChange]
  );

  const setSkews = useCallback((newSkews: Skew[]) => {
    setDraft((d) => ({ ...d, skews: newSkews }));
  }, []);

  const setDirsChanges = useCallback((newDirsChanges: MakeDirChange[][]) => {
    setDraft((d) => ({ ...d, dirsChanges: newDirsChanges }));
  }, []);

  const updateHoles = useCallback(
    (holes: number) => {
      handleHolesChange(holes);
    },
    [handleHolesChange]
  );

  const updatePicks = useCallback(
    (picks: number) => {
      handlePicksChange(picks);
    },
    [handlePicksChange]
  );

  const updateTablets = useCallback(
    (tablets: number) => {
      handleTabletsChange(tablets);
    },
    [handleTabletsChange]
  );

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
        setTablets,
        setPicks,
        setSkews,
        setDirsChanges,
        updateHoles,
        updatePicks,
        updateTablets,
      }}
    >
      {children}
    </DraftContext.Provider>
  );
};
