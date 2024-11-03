import React, {useState} from "react";
import Navbar from "./Navbar";
import Footer from "./Footer"; // Import Footer component
import BgContainer from "./BgContainer";

interface PageFrameProps {
  Main: React.ComponentType;
  Sidebar?: React.ComponentType<{onToggleSidebar: () => void}>;
  Header?: React.ComponentType<{onToggleSidebar: () => void}>;
}

const useSidebar = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const toggleSidebar = () => setSidebarVisible((prev) => !prev);
  return {isSidebarVisible, toggleSidebar};
};

const PageFrame: React.FC<PageFrameProps> = ({
  Header = Navbar,
  Main,
  Sidebar,
}) => {
  const {isSidebarVisible, toggleSidebar} = useSidebar();
  const hasSidebar = Boolean(Sidebar);

  return (
    <BgContainer
      className={`relative min-h-screen grid grid-rows-[auto_1fr_auto] grid-cols-[1fr] md:bg-fixed overflow-hidden ${
        hasSidebar ? "md:grid-cols-[1fr_auto]" : "md:grid-cols-[1fr]"
      }`}
    >
      {/* Navbar */}
      <nav className="row-start-1 col-start-1 col-end-3 shadow-md z-20">
        <Header onToggleSidebar={toggleSidebar} hasSidebar={!!Sidebar} />
      </nav>

      {/* Main Content */}
      <main
        className="flex overflow-x-auto  pb-[15rem]"
        style={{backgroundColor: "rgba(255, 255, 255, 0.6)"}}
      >
        <Main />
      </main>

      {/* Sidebar */}
      {Sidebar && (
        <aside
          className={`transition-all duration-500 ease-in-out transform ${
            isSidebarVisible
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0 md:translate-x-0 md:opacity-100"
          } absolute md:relative h-full z-10 md:z-0 right-0`}
        >
          <Sidebar onToggleSidebar={toggleSidebar} />
        </aside>
      )}

      {/* Footer */}
      <footer className="row-start-3 col-start-1 col-end-3">
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
