import {render, screen} from "@testing-library/react";
import {describe, test, expect, vi, afterEach} from "vitest";
import userEvent from "@testing-library/user-event";
import FilePanel from "./FilePanel";
import {DraftContext} from "./DraftContext/DraftContextProvider";
import {findByText} from "../../../../tests/testing-library/helpers";
import draft1 from "./__fixtures__/draft1";

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
    paletteOfColors: ["#ff0000", "#00ff00", "#0000ff"],
  },
  onUploaded: vi.fn(),
};

describe("FilePanel Component", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test("renders FilePanel correctly", async () => {
    render(
      <DraftContext.Provider value={mockDraftCtx}>
        <FilePanel />
      </DraftContext.Provider>
    );

    // Check if the "Save project" and "Open" buttons are rendered
    expect(await findByText("Save project")).toBeTruthy();
    expect(await findByText("Open")).toBeTruthy();

    // Check if the file name input is rendered with the correct value
    const fileNameInput = screen.getByDisplayValue("mockDraft");
    expect(fileNameInput).toBeTruthy();
  });

  test("handles file upload interaction", async () => {
    const user = userEvent.setup();

    const {container} = render(
      <DraftContext.Provider value={mockDraftCtx}>
        <FilePanel />
      </DraftContext.Provider>
    );

    const openButton = await findByText("Open");
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
      <DraftContext.Provider value={mockDraftCtx}>
        <FilePanel />
      </DraftContext.Provider>
    );

    const saveButton = await findByText("Save project");
    await user.click(saveButton);

    expect(mockDownload).toHaveBeenCalled();
  });

  test("handles example draft upload", async () => {
    const user = userEvent.setup();

    render(
      <DraftContext.Provider value={mockDraftCtx}>
        <FilePanel />
      </DraftContext.Provider>
    );

    const exampleDraftButton = await findByText("draft 1");
    expect(exampleDraftButton).toBeTruthy();
    await user.click(exampleDraftButton);

    expect(mockDraftCtx.onUploaded).toHaveBeenCalledWith(draft1);
  });
});
