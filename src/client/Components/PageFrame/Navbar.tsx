import React, {MouseEventHandler} from "react";
import {FiMenu} from "react-icons/fi";
import {useNavigate} from "react-router-dom";
import {NavButton} from "../Buttons";

const {VITE_BASE_URL, VITE_HASH_ROUTER} = import.meta.env;
const BASE_URL = VITE_HASH_ROUTER ? "" : VITE_BASE_URL;

const Navbar: React.FC<{
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
        <ul className="flex p-0 mt-0">
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

export default Navbar;
