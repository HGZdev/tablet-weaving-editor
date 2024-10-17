import React from "react";

interface PublicRoute {
  Component: React.FC;
}

const PublicRoute: React.FC<PublicRoute> = ({Component}) => {
  return (
    <>
      <Component />
    </>
  );
};

export default PublicRoute;
