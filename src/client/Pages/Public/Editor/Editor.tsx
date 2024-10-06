import React from "react";
import ControlPanel from "./ControlPanel";
import ThreadsPanel from "./ThreadsPanel";
import TabletsPanel from "./TabletsPanel";

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
  return (
    <div className="flex flex-col px-0">
      <Navbar />
      <Body />
    </div>
  );
};

export default Editor;
