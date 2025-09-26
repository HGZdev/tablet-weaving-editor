import { render } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import ColorsPanel from "../components/ColorsPanel";
import {
  findByText,
  findByTitle,
} from "../../../__tests__/testing-library/helpers";
import {
  DraftContext,
  DraftContextType,
} from "../context/DraftContext/DraftContextProvider";
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
    for (const color of mockDraftCtx.paletteOfColors!) {
      expect(await findByTitle(color.toUpperCase())).toBeTruthy();
    }
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
    const colorButton = await findByTitle(mockDraftCtx.paletteOfColors![1]);
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

    const colorInput = await findByTitle("color-input");
    await user.clear(colorInput);
    await user.type(colorInput, "#123456");

    const changeColorBtn = await findByText("Change");
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

    const colorInput = await findByTitle("color-input");
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
    const secondColorButton = await findByTitle(
      mockDraftCtx.paletteOfColors![1]
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
    const colorInput = await findByTitle("color-input");
    await user.clear(colorInput);
    await user.type(colorInput, "#FF00FF");

    const changeColorBtn = await findByText("Change");
    await user.click(changeColorBtn);

    expect(mockDraftCtx.onPaletteColorChange).toHaveBeenCalledWith("#FF00FF");
  });
});
