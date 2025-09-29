import React from "react";

interface DrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  testId?: string;
}

interface DrawerContentProps {
  className?: string;
  id?: string;
  children: React.ReactNode;
}

interface DrawerHeaderProps {
  children: React.ReactNode;
}

interface DrawerTitleProps {
  children: React.ReactNode;
}

interface DrawerDescriptionProps {
  children: React.ReactNode;
}

interface DrawerTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onOpenChange,
  children,
  testId,
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "block" : "hidden"}`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      data-testid={testId}
    >
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={() => onOpenChange?.(false)}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
};

export const DrawerContent: React.FC<DrawerContentProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={`fixed right-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform ${
        className || ""
      }`}
      role="dialog"
      aria-labelledby="drawer-title"
      aria-describedby="drawer-description"
    >
      {children}
    </div>
  );
};

export const DrawerHeader: React.FC<DrawerHeaderProps> = ({ children }) => {
  return <div className="p-6 border-b">{children}</div>;
};

export const DrawerTitle: React.FC<DrawerTitleProps> = ({ children }) => {
  return (
    <h2 id="drawer-title" className="text-lg font-semibold">
      {children}
    </h2>
  );
};

export const DrawerDescription: React.FC<DrawerDescriptionProps> = ({
  children,
}) => {
  return (
    <p id="drawer-description" className="text-sm text-gray-600 mt-1">
      {children}
    </p>
  );
};

export const DrawerTrigger: React.FC<DrawerTriggerProps> = ({ children }) => {
  return <>{children}</>;
};
