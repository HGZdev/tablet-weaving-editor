import React, {MouseEventHandler} from "react";
import {FiMenu} from "react-icons/fi";
import {useNavigate, useLocation} from "react-router-dom";
import {NavButton} from "./Buttons";
import Logo from "./Logo";

const {VITE_BASE_URL, VITE_HASH_ROUTER} = import.meta.env;
const BASE_URL = VITE_HASH_ROUTER ? "" : VITE_BASE_URL;

const Navbar: React.FC<{
  onToggleSidebar: MouseEventHandler<HTMLButtonElement>;
}> = ({onToggleSidebar}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === `${BASE_URL}${path}`;

  return (
    <div
      // data-theme="navbar"
      className="flex justify-between items-center bg-base-100"
    >
      <NavButton onClick={onToggleSidebar} className="md:hidden">
        <FiMenu size={24} />
      </NavButton>

      <div className="flex flex-1 justify-start md:justify-start">
        <NavButton onClick={() => navigate(`${BASE_URL}/`)} className="btn-lg">
          <Logo className="w-5" />
          <span className="hidden md:inline-block">Tablet Weaving Editor</span>
        </NavButton>
      </div>

      <div className="px-4">
        <ul className="flex p-0 mt-0">
          <li>
            <NavButton
              onClick={() => navigate(`${BASE_URL}/editor`)}
              className={isActive("/editor") ? "text-primary" : ""}
            >
              Editor
            </NavButton>
          </li>
          <li>
            <NavButton
              onClick={() => navigate(`${BASE_URL}/templates`)}
              className={isActive("/templates") ? "text-primary" : ""}
            >
              Templates
            </NavButton>
          </li>
          <li>
            <NavButton
              onClick={() => navigate(`${BASE_URL}/manual`)}
              className={isActive("/manual") ? "text-primary" : ""}
            >
              Manual
            </NavButton>
          </li>
          <li>
            <NavButton
              onClick={() => navigate(`${BASE_URL}/about`)}
              className={isActive("/about") ? "text-primary" : ""}
            >
              About
            </NavButton>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
