import React from "react";
import {FaGithub, FaLinkedin} from "react-icons/fa";
import {MdOutlineAlternateEmail} from "react-icons/md";

const Footer: React.FC = () => {
  return (
    <div
      style={{backgroundColor: "rgba(60, 60, 60, 0.9)"}}
      className="text-base-100 py-6"
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm md:text-base mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Hanna Gaudasińska-Zapaśnik. All
          rights reserved.
        </div>
        <div className="flex space-x-4">
          <a
            href="mailto:HGZ.devi@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <MdOutlineAlternateEmail size={24} />
          </a>
          <a
            href="https://github.com/HGZdev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/hanna-gaudasinska-zapasnik/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
