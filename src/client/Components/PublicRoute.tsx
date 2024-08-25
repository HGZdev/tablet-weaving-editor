import React from "react";
import Navbar from "./Navbar";

interface PublicRoute {
  Component: React.FC;
}

const PublicRoute: React.FC<PublicRoute> = ({Component}) => {
  return (
    <>
      <Navbar />
      <Component />
    </>
  );
};

export default PublicRoute;
