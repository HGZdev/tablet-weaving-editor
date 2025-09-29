import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiMenu,
  HiX,
  HiHome,
  HiPhotograph,
  HiQuestionMarkCircle,
} from "react-icons/hi";

interface TopNavigationProps {
  onToggleDrawer: () => void;
  isDrawerOpen: boolean;
  showDrawerToggle: boolean;
}

const TopNavigation: React.FC<TopNavigationProps> = ({
  onToggleDrawer,
  isDrawerOpen,
  showDrawerToggle,
}) => {
  const location = useLocation();

  const navItems = [
    { path: "/editor", label: "Editor", icon: HiHome },
    { path: "/gallery", label: "Gallery", icon: HiPhotograph },
    { path: "/help", label: "Help", icon: HiQuestionMarkCircle },
  ];

  return (
    <header
      className="bg-white border-b border-neutral-200 px-4 py-3"
      role="banner"
    >
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div
              className="w-8 h-8 bg-primary-500 rounded-md flex items-center justify-center"
              aria-hidden="true"
            >
              <span className="text-white font-bold text-sm">TW</span>
            </div>
            <h1 className="hidden lg:block text-xl font-semibold text-neutral-800">
              Tablet Weaving Editor
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Navigation Links - Desktop */}
          <nav
            className="hidden lg:flex items-center space-x-1"
            role="navigation"
            aria-label="Main navigation"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary-100 text-primary-700"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={`Navigate to ${item.label}`}
                >
                  <Icon size={16} aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Navigation Links */}
          <nav
            className="lg:hidden flex items-center space-x-1"
            role="navigation"
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-center px-2 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary-100 text-primary-700"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                  }`}
                  title={item.label}
                  aria-label={`Navigate to ${item.label}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon size={16} aria-hidden="true" />
                </Link>
              );
            })}
          </nav>

          {showDrawerToggle && (
            <button
              onClick={onToggleDrawer}
              className="btn btn-ghost btn-sm cursor-pointer lg:hidden"
              aria-label={
                isDrawerOpen ? "Close control panel" : "Open control panel"
              }
              aria-expanded={isDrawerOpen}
              aria-controls="control-drawer"
              title={isDrawerOpen ? "Close panel" : "Open panel"}
            >
              {isDrawerOpen ? (
                <HiX size={16} aria-hidden="true" />
              ) : (
                <HiMenu size={16} aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavigation;
