import {render} from "@testing-library/react";
import {describe, test, expect, vi} from "vitest";
import userEvent from "@testing-library/user-event";
import InputsPanel from "./InputsPanel";
import {
  DraftContext,
  DraftContextType,
} from "./DraftContext/DraftContextProvider";
import {findByTitle} from "../../../../tests/testing-library/helpers";

// Mock draft data
const mockDraftCtx: DraftContextType = {
  draft: {
    holes: 4,
    tablets: [[], []], // Tablets array with 2 items
    picks: 5,
    paletteOfColors: ["#ff0000", "#00ff00", "#0000ff"],
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

  onPaletteColorChange: vi.fn(),
};

describe("InputsPanel Component", () => {
  test("renders InputsPanel correctly", async () => {
    render(
      <DraftContext.Provider value={mockDraftCtx}>
        <InputsPanel />
      </DraftContext.Provider>
    );

    // Verify if the inputs panel is rendered
    const inputsPanel = await findByTitle("inputs-panel");
    expect(inputsPanel).toBeTruthy();
  });

  test("handles holes increment/decrement interaction", async () => {
    const user = userEvent.setup();

    render(
      <DraftContext.Provider value={mockDraftCtx}>
        <InputsPanel />
      </DraftContext.Provider>
    );

    const holesInput = await findByTitle("holes-input");

    // Verify initial value
    expect(holesInput.getAttribute("value")).toEqual("4");

    // Simulate clicking the increment button
    const incrementBtn = await findByTitle("holes-input increment");
    expect(incrementBtn).toBeTruthy();

    await user.click(incrementBtn);
    expect(mockDraftCtx.onHolesChange).toHaveBeenCalledWith(5);

    // Simulate clicking the decrement button
    const decrementBtn = await findByTitle("holes-input decrement");
    await user.click(decrementBtn);
    expect(mockDraftCtx.onHolesChange).toHaveBeenCalledWith(3);
  });

  test("handles picks increment/decrement interaction", async () => {
    const user = userEvent.setup();

    render(
      <DraftContext.Provider value={mockDraftCtx}>
        <InputsPanel />
      </DraftContext.Provider>
    );

    const picksInput = await findByTitle("picks-input");

    // Verify initial value
    expect(picksInput.getAttribute("value")).toEqual("5");

    // Simulate clicking the increment button
    const incrementBtn = await findByTitle("picks-input increment");
    expect(incrementBtn).toBeTruthy();

    await user.click(incrementBtn);
    expect(mockDraftCtx.onPicksChange).toHaveBeenCalledWith(6);

    // Simulate clicking the decrement button
    const decrementBtn = await findByTitle("picks-input decrement");
    expect(decrementBtn).toBeTruthy();

    await user.click(decrementBtn);
    expect(mockDraftCtx.onPicksChange).toHaveBeenCalledWith(4);
  });

  test("handles tablets increment/decrement interaction", async () => {
    const user = userEvent.setup();

    render(
      <DraftContext.Provider value={mockDraftCtx}>
        <InputsPanel />
      </DraftContext.Provider>
    );

    const tabletsInput = await findByTitle("tablets-input");

    // Verify initial value
    expect(tabletsInput.getAttribute("value")).toEqual("2");

    // Simulate clicking the increment button
    const incrementBtn = await findByTitle("tablets-input increment");
    expect(incrementBtn).toBeTruthy();

    await user.click(incrementBtn);
    expect(mockDraftCtx.onTabletsChange).toHaveBeenCalledWith(3);

    // Simulate clicking the decrement button
    const decrementBtn = await findByTitle("tablets-input decrement");
    expect(decrementBtn).toBeTruthy();

    await user.click(decrementBtn);
    expect(mockDraftCtx.onTabletsChange).toHaveBeenCalledWith(1);
  });
});
