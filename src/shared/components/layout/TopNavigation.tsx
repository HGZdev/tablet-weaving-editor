import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Image, HelpCircle } from "lucide-react";

interface TopNavigationProps {
  onToggleDrawer: () => void;
  isDrawerOpen: boolean;
}

const TopNavigation: React.FC<TopNavigationProps> = ({
  onToggleDrawer,
  isDrawerOpen,
}) => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Editor", icon: Home },
    { path: "/gallery", label: "Gallery", icon: Image },
    { path: "/help", label: "Help", icon: HelpCircle },
  ];

  return (
    <header className="bg-white border-b border-neutral-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">TW</span>
            </div>
            <h1 className="hidden lg:block text-xl font-semibold text-neutral-800">
              Tablet Weaving Editor
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center space-x-1">
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
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Navigation Links */}
          <nav className="lg:hidden flex items-center space-x-1">
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
                >
                  <Icon size={16} />
                </Link>
              );
            })}
          </nav>

          <button
            onClick={onToggleDrawer}
            className="btn btn-ghost btn-sm cursor-pointer lg:hidden"
            aria-label="Toggle control panel"
            title={isDrawerOpen ? "Close panel" : "Open panel"}
          >
            {isDrawerOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopNavigation;
