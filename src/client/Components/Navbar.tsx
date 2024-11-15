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

  return (
    <div className="flex justify-between items-center bg-base-100">
      <div className="flex flex-1 justify-start md:justify-start">
        <NavButton onClick={() => navigate(`${BASE_URL}/`)} className="btn-lg">
          <Logo className="w-5" />
          <span className="hidden md:inline-block">Tablet Weaving Editor</span>
        </NavButton>
      </div>

      <div>
        <ul className="flex p-0 mt-0">
          <li>
            <NavButton
              onClick={() => navigate(`${BASE_URL}/editor`)}
              className={isActive("/editor") ? "text-primary" : ""}
              title="Editor"
            >
              <BsPencilSquare className="lg:hidden" size={24} />
              <span className="hidden lg:inline">Editor</span>
            </NavButton>
          </li>
          <li>
            <NavButton
              onClick={() => navigate(`${BASE_URL}/templates`)}
              className={isActive("/templates") ? "text-primary" : ""}
              title="Templates"
            >
              <MdGridOn className="lg:hidden" size={24} />
              <span className="hidden lg:inline">Templates</span>
            </NavButton>
          </li>
          <li>
            <NavButton
              onClick={() => navigate(`${BASE_URL}/about`)}
              className={isActive("/about") ? "text-primary" : ""}
              title="About"
            >
              <MdAutoStories className="lg:hidden" size={24} />
              <span className="hidden lg:inline">About</span>
            </NavButton>
          </li>
        </ul>
      </div>
      {hasSidebar && (
        <NavButton onClick={onToggleSidebar} className="md:hidden">
          <FiMenu size={24} />
        </NavButton>
      )}
    </div>
  );
};

export default Navbar;
