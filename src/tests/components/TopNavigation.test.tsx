import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import TopNavigation from "../../shared/components/layout/TopNavigation";

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
          showDrawerToggle={true}
        />
      );

      // Use getByRole for better accessibility testing
      expect(screen.getAllByRole("link", { name: /editor/i })).toHaveLength(2); // Desktop and mobile
      expect(screen.getAllByRole("link", { name: /gallery/i })).toHaveLength(2); // Desktop and mobile
      expect(screen.getAllByRole("link", { name: /help/i })).toHaveLength(2); // Desktop and mobile
    });

    it("highlights active navigation link", () => {
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

    it("does not highlight inactive navigation links", () => {
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

    it("does not highlight inactive navigation links", () => {
      renderWithRouter(
        <TopNavigation
          onToggleDrawer={mockOnToggleDrawer}
          isDrawerOpen={false}
          showDrawerToggle={true}
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
    it("renders drawer toggle button correctly when closed", () => {
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

    it("renders drawer toggle button correctly when open", () => {
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

    it("calls onToggleDrawer when clicked", async () => {
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
    it("renders mobile navigation icons", () => {
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
    it("has proper ARIA labels and roles", () => {
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

    it("has proper titles for tooltips", () => {
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

    it("supports keyboard navigation", async () => {
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
