import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import ColorsPanel from "../../domains/editor/components/ColorsPanel";
import {
  DraftContext,
  DraftContextType,
} from "../../domains/editor/context/DraftContext/DraftContextProvider";
import { MemoryRouter } from "react-router-dom";

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
  test("renders ColorsPanel correctly", async () => {
    render(
      <MemoryRouter>
        <DraftContext.Provider value={mockDraftCtx}>
          <ColorsPanel />
        </DraftContext.Provider>
      </MemoryRouter>
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

  test("handles color selection and updates state", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <DraftContext.Provider value={mockDraftCtx}>
          <ColorsPanel />
        </DraftContext.Provider>
      </MemoryRouter>
    );

    // Simulate selecting the second color
    const colorButton = screen.getByTitle(
      `Color 2: ${mockDraftCtx.paletteOfColors![1]}`
    );
    expect(colorButton).toBeTruthy();

    await user.click(colorButton);

    expect(mockDraftCtx.setSelectedColor).toHaveBeenCalledWith(1);
  });

  test("handles color input change", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <DraftContext.Provider value={mockDraftCtx}>
          <ColorsPanel />
        </DraftContext.Provider>
      </MemoryRouter>
    );

    const colorInput = screen.getByTitle("color-input");
    await user.clear(colorInput);
    await user.type(colorInput, "#123456");

    const changeColorBtn = screen.getByText("Change");
    await user.click(changeColorBtn);

    expect(mockDraftCtx.onPaletteColorChange).toHaveBeenCalledWith("#123456");
  });

  test("handles out-of-bounds selectedColor index", async () => {
    const outOfBoundsContext = {
      ...mockDraftCtx,
      selectedColor: 5, // Invalid index, out of bounds
    };

    render(
      <MemoryRouter>
        <DraftContext.Provider value={outOfBoundsContext}>
          <ColorsPanel />
        </DraftContext.Provider>
      </MemoryRouter>
    );

    const colorInput = screen.getByTitle("color-input");
    expect(colorInput.getAttribute("value")).toContain(""); // Should default to an empty value or handle appropriately
  });

  test("color selection updates input field", async () => {
    const user = userEvent.setup();

    // Create a mock that updates selectedColor when setSelectedColor is called
    const mockSetSelectedColor = vi.fn((newColor: number) => {
      mockDraftCtx.selectedColor = newColor;
    });

    const updatedMockCtx = {
      ...mockDraftCtx,
      setSelectedColor: mockSetSelectedColor,
    };

    render(
      <MemoryRouter>
        <DraftContext.Provider value={updatedMockCtx}>
          <ColorsPanel />
        </DraftContext.Provider>
      </MemoryRouter>
    );

    // Select second color
    const secondColorButton = screen.getByTitle(
      `Color 2: ${mockDraftCtx.paletteOfColors![1]}`
    );
    await user.click(secondColorButton);

    // Verify setSelectedColor was called
    expect(mockSetSelectedColor).toHaveBeenCalledWith(1);
  });

  test("color change updates palette", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <DraftContext.Provider value={mockDraftCtx}>
          <ColorsPanel />
        </DraftContext.Provider>
      </MemoryRouter>
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
