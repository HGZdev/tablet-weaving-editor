import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TopNavigation from "../shared/components/layout/TopNavigation";

const renderWithRouter = (
  component: React.ReactElement,
  initialRoute = "/editor"
) => {
  return render(
    <MemoryRouter
      initialEntries={[initialRoute]}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      {component}
    </MemoryRouter>
  );
};

describe("TopNavigation", () => {
  const mockOnToggleDrawer = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Navigation Links", () => {
    it("renders navigation links correctly", () => {
      renderWithRouter(
        <TopNavigation
          onToggleDrawer={mockOnToggleDrawer}
          isDrawerOpen={false}
        />
      );

      expect(screen.getByText("Editor")).toBeInTheDocument();
      expect(screen.getByText("Gallery")).toBeInTheDocument();
      expect(screen.getByText("Help")).toBeInTheDocument();
    });

    it("highlights active navigation link", () => {
      renderWithRouter(
        <TopNavigation
          onToggleDrawer={mockOnToggleDrawer}
          isDrawerOpen={false}
        />,
        "/editor"
      );

      // Check if Editor link is active (since we're on /editor path)
      const editorLink = screen.getByText("Editor").closest("a");
      expect(editorLink).toHaveClass("bg-primary-100", "text-primary-700");
    });

    it("does not highlight inactive navigation links", () => {
      renderWithRouter(
        <TopNavigation
          onToggleDrawer={mockOnToggleDrawer}
          isDrawerOpen={false}
        />,
        "/gallery"
      );

      // Check if Gallery link is active
      const galleryLink = screen.getByText("Gallery").closest("a");
      expect(galleryLink).toHaveClass("bg-primary-100", "text-primary-700");

      // Check if Editor link is not active
      const editorLink = screen.getByText("Editor").closest("a");
      expect(editorLink).not.toHaveClass("bg-primary-100", "text-primary-700");
      expect(editorLink).toHaveClass("text-neutral-600");
    });

    it("renders logo and title", () => {
      renderWithRouter(
        <TopNavigation
          onToggleDrawer={mockOnToggleDrawer}
          isDrawerOpen={false}
        />
      );

      expect(screen.getByText("TW")).toBeInTheDocument();
      expect(screen.getByText("Tablet Weaving Editor")).toBeInTheDocument();
    });
  });

  describe("Drawer Toggle Button", () => {
    it("renders drawer toggle button correctly when closed", () => {
      renderWithRouter(
        <TopNavigation
          onToggleDrawer={mockOnToggleDrawer}
          isDrawerOpen={false}
        />
      );

      const toggleButton = screen.getByLabelText("Toggle control panel");
      expect(toggleButton).toBeInTheDocument();
      expect(toggleButton).toHaveAttribute("title", "Open panel");
    });

    it("renders drawer toggle button correctly when open", () => {
      renderWithRouter(
        <TopNavigation
          onToggleDrawer={mockOnToggleDrawer}
          isDrawerOpen={true}
        />
      );

      const toggleButton = screen.getByLabelText("Toggle control panel");
      expect(toggleButton).toBeInTheDocument();
      expect(toggleButton).toHaveAttribute("title", "Close panel");
    });

    it("calls onToggleDrawer when clicked", () => {
      renderWithRouter(
        <TopNavigation
          onToggleDrawer={mockOnToggleDrawer}
          isDrawerOpen={false}
        />
      );

      const toggleButton = screen.getByLabelText("Toggle control panel");
      fireEvent.click(toggleButton);

      expect(mockOnToggleDrawer).toHaveBeenCalledTimes(1);
    });
  });

  describe("Mobile Navigation", () => {
    it("renders mobile navigation icons", () => {
      renderWithRouter(
        <TopNavigation
          onToggleDrawer={mockOnToggleDrawer}
          isDrawerOpen={false}
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
    it("has proper ARIA labels", () => {
      renderWithRouter(
        <TopNavigation
          onToggleDrawer={mockOnToggleDrawer}
          isDrawerOpen={false}
        />
      );

      const toggleButton = screen.getByLabelText("Toggle control panel");
      expect(toggleButton).toBeInTheDocument();
    });

    it("has proper titles for tooltips", () => {
      renderWithRouter(
        <TopNavigation
          onToggleDrawer={mockOnToggleDrawer}
          isDrawerOpen={false}
        />
      );

      const toggleButton = screen.getByLabelText("Toggle control panel");
      expect(toggleButton).toHaveAttribute("title");
    });
  });
});
