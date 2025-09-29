import React from "react";
import { screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import ControlPanel from "../../domains/editor/components/ControlPanel";
import { findByText, findByTitle } from "../helpers";
import { DraftProvider } from "../../domains/editor/context/DraftContext/DraftContextProvider";
import { renderWithRouter } from "../helpers";
import userEvent from "@testing-library/user-event";

describe("ControlPanel Component", () => {
  describe("Component Rendering", () => {
    test("renders all control panel sections correctly", async () => {
      renderWithRouter(
        <DraftProvider>
          <ControlPanel />
        </DraftProvider>
      );

      expect(await findByText("Frame"));
      expect(await findByTitle("file-panel"));
      expect(await findByTitle("inputs-panel"));
      expect(await findByTitle("colors-panel"));
    });
  });

  describe("Input Controls", () => {
    test("holes input has correct range (3-8) and boundary behavior", async () => {
      const user = userEvent.setup();

      renderWithRouter(
        <DraftProvider>
          <ControlPanel />
        </DraftProvider>
      );

      const holesIncrement = await screen.findByTitle("Increase holes");
      const holesDecrement = await screen.findByTitle("Decrease holes");
      const holesValue = await screen.findByLabelText("holes value");

      // Test initial value
      expect(holesValue).toHaveTextContent("4");

      // Test decrement to minimum
      await user.click(holesDecrement); // 4 -> 3
      expect(holesValue).toHaveTextContent("3");
      expect(holesDecrement).toBeDisabled();

      // Test increment to maximum
      for (let i = 0; i < 5; i++) {
        await user.click(holesIncrement); // 3 -> 8
      }
      expect(holesValue).toHaveTextContent("8");
      expect(holesIncrement).toBeDisabled();
    });

    test("tablets input has correct range (2-30) and boundary behavior", async () => {
      const user = userEvent.setup();

      renderWithRouter(
        <DraftProvider>
          <ControlPanel />
        </DraftProvider>
      );

      const tabletsIncrement = await screen.findByTitle("Increase tablets");
      const tabletsDecrement = await screen.findByTitle("Decrease tablets");
      const tabletsValue = await screen.findByLabelText("tablets value");

      // Test initial value
      expect(tabletsValue).toHaveTextContent("4");

      // Test decrement to minimum
      await user.click(tabletsDecrement); // 4 -> 3
      await user.click(tabletsDecrement); // 3 -> 2
      expect(tabletsValue).toHaveTextContent("2");
      expect(tabletsDecrement).toBeDisabled();

      // Test increment to maximum (this will take many clicks)
      for (let i = 0; i < 28; i++) {
        await user.click(tabletsIncrement); // 2 -> 30
      }
      expect(tabletsValue).toHaveTextContent("30");
      expect(tabletsIncrement).toBeDisabled();
    });

    test("picks input has correct range (1-99) and boundary behavior", async () => {
      const user = userEvent.setup();

      renderWithRouter(
        <DraftProvider>
          <ControlPanel />
        </DraftProvider>
      );

      const picksIncrement = await screen.findByTitle("Increase picks");
      const picksDecrement = await screen.findByTitle("Decrease picks");
      const picksValue = await screen.findByLabelText("picks value");

      // Test initial value
      expect(picksValue).toHaveTextContent("8");

      // Test decrement to minimum
      for (let i = 0; i < 7; i++) {
        await user.click(picksDecrement); // 8 -> 1
      }
      expect(picksValue).toHaveTextContent("1");
      expect(picksDecrement).toBeDisabled();

      // Test increment to maximum (this will take many clicks)
      for (let i = 0; i < 98; i++) {
        await user.click(picksIncrement); // 1 -> 99
      }
      expect(picksValue).toHaveTextContent("99");
      expect(picksIncrement).toBeDisabled();
    });

    test("input controls handle rapid clicks without blocking", async () => {
      const user = userEvent.setup();

      renderWithRouter(
        <DraftProvider>
          <ControlPanel />
        </DraftProvider>
      );

      const holesIncrement = await screen.findByTitle("Increase holes");
      const tabletsIncrement = await screen.findByTitle("Increase tablets");
      const picksIncrement = await screen.findByTitle("Increase picks");

      // Rapidly click all increment buttons
      const rapidClicks = async () => {
        for (let i = 0; i < 10; i++) {
          await user.click(holesIncrement);
          await user.click(tabletsIncrement);
          await user.click(picksIncrement);
        }
      };

      // This should not throw or cause blocking
      await expect(rapidClicks()).resolves.not.toThrow();
    });

    test("input controls maintain state consistency across changes", async () => {
      const user = userEvent.setup();

      renderWithRouter(
        <DraftProvider>
          <ControlPanel />
        </DraftProvider>
      );

      const holesIncrement = await screen.findByTitle("Increase holes");
      const tabletsIncrement = await screen.findByTitle("Increase tablets");
      const picksIncrement = await screen.findByTitle("Increase picks");

      // Make several changes
      await user.click(holesIncrement); // 4 -> 5
      await user.click(tabletsIncrement); // 4 -> 5
      await user.click(picksIncrement); // 8 -> 9

      // Verify values are consistent
      const holesValue = await screen.findByLabelText("holes value");
      const tabletsValue = await screen.findByLabelText("tablets value");
      const picksValue = await screen.findByLabelText("picks value");

      expect(holesValue).toHaveTextContent("5");
      expect(tabletsValue).toHaveTextContent("5");
      expect(picksValue).toHaveTextContent("9");

      // Make more changes
      await user.click(holesIncrement); // 5 -> 6
      await user.click(tabletsIncrement); // 5 -> 6
      await user.click(picksIncrement); // 9 -> 10

      // Verify values are still consistent
      expect(holesValue).toHaveTextContent("6");
      expect(tabletsValue).toHaveTextContent("6");
      expect(picksValue).toHaveTextContent("10");
    });
  });

  describe("Panel Structure", () => {
    test("contains all required panels and sections", async () => {
      renderWithRouter(
        <DraftProvider>
          <ControlPanel />
        </DraftProvider>
      );

      // Check for main sections
      expect(await findByText("Control Panel"));
      expect(await findByText("Configure your tablet weaving parameters"));
      expect(await findByText("Frame"));

      // Check for sub-panels
      expect(await findByTitle("inputs-panel"));
      expect(await findByTitle("colors-panel"));
      expect(await findByTitle("file-panel"));
    });

    test("drawer opens and closes with correct visibility states", async () => {
      // Test closed state
      renderWithRouter(
        <DraftProvider>
          <ControlPanel isOpen={false} testId="control-drawer-closed" />
        </DraftProvider>
      );

      // Check that the drawer container is hidden
      const closedDrawer = screen.getByTestId("control-drawer-closed");
      expect(closedDrawer).toHaveClass("hidden");

      // Test open state with a separate render
      renderWithRouter(
        <DraftProvider>
          <ControlPanel isOpen={true} testId="control-drawer-open" />
        </DraftProvider>
      );

      // Check that the drawer container is visible
      const openDrawer = screen.getByTestId("control-drawer-open");
      expect(openDrawer).toHaveClass("block");
      expect(openDrawer).not.toHaveClass("hidden");

      // Now we should see the content in the open drawer
      const openDrawerContent = openDrawer.querySelector(
        '[title="inputs-panel"]'
      );
      expect(openDrawerContent).toBeTruthy();
      expect(openDrawerContent).toHaveTextContent("Frame");
    });
  });

  describe("Error Handling", () => {
    test("handles missing draft context gracefully", () => {
      // This test would need to be implemented if we want to test error boundaries
      // For now, we'll just ensure the component doesn't crash
      expect(() => {
        renderWithRouter(<ControlPanel />);
      }).toThrow(); // Should throw because DraftProvider is missing
    });
  });
});
