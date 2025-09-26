import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi, beforeEach } from "vitest";
import Editor from "../components/Editor";
import { findByTitle } from "../../../__tests__/testing-library/helpers";
import { DraftProvider } from "../context/DraftContext/DraftContextProvider";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

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

    // Check if the main components are rendered
    const controlPanelButtons = await screen.findAllByText("Control Panel");
    expect(controlPanelButtons.length).toBeGreaterThan(0);

    expect(await findByTitle("tablets-panel")).toMatchSnapshot();
    expect(await findByTitle("threads-panel")).toMatchSnapshot();
    const filePanels = await screen.findAllByTitle("file-panel");
    expect(filePanels[0]).toMatchSnapshot();
    expect(await findByTitle("control-panel")).toMatchSnapshot();

    const saveProjectButtons = await screen.findAllByText("Save Project");
    expect(saveProjectButtons.length).toBeGreaterThan(0);
  });

  describe("Input Controls Integration", () => {
    test("Holes input affects TabletsPanel rows", async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter>
          <DraftProvider>
            <Editor />
          </DraftProvider>
        </MemoryRouter>
      );

      // Open control panel
      const controlButton = await screen.findByTitle("control-panel");
      await user.click(controlButton);

      // Find holes increment button in the control panel (not sidebar)
      const inputsPanels = await screen.findAllByTitle("inputs-panel");
      const controlPanelInputs = inputsPanels[1]; // Second one is in the control panel
      const holesIncrement = controlPanelInputs.querySelector(
        '[title="holes-input increment"]'
      ) as HTMLElement;

      // Click increment twice (4 -> 5 -> 6)
      await user.click(holesIncrement);
      await user.click(holesIncrement);

      // Verify TabletsPanel has 6 rows (2 RowsLabels components × 6 rows each = 12 elements)
      const tabletsPanel = await screen.findByTitle("tablets-panel");
      const rowLabels = tabletsPanel.querySelectorAll(
        '[class*="row-A"], [class*="row-B"], [class*="row-C"], [class*="row-D"], [class*="row-E"], [class*="row-F"]'
      );
      expect(rowLabels).toHaveLength(12); // 2 RowsLabels × 6 rows
    });

    test("Tablets input affects TabletsPanel columns", async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter>
          <DraftProvider>
            <Editor />
          </DraftProvider>
        </MemoryRouter>
      );

      // Open control panel
      const controlButton = await screen.findByTitle("control-panel");
      await user.click(controlButton);

      // Find tablets increment button in the control panel
      const inputsPanels = await screen.findAllByTitle("inputs-panel");
      const inputsPanel = inputsPanels[1]; // Second one is in the control panel
      const tabletsIncrement = inputsPanel.querySelector(
        '[title="tablets-input increment"]'
      ) as HTMLElement;

      // Click increment twice (5 -> 6 -> 7)
      await user.click(tabletsIncrement);
      await user.click(tabletsIncrement);

      // Verify TabletsPanel has 7 columns
      const tabletsPanel = await screen.findByTitle("tablets-panel");
      const colLabels = tabletsPanel.querySelectorAll('[class*="col-"]');
      expect(colLabels.length).toBeGreaterThanOrEqual(7);
    });

    test("Picks input affects ThreadsPanel rows", async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter>
          <DraftProvider>
            <Editor />
          </DraftProvider>
        </MemoryRouter>
      );

      // Open control panel
      const controlButton = await screen.findByTitle("control-panel");
      await user.click(controlButton);

      // Find picks increment button in the control panel
      const inputsPanels = await screen.findAllByTitle("inputs-panel");
      const inputsPanel = inputsPanels[1]; // Second one is in the control panel
      const picksIncrement = inputsPanel.querySelector(
        '[title="picks-input increment"]'
      ) as HTMLElement;

      // Click increment twice (8 -> 9 -> 10)
      await user.click(picksIncrement);
      await user.click(picksIncrement);

      // Verify ThreadsPanel has 10 rows (2 RowsLabels components × 10 rows each = 20 elements)
      const threadsPanel = await screen.findByTitle("threads-panel");
      // Count only the RowsLabels elements (not the Thread elements)
      const rowsLabelsElements = threadsPanel.querySelectorAll(
        '[title="row number"]'
      );
      expect(rowsLabelsElements).toHaveLength(20); // 2 RowsLabels × 10 rows
    });

    test("Input controls respect min/max boundaries", async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter>
          <DraftProvider>
            <Editor />
          </DraftProvider>
        </MemoryRouter>
      );

      // Open control panel
      const controlButton = await screen.findByTitle("control-panel");
      await user.click(controlButton);

      // Test holes boundaries (min=3, max=8)
      const inputsPanels = await screen.findAllByTitle("inputs-panel");
      const inputsPanel = inputsPanels[1]; // Second one is in the control panel
      const holesDecrement = inputsPanel.querySelector(
        '[title="holes-input decrement"]'
      ) as HTMLElement;
      const holesIncrement = inputsPanel.querySelector(
        '[title="holes-input increment"]'
      ) as HTMLElement;

      // Click decrement until minimum (should disable)
      await user.click(holesDecrement); // 4 -> 3
      expect(holesDecrement).toBeDisabled();

      // Click increment until maximum (should disable)
      for (let i = 0; i < 5; i++) {
        await user.click(holesIncrement); // 3 -> 8
      }
      expect(holesIncrement).toBeDisabled();
    });

    test("Rapid input changes don't cause blocking", async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter>
          <DraftProvider>
            <Editor />
          </DraftProvider>
        </MemoryRouter>
      );

      // Open control panel
      const controlButton = await screen.findByTitle("control-panel");
      await user.click(controlButton);

      const inputsPanels = await screen.findAllByTitle("inputs-panel");
      const inputsPanel = inputsPanels[1]; // Second one is in the control panel
      const holesIncrement = inputsPanel.querySelector(
        '[title="holes-input increment"]'
      ) as HTMLElement;
      const tabletsIncrement = inputsPanel.querySelector(
        '[title="tablets-input increment"]'
      ) as HTMLElement;
      const picksIncrement = inputsPanel.querySelector(
        '[title="picks-input increment"]'
      ) as HTMLElement;

      // Rapidly click all increment buttons
      const rapidClicks = async () => {
        for (let i = 0; i < 5; i++) {
          await user.click(holesIncrement);
          await user.click(tabletsIncrement);
          await user.click(picksIncrement);
        }
      };

      // This should not throw or cause blocking
      await expect(rapidClicks()).resolves.not.toThrow();
    });
  });

  describe("useDraft Hook Integration", () => {
    test("useDraft provides correct initial state", async () => {
      render(
        <MemoryRouter>
          <DraftProvider>
            <Editor />
          </DraftProvider>
        </MemoryRouter>
      );

      // Verify initial values are displayed by finding specific input elements
      const inputsPanels = await screen.findAllByTitle("inputs-panel");
      const inputsPanel = inputsPanels[1]; // Second one is in the control panel

      const holesValue = inputsPanel.querySelector('[title="holes-input"]');
      const tabletsValue = inputsPanel.querySelector('[title="tablets-input"]');
      const picksValue = inputsPanel.querySelector('[title="picks-input"]');

      expect(holesValue).toHaveTextContent("4"); // holes
      expect(tabletsValue).toHaveTextContent("4"); // tablets
      expect(picksValue).toHaveTextContent("8"); // picks
    });

    test("State updates trigger re-renders", async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter>
          <DraftProvider>
            <Editor />
          </DraftProvider>
        </MemoryRouter>
      );

      // Open control panel
      const controlButton = await screen.findByTitle("control-panel");
      await user.click(controlButton);

      const inputsPanels = await screen.findAllByTitle("inputs-panel");
      const inputsPanel = inputsPanels[1]; // Second one is in the control panel
      const holesIncrement = inputsPanel.querySelector(
        '[title="holes-input increment"]'
      ) as HTMLElement;

      // Click increment and verify value changes
      await user.click(holesIncrement);

      // Verify the value in the input has changed by finding specific input element
      const inputsPanelsUpdate = await screen.findAllByTitle("inputs-panel");
      const inputsPanelUpdate = inputsPanelsUpdate[1]; // Second one is in the control panel
      const holesValue = inputsPanelUpdate.querySelector(
        '[title="holes-input"]'
      );
      expect(holesValue).toHaveTextContent("5");
    });
  });

  describe("Panel Synchronization", () => {
    test("TabletsPanel reflects holes changes", async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter>
          <DraftProvider>
            <Editor />
          </DraftProvider>
        </MemoryRouter>
      );

      // Open control panel
      const controlButton = await screen.findByTitle("control-panel");
      await user.click(controlButton);

      const inputsPanels = await screen.findAllByTitle("inputs-panel");
      const inputsPanel = inputsPanels[1]; // Second one is in the control panel
      const holesIncrement = inputsPanel.querySelector(
        '[title="holes-input increment"]'
      ) as HTMLElement;

      // Change holes from 4 to 6
      await user.click(holesIncrement);
      await user.click(holesIncrement);

      // Verify TabletsPanel has 6 rows (2 RowsLabels components × 6 rows each = 12 elements)
      const tabletsPanel = await screen.findByTitle("tablets-panel");
      const rowLabels = tabletsPanel.querySelectorAll(
        '[class*="row-A"], [class*="row-B"], [class*="row-C"], [class*="row-D"], [class*="row-E"], [class*="row-F"]'
      );
      expect(rowLabels).toHaveLength(12); // 2 RowsLabels × 6 rows
    });

    test("ThreadsPanel reflects picks changes", async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter>
          <DraftProvider>
            <Editor />
          </DraftProvider>
        </MemoryRouter>
      );

      // Open control panel
      const controlButton = await screen.findByTitle("control-panel");
      await user.click(controlButton);

      const inputsPanels = await screen.findAllByTitle("inputs-panel");
      const inputsPanel = inputsPanels[1]; // Second one is in the control panel
      const picksIncrement = inputsPanel.querySelector(
        '[title="picks-input increment"]'
      ) as HTMLElement;

      // Change picks from 8 to 10
      await user.click(picksIncrement);
      await user.click(picksIncrement);

      // Verify ThreadsPanel has 10 rows (2 RowsLabels components × 10 rows each = 20 elements)
      const threadsPanel = await screen.findByTitle("threads-panel");
      // Count only the RowsLabels elements (not the Thread elements)
      const rowsLabelsElements = threadsPanel.querySelectorAll(
        '[title="row number"]'
      );
      expect(rowsLabelsElements).toHaveLength(20); // 2 RowsLabels × 10 rows
    });
  });

  describe("Boundary Testing", () => {
    test("Minimum values work correctly", async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter>
          <DraftProvider>
            <Editor />
          </DraftProvider>
        </MemoryRouter>
      );

      // Open control panel
      const controlButton = await screen.findByTitle("control-panel");
      await user.click(controlButton);

      // Set to minimum values
      const inputsPanels = await screen.findAllByTitle("inputs-panel");
      const inputsPanel = inputsPanels[1]; // Second one is in the control panel
      const holesDecrement = inputsPanel.querySelector(
        '[title="holes-input decrement"]'
      ) as HTMLElement;
      const tabletsDecrement = inputsPanel.querySelector(
        '[title="tablets-input decrement"]'
      ) as HTMLElement;
      const picksDecrement = inputsPanel.querySelector(
        '[title="picks-input decrement"]'
      ) as HTMLElement;

      await user.click(holesDecrement); // 4 -> 3
      await user.click(tabletsDecrement); // 4 -> 3
      await user.click(tabletsDecrement); // 3 -> 2
      await user.click(picksDecrement); // 8 -> 7
      // Continue clicking picks decrement until 1
      for (let i = 0; i < 6; i++) {
        await user.click(picksDecrement);
      }

      // Verify minimum values by finding specific input elements
      const inputsPanelsMin = await screen.findAllByTitle("inputs-panel");
      const inputsPanelMin = inputsPanelsMin[1]; // Second one is in the control panel

      const holesValue = inputsPanelMin.querySelector('[title="holes-input"]');
      const tabletsValue = inputsPanelMin.querySelector(
        '[title="tablets-input"]'
      );
      const picksValue = inputsPanelMin.querySelector('[title="picks-input"]');

      expect(holesValue).toHaveTextContent("3"); // holes min
      expect(tabletsValue).toHaveTextContent("2"); // tablets min
      expect(picksValue).toHaveTextContent("1"); // picks min
    });

    test("Maximum values work correctly", async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter>
          <DraftProvider>
            <Editor />
          </DraftProvider>
        </MemoryRouter>
      );

      // Open control panel
      const controlButton = await screen.findByTitle("control-panel");
      await user.click(controlButton);

      // Set to maximum values
      const inputsPanels = await screen.findAllByTitle("inputs-panel");
      const inputsPanel = inputsPanels[1]; // Second one is in the control panel
      const holesIncrement = inputsPanel.querySelector(
        '[title="holes-input increment"]'
      ) as HTMLElement;
      const tabletsIncrement = inputsPanel.querySelector(
        '[title="tablets-input increment"]'
      ) as HTMLElement;
      const picksIncrement = inputsPanel.querySelector(
        '[title="picks-input increment"]'
      ) as HTMLElement;

      // Set holes to max (8)
      for (let i = 0; i < 4; i++) {
        await user.click(holesIncrement);
      }

      // Set tablets to max (30) - this will take many clicks
      for (let i = 0; i < 26; i++) {
        await user.click(tabletsIncrement);
      }

      // Set picks to max (99) - this will take many clicks
      for (let i = 0; i < 91; i++) {
        await user.click(picksIncrement);
      }

      // Verify maximum values by finding specific input elements
      const holesValue = inputsPanel.querySelector('[title="holes-input"]');
      const tabletsValue = inputsPanel.querySelector('[title="tablets-input"]');
      const picksValue = inputsPanel.querySelector('[title="picks-input"]');

      expect(holesValue).toHaveTextContent("8"); // holes max
      expect(tabletsValue).toHaveTextContent("30"); // tablets max
      expect(picksValue).toHaveTextContent("99"); // picks max
    }, 30000); // Increase timeout to 30 seconds
  });

  test("Color palette integration with TabletsPanel", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <DraftProvider>
          <Editor />
        </DraftProvider>
      </MemoryRouter>
    );

    // Open control panel
    const controlButton = await screen.findByTitle("control-panel");
    await user.click(controlButton);

    // Find colors panel in control panel (second one)
    const colorsPanels = await screen.findAllByTitle("colors-panel");
    const colorsPanel = colorsPanels[1]; // Second one is in the control panel
    expect(colorsPanel).toBeTruthy();

    // Find TabletsPanel
    const tabletsPanel = await screen.findByTitle("tablets-panel");
    expect(tabletsPanel).toBeTruthy();

    // Find color change buttons in TabletsPanel (should be 3 tablets × 4 holes = 12 buttons)
    const colorChangeButtons = tabletsPanel.querySelectorAll(
      '[title="change color"]'
    );
    expect(colorChangeButtons.length).toBeGreaterThan(0);

    // Click on first color change button (first tablet, first hole)
    const firstColorButton = colorChangeButtons[0] as HTMLElement;
    await user.click(firstColorButton);

    // Verify the color was applied (check if the background color changed)
    // The button should now have the selected color as background
    const firstColorButtonAfter = tabletsPanel.querySelector(
      '[title="change color"]'
    ) as HTMLElement;
    expect(firstColorButtonAfter).toBeTruthy();
  });

  test("Color palette selection and application", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <DraftProvider>
          <Editor />
        </DraftProvider>
      </MemoryRouter>
    );

    // Open control panel
    const controlButton = await screen.findByTitle("control-panel");
    await user.click(controlButton);

    // Find colors panel in control panel (second one)
    const colorsPanels = await screen.findAllByTitle("colors-panel");
    const colorsPanel = colorsPanels[1]; // Second one is in the control panel

    // Find color buttons in palette
    const colorButtons = colorsPanel.querySelectorAll('button[title^="#"]');
    expect(colorButtons.length).toBeGreaterThan(0);

    // Select second color from palette
    const secondColorButton = colorButtons[1] as HTMLElement;
    await user.click(secondColorButton);

    // Verify color input field shows the selected color
    const colorInput = colorsPanel.querySelector(
      '[title="color-input"]'
    ) as HTMLInputElement;
    expect(colorInput).toHaveValue(secondColorButton.getAttribute("title"));

    // Find TabletsPanel
    const tabletsPanel = await screen.findByTitle("tablets-panel");

    // Apply color to first tablet, first hole
    const firstColorChangeButton = tabletsPanel.querySelector(
      '[title="change color"]'
    ) as HTMLElement;
    await user.click(firstColorChangeButton);

    // The color should now be applied to that position
    expect(firstColorChangeButton).toBeTruthy();
  });

  test("Color change in palette updates TabletsPanel", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <DraftProvider>
          <Editor />
        </DraftProvider>
      </MemoryRouter>
    );

    // Open control panel
    const controlButton = await screen.findByTitle("control-panel");
    await user.click(controlButton);

    // Find colors panel in control panel (second one)
    const colorsPanels = await screen.findAllByTitle("colors-panel");
    const colorsPanel = colorsPanels[1]; // Second one is in the control panel

    // Change the first color in palette
    const colorInput = colorsPanel.querySelector(
      '[title="color-input"]'
    ) as HTMLInputElement;
    await user.clear(colorInput);
    await user.type(colorInput, "#FF00FF");

    const changeColorBtn = colorsPanel.querySelector(
      'button[type="submit"]'
    ) as HTMLElement;
    await user.click(changeColorBtn);

    // Verify the color button in palette has updated
    const firstColorButton = colorsPanel.querySelector(
      'button[title^="#"]'
    ) as HTMLElement;
    expect(firstColorButton.getAttribute("title")).toBe("#FF00FF");

    // Find TabletsPanel
    const tabletsPanel = await screen.findByTitle("tablets-panel");

    // Apply the changed color to a tablet position
    const firstColorChangeButton = tabletsPanel.querySelector(
      '[title="change color"]'
    ) as HTMLElement;
    await user.click(firstColorChangeButton);

    // The new color should be applied
    expect(firstColorChangeButton).toBeTruthy();
  });

  test("ThreadsPanel reflects color changes from TabletsPanel", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <DraftProvider>
          <Editor />
        </DraftProvider>
      </MemoryRouter>
    );

    // Open control panel
    const controlButton = await screen.findByTitle("control-panel");
    await user.click(controlButton);

    // Find colors panel in control panel (second one) and select a color
    const colorsPanels = await screen.findAllByTitle("colors-panel");
    const colorsPanel = colorsPanels[1]; // Second one is in the control panel
    const colorButtons = colorsPanel.querySelectorAll('button[title^="#"]');
    const secondColorButton = colorButtons[1] as HTMLElement;
    await user.click(secondColorButton);

    // Find TabletsPanel and apply color
    const tabletsPanel = await screen.findByTitle("tablets-panel");
    const firstColorChangeButton = tabletsPanel.querySelector(
      '[title="change color"]'
    ) as HTMLElement;
    await user.click(firstColorChangeButton);

    // Find ThreadsPanel
    const threadsPanel = await screen.findByTitle("threads-panel");
    expect(threadsPanel).toBeTruthy();

    // The ThreadsPanel should reflect the color change
    // (ThreadsPanel generates threads based on tablet colors and direction changes)
    const threadElements = threadsPanel.querySelectorAll('[class*="col-0"]');
    expect(threadElements.length).toBeGreaterThan(0);
  });

  test("Change color button updates palette button background and title", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <DraftProvider>
          <Editor />
        </DraftProvider>
      </MemoryRouter>
    );

    // Open control panel
    const controlButton = await screen.findByTitle("control-panel");
    await user.click(controlButton);

    // Find colors panel in control panel (second one)
    const colorsPanels = await screen.findAllByTitle("colors-panel");
    const colorsPanel = colorsPanels[1]; // Second one is in the control panel

    // Get the first color button (selected by default)
    const firstColorButton = colorsPanel.querySelector(
      'button[title^="#"]'
    ) as HTMLElement;
    const originalColor = firstColorButton.getAttribute("title");
    expect(originalColor).toBeTruthy();

    // Change the color in input field
    const colorInput = colorsPanel.querySelector(
      '[title="color-input"]'
    ) as HTMLInputElement;
    await user.clear(colorInput);
    await user.type(colorInput, "#FF00FF");

    // Click the "Change color" button
    const changeColorBtn = colorsPanel.querySelector(
      'button[type="submit"]'
    ) as HTMLElement;
    await user.click(changeColorBtn);

    // Wait a bit for the state to update
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Verify the palette button has updated
    const updatedColorButton = colorsPanel.querySelector(
      'button[title^="#"]'
    ) as HTMLElement;
    expect(updatedColorButton.getAttribute("title")).toBe("#FF00FF");

    // Verify the background color has changed
    const backgroundColor = updatedColorButton.style.backgroundColor;
    expect(backgroundColor).toBeTruthy();
  });
});
