import {render} from "@testing-library/react";
import {describe, test, expect, vi} from "vitest";
import userEvent from "@testing-library/user-event";
import TabletsPanel from "./TabletsPanel";
import {
  DraftContext,
  DraftContextType,
} from "./DraftContext/DraftContextProvider";
import {findByTitle} from "../../../../tests/testing-library/helpers";

// Mock data for the draft
const mockDraftContext: DraftContextType = {
  draft: {
    tablets: [
      ["#ff0000", "#00ff00", "#0000ff"],
      ["#ff0000", "#00ff00", "#0000ff"],
    ],
    paletteOfColors: ["#ff0000", "#00ff00", "#0000ff"],
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
  onPaletteColorChange: vi.fn(),
  paletteOfColors: [],
};

describe("TabletsPanel Component", () => {
  test("renders TabletsPanel correctly", async () => {
    render(
      <DraftContext.Provider value={mockDraftContext}>
        <TabletsPanel />
      </DraftContext.Provider>
    );
    const tabletsPanel = await findByTitle("tablets-panel");
    expect(tabletsPanel).toBeTruthy();

    expect(await findByTitle("tablets-panel"));
  });

  test("handles skew toggle interaction", async () => {
    const user = userEvent.setup();

    const {container} = render(
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

  test("handles color change interaction", async () => {
    const user = userEvent.setup();

    const {container} = render(
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
