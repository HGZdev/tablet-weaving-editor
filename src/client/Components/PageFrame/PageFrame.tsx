import React, {useState} from "react";
import Navbar from "./Navbar";

const PageFrame: React.FC<{
  Main: React.ReactNode;
  Sidebar: React.ReactNode;
  Header?: React.ReactNode;
}> = ({Sidebar, Main, Header = Navbar}) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div
      className={`relative h-screen grid grid-rows-[auto_1fr] grid-cols-[1fr] md:grid-cols-[auto_1fr]`}
    >
      {/* Navbar */}
      <nav className="grid-area-navbar row-start-1 col-start-1 col-end-3 ">
        <Header onToggleSidebar={toggleSidebar} />
      </nav>
      {/* Left Sidebar */}
      <menu
        className={`grid-area-sidebar transition-all duration-500 ease-in-out transform ${
          isSidebarVisible
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0 md:translate-x-0 md:opacity-100"
        } absolute md:relative h-full z-20`}
      >
        <Sidebar onToggleSidebar={toggleSidebar} />
      </menu>

      {/* Main Content */}
      <main className="grid-area-main flex bg-gray-400">
        <Main />
      </main>

      {/* Black Overlay */}
      {isSidebarVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-500 ease-in-out z-10 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default PageFrame;
