import {render} from "@testing-library/react";
import {describe, test, expect} from "vitest";
import ControlPanel from "./ControlPanel";
import {
  findByText,
  findByTitle,
} from "../../../../tests/testing-library/helpers";
import {DraftProvider} from "./DraftContext/DraftContextProvider";

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
