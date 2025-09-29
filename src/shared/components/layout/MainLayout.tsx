import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import TopNavigation from "./TopNavigation";
import ControlDrawer from "./ControlDrawer";
import { SkipLink } from "../ui";

const MainLayout: React.FC = () => {
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Hide drawer on gallery and help pages
  const isGalleryPage = location.pathname === "/gallery";
  const isHelpPage = location.pathname === "/help";

  // On large screens, drawer should be open by default (except on gallery and help pages)
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 1024 && !isGalleryPage && !isHelpPage) {
        // lg breakpoint
        setIsDrawerOpen(true);
      } else {
        setIsDrawerOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [isGalleryPage, isHelpPage]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div
      className="flex flex-col h-screen"
      role="application"
      aria-label="Tablet Weaving Editor"
    >
      {/* Skip Links for Accessibility */}
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <SkipLink href="#control-panel">Skip to control panel</SkipLink>

      {/* Top Navigation */}
      <TopNavigation
        onToggleDrawer={toggleDrawer}
        isDrawerOpen={isDrawerOpen}
        showDrawerToggle={!isGalleryPage && !isHelpPage}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden" role="main">
        {/* Center Editor Area */}
        <main
          id="main-content"
          className="flex-1 overflow-auto"
          aria-label="Editor workspace"
        >
          <Outlet />
        </main>

        {/* Control Drawer - hidden on gallery and help pages */}
        {!isGalleryPage && !isHelpPage && (
          <ControlDrawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default MainLayout;
