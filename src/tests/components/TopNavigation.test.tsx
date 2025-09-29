import "@testing-library/jest-dom";
import React from "react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TopNavigation from "../../shared/components/layout/TopNavigation";
import { renderWithRouter } from "../helpers";

describe("TopNavigation", () => {
  const mockOnToggleDrawer = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Navigation Links", () => {
    test("renders all navigation links correctly", () => {
      renderWithRouter(
        <TopNavigation
          onToggleDrawer={mockOnToggleDrawer}
          isDrawerOpen={false}
          showDrawerToggle={true}
        />
      );

      // Use getByRole for better accessibility testing
      expect(screen.getAllByRole("link", { name: /editor/i })).toHaveLength(2); // Desktop and mobile
      expect(screen.getAllByRole("link", { name: /gallery/i })).toHaveLength(2); // Desktop and mobile
      expect(screen.getAllByRole("link", { name: /help/i })).toHaveLength(2); // Desktop and mobile
    });

    test("highlights active navigation link correctly", () => {
      renderWithRouter(
        <TopNavigation
          onToggleDrawer={mockOnToggleDrawer}
          isDrawerOpen={false}
          showDrawerToggle={true}
        />,
        "/editor"
      );

      // Check if Editor link is active (since we're on /editor path)
      const editorLinks = screen.getAllByRole("link", { name: /editor/i });
      expect(editorLinks[0]).toHaveClass("bg-primary-100", "text-primary-700");
    });

    test("does not highlight inactive navigation links", () => {
      renderWithRouter(
        <TopNavigation
          onToggleDrawer={mockOnToggleDrawer}
          isDrawerOpen={false}
          showDrawerToggle={true}
        />,
        "/gallery"
      );

      // Check if Gallery link is active
      const galleryLinks = screen.getAllByRole("link", { name: /gallery/i });
      expect(galleryLinks[0]).toHaveClass("bg-primary-100", "text-primary-700");

      // Check if Editor link is not active
      const editorLinks = screen.getAllByRole("link", { name: /editor/i });
      expect(editorLinks[0]).not.toHaveClass(
        "bg-primary-100",
        "text-primary-700"
      );
      expect(editorLinks[0]).toHaveClass("text-neutral-600");
    });

    test("renders logo and title correctly", () => {
      renderWithRouter(
        <TopNavigation
          onToggleDrawer={mockOnToggleDrawer}
          isDrawerOpen={false}
          showDrawerToggle={true}
        />
      );

      // Use more semantic queries
      expect(
        screen.getByRole("heading", { name: /tablet weaving editor/i })
      ).toBeInTheDocument();
      expect(screen.getByText("TW")).toBeInTheDocument(); // Logo abbreviation
    });
  });

  describe("Drawer Toggle Button", () => {
    test("renders drawer toggle button correctly when closed", () => {
      renderWithRouter(
        <TopNavigation
          onToggleDrawer={mockOnToggleDrawer}
          isDrawerOpen={false}
          showDrawerToggle={true}
        />
      );

      const toggleButton = screen.getByRole("button", {
        name: /open control panel/i,
      });
      expect(toggleButton).toBeInTheDocument();
      expect(toggleButton).toHaveAttribute("title", "Open panel");
    });

    test("renders drawer toggle button correctly when open", () => {
      renderWithRouter(
        <TopNavigation
          onToggleDrawer={mockOnToggleDrawer}
          isDrawerOpen={true}
          showDrawerToggle={true}
        />
      );

      const toggleButton = screen.getByRole("button", {
        name: /close control panel/i,
      });
      expect(toggleButton).toBeInTheDocument();
      expect(toggleButton).toHaveAttribute("title", "Close panel");
    });

    test("calls onToggleDrawer when clicked", async () => {
      const user = userEvent.setup();

      renderWithRouter(
        <TopNavigation
          onToggleDrawer={mockOnToggleDrawer}
          isDrawerOpen={false}
          showDrawerToggle={true}
        />
      );

      const toggleButton = screen.getByRole("button", {
        name: /open control panel/i,
      });
      await user.click(toggleButton);

      expect(mockOnToggleDrawer).toHaveBeenCalledTimes(1);
    });
  });

  describe("Mobile Navigation", () => {
    test("renders mobile navigation icons correctly", () => {
      renderWithRouter(
        <TopNavigation
          onToggleDrawer={mockOnToggleDrawer}
          isDrawerOpen={false}
          showDrawerToggle={true}
        />
      );

      // Check if mobile navigation icons are present (use getAllByRole to handle multiple nav elements)
      const navElements = screen.getAllByRole("navigation");
      expect(navElements).toHaveLength(2); // Desktop and mobile nav

      // Check that mobile nav has the correct class
      const mobileNav = navElements.find((nav) =>
        nav.className.includes("lg:hidden")
      );
      expect(mobileNav).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    test("has proper ARIA labels and roles", () => {
      renderWithRouter(
        <TopNavigation
          onToggleDrawer={mockOnToggleDrawer}
          isDrawerOpen={false}
          showDrawerToggle={true}
        />
      );

      // Test navigation landmarks
      const navElements = screen.getAllByRole("navigation");
      expect(navElements).toHaveLength(2); // Desktop and mobile nav

      // Test button accessibility
      const toggleButton = screen.getByRole("button", {
        name: /open control panel/i,
      });
      expect(toggleButton).toBeInTheDocument();
      expect(toggleButton).toHaveAttribute("aria-label");
    });

    test("has proper titles for tooltips", () => {
      renderWithRouter(
        <TopNavigation
          onToggleDrawer={mockOnToggleDrawer}
          isDrawerOpen={false}
          showDrawerToggle={true}
        />
      );

      const toggleButton = screen.getByRole("button", {
        name: /open control panel/i,
      });
      expect(toggleButton).toHaveAttribute("title", "Open panel");
    });

    test("supports keyboard navigation", async () => {
      const user = userEvent.setup();

      renderWithRouter(
        <TopNavigation
          onToggleDrawer={mockOnToggleDrawer}
          isDrawerOpen={false}
          showDrawerToggle={true}
        />
      );

      const editorLink = screen.getAllByRole("link", { name: /editor/i })[0];

      // Test keyboard interaction
      await user.tab();
      expect(editorLink).toHaveFocus();

      await user.keyboard("{Enter}");
      // Note: Navigation is handled by React Router, so we just verify the link is focusable
    });
  });
});
