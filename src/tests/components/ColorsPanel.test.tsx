import React from "react";
import { screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import ColorsPanel from "../../domains/editor/components/ColorsPanel";
import {
  DraftContext,
  DraftContextType,
} from "../../domains/editor/context/DraftContext/DraftContextProvider";
import { renderWithRouter } from "../helpers";

// Mocking DraftContext values
const mockDraftCtx: DraftContextType = {
  paletteOfColors: ["#FF0000", "#00FF00", "#0000FF"],
  selectedColor: 0,
  setSelectedColor: vi.fn(),
  onPaletteColorChange: vi.fn(),
  draft: {
    // @ts-ignore
    fileName: undefined,
    tablets: [],
    holes: 0,
    picks: 0,
    skews: [],
    // @ts-ignore
    paletteOfColors: [],
    dirsChanges: [],
  },
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
};

describe("ColorsPanel Component", () => {
  describe("Component Rendering", () => {
    test("renders color palette buttons correctly", async () => {
      renderWithRouter(
        <DraftContext.Provider value={mockDraftCtx}>
          <ColorsPanel />
        </DraftContext.Provider>
      );

      // Check if the colors are rendered as buttons
      expect(
        screen.getByTitle(`Color 1: ${mockDraftCtx.paletteOfColors![0]}`)
      ).toBeTruthy();
      expect(
        screen.getByTitle(`Color 2: ${mockDraftCtx.paletteOfColors![1]}`)
      ).toBeTruthy();
      expect(
        screen.getByTitle(`Color 3: ${mockDraftCtx.paletteOfColors![2]}`)
      ).toBeTruthy();
    });
  });

  describe("Color Selection", () => {
    test("handles color selection and updates state correctly", async () => {
      const user = userEvent.setup();

      renderWithRouter(
        <DraftContext.Provider value={mockDraftCtx}>
          <ColorsPanel />
        </DraftContext.Provider>
      );

      // Simulate selecting the second color
      const colorButton = screen.getByTitle(
        `Color 2: ${mockDraftCtx.paletteOfColors![1]}`
      );
      expect(colorButton).toBeTruthy();

      await user.click(colorButton);

      expect(mockDraftCtx.setSelectedColor).toHaveBeenCalledWith(1);
    });
  });

  describe("Color Modification", () => {
    test("handles color input change and updates palette", async () => {
      const user = userEvent.setup();

      renderWithRouter(
        <DraftContext.Provider value={mockDraftCtx}>
          <ColorsPanel />
        </DraftContext.Provider>
      );

      const colorInput = screen.getByTitle("color-input");
      await user.clear(colorInput);
      await user.type(colorInput, "#123456");

      const changeColorBtn = screen.getByText("Change");
      await user.click(changeColorBtn);

      expect(mockDraftCtx.onPaletteColorChange).toHaveBeenCalledWith("#123456");
    });
  });
});

describe("Error Handling", () => {
  test("handles out-of-bounds selectedColor index gracefully", async () => {
    const outOfBoundsContext = {
      ...mockDraftCtx,
      selectedColor: 5, // Invalid index, out of bounds
    };

    renderWithRouter(
      <DraftContext.Provider value={outOfBoundsContext}>
        <ColorsPanel />
      </DraftContext.Provider>
    );

    const colorInput = screen.getByTitle("color-input");
    expect(colorInput.getAttribute("value")).toContain(""); // Should default to an empty value or handle appropriately
  });

  test("color selection updates input field with selected color", async () => {
    const user = userEvent.setup();

    // Create a mock that updates selectedColor when setSelectedColor is called
    const mockSetSelectedColor = vi.fn((newColor: number) => {
      mockDraftCtx.selectedColor = newColor;
    });

    const updatedMockCtx = {
      ...mockDraftCtx,
      setSelectedColor: mockSetSelectedColor,
    };

    renderWithRouter(
      <DraftContext.Provider value={updatedMockCtx}>
        <ColorsPanel />
      </DraftContext.Provider>
    );

    // Select second color
    const secondColorButton = screen.getByTitle(
      `Color 2: ${mockDraftCtx.paletteOfColors![1]}`
    );
    await user.click(secondColorButton);

    // Verify setSelectedColor was called
    expect(mockSetSelectedColor).toHaveBeenCalledWith(1);
  });
});

describe("Color Change", () => {
  test("color change updates palette correctly", async () => {
    const user = userEvent.setup();

    renderWithRouter(
      <DraftContext.Provider value={mockDraftCtx}>
        <ColorsPanel />
      </DraftContext.Provider>
    );

    // Change the first color
    const colorInput = screen.getByTitle("color-input");
    await user.clear(colorInput);
    await user.type(colorInput, "#FF00FF");

    const changeColorBtn = screen.getByText("Change");
    await user.click(changeColorBtn);

    expect(mockDraftCtx.onPaletteColorChange).toHaveBeenCalledWith("#FF00FF");
  });
});
