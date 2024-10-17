import {render, screen} from "@testing-library/react";
import {describe, test, expect, vi, afterEach} from "vitest";
import userEvent from "@testing-library/user-event";
import FilePanel from "./FilePanel";
import {
  DraftContext,
  DraftContextType,
} from "./DraftContext/DraftContextProvider";
import {findByText} from "../../../../tests/testing-library/helpers";
import {MemoryRouter} from "react-router-dom";

const mockDraftCtx: DraftContextType = {
  draft: {
    fileName: "mockDraft",
    tablets: [
      ["#ff0000", "#00ff00", "#0000ff"],
      ["#ff0000", "#00ff00", "#0000ff"],
    ],
    holes: 4,
    picks: 5,
    skews: [1, 1, -1],
    dirsChanges: [
      [0, 1],
      [1, 0],
      [0, 1],
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
  },
  onUploaded: vi.fn(),
  paletteOfColors: [],
  selectedColor: 0,
  setSelectedColor: vi.fn(),
  onSkewToggle: vi.fn(),
  onDirChange: vi.fn(),
  onColorChange: vi.fn(),
  onHolesChange: vi.fn(),
  onPicksChange: vi.fn(),
  onTabletsChange: vi.fn(),
  onPaletteColorChange: vi.fn(),
};

describe("FilePanel Component", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test("renders FilePanel correctly", async () => {
    render(
      <MemoryRouter>
        <DraftContext.Provider value={mockDraftCtx}>
          <FilePanel />
        </DraftContext.Provider>
      </MemoryRouter>
    );

    expect(await findByText("Save Project")).toBeTruthy();
    expect(await findByText("Open Project")).toBeTruthy();

    // Check if the file name input is rendered with the correct value
    const fileNameInput = screen.getByDisplayValue("mockDraft");
    expect(fileNameInput).toBeTruthy();
  });

  test("handles file upload interaction", async () => {
    const user = userEvent.setup();

    const {container} = render(
      <MemoryRouter>
        <DraftContext.Provider value={mockDraftCtx}>
          <FilePanel />
        </DraftContext.Provider>
      </MemoryRouter>
    );

    const openButton = await findByText("Open Project");
    await user.click(openButton);

    const input = container.querySelector(
      ".hidden-file-upload-input"
    ) as HTMLElement;
    expect(input).toBeTruthy();

    const file = new File([JSON.stringify(mockDraftCtx)], "mockDraft.json", {
      type: "application/json",
    });
    expect(file).toBeTruthy();
    await user.upload(input, file);

    expect(mockDraftCtx.onUploaded).toHaveBeenCalledWith(
      expect.objectContaining({
        draft: expect.objectContaining(mockDraftCtx.draft),
        fileName: "mockDraft",
      })
    );
  });

  test("handles file download interaction", async () => {
    const mockDownload = vi.fn();
    global.URL.createObjectURL = mockDownload;

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <DraftContext.Provider value={mockDraftCtx}>
          <FilePanel />
        </DraftContext.Provider>
      </MemoryRouter>
    );

    const saveButton = await findByText("Save Project");
    await user.click(saveButton);

    expect(mockDownload).toHaveBeenCalled();
  });
});
