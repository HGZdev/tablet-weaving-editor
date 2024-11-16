import React, {MouseEventHandler} from "react";
import {FiMenu} from "react-icons/fi";
import {useNavigate, useLocation} from "react-router-dom";
import {NavButton} from "./Buttons";
import Logo from "./Logo";
import {MdAutoStories, MdGridOn} from "react-icons/md";
import {BsPencilSquare} from "react-icons/bs";

const {VITE_BASE_URL, VITE_HASH_ROUTER} = import.meta.env;
const BASE_URL = VITE_HASH_ROUTER ? "" : VITE_BASE_URL;

const Navbar: React.FC<{
  onToggleSidebar: MouseEventHandler<HTMLButtonElement>;
  hasSidebar: boolean;
}> = ({onToggleSidebar, hasSidebar}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === `${BASE_URL}${path}`;

  const navItems = [
    {
      path: "/editor",
      label: "Editor",
      icon: <BsPencilSquare className="lg:hidden" size={24} />,
    },
    {
      path: "/templates",
      label: "Templates",
      icon: <MdGridOn className="lg:hidden" size={24} />,
    },
    {
      path: "/about",
      label: "About",
      icon: <MdAutoStories className="lg:hidden" size={24} />,
    },
  ];

  return (
    <nav
      className="flex justify-between items-center bg-base-100"
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="flex flex-1 justify-start md:justify-start">
        <NavButton
          onClick={() => navigate(`${BASE_URL}/`)}
          className="btn-lg"
          aria-label="Home"
        >
          <Logo className="w-5" />
          <span className="hidden md:inline-block">Tablet Weaving Editor</span>
        </NavButton>
      </div>

      <div>
        <ul className="flex p-0 mt-0" role="menubar">
          {navItems.map((item) => (
            <li key={item.path} role="none">
              <NavButton
                onClick={() => navigate(`${BASE_URL}${item.path}`)}
                className={isActive(item.path) ? "text-primary" : ""}
                aria-current={isActive(item.path) ? "page" : undefined}
                title={item.label}
                role="menuitem"
              >
                {item.icon}
                <span className="hidden lg:inline">{item.label}</span>
              </NavButton>
            </li>
          ))}
        </ul>
      </div>
      {hasSidebar && (
        <NavButton
          onClick={onToggleSidebar}
          className="md:hidden"
          aria-label="Toggle Sidebar"
        >
          <FiMenu size={24} />
        </NavButton>
      )}
    </nav>
  );
};

export default Navbar;
