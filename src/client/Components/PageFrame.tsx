import React, {useRef, useState} from "react";
import Navbar from "./Navbar";
import Footer from "./Footer"; // Import Footer component
import BgContainer from "./BgContainer";

interface PageFrameProps {
  Main: React.ComponentType;
  LeftBar?: React.ComponentType<{onToggleSidebar: () => void}>;
  Header?: React.ComponentType<{onToggleSidebar: () => void}>;
}

const PageFrame: React.FC<PageFrameProps> = ({
  LeftBar,
  Main,
  Header = Navbar,
}) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const hasSidebar = !!LeftBar;
  const toggleSidebar = () => {
    LeftBar && setSidebarVisible(!isSidebarVisible);
  };

  return (
    <BgContainer
      className={`relative min-h-screen grid grid-rows-[auto_1fr_auto] grid-cols-[1fr] ${
        hasSidebar ? "md:grid-cols-[auto_1fr]" : "md:grid-cols-[1fr]"
      }  `}
    >
      {/* Navbar */}
      <nav className="grid-area-navbar row-start-1 col-start-1 col-end-3 shadow-md z-20">
        <Header onToggleSidebar={toggleSidebar} />
      </nav>

      {/* Sidebar */}
      {LeftBar && (
        <div
          className={`grid-area-sidebar transition-all duration-500 ease-in-out transform ${
            isSidebarVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0 md:translate-x-0 md:opacity-100"
          } absolute md:relative h-full z-10 md:z-0`}
        >
          <LeftBar onToggleSidebar={toggleSidebar} />
        </div>
      )}

      {/* Main Content */}
      <main
        style={{backgroundColor: "rgba(255, 255, 255, 0.6)"}}
        className="grid-area-main flex pb-[15rem]"
      >
        <Main />
      </main>

      {/* Footer */}
      <footer className="grid-area-footer row-start-3 col-start-1 col-end-3 ">
        <Footer />
      </footer>

      {/* Overlay */}
      {isSidebarVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-500 ease-in-out md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </BgContainer>
  );
};

export default PageFrame;
