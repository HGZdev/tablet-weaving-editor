import React, {useState} from "react";
import ControlPanel from "./ControlPanel";
import ThreadsPanel from "./ThreadsPanel";
import TabletsPanel from "./TabletsPanel";
import {FiMenu, FiX} from "react-icons/fi";

const drawerId = "my-drawer";

export const HamburgerIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="inline-block w-6 h-6 stroke-current"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16m-7 6h7"
      ></path>
    </svg>
  );
};

export const MenuToggle = () => {
  return (
    <label
      htmlFor={drawerId}
      className="drawer-button btn btn-square btn-ghost "
    >
      <HamburgerIcon />
    </label>
  );
};

export const LogoButton = () => {
  return (
    <span className="btn btn-ghost text-xl font-bold ">
      Tablet Weaving Editor
    </span>
  );
};

export const Navbar = () => {
  return (
    <nav className="navbar bg-base-100 p-0 min-h-0 shadow-lg z-10">
      <div className="block lg:hidden">
        <MenuToggle />
      </div>
      <div className="flex flex-1 ">
        <LogoButton />
      </div>
      <div className="">
        <ul className="menu menu-horizontal p-0 mt-0">
          <li>
            <a>Editor</a>
          </li>
          <li>
            <a>Gallery</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export const Body = () => {
  return (
    <div className="flex flex-1">
      <div className="drawer lg:drawer-open">
        <input id={drawerId} type="checkbox" className="drawer-toggle" />
        <div className="drawer-side absolute items-stretch">
          <label
            htmlFor={drawerId}
            aria-label="close sidebar"
            className="drawer-overlay"
          />
          <ControlPanel />
        </div>
        <div className="drawer-content flex flex-col items-center justify-center">
          <main className="flex flex-col flex-1 ">
            <ThreadsPanel />
            <TabletsPanel />
          </main>
        </div>
      </div>
    </div>
  );
};

const Editor: React.FC = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div
      className={`relative h-screen grid grid-rows-[auto_1fr] grid-cols-[1fr] md:grid-cols-[auto_1fr]`}
    >
      {/* Navbar */}
      <div className="grid-area-navbar bg-gray-200 row-start-1 col-start-1 col-end-3 flex justify-between items-center">
        <button className="block md:hidden p-2" onClick={toggleSidebar}>
          <FiMenu size={24} />
        </button>
        <span>Navbar</span>
      </div>

      {/* Left Sidebar */}
      <div
        className={`grid-area-sidebar bg-gray-300 transition-all duration-500 ease-in-out transform ${
          isSidebarVisible
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0 md:translate-x-0 md:opacity-100"
        } absolute md:relative h-full z-20`}
      >
        <button className="block md:hidden p-2" onClick={toggleSidebar}>
          <FiX size={24} />
        </button>
        Sidebar Content sdfafae aedgaer
      </div>

      {/* Main Content */}
      <div className="grid-area-main bg-gray-400">Main Content</div>

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

export default Editor;
