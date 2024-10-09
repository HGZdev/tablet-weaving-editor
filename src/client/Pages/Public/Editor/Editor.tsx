import React, {MouseEventHandler, useState} from "react";
import ControlPanel from "./ControlPanel";
import ThreadsPanel from "./ThreadsPanel";
import TabletsPanel from "./TabletsPanel";
import {FiMenu, FiX} from "react-icons/fi";
import {useNavigate} from "react-router-dom";
import {NavButton} from "../../../Components/Buttons";

const {VITE_BASE_URL, VITE_HASH_ROUTER} = import.meta.env;
const BASE_URL = VITE_HASH_ROUTER ? "" : VITE_BASE_URL;

export const Navbar: React.FC<{
  onToggleSidebar: MouseEventHandler<HTMLButtonElement>;
}> = ({onToggleSidebar}) => {
  const navigate = useNavigate();
  return (
    <div
      data-theme="navbar"
      className=" flex justify-between items-center bg-primary "
    >
      {/* open sidebar button */}
      <NavButton onClick={onToggleSidebar} className="md:hidden">
        <FiMenu size={24} />
      </NavButton>
      {/* logo button */}
      <div className="flex flex-1 justify-start md:justify-start">
        <NavButton onClick={() => navigate(`${BASE_URL}/`)} className="btn-lg">
          Tablet Weaving Editor
        </NavButton>
      </div>
      <div className="px-4">
        <ul className="menu menu-horizontal p-0 mt-0">
          <li>
            <NavButton onClick={() => navigate(`${BASE_URL}/editor`)}>
              Editor
            </NavButton>
          </li>
          <li>
            <NavButton disabled={true}>Gallery</NavButton>
          </li>
          <li>
            <NavButton disabled={true}>About</NavButton>
          </li>
        </ul>
      </div>
    </div>
  );
};

const Sidebar: React.FC<{
  onToggleSidebar: MouseEventHandler<HTMLButtonElement>;
}> = ({onToggleSidebar}) => {
  return (
    <div className="flex flex-col items-start bg-base-100 h-full">
      {/* close sidebar button */}
      <NavButton onClick={onToggleSidebar} className="md:hidden">
        <FiX size={24} />
      </NavButton>
      <ControlPanel />
    </div>
  );
};

export const Main = () => {
  return (
    <div className="flex flex-col flex-1 bg-white justify-center">
      <ThreadsPanel />
      <TabletsPanel />
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
      <nav className="grid-area-navbar row-start-1 col-start-1 col-end-3 ">
        <Navbar onToggleSidebar={toggleSidebar} />
      </nav>
      {/* Left Sidebar */}
      <div
        className={`grid-area-sidebar transition-all duration-500 ease-in-out transform ${
          isSidebarVisible
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0 md:translate-x-0 md:opacity-100"
        } absolute md:relative h-full z-20`}
      >
        <Sidebar onToggleSidebar={toggleSidebar} />
      </div>

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

export default Editor;
