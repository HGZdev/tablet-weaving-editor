import {render} from "@testing-library/react";
import {beforeEach, describe, expect, test, vi} from "vitest";
import Editor from "./Editor";
import {
  findByText,
  findByTitle,
} from "../../../../tests/testing-library/helpers";
import {DraftProvider} from "./DraftContext/DraftContextProvider";
import {MemoryRouter} from "react-router-dom";

describe("Editor Component", () => {
  beforeEach(() => {
    const mockedTimestamp = new Date("2024-01-01T00:00:00Z").getTime();
    vi.spyOn(Date, "now").mockReturnValue(mockedTimestamp);
  });
  test("renders the Editor correctly", async () => {
    render(
      <MemoryRouter>
        <DraftProvider>
          <Editor />
        </DraftProvider>
      </MemoryRouter>
    );

    // Check if the heading is rendered
    expect(await findByText("Tablet Weaving Editor"));
    expect(await findByText("Change color"));

    expect(await findByTitle("tablets-panel")).toMatchSnapshot();
    expect(await findByTitle("threads-panel")).toMatchSnapshot();
    expect(await findByTitle("file-panel")).toMatchSnapshot();
    expect(await findByTitle("control-panel")).toMatchSnapshot();

    expect(await findByText("Save Project"));
  });
});
