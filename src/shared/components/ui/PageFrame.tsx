import React from "react";

interface PageFrameProps {
  Sidebar: React.FC<{ onToggleSidebar: () => void }>;
  Main: React.FC;
  MobileControlPanel: React.FC;
}

const PageFrame: React.FC<PageFrameProps> = ({
  Sidebar,
  Main,
  MobileControlPanel,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col">
        <Sidebar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>

      {/* Mobile Control Panel */}
      <div className="lg:hidden">
        <MobileControlPanel />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Main />
      </div>
    </div>
  );
};

export default PageFrame;
