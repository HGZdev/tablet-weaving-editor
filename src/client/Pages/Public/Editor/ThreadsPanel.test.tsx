import {render} from "@testing-library/react";
import {describe, test, expect, vi} from "vitest";
import userEvent from "@testing-library/user-event";
import ThreadsPanel from "./ThreadsPanel";
import {
  DraftContextType,
  DraftContext,
} from "./DraftContext/DraftContextProvider";

// Mock data for the draft
const mockDraftCtx: DraftContextType = {
  draft: {
    tablets: [
      ["#ff0000", "#00ff00", "#0000ff"],
      ["#ff0000", "#00ff00", "#0000ff"],
    ],
    skews: [-1, 1],
    picks: 3,
    dirsChanges: [
      [0, 1, 0],
      [1, 0, 0],
    ],
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

describe("ThreadsPanel Component", () => {
  test("renders ThreadsPanel correctly", async () => {
    const {findByTitle} = render(
      <DraftContext.Provider value={mockDraftCtx}>
        <ThreadsPanel />
      </DraftContext.Provider>
    );

    // Verify if the thread panel is rendered
    const threadPanel = await findByTitle("threads-panel");
    expect(threadPanel).toBeTruthy();
  });

  test("handles direction change interaction", async () => {
    const user = userEvent.setup();

    const {container} = render(
      <DraftContext.Provider value={mockDraftCtx}>
        <ThreadsPanel />
      </DraftContext.Provider>
    );

    // Simulate clicking the first row of the first thread
    const cell00 = container.querySelector(
      ".col-0.row-0.toggle-rotation-direction"
    ) as Element;
    expect(cell00).toBeTruthy();
    expect(cell00.getAttribute("class")).toContain("dir-forward");

    await user.click(cell00);

    expect(mockDraftCtx.onDirChange).toHaveBeenCalledWith(0, 0, false);

    // Simulate clicking the first row of the second thread
    const cell11 = container.querySelector(
      ".col-1.row-1.toggle-rotation-direction"
    ) as Element;
    expect(cell11.getAttribute("class")).toContain("dir-back");
    expect(cell11).toBeTruthy();

    await user.click(cell11);

    expect(mockDraftCtx.onDirChange).toHaveBeenCalledWith(1, 1, false);
  });

  test("handles skew toggle interaction", async () => {
    const user = userEvent.setup();

    const {container} = render(
      <DraftContext.Provider value={mockDraftCtx}>
        <ThreadsPanel />
      </DraftContext.Provider>
    );

    // Simulate clicking the skew toggle for the second column
    const skewToggleBtn = container.querySelector(
      ".col-1.toggle-skew"
    ) as Element;
    expect(skewToggleBtn).toBeTruthy();

    await user.click(skewToggleBtn);

    expect(mockDraftCtx.onSkewToggle).toHaveBeenCalledWith(1);
  });
});
