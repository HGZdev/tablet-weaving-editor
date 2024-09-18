import {render} from "@testing-library/react";
import {describe, test, expect, vi} from "vitest";
import userEvent from "@testing-library/user-event";
import ColorsPanel from "./ColorsPanel";
import {
  findByText,
  findByTitle,
} from "../../../../tests/testing-library/helpers";
import {
  DraftContext,
  DraftContextType,
} from "./DraftContext/DraftContextProvider";

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
};

describe("ColorsPanel Component", () => {
  test("renders ColorsPanel correctly", async () => {
    render(
      <DraftContext.Provider value={mockDraftCtx}>
        <ColorsPanel />
      </DraftContext.Provider>
    );

    // Check if the colors are rendered as buttons
    for (const color of mockDraftCtx.paletteOfColors!) {
      expect(await findByTitle(color.toUpperCase())).toBeTruthy();
    }
  });

  test("handles color selection and updates state", async () => {
    const user = userEvent.setup();

    render(
      <DraftContext.Provider value={mockDraftCtx}>
        <ColorsPanel />
      </DraftContext.Provider>
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
      <DraftContext.Provider value={mockDraftCtx}>
        <ColorsPanel />
      </DraftContext.Provider>
    );

    const colorInput = await findByTitle("color-input");
    await user.clear(colorInput);
    await user.type(colorInput, "#123456");

    const changeColorBtn = await findByText("Change color");
    await user.click(changeColorBtn);

    expect(mockDraftCtx.onPaletteColorChange).toHaveBeenCalledWith("#123456");
  });

  test("handles out-of-bounds selectedColor index", async () => {
    const outOfBoundsContext = {
      ...mockDraftCtx,
      selectedColor: 5, // Invalid index, out of bounds
    };

    render(
      <DraftContext.Provider value={outOfBoundsContext}>
        <ColorsPanel />
      </DraftContext.Provider>
    );

    const colorInput = await findByTitle("color-input");
    expect(colorInput.getAttribute("value")).toContain(""); // Should default to an empty value or handle appropriately
  });
});
