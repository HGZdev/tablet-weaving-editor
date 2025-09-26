import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import TopNavigation from "./TopNavigation";
import ControlDrawer from "./ControlDrawer";

const MainLayout: React.FC = () => {
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Hide drawer on gallery page
  const isGalleryPage = location.pathname === "/gallery";

  // On large screens, drawer should be open by default (except on gallery)
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 1024 && !isGalleryPage) {
        // lg breakpoint
        setIsDrawerOpen(true);
      } else {
        setIsDrawerOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [isGalleryPage]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navigation */}
      <TopNavigation
        onToggleDrawer={toggleDrawer}
        isDrawerOpen={isDrawerOpen}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Center Editor Area */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>

        {/* Control Drawer - hidden on gallery page */}
        {!isGalleryPage && (
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
