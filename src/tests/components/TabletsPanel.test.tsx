import React from "react";
import { describe, test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import TabletsPanel from "../../domains/editor/components/TabletsPanel";
import {
  DraftContext,
  DraftContextType,
} from "../../domains/editor/context/DraftContext/DraftContextProvider";
import { findByTitle, renderWithRouter } from "../helpers";

// Mock data for the draft
const mockDraftContext: DraftContextType = {
  draft: {
    fileName: "fake",
    tablets: [
      ["#ff0000", "#00ff00", "#0000ff"],
      ["#ff0000", "#00ff00", "#0000ff"],
    ],
    paletteOfColors: [
      "#ff0000",
      "#00ff00",
      "#0000ff",
      "#ff0000",
      "#00ff00",
      "#0000ff",
      "#ff0000",
      "#00ff00",
    ],
    skews: [-1, 1],
    holes: 3,
    picks: 3,
    dirsChanges: [
      [0, 1, 0],
      [1, 0, 0],
    ],
  },
  selectedColor: 0,
  setSelectedColor: vi.fn(),
  onUploaded: vi.fn(),
  onSkewToggle: vi.fn(),
  onDirChange: vi.fn(),
  onColorChange: vi.fn(),
  onHolesChange: vi.fn(),
  onPicksChange: vi.fn(),
  onTabletsChange: vi.fn(),
  // Additional methods for compatibility with PatternContext
  setTablets: vi.fn(),
  setPicks: vi.fn(),
  setSkews: vi.fn(),
  setDirsChanges: vi.fn(),
  updateHoles: vi.fn(),
  updatePicks: vi.fn(),
  updateTablets: vi.fn(),
  onPaletteColorChange: vi.fn(),
  paletteOfColors: [],
};

describe("TabletsPanel Component", () => {
  describe("Component Rendering", () => {
    test("renders tablets panel correctly", async () => {
      renderWithRouter(
        <DraftContext.Provider value={mockDraftContext}>
          <TabletsPanel />
        </DraftContext.Provider>
      );
      const tabletsPanel = await findByTitle("tablets-panel");
      expect(tabletsPanel).toBeTruthy();

      expect(await findByTitle("tablets-panel"));
    });
  });

  describe("User Interactions", () => {
    test("handles skew toggle interaction correctly", async () => {
      const user = userEvent.setup();

      const { container } = renderWithRouter(
        <DraftContext.Provider value={mockDraftContext}>
          <TabletsPanel />
        </DraftContext.Provider>
      );

      const skewToggleBtn = container.querySelector(
        ".col-1.toggle-skew"
      ) as Element;
      expect(skewToggleBtn).toBeTruthy();
      await user.click(skewToggleBtn);
      expect(mockDraftContext.onSkewToggle).toHaveBeenCalledWith(1);
    });

    test("handles color change interaction correctly", async () => {
      const user = userEvent.setup();

      const { container } = renderWithRouter(
        <DraftContext.Provider value={mockDraftContext}>
          <TabletsPanel />
        </DraftContext.Provider>
      );

      const colorCell = container.querySelector(
        ".col-0.row-0.change-color"
      ) as Element;

      expect(colorCell).toBeTruthy();

      await user.click(colorCell);

      expect(mockDraftContext.onColorChange).toHaveBeenCalledWith(0, 0);
    });
  });
});
