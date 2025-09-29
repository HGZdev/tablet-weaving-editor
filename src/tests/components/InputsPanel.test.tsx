import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import InputsPanel from "../../domains/editor/components/InputsPanel";
import {
  DraftContext,
  DraftContextType,
} from "../../domains/editor/context/DraftContext/DraftContextProvider";
import { MemoryRouter } from "react-router-dom";

// Mock draft data with mutable state
let mockDraft = {
  fileName: "fake",
  holes: 4,
  tablets: [[], []], // Tablets array with 2 items
  picks: 5,
  paletteOfColors: [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ff0000",
    "#00ff00",
  ] as [string, string, string, string, string, string, string, string],
  skews: [],
  dirsChanges: [],
};

const mockDraftCtx: DraftContextType = {
  draft: mockDraft,
  selectedColor: 0,
  setSelectedColor: vi.fn(),
  onUploaded: vi.fn(),
  onSkewToggle: vi.fn(),
  onDirChange: vi.fn(),
  onColorChange: vi.fn(),
  onHolesChange: vi.fn(),
  onPicksChange: vi.fn(),
  onTabletsChange: vi.fn(),
  onPaletteColorChange: vi.fn(),
  paletteOfColors: [],
  // Additional methods for compatibility with PatternContext
  setTablets: vi.fn(),
  setPicks: vi.fn(),
  setSkews: vi.fn(),
  setDirsChanges: vi.fn(),
  updateHoles: vi.fn((value) => {
    mockDraft.holes = value;
  }),
  updatePicks: vi.fn((value) => {
    mockDraft.picks = value;
  }),
  updateTablets: vi.fn((value) => {
    // Update tablets array length
    if (value > mockDraft.tablets.length) {
      // Add new tablets
      for (let i = mockDraft.tablets.length; i < value; i++) {
        mockDraft.tablets.push([]);
      }
    } else if (value < mockDraft.tablets.length) {
      // Remove tablets
      mockDraft.tablets = mockDraft.tablets.slice(0, value);
    }
  }),
};

describe("InputsPanel Component", () => {
  beforeEach(() => {
    // Reset mock state before each test
    mockDraft.holes = 4;
    mockDraft.tablets = [[], []]; // 2 tablets
    mockDraft.picks = 5;
    vi.clearAllMocks();
  });

  test("renders InputsPanel correctly", async () => {
    render(
      <MemoryRouter>
        <DraftContext.Provider value={mockDraftCtx}>
          <InputsPanel />
        </DraftContext.Provider>
      </MemoryRouter>
    );

    // Verify if the inputs panel is rendered
    const inputsPanel = screen.getByTitle("inputs-panel");
    expect(inputsPanel).toBeTruthy();
  });

  test("handles holes increment/decrement interaction", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <DraftContext.Provider value={mockDraftCtx}>
          <InputsPanel />
        </DraftContext.Provider>
      </MemoryRouter>
    );

    const holesInput = screen.getByRole("spinbutton", { name: "holes value" });

    // Verify initial value
    expect(holesInput.textContent).toEqual("4");

    // Simulate clicking the increment button
    const incrementBtn = screen.getByLabelText("Increase holes");
    expect(incrementBtn).toBeTruthy();

    await user.click(incrementBtn);
    expect(mockDraftCtx.updateHoles).toHaveBeenCalledWith(5);

    // Simulate clicking the decrement button
    const decrementBtn = screen.getByLabelText("Decrease holes");
    await user.click(decrementBtn);
    expect(mockDraftCtx.updateHoles).toHaveBeenCalledWith(3);
  });

  test("handles picks increment/decrement interaction", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <DraftContext.Provider value={mockDraftCtx}>
          <InputsPanel />
        </DraftContext.Provider>
      </MemoryRouter>
    );

    const picksInput = screen.getByRole("spinbutton", { name: "picks value" });

    // Verify initial value
    expect(picksInput.textContent).toEqual("5");

    // Simulate clicking the increment button
    const incrementBtn = screen.getByLabelText("Increase picks");
    expect(incrementBtn).toBeTruthy();

    await user.click(incrementBtn);
    expect(mockDraftCtx.updatePicks).toHaveBeenCalledWith(6);

    // Simulate clicking the decrement button
    const decrementBtn = screen.getByLabelText("Decrease picks");
    expect(decrementBtn).toBeTruthy();

    await user.click(decrementBtn);
    expect(mockDraftCtx.updatePicks).toHaveBeenCalledWith(4);
  });

  test("handles tablets increment/decrement interaction", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <DraftContext.Provider value={mockDraftCtx}>
          <InputsPanel />
        </DraftContext.Provider>
      </MemoryRouter>
    );

    const tabletsInput = screen.getByRole("spinbutton", {
      name: "tablets value",
    });

    // Verify initial value
    expect(tabletsInput.textContent).toEqual("2");

    // Simulate clicking the increment button
    const incrementBtn = screen.getByLabelText("Increase tablets");
    expect(incrementBtn).toBeTruthy();

    await user.click(incrementBtn);
    expect(mockDraftCtx.updateTablets).toHaveBeenCalledWith(3);

    // Test that decrement button is disabled at minimum value
    const decrementBtn = screen.getByLabelText("Decrease tablets");
    expect(decrementBtn).toBeTruthy();
    expect(decrementBtn).toBeDisabled();
  });
});
