import {render} from "@testing-library/react";
import {describe, test, expect} from "vitest";
import ControlPanel from "./ControlPanel";
import {
  findByText,
  findByTitle,
} from "../../../../tests/testing-library/helpers";
import {DraftProvider} from "./DraftContext/DraftContextProvider";

// Mock data for the draft
const mockDraft: Draft = {
  holes: 4,
  tablets: [
    [
      /* mock tablet data */
    ],
  ],
  picks: 5,
  paletteOfColors: ["#ff0000", "#00ff00", "#0000ff"],
  skews: [1, -1, 1],
  dirsChanges: [
    [0, 1],
    [1, 0],
    [0, 1],
  ],
};

describe("ControlPanel Component", () => {
  test("renders ControlPanel correctly", async () => {
    render(
      <DraftProvider>
        <ControlPanel />
      </DraftProvider>
    );

    expect(await findByText("Control Panel"));
    expect(await findByTitle("file-panel"));
    expect(await findByTitle("inputs-panel"));
    expect(await findByTitle("colors-panel"));
  });
});
