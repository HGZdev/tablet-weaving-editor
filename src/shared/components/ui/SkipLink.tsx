import React from "react";

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const SkipLink: React.FC<SkipLinkProps> = ({
  href,
  children,
  className = "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50",
}) => {
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        const target = document.querySelector(href) as HTMLElement;
        if (target) {
          target.focus();
          target.scrollIntoView();
        }
      }}
    >
      {children}
    </a>
  );
};

export default SkipLink;
